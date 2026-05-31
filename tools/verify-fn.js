#!/usr/bin/env node
// Phase 3 — per-function differential verification with SYNTHESIZED entry state.
//
// The atlas (tools/struct-offsets.json) gives exact struct layouts, so we can
// build a valid struct instance in memory and verify a gameplay function
// byte-exact against the x86 interpreter WITHOUT running a full gameplay tick
// (sidesteps the painter-perf wall). Differential equivalence only requires
// IDENTICAL entry state on both sides — not the real calling convention — so we
// seed every candidate GPR to the struct pointer and a zeroed struct region,
// run both, and diff the struct bytes.
//
//   interpreter:  runOriginal(addr, {regs: all=ptr, memSize, stackTop})
//   ported JS:    fresh Heap from data.bin, same regs, dispatch(addr)(heap)
//   compare:      the struct region [ptr, ptr+size) byte-for-byte + EAX
//
// Usage:
//   node tools/verify-fn.js --addr=0x5dbeeb --struct=Peep
//   node tools/verify-fn.js --addr=0x5dbeeb --struct=Peep --seed=ESI,EDI

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { runOriginal } from "../harness/emulator.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const HEAP_LEN = 0x4ac4000;

let addr = null, structName = null, seedRegs = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"];
let ptr = null, limit = 5_000_000;
const mem32 = {};   // --mem32=0x87c398:0xffff  → seed a global before the call
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--addr=")) addr = parseInt(a.slice(7), 16) >>> 0;
  else if (a.startsWith("--struct=")) structName = a.slice(9);
  else if (a.startsWith("--seed=")) seedRegs = a.slice(7).toLowerCase().split(",").map((r) => r.startsWith("e") ? r : "e" + r);
  else if (a.startsWith("--ptr=")) ptr = parseInt(a.slice(6), 16) >>> 0;
  else if (a.startsWith("--limit=")) limit = parseInt(a.slice(8), 10);
  else if (a.startsWith("--mem32=")) { const [k, v] = a.slice(8).split(":"); mem32[parseInt(k, 16) >>> 0] = parseInt(v, 16) >>> 0; }
}
if (addr === null) { console.error("need --addr=0x..."); process.exit(1); }

const structOffsets = JSON.parse(readFileSync(resolve(ROOT, "tools/struct-offsets.json"), "utf8"));
const st = structName ? structOffsets.structs[structName] : null;
const structSize = st ? st.size : 0x100;
// Place the synthetic struct at its real array base (slot 0) if known, else a
// scratch address well clear of the PE image and stack.
if (ptr === null) ptr = st && st.arrayBase ? st.arrayBase : 0x2000000;

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));

// --- interpreter side (ground truth) ---
const regsSeed = {};
for (const r of seedRegs) regsSeed[r] = ptr;
let interp, interpErr = null;
try {
  interp = runOriginal({
    funcAddr: addr,
    init: { regs: regsSeed, mem32, memSize: HEAP_LEN, stackTop: HEAP_LEN },
    returnMemory: true, limit,
  });
} catch (e) { interpErr = (e.message || String(e)).slice(0, 160); }

// --- ported JS side ---
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { Heap } = await import("../runtime/heap.js");
const { regs } = await import("../runtime/regs.js");
const { dispatch } = await import("../ported/auto/_dispatch.js");
// dispatch is a Map<rva, fn>; normalize keys to >>> 0.
const portedMap = new Map([...dispatch].map(([a, f]) => [a >>> 0, f]));

const mem = new Uint8Array(HEAP_LEN);
mem.set(dataBin, 0);
for (const [a, v] of Object.entries(mem32)) {
  const n = Number(a);
  mem[n] = v & 0xff; mem[n + 1] = (v >>> 8) & 0xff; mem[n + 2] = (v >>> 16) & 0xff; mem[n + 3] = (v >>> 24) & 0xff;
}
const heap = new Heap(mem, HEAP_LEN);
for (const r of seedRegs) regs[r] = ptr;
const fn = portedMap.get(addr);
if (!fn) { console.error(`0x${addr.toString(16)} not in ported dispatch`); process.exit(1); }
let portedErr = null;
try { fn(heap); } catch (e) { portedErr = (e.message || String(e)).slice(0, 160); }

console.log(`verify-fn 0x${addr.toString(16)} (${structName || "?"}; seed ${seedRegs.join(",")}=0x${ptr.toString(16)}; mem32 ${Object.keys(mem32).length} seeds)`);
if (interpErr) { console.log(`  interpreter ERROR: ${interpErr}\n  (function needs realistic global state — use --mem32 or the lockstep harness)`); process.exit(2); }
if (portedErr) { console.log(`  ported THREW: ${portedErr}`); process.exit(1); }

// --- compare FULL heap below the stack region (globals + all structs the fn touched) + EAX ---
const interpMem = interp.memory;        // [0, memSize)
const cmpLen = Math.min(interpMem.length, mem.length);
let memDiff = -1;
for (let i = 0; i < cmpLen; i++) if (interpMem[i] !== mem[i]) { memDiff = i; break; }
const eaxInterp = interp.regs.eax >>> 0, eaxPorted = regs.eax >>> 0;
const eaxOk = eaxInterp === eaxPorted;

console.log(`  interp steps: ${interp.steps}`);
console.log(`  EAX: interp=0x${eaxInterp.toString(16)} ported=0x${eaxPorted.toString(16)} ${eaxOk ? "✓" : "✗"}`);
if (memDiff < 0 && eaxOk) {
  console.log(`  heap bytes: IDENTICAL ✓  — port is byte-exact vs the binary for this entry state`);
  process.exit(0);
}
if (memDiff >= 0) {
  // label the divergence if it lands in a known struct array
  let label = "";
  for (const [name, s] of Object.entries(structOffsets.structs)) {
    if (!s.arrayBase) continue;
    if (memDiff >= s.arrayBase && memDiff < s.arrayBase + s.stride * 1000) {
      const off = (memDiff - s.arrayBase) % s.stride;
      const f = s.fields.find((x) => x.offset === off);
      label = `  → ${name}[${Math.floor((memDiff - s.arrayBase) / s.stride)}].${f ? f.name : "+0x" + off.toString(16)}`;
      break;
    }
  }
  console.log(`  heap bytes: DIVERGE at 0x${memDiff.toString(16)}: interp=0x${interpMem[memDiff].toString(16)} ported=0x${mem[memDiff].toString(16)}${label}`);
}
process.exit(1);
