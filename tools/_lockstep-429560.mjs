#!/usr/bin/env node
// Per-call lockstep oracle for the 0x429560 award-scan (award block 0:
// "tidiest park") port. For every dispatch during an enterScenarioPlay
// soak: run the JS body AND the interpreter (the original binary bytes)
// from identical entry state, compare the WHOLE HEAP (minus the bridge
// cpu's 64 KB stack carve) + exit registers, report the first
// divergences, and keep the INTERPRETER result live.
//
// 0x429560 is reached from inside the interpreter via the award
// dispatcher 0x429502's `jmp [ebx*4 + 0x429544]`, where ebx = the award
// index (0 for this block). The painter bridge installs an eip hook /
// fnDispatch shim at 0x429560; this tool wraps that fnDispatch entry, so
// every interpreter crossing into the block is intercepted here.
//
//   TICKS=8 node tools/_lockstep-429560.mjs
//   AB_CONTROL=1 ...   # interp-vs-interp control (must be memMis=0)
//
// memMis is the gate; it must be 0. eax/regMis are informational (the
// award block returns void; callers don't consume its registers — it is
// the tail of an interpreter dispatch that just rets).

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
const { FUN_extra_award_429560 } = await import("../ported/auto/extra_award_429560.js");

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

const wrapper = state.fnDispatch.get(0x429560);
state.fnDispatch.set(0x429560, function lockstep(h) {
  calls++;
  save.set(bytes);
  const r0 = { ...regs };

  // --- JS body (or, with AB_CONTROL=1, a second interpreter run) ---
  let retJS, jsThrew = null;
  if (process.env.AB_CONTROL) {
    globalThis.__forceInterp429560 = true;
    try { retJS = wrapper(h); } finally { globalThis.__forceInterp429560 = false; }
  } else {
    try { retJS = FUN_extra_award_429560(h); } catch (e) { jsThrew = e; }
  }
  afterJS.set(bytes);
  const rJS = { ...regs };

  // --- restore, then interpreter (truth stays live) ---
  bytes.set(save);
  Object.assign(regs, r0);
  globalThis.__forceInterp429560 = true;
  let retIN;
  try { retIN = wrapper(h); } finally { globalThis.__forceInterp429560 = false; }
  const rIN = { ...regs };

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
  const eaxBad = ((rJS.eax) >>> 0) !== ((rIN.eax) >>> 0);
  if (eaxBad) eaxMis++;
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
  if (badR.length) regMisInfo++;
  if ((firstDiffs.length || jsThrew) && reported < 8) {
    reported++;
    console.log(`--- MISMATCH call#${calls} entry: eax=${(r0.eax >>> 0).toString(16)} ebx=${(r0.ebx >>> 0).toString(16)} ecx=${(r0.ecx >>> 0).toString(16)} edx=${(r0.edx >>> 0).toString(16)} esi=${(r0.esi >>> 0).toString(16)} edi=${(r0.edi >>> 0).toString(16)} ebp=${(r0.ebp >>> 0).toString(16)}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 5).join(" | ")}`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
  }
});

const TICKS = parseInt(process.env.TICKS || "8", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} eaxMis=${eaxMis} regMisInfo=${regMisInfo}`);
