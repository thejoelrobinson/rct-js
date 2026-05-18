#!/usr/bin/env node
// Differential-test a whole subsystem of functions against the x86 interpreter,
// using a curated manifest of input scenarios.
//
// Where diff-one.js tests a single function with zero-arg / zero-register
// initial state, this drives many functions across many scenarios, each with
// its own initial register state, memory writes, and observed output regions.
// Used to verify that hand-written replacements (registered via state.fnDispatch
// from painter-bridge.js) match the interpreter byte-for-byte before we delete
// the auto-translated source.
//
// Usage:  node tools/diff-subsystem.js --manifest=lifter/sprite-subsystem.json
//         node tools/diff-subsystem.js --manifest=... --only=0x9b35fa
//         node tools/diff-subsystem.js --manifest=... --verbose

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { dispatch } from "../ported/auto/_dispatch.js";
import { Heap } from "../runtime/heap.js";
import { initHeap } from "../runtime/win32/kernel32.js";
import { resetState } from "../runtime/win32/context.js";
import { regs as portedRegs } from "../runtime/regs.js";
import { runOriginal } from "../harness/emulator.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let manifestPath = null;
let onlyAddr = null;
let verbose = false;
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--manifest=")) manifestPath = a.slice(11);
  else if (a.startsWith("--only=")) onlyAddr = parseInt(a.slice(7), 16);
  else if (a === "--verbose" || a === "-v") verbose = true;
}
if (!manifestPath) {
  console.error("usage: diff-subsystem.js --manifest=<file.json> [--only=0xNNNN] [--verbose]");
  process.exit(2);
}

const manifest = JSON.parse(readFileSync(resolve(ROOT, manifestPath), "utf8"));
const scenarios = Array.isArray(manifest) ? manifest : manifest.scenarios;
if (!Array.isArray(scenarios)) {
  console.error("manifest must be an array or have a top-level `scenarios` array");
  process.exit(2);
}

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const STACK = 256 * 1024;
const HEAP_GROW = 4 * 1024 * 1024;
const totalSize = dataBin.length + HEAP_GROW + STACK;

let passCount = 0;
let failCount = 0;
const failures = [];

for (const sc of scenarios) {
  if (sc.skip) continue;
  const addr = typeof sc.addr === "string" ? parseInt(sc.addr, 16) : sc.addr;
  if (onlyAddr !== null && addr !== onlyAddr) continue;
  const name = sc.name || `0x${addr.toString(16)}`;

  // --- INTERPRETER side: gold reference.
  let interpRes, interpErr;
  try {
    interpRes = runOriginal({
      funcAddr: addr,
      init: { regs: sc.regs || {}, mem32: sc.mem32 || {} },
      observe: (sc.observe || []).map((a) => typeof a === "string" ? parseInt(a, 16) : a),
      limit: sc.limit || 500_000,
      returnMemory: true,
    });
  } catch (e) {
    interpErr = e.message;
  }

  // --- PORTED side: dispatch.get(addr) — picks up state.fnDispatch overrides
  // from painter-bridge.js (the JS replacement) when present, else falls back
  // to the auto-translated function from ported/auto/_dispatch.js.
  let portedRes, portedErr;
  try {
    const memory = new Uint8Array(totalSize);
    memory.set(dataBin, 0);
    // Apply manifest mem32 writes.
    if (sc.mem32) {
      for (const [addrStr, value] of Object.entries(sc.mem32)) {
        const a = typeof addrStr === "string" ? parseInt(addrStr, 16) : Number(addrStr);
        memory[a]     =  value         & 0xff;
        memory[a + 1] = (value >>> 8)  & 0xff;
        memory[a + 2] = (value >>> 16) & 0xff;
        memory[a + 3] = (value >>> 24) & 0xff;
      }
    }
    const heap = new Heap(memory, totalSize);
    initHeap(dataBin.length, dataBin.length + HEAP_GROW);
    resetState();
    // Seed registers — the ported functions read regs.eax/ebx/etc. for inputs.
    for (const k of ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"]) {
      portedRegs[k] = ((sc.regs || {})[k] || 0) >>> 0;
    }

    const fn = dispatch.get(addr);
    if (!fn) throw new Error(`no JS function at 0x${addr.toString(16)}`);
    const ret = fn(heap);

    portedRes = {
      eax: (portedRegs.eax >>> 0),
      ret: ret === undefined ? null : (ret >>> 0),
      memory,
    };
  } catch (e) {
    portedErr = e.message;
  }

  // --- DIFF.
  const result = { name, addr: `0x${addr.toString(16)}` };
  if (interpErr) result.interpErr = interpErr;
  if (portedErr) result.portedErr = portedErr;
  let pass = !interpErr && !portedErr;

  if (pass) {
    // Compare return register.
    const interpEax = interpRes.regs.eax >>> 0;
    const portedEax = portedRes.eax;
    if (interpEax !== portedEax) {
      pass = false;
      result.eaxDiff = `interp=0x${interpEax.toString(16)} ported=0x${portedEax.toString(16)}`;
    }
    // Compare observed memory locations.
    for (const obsKey of Object.keys(interpRes.mem32 || {})) {
      const a = parseInt(obsKey, 16);
      const interpVal = interpRes.mem32[obsKey];
      const portedVal = (portedRes.memory[a] | (portedRes.memory[a+1]<<8) |
                        (portedRes.memory[a+2]<<16) | (portedRes.memory[a+3]<<24)) >>> 0;
      if (interpVal !== portedVal) {
        pass = false;
        result.memDiff = (result.memDiff || []);
        result.memDiff.push(`${obsKey}: interp=0x${interpVal.toString(16)} ported=0x${portedVal.toString(16)}`);
      }
    }
    // Compare mutation regions if specified.
    if (sc.compareRange && interpRes.memory) {
      const [lo, hi] = sc.compareRange.map((a) => typeof a === "string" ? parseInt(a, 16) : a);
      let firstDivergeAt = -1;
      let divergeCount = 0;
      for (let i = lo; i < hi && i < interpRes.memory.length; i++) {
        if (interpRes.memory[i] !== portedRes.memory[i]) {
          if (firstDivergeAt < 0) firstDivergeAt = i;
          divergeCount++;
        }
      }
      if (divergeCount > 0) {
        pass = false;
        const ctxLo = Math.max(lo, firstDivergeAt - 8);
        const ctxHi = Math.min(hi, firstDivergeAt + 24);
        const interpHex = Array.from(interpRes.memory.subarray(ctxLo, ctxHi))
          .map((b) => b.toString(16).padStart(2, "0")).join(" ");
        const portedHex = Array.from(portedRes.memory.subarray(ctxLo, ctxHi))
          .map((b) => b.toString(16).padStart(2, "0")).join(" ");
        result.rangeDiff = {
          range: `0x${lo.toString(16)}..0x${hi.toString(16)}`,
          firstDivergeAt: `0x${firstDivergeAt.toString(16)}`,
          divergeCount,
          interpAt: interpHex,
          portedAt: portedHex,
        };
      }
    }
  }

  if (pass) {
    passCount++;
    if (verbose) console.log(`PASS  ${name}  (eax=0x${(interpRes.regs.eax >>> 0).toString(16)})`);
  } else {
    failCount++;
    failures.push(result);
    console.log(`FAIL  ${name}`);
    if (result.interpErr) console.log(`  interp threw: ${result.interpErr}`);
    if (result.portedErr) console.log(`  ported threw: ${result.portedErr}`);
    if (result.eaxDiff) console.log(`  eax: ${result.eaxDiff}`);
    if (result.memDiff) for (const d of result.memDiff) console.log(`  mem: ${d}`);
    if (result.rangeDiff) {
      console.log(`  range ${result.rangeDiff.range}: first diverge at ${result.rangeDiff.firstDivergeAt} (${result.rangeDiff.divergeCount} bytes differ)`);
      console.log(`    interp: ${result.rangeDiff.interpAt}`);
      console.log(`    ported: ${result.rangeDiff.portedAt}`);
    }
  }
}

console.log(`\n${passCount} pass, ${failCount} fail`);
process.exit(failCount === 0 ? 0 : 1);
