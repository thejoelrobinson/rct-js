#!/usr/bin/env node
// Per-call lockstep oracle for the 0x439b86 peep-walk-handler port.
// For every dispatch during a scenario-play soak: run the JS body AND the
// interpreter shim from identical entry state, compare the WHOLE HEAP
// (minus the bridge cpu's 64 KB stack carve at the top) + the return value
// (regs.eax — the only register the production caller consumes; 439822
// does `regs.eax = callIndirect(...)` as a tail call), report the first
// divergences, and keep the INTERPRETER result live.
//
// Whole-heap compare (not curated ranges) because the callee tree writes
// broadly: sprite quadrant tables, litter sprite allocation, dirty-rect
// grids, RNG state, peep struct. Anything the JS callees get wrong vs the
// raw bytes shows up here.
//
//   TICKS=2 node tools/_lockstep-439b86.mjs
//
// KNOWN BENIGN DIFF (eaxMis): on calls that fall through to the
// watch-ride gates, the binary's tail evolves al via `mov al,[esi+0xe1];
// and al,0xc0` (etc.) before its ret, while the JS tail keeps the
// 0x43c751 exit eax. DIAG2 instrumentation proved 0x43c751's entry regs
// and exit eax are identical in both legs; the divergence is dead
// register evolution in the tail's gate reads. The production caller
// chain discards the value (439135's loop does `regs.eax =
// FUN_00439822(heap)` and overwrites it next iteration), and the
// multi-tick dual soak (tools/painter-port-oracle.mjs) is byte-identical
// — any consumed divergence would compound into heap differences.
// memMis is the gate; it must be 0.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");
const { regs } = await import("../runtime/regs.js");
const { FUN_extra_peepstate_439b86 } = await import("../ported/auto/extra_peepstate_439b86.js");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);
const heap = r.heap;

const bytes = heap.bytes;
const CMP_END = bytes.byteLength - 64 * 1024;   // exclude bridge stack carve
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);

const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
let calls = 0, memMis = 0, eaxMis = 0, regMisInfo = 0, reported = 0;

// The harness has already wrapped 0x439b86: wrapper(h) routes to the JS
// port, or to the bridge shim when __forceInterp439b86 is set.
const wrapper = state.fnDispatch.get(0x439b86);
state.fnDispatch.set(0x439b86, function lockstep(h) {
  calls++;
  save.set(bytes);
  const r0 = { ...regs };

  // --- JS body (or, with AB_CONTROL=1, a second interpreter run — proves
  // any residual diff is a double-execution artifact of JS-side state the
  // heap restore can't rewind, e.g. the DSound channel pool) ---
  let retJS, jsThrew = null;
  if (process.env.AB_CONTROL) {
    globalThis.__forceInterp439b86 = true;
    try { retJS = wrapper(h); } finally { globalThis.__forceInterp439b86 = false; }
  } else {
    try { retJS = FUN_extra_peepstate_439b86(h); } catch (e) { jsThrew = e; }
  }
  afterJS.set(bytes);
  const rJS = { ...regs };

  // --- restore, then interpreter shim (truth stays live) ---
  bytes.set(save);
  Object.assign(regs, r0);
  globalThis.__forceInterp439b86 = true;
  let retIN;
  try { retIN = wrapper(h); } finally { globalThis.__forceInterp439b86 = false; }
  const rIN = { ...regs };

  // --- compare heap (exclude bridge-stack carve at the top) ---
  const a = Buffer.from(afterJS.buffer, 0, CMP_END);
  const b = Buffer.from(bytes.buffer, 0, CMP_END);
  let firstDiffs = [];
  if (!a.equals(b)) {
    memMis++;
    for (let i = 0; i < CMP_END && firstDiffs.length < 12; i++) {
      if (afterJS[i] !== bytes[i]) firstDiffs.push(`0x${i.toString(16)}: js=${afterJS[i].toString(16)} in=${bytes[i].toString(16)}`);
    }
  }
  const eaxBad = ((retJS ?? regs.eax) >>> 0) !== ((retIN ?? regs.eax) >>> 0);
  if (eaxBad) eaxMis++;
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
  if (badR.length) regMisInfo++;
  if ((firstDiffs.length || eaxBad || jsThrew) && reported < 8) {
    reported++;
    console.log(`--- MISMATCH call#${calls} esi=${(r0.esi >>> 0).toString(16)} state2b=${save[(r0.esi >>> 0) + 0x2b]?.toString(16)}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 4).join(" | ")}`);
    if (eaxBad) console.log(`    ret: js=${(retJS >>> 0).toString(16)} in=${(retIN >>> 0).toString(16)}`);
    if (process.env.DIAG2 && globalThis.__c751log.length >= 2) {
      const L = globalThis.__c751log;
      const a = L[L.length - 2], b = L[L.length - 1];   // js leg, interp leg
      for (const n of REGN) {
        if ((a.regs[n] >>> 0) !== (b.regs[n] >>> 0)) console.log(`    c751-entry reg ${n}: js=${(a.regs[n] >>> 0).toString(16)} in=${(b.regs[n] >>> 0).toString(16)}`);
      }
      for (const n of ["CF", "ZF", "SF", "OF", "DF"]) {
        if ((a.fl[n] | 0) !== (b.fl[n] | 0)) console.log(`    c751-entry flag ${n}: js=${a.fl[n]} in=${b.fl[n]}`);
      }
      console.log(`    c751 esp: js=${(a.regs.esp >>> 0).toString(16)} in=${(b.regs.esp >>> 0).toString(16)} exitEax: js=${a.exitEax?.toString(16)} in=${b.exitEax?.toString(16)}`);
    }
    {
      const e = r0.esi >>> 0;
      console.log(`    diag: entry eax=${(r0.eax >>> 0).toString(16)} ebx=${(r0.ebx >>> 0).toString(16)} ebp=${(r0.ebp >>> 0).toString(16)} ` +
        `[a]=${save[e + 0xa].toString(16)}${save[e + 0xb].toString(16)} [c4]=${save[e + 0xc4].toString(16)} ` +
        `[24]=${(save[e + 0x24] | (save[e + 0x25] << 8)).toString(16)} [c8]=${(save[e + 0xc8] | (save[e + 0xc9] << 8)).toString(16)} ` +
        `[ca]=${(save[e + 0xca] | (save[e + 0xcb] << 8)).toString(16)} [29]=${save[e + 0x29].toString(16)} [71]=${save[e + 0x71].toString(16)}`);
    }
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.join(",")}`);
  }
});

// DIAG2: record 0x43c751 entry regs+flags in both legs via a
// record-then-delegate eip hook on the bridge cpu.
if (process.env.DIAG2) {
  const { setEipHook, clearEipHook, runFunction } = await import("../harness/x86.js");
  globalThis.__c751log = [];
  const hookFn = (cpu) => {
    globalThis.__c751log.push({
      regs: { ...cpu.regs },
      fl: { ...cpu.eflags },
      stk: heap.u32(cpu.regs.esp >>> 0) >>> 0,
    });
    const sESP = cpu.regs.esp >>> 0, sEIP = cpu.regs.eip >>> 0, sCD = cpu.callDepth;
    clearEipHook(0x43c751);
    try { runFunction(cpu, 0x43c751, { stackTop: sESP, limit: 50_000_000 }); }
    finally { setEipHook(0x43c751, hookFn); }
    cpu.regs.esp = sESP; cpu.regs.eip = sEIP; cpu.callDepth = sCD;
    const L = globalThis.__c751log[globalThis.__c751log.length - 1];
    L.exitEax = cpu.regs.eax >>> 0;
  };
  setEipHook(0x43c751, hookFn);
}

const TICKS = parseInt(process.env.TICKS || "2", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} eaxMis=${eaxMis} regMisInfo=${regMisInfo}`);
