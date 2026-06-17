#!/usr/bin/env node
// Per-call lockstep oracle for FUN_005ddcbe — the vehicle "entry pre-update"
// breakdown-eligibility check, a direct callee of 0x5da274 (reached via
// callNative(0x5ddcbe)). ~64 interp steps/tick during scenario play. For every
// dispatch during an enterScenarioPlay soak: run the JS body AND the
// interpreter (the original binary bytes) from identical entry state, compare
// the WHOLE HEAP (minus the bridge cpu's 64 KB stack carve) + exit registers,
// report the first divergences, and keep the INTERPRETER result live. memMis
// is the gate.
//
// Unlike 0x5da274 (a vtable target with a production eip hook in
// painter-bridge.js), 0x5ddcbe has NO production hook — it is only reached
// through callNative from the 5da274 body. So this tool installs its OWN eip
// hook at 0x5ddcbe: the JS leg copies cpu.regs -> the shared `regs` object,
// runs FUN_005ddcbe, copies back, and restores esp (callNative inside the body
// clobbers cpu.esp/eip). The __forceInterp5ddcbe leg clears the hook, steps to
// the body's own ret (0x5ddd9b) WITHOUT executing it, and reinstalls — the
// harness's post-hook ret then consumes the caller's address, identical to the
// JS-body path.
//
//   TICKS=8 node tools/_lockstep-5ddcbe.mjs
//   AB_CONTROL=1 ...   # interp-vs-interp control (must be memMis=0)
//
// memMis is the gate; it must be 0. eax/regMis are informational — 0x5ddcbe's
// single call site (0x5ddd95 -> 0x42c711) is wrapped in pushal/popal, so the
// binary discards all register effects and the function returns void.

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
const { getEipHook, setEipHook, clearEipHook, step } = await import("../harness/x86.js");
const { regs } = await import("../runtime/regs.js");
const { FUN_005ddcbe } = await import("../ported/auto/5ddcbe.js");

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

const RET_ADDR = 0x5ddd9b;
const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
let calls = 0, memMis = 0, eaxMis = 0, regMisInfo = 0, reported = 0;

const snapRegs = (c) => ({
  eax: c.regs.eax >>> 0, ecx: c.regs.ecx >>> 0, edx: c.regs.edx >>> 0,
  ebx: c.regs.ebx >>> 0, esi: c.regs.esi >>> 0, edi: c.regs.edi >>> 0,
  ebp: c.regs.ebp >>> 0, esp: c.regs.esp >>> 0,
});
const setRegs = (c, s) => {
  c.regs.eax = s.eax >>> 0; c.regs.ecx = s.ecx >>> 0; c.regs.edx = s.edx >>> 0;
  c.regs.ebx = s.ebx >>> 0; c.regs.esi = s.esi >>> 0; c.regs.edi = s.edi >>> 0;
  c.regs.ebp = s.ebp >>> 0; c.regs.esp = s.esp >>> 0; c.regs.eip = 0x5ddcbe;
};

// The production crossing: run the JS body (copy cpu regs -> shared regs,
// call, copy back), with esp restored around the body. AB_CONTROL routes the
// "JS" leg through the interpreter too (interp-vs-interp control).
function runJSLeg(c) {
  if (process.env.AB_CONTROL) { runInterpLeg(c); return; }
  const savedEsp = c.regs.esp >>> 0;
  regs.eax = c.regs.eax >>> 0; regs.ecx = c.regs.ecx >>> 0; regs.edx = c.regs.edx >>> 0;
  regs.ebx = c.regs.ebx >>> 0; regs.esi = c.regs.esi >>> 0; regs.edi = c.regs.edi >>> 0;
  regs.ebp = c.regs.ebp >>> 0;
  FUN_005ddcbe(heap);
  c.regs.esp = savedEsp;
  c.regs.eax = regs.eax >>> 0; c.regs.ecx = regs.ecx >>> 0; c.regs.edx = regs.edx >>> 0;
  c.regs.ebx = regs.ebx >>> 0; c.regs.esi = regs.esi >>> 0; c.regs.edi = regs.edi >>> 0;
  c.regs.ebp = regs.ebp >>> 0;
}

// The interpreter truth: clear our hook, step the real bytes to the body's own
// ret (0x5ddd9b) WITHOUT executing it, reinstall. Identical post-hook ret.
function runInterpLeg(c) {
  const self = getEipHook(0x5ddcbe);
  clearEipHook(0x5ddcbe);
  const limit = globalThis.__painterStepLimit || 50_000_000;
  try {
    c.regs.eip = 0x5ddcbe;
    let n = 0;
    while ((c.regs.eip >>> 0) !== RET_ADDR) {
      if (!step(c) || ++n > limit) break;
    }
  } finally {
    setEipHook(0x5ddcbe, self);
  }
}

setEipHook(0x5ddcbe, function lockstep(c) {
  calls++;
  save.set(bytes);
  const r0 = snapRegs(c);

  // --- leg A: JS body (or, with AB_CONTROL=1, a second interpreter run) ---
  setRegs(c, r0);
  let jsThrew = null;
  try { runJSLeg(c); } catch (e) { jsThrew = e; }
  afterJS.set(bytes);
  const rJS = snapRegs(c);

  // --- restore, then leg B: interpreter truth (left live) ---
  bytes.set(save);
  setRegs(c, r0);
  runInterpLeg(c);
  const rIN = snapRegs(c);

  // --- compare ---
  const a = Buffer.from(afterJS.buffer, 0, CMP_END);
  const b = Buffer.from(bytes.buffer, 0, CMP_END);
  let firstDiffs = [];
  if (!a.equals(b)) {
    memMis++;
    for (let i = 0; i < CMP_END && firstDiffs.length < 16; i++) {
      if (afterJS[i] !== bytes[i]) firstDiffs.push(`0x${i.toString(16)}: js=${afterJS[i].toString(16)} in=${bytes[i].toString(16)}`);
    }
  }
  if ((rJS.eax >>> 0) !== (rIN.eax >>> 0)) eaxMis++;
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
  if (badR.length) regMisInfo++;
  if ((firstDiffs.length || jsThrew) && reported < 8) {
    reported++;
    console.log(`--- MISMATCH call#${calls} entry: eax=${(r0.eax >>> 0).toString(16)} ecx=${(r0.ecx >>> 0).toString(16)} edx=${(r0.edx >>> 0).toString(16)} esi=${(r0.esi >>> 0).toString(16)}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 6).join(" | ")}`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
  }
  // c is left in the interpreter-truth state (leg B); the harness simulates
  // one ret after we return, identical to the production crossing.
});

const TICKS = parseInt(process.env.TICKS || "8", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} eaxMis=${eaxMis} regMisInfo=${regMisInfo}`);
