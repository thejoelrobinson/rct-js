#!/usr/bin/env node
// Differential test of the PRODUCTION auto-translation FUN_005dbeeb
// (ported/auto/5dbeeb.js) vs the x86 interpreter — i.e. "is the browser/production
// path for 0x5dbeeb correct?". Production (web/main-native.js) has NO interpreter
// and routes 0x5dbeeb -> FUN_005dbeeb via _dispatch.js; this never gets exercised
// by the hybrid lockstep (_lockstep-5dbeeb.mjs tests the __enable5dbeeb hybrid,
// not the auto fn). So this tool answers the real-goal question separately.
//
// For every 0x5dbeeb crossing during an enterScenarioPlay soak: snapshot heap +
// entry regs, run the AUTO fn FUN_005dbeeb(heap) (pure JS, calls its JS callees),
// snapshot heap, restore, run the interpreter (truth, left live), and diff the
// whole heap (minus the bridge stack carve) + eax. memMis is the gate.
//
//   TICKS=8 node tools/_lockstep-5dbeeb-auto.mjs
//
// NOTE: the auto fn modifies `regs` and the heap directly; it does not return a
// checkpoint. eax is the contract output (the mode flags). A JS throw (unported
// callee / runaway caught by the step budget) is counted and reported.

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
const { regs } = await import("../runtime/regs.js");
const { FUN_005dbeeb } = await import("../ported/auto/5dbeeb.js");

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
const CMP_END = bytes.byteLength - 64 * 1024;
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);

let calls = 0, memMis = 0, eaxMis = 0, jsThrew = 0, reported = 0;
const typeHist = {};

const prodHook = getEipHook(0x5dbeeb);   // the painter-bridge hook (forced-interp leg below)

const snapRegs = (c) => ({
  eax: c.regs.eax >>> 0, ecx: c.regs.ecx >>> 0, edx: c.regs.edx >>> 0,
  ebx: c.regs.ebx >>> 0, esi: c.regs.esi >>> 0, edi: c.regs.edi >>> 0,
  ebp: c.regs.ebp >>> 0, esp: c.regs.esp >>> 0,
});

setEipHook(0x5dbeeb, function lockstepAuto(c) {
  calls++;
  const type = bytes[(c.regs.esi >>> 0) + 0x31];
  typeHist[type] = (typeHist[type] || 0) + 1;
  save.set(bytes);
  const r0 = snapRegs(c);

  // --- leg A: the production auto fn FUN_005dbeeb(heap) ---
  regs.eax = r0.eax; regs.ecx = r0.ecx; regs.edx = r0.edx; regs.ebx = r0.ebx;
  regs.esi = r0.esi; regs.edi = r0.edi; regs.ebp = r0.ebp; regs.esp = r0.esp;
  let threw = null, jsEax = 0;
  try {
    const limit = globalThis.__autoStepBudget || 5_000_000;
    let n = 0; const t0 = regs; void t0; void n; void limit; // (budget is inside the auto chain; we just catch)
    FUN_005dbeeb(heap);
    jsEax = regs.eax >>> 0;
  } catch (e) { threw = e; jsThrew++; }
  afterJS.set(bytes);

  // --- restore, then leg B: interpreter truth (left live) ---
  bytes.set(save);
  c.regs.eax = r0.eax; c.regs.ecx = r0.ecx; c.regs.edx = r0.edx; c.regs.ebx = r0.ebx;
  c.regs.esi = r0.esi; c.regs.edi = r0.edi; c.regs.ebp = r0.ebp; c.regs.esp = r0.esp;
  globalThis.__forceInterp5dbeeb = true;
  try { prodHook(c); } finally { globalThis.__forceInterp5dbeeb = false; }
  const inEax = c.regs.eax >>> 0;

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
  if (jsEax !== inEax) eaxMis++;
  if ((firstDiffs.length || threw || jsEax !== inEax) && reported < 8) {
    reported++;
    console.log(`--- MISMATCH call#${calls} type=${type} esi=${r0.esi.toString(16)} jsEax=${jsEax.toString(16)} inEax=${inEax.toString(16)}`);
    if (threw) console.log(`    JS THREW: ${(threw.stack || threw.message || threw).toString().split("\n").slice(0, 4).join(" | ")}`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
  }
});

const TICKS = parseInt(process.env.TICKS || "8", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
const th = Object.entries(typeHist).map(([k, v]) => `${k}:${v}`).join(" ");
console.log(`calls=${calls} memMis=${memMis} eaxMis=${eaxMis} jsThrew=${jsThrew}  types[${th}]`);
