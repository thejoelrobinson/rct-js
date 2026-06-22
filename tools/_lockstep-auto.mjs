#!/usr/bin/env node
// Parameterized differential test of ANY production auto-translation FUN_00<addr>
// (ported/auto/<addr>.js) vs the x86 interpreter, with REAL entry state captured
// during an enterScenarioPlay soak. This is the generalizable "test the path that
// ships" harness (ADDENDUM 29): the browser/production routes calls to the auto
// fns via _dispatch (no interpreter), so this is the only thing that measures
// whether the SHIPPING code is correct — with real entry state, unlike the
// synthetic-entry tools/diff-one.js (cf. project verify-fn-ceiling memory).
//
//   ADDR=0x5dcd40 TICKS=8 node tools/_lockstep-auto.mjs
//   ADDRS=0x5cfac7,0x5cfc50,0x5df40c TICKS=8 node tools/_lockstep-auto.mjs  # several, one per run reset
//
// For every crossing of <addr> during the soak: snapshot heap + entry regs, run
// the auto fn (pure JS, calls its JS callees), snapshot heap, restore, run the
// interpreter for <addr> (truth, left live), diff whole heap (minus the bridge
// stack carve) + eax. memMis is the gate. A re-entrancy guard makes the interp
// truth leg run un-wrapped if the fn recurses into the same addr.

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

const ADDR = parseInt(process.env.ADDR || "0x5dcd40", 16) >>> 0;
const hex = ADDR.toString(16);
const mod = await import(`../ported/auto/${hex}.js`);
const autoFn = mod[`FUN_00${hex}`] || mod[`FUN_${hex}`] || mod.default;
if (typeof autoFn !== "function") { console.log(`ADDR=0x${hex}: no auto fn export found (keys: ${Object.keys(mod).join(",")})`); process.exit(0); }

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

let calls = 0, memMis = 0, eaxMis = 0, jsThrew = 0, reported = 0, inside = false;

const snap = (c) => ({ eax: c.regs.eax >>> 0, ecx: c.regs.ecx >>> 0, edx: c.regs.edx >>> 0,
  ebx: c.regs.ebx >>> 0, esi: c.regs.esi >>> 0, edi: c.regs.edi >>> 0, ebp: c.regs.ebp >>> 0, esp: c.regs.esp >>> 0 });

// Run the interpreter for the function at ADDR to its ret (esp returns above the
// entry esp), un-hooked, from the current cpu state.
const runInterp = (c) => {
  const self = getEipHook(ADDR);
  clearEipHook(ADDR);
  const entryEsp = c.regs.esp >>> 0;   // [esp] holds the return address at entry
  const limit = 50_000_000;
  let n = 0;
  try {
    // Run from ADDR until the matching `ret` pops the return address, i.e. esp
    // rises above entryEsp. This works whether or not the function pushes early
    // (the previous two-loop logic exited after 1 step for non-pushing prologues).
    while ((c.regs.esp >>> 0) <= entryEsp) { if (!step(c) || ++n > limit) break; }
  } finally { setEipHook(ADDR, self); }
};

setEipHook(ADDR, function lockstepAuto(c) {
  if (inside) { runInterp(c); return; }       // re-entrancy guard
  inside = true;
  try {
    calls++;
    save.set(bytes);
    const r0 = snap(c);
    // --- leg A: auto fn ---
    regs.eax = r0.eax; regs.ecx = r0.ecx; regs.edx = r0.edx; regs.ebx = r0.ebx;
    regs.esi = r0.esi; regs.edi = r0.edi; regs.ebp = r0.ebp; regs.esp = r0.esp;
    let threw = null, jsEax = 0;
    try { autoFn(heap); jsEax = regs.eax >>> 0; } catch (e) { threw = e; jsThrew++; }
    afterJS.set(bytes);
    // --- restore, leg B: interp truth (left live) ---
    bytes.set(save);
    c.regs.eax = r0.eax; c.regs.ecx = r0.ecx; c.regs.edx = r0.edx; c.regs.ebx = r0.ebx;
    c.regs.esi = r0.esi; c.regs.edi = r0.edi; c.regs.ebp = r0.ebp; c.regs.esp = r0.esp;
    runInterp(c);
    const inEax = c.regs.eax >>> 0;
    // --- compare ---
    const a = Buffer.from(afterJS.buffer, 0, CMP_END);
    const b = Buffer.from(bytes.buffer, 0, CMP_END);
    let diffs = [];
    if (!a.equals(b)) { memMis++; for (let i = 0; i < CMP_END && diffs.length < 6; i++) if (afterJS[i] !== bytes[i]) diffs.push(`0x${i.toString(16)}:js=${afterJS[i].toString(16)}/in=${bytes[i].toString(16)}`); }
    if (jsEax !== inEax) eaxMis++;
    if ((diffs.length || threw) && reported < 4) { reported++; console.log(`  mis#${calls} esi=${r0.esi.toString(16)} jsEax=${jsEax.toString(16)} inEax=${inEax.toString(16)}${threw ? " THREW:" + (threw.message || threw).toString().slice(0, 80) : ""} ${diffs.join(" ")}`); }
  } finally { inside = false; }
});

const TICKS = parseInt(process.env.TICKS || "8", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); } }
const verdict = calls === 0 ? "NOT-REACHED" : memMis === 0 ? "OK" : "BROKEN";
console.log(`ADDR=0x${hex} ${verdict}: calls=${calls} memMis=${memMis} eaxMis=${eaxMis} jsThrew=${jsThrew}`);
