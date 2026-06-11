#!/usr/bin/env node
// Per-call lockstep oracle for the 0x43c751 peep-walking-core port.
// For every dispatch during a scenario-play soak: run the JS body AND the
// interpreter (callNative on the raw binary bytes) from identical entry
// state, compare the WHOLE HEAP (minus the bridge cpu's 64 KB stack carve
// at the top) + exit registers, report the first divergences, and keep
// the INTERPRETER result live.
//
// The production caller is the JS 439b86 port, which routes through
// state.fnDispatch.get(0x43c751) — exactly the entry this tool wraps.
// Native callers (other bridged peep-state handlers calling 0x43c751
// from inside the interpreter) don't route through the dispatch entry
// and are not wrapped (they run the original bytes either way).
//
//   TICKS=8 node tools/_lockstep-43c751.mjs
//   AB_CONTROL=1 TICKS=8 node tools/_lockstep-43c751.mjs   # interp-vs-interp
//   DIAG=1    — record-then-delegate eip hooks on the inner delegated
//               calls (motion handlers / 43e304 / 44142c / 441452 /
//               43d38b): per-leg call sequence + entry/exit regs + CF.
//   WATCH=<hexaddr> — trap JS-side heap.setU8/setU16 writes to an address
//               during the JS leg (with stack), to attribute a heap diff.
//   CALLN=<n> WATCHA=<hexaddr> — single-step the interpreter leg of call
//               #n and print the exact EIP whose write flips the watched
//               byte. This microscope is what attributed the 0x887474
//               queue-head corruption to the interpreter's 66-prefix-less
//               XCHG (fixed in harness/x86.js).
//
// memMis is the gate; it must be 0. regMis* are informational (the
// production caller consumes only regs.eax / the [0x62d3f4] bits; JS
// callees whose binary clobbers scratch registers run under
// callPreserved in the port, so benign scratch divergence is expected —
// any CONSUMED divergence would compound into memMis or the dual-soak
// hash).

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
const { FUN_extra_peepwalk_43c751 } = await import("../ported/auto/extra_peepwalk_43c751.js");

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

const wrapper = state.fnDispatch.get(0x43c751);
state.fnDispatch.set(0x43c751, function lockstep(h) {
  calls++;
  save.set(bytes);
  const r0 = { ...regs };

  // --- JS body (or, with AB_CONTROL=1, a second interpreter run) ---
  const mhBaseJS = globalThis.__mhlog ? globalThis.__mhlog.length : 0;
  let unpatch = null;
  if (process.env.WATCH) {
    const W = parseInt(process.env.WATCH, 16);
    const o16 = heap.setU16.bind(heap), o8 = heap.setU8.bind(heap);
    heap.setU16 = (a, v) => { if ((a >>> 0) <= W && W < (a >>> 0) + 2) console.log(`    WATCH setU16(0x${(a >>> 0).toString(16)}, 0x${(v & 0xffff).toString(16)}) call#${calls}\n${new Error().stack.split("\n").slice(2, 6).join("\n")}`); return o16(a, v); };
    heap.setU8 = (a, v) => { if ((a >>> 0) === W) console.log(`    WATCH setU8(0x${(a >>> 0).toString(16)}, 0x${(v & 0xff).toString(16)}) call#${calls}`); return o8(a, v); };
    unpatch = () => { heap.setU16 = o16; heap.setU8 = o8; };
  }
  let retJS, jsThrew = null;
  globalThis.__inLockstep = "js";
  if (process.env.AB_CONTROL) {
    globalThis.__forceInterp43c751 = true;
    try { retJS = wrapper(h); } finally { globalThis.__forceInterp43c751 = false; }
  } else {
    try { retJS = FUN_extra_peepwalk_43c751(h); } catch (e) { jsThrew = e; }
  }
  if (unpatch) unpatch();
  afterJS.set(bytes);
  const rJS = { ...regs };

  // --- restore, then interpreter (truth stays live) ---
  const mhJS = globalThis.__mhlog ? globalThis.__mhlog.slice(mhBaseJS) : [];
  const mhBaseIN = globalThis.__mhlog ? globalThis.__mhlog.length : 0;
  bytes.set(save);
  Object.assign(regs, r0);
  globalThis.__forceInterp43c751 = true;
  globalThis.__inLockstep = "in";
  const traceThis = process.env.CALLN && parseInt(process.env.CALLN, 10) === calls;
  let retIN;
  if (traceThis) {
    // single-step microscope: watch bytes[WATCHA] flip, print eip
    const step = globalThis.__x86step;
    const cpu = state.__painterCpu;
    const WATCHA = parseInt(process.env.WATCHA || "887474", 16);
    cpu.regs.eax = regs.eax >>> 0; cpu.regs.ecx = regs.ecx >>> 0;
    cpu.regs.edx = regs.edx >>> 0; cpu.regs.ebx = regs.ebx >>> 0;
    cpu.regs.esi = regs.esi >>> 0; cpu.regs.edi = regs.edi >>> 0;
    cpu.regs.ebp = regs.ebp >>> 0;
    cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
    const STACK_TOP = bytes.byteLength;
    cpu.regs.esp = ((STACK_TOP - 0x40) - 4) >>> 0;
    const RET_SENTINEL = 0xdeadbeef >>> 0;
    bytes[cpu.regs.esp] = RET_SENTINEL & 0xff; bytes[cpu.regs.esp + 1] = (RET_SENTINEL >>> 8) & 0xff;
    bytes[cpu.regs.esp + 2] = (RET_SENTINEL >>> 16) & 0xff; bytes[cpu.regs.esp + 3] = (RET_SENTINEL >>> 24) & 0xff;
    cpu.regs.eip = 0x43c751; cpu.callDepth = 0;
    let prev = bytes[WATCHA], steps = 0, lastEip = 0;
    while (true) {
      lastEip = cpu.regs.eip >>> 0;
      if (!step(cpu)) break;
      if (bytes[WATCHA] !== prev) {
        console.log(`    STEPWATCH [0x${WATCHA.toString(16)}] ${prev.toString(16)} -> ${bytes[WATCHA].toString(16)} by eip=0x${lastEip.toString(16)} (step ${steps})`);
        prev = bytes[WATCHA];
      }
      if (++steps > 5_000_000) { console.log("    STEPWATCH limit"); break; }
    }
    regs.eax = cpu.regs.eax >>> 0; regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0; regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0; regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    retIN = regs.eax;
    globalThis.__forceInterp43c751 = false; globalThis.__inLockstep = null;
  } else {
    try { retIN = wrapper(h); } finally { globalThis.__forceInterp43c751 = false; globalThis.__inLockstep = null; }
  }
  const rIN = { ...regs };

  // --- compare ---
  const a = Buffer.from(afterJS.buffer, 0, CMP_END);
  const b = Buffer.from(bytes.buffer, 0, CMP_END);
  let firstDiffs = [];
  if (!a.equals(b)) {
    memMis++;
    for (let i = 0; i < CMP_END && firstDiffs.length < 12; i++) {
      if (afterJS[i] !== bytes[i]) firstDiffs.push(`0x${i.toString(16)}: js=${afterJS[i].toString(16)} in=${bytes[i].toString(16)}`);
    }
  }
  const eaxBad = ((rJS.eax) >>> 0) !== ((rIN.eax) >>> 0);
  if (eaxBad) eaxMis++;
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
  if (badR.length) regMisInfo++;
  if ((firstDiffs.length || jsThrew) && reported < 8) {
    reported++;
    const e = r0.esi >>> 0;
    console.log(`--- MISMATCH call#${calls} esi=${e.toString(16)} state2b=${save[e + 0x2b]?.toString(16)} type2e=${save[e + 0x2e]?.toString(16)}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 4).join(" | ")}`);
    console.log(`    entry: eax=${(r0.eax >>> 0).toString(16)} ebx=${(r0.ebx >>> 0).toString(16)} ecx=${(r0.ecx >>> 0).toString(16)} edx=${(r0.edx >>> 0).toString(16)} ebp=${(r0.ebp >>> 0).toString(16)} ` +
      `pos=${(save[e + 0xe] | (save[e + 0xf] << 8)).toString(16)},${(save[e + 0x10] | (save[e + 0x11] << 8)).toString(16)},${(save[e + 0x12] | (save[e + 0x13] << 8)).toString(16)} ` +
      `tgt=${(save[e + 0x32] | (save[e + 0x33] << 8)).toString(16)},${(save[e + 0x34] | (save[e + 0x35] << 8)).toString(16)} [71]=${save[e + 0x71].toString(16)} [36]=${save[e + 0x36].toString(16)}`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
    if (process.env.DIAG) {
      const hx = (arr, base, n) => Array.from({ length: n }, (_, i) => arr[base + i].toString(16).padStart(2, "0")).join(" ");
      console.log(`    q-head js: ${hx(afterJS, 0x887470, 16)}`);
      console.log(`    q-head in: ${hx(bytes, 0x887470, 16)}`);
      console.log(`    q-cnt  js: ${hx(afterJS, 0x88747a, 8)}  in: ${hx(bytes, 0x88747a, 8)}`);
      console.log(`    peep68 js: ${hx(afterJS, e + 0x68, 20)}`);
      console.log(`    peep68 in: ${hx(bytes, e + 0x68, 20)}`);
      console.log(`    peep24 js: ${hx(afterJS, e + 0x24, 8)}  in: ${hx(bytes, e + 0x24, 8)}  2b js=${afterJS[e + 0x2b].toString(16)} in=${bytes[e + 0x2b].toString(16)}`);
    }
    if (globalThis.__mhlog) {
      const mhIN = globalThis.__mhlog.slice(mhBaseIN);
      console.log(`    motion-handler entries: js=${mhJS.length} in=${mhIN.length}`);
      const fmt = (x) => `${x.addr.toString(16)}(qB=${(x.qBefore ?? -1).toString(16)} qA=${(x.qEntry ?? -1).toString(16)} xeax=${(x.exit?.eax >>> 0).toString(16)} xedx=${(x.exit?.edx >>> 0).toString(16)} xebx=${(x.exit?.ebx >>> 0).toString(16)})`;
      console.log(`      js seq: ${mhJS.map(fmt).join(" ")}`);
      console.log(`      in seq: ${mhIN.map(fmt).join(" ")}`);
      for (let k = 0; k < Math.max(mhJS.length, mhIN.length); k++) {
        const a2 = mhJS[k], b2 = mhIN[k];
        if (!a2 || !b2) { console.log(`      [${k}] only in ${a2 ? "js" : "in"} leg (addr=${((a2 || b2).addr).toString(16)})`); continue; }
        const diffs = REGN.filter((n) => (a2.regs[n] >>> 0) !== (b2.regs[n] >>> 0))
          .map((n) => `${n} js=${(a2.regs[n] >>> 0).toString(16)} in=${(b2.regs[n] >>> 0).toString(16)}`);
        if (diffs.length) console.log(`      [${k}] @${a2.addr.toString(16)} entry-reg diffs: ${diffs.join(", ")}`);
        else console.log(`      [${k}] @${a2.addr.toString(16)} entry regs identical`);
        if (a2.exit && b2.exit) {
          const ediffs = REGN.filter((n) => (a2.exit[n] >>> 0) !== (b2.exit[n] >>> 0))
            .map((n) => `${n} js=${(a2.exit[n] >>> 0).toString(16)} in=${(b2.exit[n] >>> 0).toString(16)}`);
          console.log(`      [${k}] exitCF js=${a2.exitCF} in=${b2.exitCF}${ediffs.length ? " exit-reg diffs: " + ediffs.join(", ") : " exit regs identical"}`);
        }
      }
    }
  }
});

// DIAG: record motion-handler (0x43d5a0/0x4565f8) entry regs+flags in both
// legs via record-then-delegate eip hooks on the bridge cpu (both legs run
// the handler through the interpreter, so the hook fires in both).
if (process.env.DIAG) {
  const { setEipHook, clearEipHook, runFunction } = await import("../harness/x86.js");
  globalThis.__mhlog = [];
  for (const addr of [0x43d5a0, 0x4565f8, 0x43e304, 0x44142c, 0x441452, 0x43d38b]) {
    const hookFn = (cpu) => {
      const track = !!globalThis.__inLockstep;
      const rec = track ? { addr, regs: { ...cpu.regs }, fl: { ...cpu.eflags }, qBefore: bytes[0x887474] | (bytes[0x887475] << 8) } : null;
      if (rec) globalThis.__mhlog.push(rec);
      const sESP = cpu.regs.esp >>> 0, sEIP = cpu.regs.eip >>> 0, sCD = cpu.callDepth;
      clearEipHook(addr);
      try { runFunction(cpu, addr, { stackTop: sESP, limit: 50_000_000 }); }
      finally { setEipHook(addr, hookFn); }
      cpu.regs.esp = sESP; cpu.regs.eip = sEIP; cpu.callDepth = sCD;
      if (rec) {
        rec.exit = { ...cpu.regs };
        rec.exitCF = cpu.eflags.CF | 0;
        rec.qEntry = bytes[0x887474] | (bytes[0x887475] << 8);
      }
    };
    setEipHook(addr, hookFn);
  }
}

{
  const { step } = await import("../harness/x86.js");
  globalThis.__x86step = step;
}

const TICKS = parseInt(process.env.TICKS || "2", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} eaxMis=${eaxMis} regMisInfo=${regMisInfo}`);
