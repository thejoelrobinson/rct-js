#!/usr/bin/env node
// Per-call lockstep oracle for FUN_0043d38b — the peep tile z-height helper
// (callee of the 0x43c751 walking core, ~217 interp steps/tick). For every
// dispatch during an enterScenarioPlay soak: run the JS body AND the
// interpreter (the original binary bytes) from identical entry state, compare
// the WHOLE HEAP (minus the bridge cpu's 64 KB stack carve) + exit registers,
// report the first divergences, and keep the INTERPRETER result live. memMis
// is the gate.
//
// 0x43d38b is reached from inside the interpreter via a plain `call 0x43d38b`
// at 0x43c8b4 (the same-tile-move arm of the peep walking core, which runs in
// the interpreter during enterScenarioPlay). We install an EIP HOOK at
// 0x43d38b: when the interpreter reaches the call, eip == 0x43d38b and the
// hook fires with the dispatcher's call frame intact ([esp] = 0x43c8b9).
// step() then simulates exactly ONE ret after the hook, identical to a real
// production hook. This tool's hook runs the JS leg (snapshot heap), restores,
// runs the interpreter leg (the real bytes, stepped to one of the function's
// `ret` instructions WITHOUT executing it — step() executes it), and diffs.
//
//   TICKS=8 node tools/_lockstep-43d38b.mjs
//   AB_CONTROL=1 ...   # interp-vs-interp control (must be memMis=0)
//
// memMis is the gate; it must be 0. The function returns z in dx/eax, so eax
// and edx ARE meaningful exit registers here (not dead) — they are compared
// and reported.

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
const { setEipHook, clearEipHook, getEipHook, step } = await import("../harness/x86.js");
const { FUN_0043d38b } = await import("../ported/auto/43d38b.js");
const { regs } = await import("../runtime/regs.js");

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

// The function's `ret` instruction addresses (4 arm rets + the (bl&4)==0 ret).
// The (bl&0x18)!=0 arm tail-jmps to 0x423677, whose `ret` is at 0x4236d7 (it
// returns straight to 0x43d38b's caller, the jmp left no extra frame). Stop at
// any of these WITHOUT executing the ret — step() executes it after the hook.
const RET_SET = new Set([0x43d3d5, 0x43d3e3, 0x43d3f1, 0x43d403, 0x4236d7]);

const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
let calls = 0, memMis = 0, eaxMis = 0, edxMis = 0, regMisInfo = 0, reported = 0;

const snapRegs = (c) => ({
  eax: c.regs.eax >>> 0, ecx: c.regs.ecx >>> 0, edx: c.regs.edx >>> 0,
  ebx: c.regs.ebx >>> 0, esi: c.regs.esi >>> 0, edi: c.regs.edi >>> 0,
  ebp: c.regs.ebp >>> 0, esp: c.regs.esp >>> 0,
});
const setRegs = (c, s) => {
  c.regs.eax = s.eax >>> 0; c.regs.ecx = s.ecx >>> 0; c.regs.edx = s.edx >>> 0;
  c.regs.ebx = s.ebx >>> 0; c.regs.esi = s.esi >>> 0; c.regs.edi = s.edi >>> 0;
  c.regs.ebp = s.ebp >>> 0; c.regs.esp = s.esp >>> 0; c.regs.eip = 0x43d38b;
};

// JS leg: copy cpu.regs -> regs, run the hand-port, copy regs back.
function runJsLeg(c) {
  regs.eax = c.regs.eax >>> 0; regs.ecx = c.regs.ecx >>> 0; regs.edx = c.regs.edx >>> 0;
  regs.ebx = c.regs.ebx >>> 0; regs.esi = c.regs.esi >>> 0; regs.edi = c.regs.edi >>> 0;
  regs.ebp = c.regs.ebp >>> 0;
  const savedEsp = c.regs.esp >>> 0;
  try { FUN_0043d38b(heap); } catch (e) { return e; }
  // callNative(0x423677) inside the body resets cpu.esp/eip; restore the frame.
  c.regs.esp = savedEsp;
  c.regs.eax = regs.eax >>> 0; c.regs.ecx = regs.ecx >>> 0; c.regs.edx = regs.edx >>> 0;
  c.regs.ebx = regs.ebx >>> 0; c.regs.esi = regs.esi >>> 0; c.regs.edi = regs.edi >>> 0;
  c.regs.ebp = regs.ebp >>> 0;
  return null;
}

// Interp leg: clear our hook, step the real bytes to a `ret` (without executing
// it), reinstall the hook. Left live so step() executes the ret after us.
function runInterpLeg(c) {
  const self = getEipHook(0x43d38b);
  clearEipHook(0x43d38b);
  const limit = globalThis.__painterStepLimit || 5_000_000;
  try {
    c.regs.eip = 0x43d38b;
    let n = 0;
    while (!RET_SET.has(c.regs.eip >>> 0)) {
      if (!step(c) || ++n > limit) break;
    }
  } finally {
    setEipHook(0x43d38b, self);
  }
}

setEipHook(0x43d38b, function lockstep(c) {
  calls++;
  save.set(bytes);
  const r0 = snapRegs(c);

  // --- leg A: JS body (or, with AB_CONTROL=1, a second interpreter run) ---
  setRegs(c, r0);
  let jsThrew = null;
  if (process.env.AB_CONTROL) {
    runInterpLeg(c);
  } else {
    jsThrew = runJsLeg(c);
  }
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
  // z result lives in dx; eax is also set on the 0x423677 tail-arm.
  if ((rJS.eax & 0xffff) !== (rIN.eax & 0xffff)) eaxMis++;
  if ((rJS.edx & 0xffff) !== (rIN.edx & 0xffff)) edxMis++;
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
  if (badR.length) regMisInfo++;
  if ((firstDiffs.length || jsThrew || (rJS.edx & 0xffff) !== (rIN.edx & 0xffff)) && reported < 12) {
    reported++;
    console.log(`--- MISMATCH call#${calls} entry: eax=${(r0.eax >>> 0).toString(16)} ecx=${(r0.ecx >>> 0).toString(16)} edx=${(r0.edx >>> 0).toString(16)} esi=${(r0.esi >>> 0).toString(16)} flags[esi+0x29]=${heap.u8((r0.esi + 0x29) >>> 0).toString(16)} base[esi+0x28]=${heap.u8((r0.esi + 0x28) >>> 0).toString(16)}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 6).join(" | ")}`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    console.log(`    (dx) js=${(rJS.edx & 0xffff).toString(16)} in=${(rIN.edx & 0xffff).toString(16)}   (eax16) js=${(rJS.eax & 0xffff).toString(16)} in=${(rIN.eax & 0xffff).toString(16)}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
  }
  // c is left in the interpreter-truth state (leg B); step() simulates one ret
  // after we return, identical to the production crossing.
});

const TICKS = parseInt(process.env.TICKS || "8", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} eaxMis=${eaxMis} edxMis=${edxMis} regMisInfo=${regMisInfo}`);
