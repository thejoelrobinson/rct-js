#!/usr/bin/env node
// Per-call lockstep oracle for FUN_004314ed — a popcount of two dword globals
// ([0x87c3dc] + [0x87c3e0]) returned in AX. ~194 interp steps/tick during
// gameplay (reached via callNative(0x4314ed) from the simulation step at
// 0x424e0f, and also as a direct JS call from 0x42f4be). For every dispatch
// during an enterScenarioPlay soak: run the JS body AND the interpreter (the
// original binary bytes) from identical entry state, compare the WHOLE HEAP
// (minus the bridge cpu's 64 KB stack carve) + exit registers, report the
// first divergences, and keep the INTERPRETER result live. memMis is the gate.
//
// 0x4314ed is NOT installed as a production eip hook by painter-bridge — it is
// reached through runFunction (callNative -> runFunction(cpu, 0x4314ed)). This
// tool installs its OWN eip hook at 0x4314ed: the JS leg syncs cpu.regs <-> the
// translator `regs` object and calls FUN_004314ed; the __forceInterp4314ed leg
// clears the hook and steps the real bytes to the body's `ret` (0x43150f)
// WITHOUT executing it, so runFunction's post-hook ret simulation consumes the
// caller's address identically in both legs.
//
//   TICKS=8 node tools/_lockstep-4314ed.mjs
//   AB_CONTROL=1 ...   # interp-vs-interp control (must be memMis=0)
//
// memMis is the gate; it must be 0. eax/regMis are informational but for THIS
// function eax IS the return value (the popcount), so eaxMis should be 0 too.

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
const { FUN_004314ed } = await import("../ported/auto/4314ed.js");

const RET_ADDR = 0x43150f; // the function's single `ret`

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

const snapRegs = (c) => ({
  eax: c.regs.eax >>> 0, ecx: c.regs.ecx >>> 0, edx: c.regs.edx >>> 0,
  ebx: c.regs.ebx >>> 0, esi: c.regs.esi >>> 0, edi: c.regs.edi >>> 0,
  ebp: c.regs.ebp >>> 0, esp: c.regs.esp >>> 0,
});
const setRegs = (c, s) => {
  c.regs.eax = s.eax >>> 0; c.regs.ecx = s.ecx >>> 0; c.regs.edx = s.edx >>> 0;
  c.regs.ebx = s.ebx >>> 0; c.regs.esi = s.esi >>> 0; c.regs.edi = s.edi >>> 0;
  c.regs.ebp = s.ebp >>> 0; c.regs.esp = s.esp >>> 0; c.regs.eip = 0x4314ed;
};

// JS leg: sync cpu.regs -> regs, run the JS body, sync back. runFunction's
// fast-path simulates the single `ret` after we return (it pops [esp] which
// the body's push/pop ebx leaves pointing at the caller's address).
function runJS(c) {
  regs.eax = c.regs.eax >>> 0;
  regs.ecx = c.regs.ecx >>> 0;
  regs.edx = c.regs.edx >>> 0;
  regs.ebx = c.regs.ebx >>> 0;
  regs.esi = c.regs.esi >>> 0;
  regs.edi = c.regs.edi >>> 0;
  regs.ebp = c.regs.ebp >>> 0;
  regs.eax = FUN_004314ed(heap) >>> 0;
  c.regs.eax = regs.eax >>> 0;
  c.regs.ecx = regs.ecx >>> 0;
  c.regs.edx = regs.edx >>> 0;
  c.regs.ebx = regs.ebx >>> 0;
  c.regs.esi = regs.esi >>> 0;
  c.regs.edi = regs.edi >>> 0;
  c.regs.ebp = regs.ebp >>> 0;
}

// Interp leg: clear our hook, step the real bytes to the body's `ret`
// (0x43150f) WITHOUT executing it, then reinstall. The post-hook ret in
// runFunction then consumes the caller's address, identical to the JS path.
function runInterp(c) {
  const self = getEipHook(0x4314ed);
  clearEipHook(0x4314ed);
  const limit = globalThis.__painterStepLimit || 50_000_000;
  try {
    c.regs.eip = 0x4314ed;
    let n = 0;
    while ((c.regs.eip >>> 0) !== RET_ADDR) {
      if (!step(c) || ++n > limit) break;
    }
  } finally {
    setEipHook(0x4314ed, self);
  }
}

setEipHook(0x4314ed, function lockstep(c) {
  calls++;
  save.set(bytes);
  const r0 = snapRegs(c);

  // --- leg A: JS body (or, with AB_CONTROL=1, a second interpreter run) ---
  setRegs(c, r0);
  let jsThrew = null;
  try {
    if (process.env.AB_CONTROL) runInterp(c);
    else runJS(c);
  } catch (e) { jsThrew = e; }
  afterJS.set(bytes);
  const rJS = snapRegs(c);

  // --- restore, then leg B: interpreter truth (left live) ---
  bytes.set(save);
  setRegs(c, r0);
  runInterp(c);
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
  if ((firstDiffs.length || jsThrew || (rJS.eax >>> 0) !== (rIN.eax >>> 0)) && reported < 8) {
    reported++;
    console.log(`--- MISMATCH call#${calls} entry: eax=${(r0.eax >>> 0).toString(16)} edx=${(r0.edx >>> 0).toString(16)} esi=${(r0.esi >>> 0).toString(16)} | [87c3dc]=${heap.u32(0x87c3dc).toString(16)} [87c3e0]=${heap.u32(0x87c3e0).toString(16)}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 6).join(" | ")}`);
    if ((rJS.eax >>> 0) !== (rIN.eax >>> 0)) console.log(`    eax js=${(rJS.eax >>> 0).toString(16)} in=${(rIN.eax >>> 0).toString(16)} (ax js=${(rJS.eax & 0xffff).toString(16)} in=${(rIN.eax & 0xffff).toString(16)})`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
  }
  // c is left in the interpreter-truth state (leg B); runFunction simulates
  // one ret after we return, identical to the production crossing.
});

const TICKS = parseInt(process.env.TICKS || "8", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} eaxMis=${eaxMis} regMisInfo=${regMisInfo}`);
