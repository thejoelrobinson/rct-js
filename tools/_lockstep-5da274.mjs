#!/usr/bin/env node
// Per-call lockstep oracle for FUN_005da274 — the ride/vehicle per-sprite
// update (vtable slot 4 of PTR_LAB_005d97b4, ~330 interp steps/call), the
// top remaining interpreter consumer by total. For every dispatch during an
// enterScenarioPlay soak: run the JS body AND the interpreter (the original
// binary bytes) from identical entry state, compare the WHOLE HEAP (minus
// the bridge cpu's 64 KB stack carve) + exit registers, report the first
// divergences, and keep the INTERPRETER result live. memMis is the gate.
//
// 0x5da274 is reached from inside the interpreter via the sprite-update walk
// at 0x5d952c (`call dword [edi*4 + 0x5d97b4]`, edi=4). The painter bridge
// installs an EIP HOOK at 0x5da274. This tool REPLACES that hook with a
// lockstep wrapper: the harness calls us with the live bridge cpu at the
// crossing; we run the JS leg (snapshot heap), restore, run the interpreter
// leg (production forced-interp path, left live), and diff. The production
// hook + its __forceInterp5da274 leg are captured before we override.
//
//   TICKS=8 node tools/_lockstep-5da274.mjs
//   AB_CONTROL=1 ...   # interp-vs-interp control (must be memMis=0)
//
// memMis is the gate; it must be 0. eax/regMis are informational — the
// function returns void to the dispatcher (exit registers dead).

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
const { getEipHook, setEipHook } = await import("../harness/x86.js");

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

// Capture the production hook (JS body + esp dance + forced-interp leg) BEFORE
// installing the lockstep wrapper at the same address.
const prodHook = getEipHook(0x5da274);

const snapRegs = (c) => ({
  eax: c.regs.eax >>> 0, ecx: c.regs.ecx >>> 0, edx: c.regs.edx >>> 0,
  ebx: c.regs.ebx >>> 0, esi: c.regs.esi >>> 0, edi: c.regs.edi >>> 0,
  ebp: c.regs.ebp >>> 0, esp: c.regs.esp >>> 0,
});
const setRegs = (c, s) => {
  c.regs.eax = s.eax >>> 0; c.regs.ecx = s.ecx >>> 0; c.regs.edx = s.edx >>> 0;
  c.regs.ebx = s.ebx >>> 0; c.regs.esi = s.esi >>> 0; c.regs.edi = s.edi >>> 0;
  c.regs.ebp = s.ebp >>> 0; c.regs.esp = s.esp >>> 0; c.regs.eip = 0x5da274;
};

setEipHook(0x5da274, function lockstep(c) {
  calls++;
  save.set(bytes);
  const r0 = snapRegs(c);

  // --- leg A: JS body (or, with AB_CONTROL=1, a second interpreter run) ---
  setRegs(c, r0);
  let jsThrew = null;
  if (process.env.AB_CONTROL) globalThis.__forceInterp5da274 = true;
  try { prodHook(c); } catch (e) { jsThrew = e; }
  finally { globalThis.__forceInterp5da274 = false; }
  afterJS.set(bytes);
  const rJS = snapRegs(c);

  // --- restore, then leg B: interpreter truth (left live) ---
  bytes.set(save);
  setRegs(c, r0);
  globalThis.__forceInterp5da274 = true;
  try { prodHook(c); } finally { globalThis.__forceInterp5da274 = false; }
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
    console.log(`--- MISMATCH call#${calls} entry: eax=${(r0.eax >>> 0).toString(16)} edx=${(r0.edx >>> 0).toString(16)} esi=${(r0.esi >>> 0).toString(16)} dl=${(r0.edx & 0xff).toString(16)} dh=${((r0.edx >>> 8) & 0xff).toString(16)}`);
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
