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
const { getEipHook, setEipHook, clearEipHook, step, runFunction } = await import("../harness/x86.js");
// FORCE=<globalName> — set a __forceInterp<hex> toggle before the runtime loads.
// Needed to lockstep a fn whose fnDispatch entry is already JS-wired: forcing
// the interp shim routes crossings back through the interpreter where this
// tool's eip hook instruments them (otherwise the JS wire bypasses the hook
// and the run reports NOT-REACHED).
if (process.env.FORCE) globalThis[process.env.FORCE] = true;
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
// POKE="addr=val[/size],..." — craft heap state after warm-up, before the
// soak; both legs see it identically (still a valid differential). Additive,
// mirrors tools/_invoke-diff.mjs. E.g. POKE="991f88=1/4" pins camera rot 1.
for (const p of (process.env.POKE || "").split(",").filter((s) => s.length)) {
  const [lhs, rhs] = p.split("=");
  const [valStr, szStr] = rhs.split("/");
  const a = parseInt(lhs, 16) >>> 0, v = parseInt(valStr, 16) >>> 0, sz = szStr ? parseInt(szStr, 10) : 1;
  if (sz === 4) r.heap.setU32(a, v); else if (sz === 2) r.heap.setU16(a, v & 0xffff); else r.heap.setU8(a, v & 0xff);
  console.log(`  POKE [0x${a.toString(16)}] = 0x${v.toString(16)} (${sz}B)`);
}
const heap = r.heap;
const bytes = heap.bytes;
const CMP_END = bytes.byteLength - 64 * 1024;
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);

// ROTATE=n — rotate the camera n times (0-3) BEFORE the soak by invoking the
// binary's real rotate handler FUN_004340f5 in the interpreter with esi = the
// main world window (class byte [w+0x174] == 0 in the window list 0x9a013c..
// [0x9a1164], stride 0x178 — the FUN_005e68e2 scan). A blunt POKE of the
// rotation byte [0x991f88] does NOT work: derived view state stays at rot 0
// and the paint pipeline finds nothing (verified — tools/_probe-rot.mjs).
// This exercises the rot-1..3 paint chains (0x436bc3/0x436c3d/0x436cb3),
// which run interp-natively and bypass fnDispatch (ADDENDUM 58 audit).
const ROTATE = parseInt(process.env.ROTATE || "0", 10) & 3;
if (ROTATE) {
  // capture the painter cpu via a briefly-hooked reliable address (the
  // _invoke-diff pattern).
  let cpu = null;
  const CAP = 0x5da274;
  const prevCap = getEipHook(CAP);
  setEipHook(CAP, function (c) { cpu = c; return prevCap ? prevCap(c) : undefined; });
  try { r.runTick(); } catch {}
  if (prevCap) setEipHook(CAP, prevCap); else clearEipHook(CAP);
  let mainWin = 0;
  const listEnd = heap.u32(0x009a1164) >>> 0;
  for (let w = 0x009a013c; w < listEnd; w += 0x178) {
    if (heap.u8(w + 0x174) === 0) { mainWin = w >>> 0; break; }
  }
  if (!cpu || !mainWin) {
    console.log(`ROTATE: FAILED (cpu=${!!cpu} mainWin=0x${mainWin.toString(16)}) — aborting`);
    process.exit(1);
  }
  const stackTop = (bytes.byteLength - 0x800) >>> 0;
  for (let i = 0; i < ROTATE; i++) {
    cpu.regs.esi = mainWin;
    try { runFunction(cpu, 0x004340f5, { stackTop, limit: 50_000_000 }); }
    catch (e) { console.log(`ROTATE: rotate ${i} threw ${(e.message || e).toString().slice(0, 80)}`); }
  }
  try { r.runTick(); } catch {}   // let one tick settle the rotated state
  console.log(`ROTATE: rotated ${ROTATE}x, [0x991f88] = ${heap.u32(0x00991f88)}`);
}

let calls = 0, memMis = 0, eaxMis = 0, jsThrew = 0, reported = 0, inside = false;
// Non-scratch exit-register mismatches (informational, like eaxMis). esi/edi/ebp/ebx
// are callee-saved OR explicit register in/out params — a caller relies on them, so a
// mismatch here flags a dropped register write-back (the F2 unaff_REG bug class) that
// memMis (heap-only) cannot see. eax/ecx/edx are scratch and stay informational/ignored.
// ecx is informational too: it is scratch for most functions (nonzero here is benign)
// but IS the return value for the cx/ecx-returning helpers (e.g. measureStringWidth).
let ecxMis = 0, esiMis = 0, ediMis = 0, ebpMis = 0, ebxMis = 0;

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
    const jsExit = threw ? null : { ecx: regs.ecx >>> 0, esi: regs.esi >>> 0, edi: regs.edi >>> 0, ebp: regs.ebp >>> 0, ebx: regs.ebx >>> 0 };
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
    let regDiffs = [];
    if (jsExit) {
      if (jsExit.ecx !== (c.regs.ecx >>> 0)) { ecxMis++; regDiffs.push(`ecx:js=${jsExit.ecx.toString(16)}/in=${(c.regs.ecx >>> 0).toString(16)}`); }
      if (jsExit.esi !== (c.regs.esi >>> 0)) { esiMis++; regDiffs.push(`esi:js=${jsExit.esi.toString(16)}/in=${(c.regs.esi >>> 0).toString(16)}`); }
      if (jsExit.edi !== (c.regs.edi >>> 0)) { ediMis++; regDiffs.push(`edi:js=${jsExit.edi.toString(16)}/in=${(c.regs.edi >>> 0).toString(16)}`); }
      if (jsExit.ebp !== (c.regs.ebp >>> 0)) { ebpMis++; regDiffs.push(`ebp:js=${jsExit.ebp.toString(16)}/in=${(c.regs.ebp >>> 0).toString(16)}`); }
      if (jsExit.ebx !== (c.regs.ebx >>> 0)) { ebxMis++; regDiffs.push(`ebx:js=${jsExit.ebx.toString(16)}/in=${(c.regs.ebx >>> 0).toString(16)}`); }
    }
    if ((diffs.length || threw || regDiffs.length) && reported < 4) { reported++; console.log(`  mis#${calls} esi=${r0.esi.toString(16)} jsEax=${jsEax.toString(16)} inEax=${inEax.toString(16)}${threw ? " THREW:" + (threw.message || threw).toString().slice(0, 80) : ""} ${diffs.join(" ")}${regDiffs.length ? " | " + regDiffs.join(" ") : ""}`); }
  } finally { inside = false; }
});

const TICKS = parseInt(process.env.TICKS || "8", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); } }
const verdict = calls === 0 ? "NOT-REACHED" : memMis === 0 ? "OK" : "BROKEN";
const regMisStr = (ecxMis || esiMis || ediMis || ebpMis || ebxMis) ? ` regMis[ecx=${ecxMis} esi=${esiMis} edi=${ediMis} ebp=${ebpMis} ebx=${ebxMis}]` : "";
console.log(`ADDR=0x${hex} ${verdict}: calls=${calls} memMis=${memMis} eaxMis=${eaxMis} jsThrew=${jsThrew}${regMisStr}`);
