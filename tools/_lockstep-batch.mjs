#!/usr/bin/env node
// tools/_lockstep-batch.mjs — BATCH differential oracle + wiring generator
// (ADDENDUM 83). Validates MANY auto-translations against the interpreter in
// ONE soak instead of one 20-40s boot per address.
//
//   node tools/_lockstep-batch.mjs                      # auto-discover
//   ADDRS=0x412345,0x423456 node tools/_lockstep-batch.mjs
//   WARMUP=6 TICKS=30 ROTATE=n POKE=... as in _lockstep-auto.mjs
//
// Phase 1 (discovery, unless ADDRS given): soak WARMUP ticks with the
// harness's __fnSteps accounting on, rank runFunction entries, and keep
// addresses that (a) do real interp work (steps/call > 1), (b) have NO
// production eip hook yet, (c) have a ported/auto/<hex>.js exporting
// FUN_00<hex>, and (d) are NOT interpreter-delegates (module source contains
// "INTERPRETER-DELEGATED" — comparing those against the interpreter is
// vacuous by construction, see ADDENDUM 74).
//
// Phase 2 (batch lockstep): install a comparison hook on EVERY candidate at
// once. Per crossing: snapshot heap+regs, run the JS leg (fold a numeric
// return into eax — the ADDENDUM 67 convention), snapshot, restore, run the
// interpreter leg (stop AT the top-level ret, eip reset first — the
// ADDENDUM 62/64 oracle-integrity rules), diff whole heap minus the stack
// carve + eax, keep the INTERPRETER result live.
//
// NESTING SEMANTICS (differs from the single-addr tool, by design): while one
// comparison is in flight, crossings of OTHER wrapped addresses run the
// interpreter leg only, uncompared (`skipped` column). Both legs of the
// outer comparison therefore see identical (interpreter) callee behaviour,
// so the differential stays sound for the OUTER fn's own logic.
//
// Phase 3: report table + ready-to-paste installJsFnEipHook lines for the
// clean ones. memMis==0 && eaxMis==0 && compared>0 is the bar; NOT-REACHED
// candidates are listed for coverage work (POKE/ROTATE variants).

import { readFileSync, existsSync } from "node:fs";
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
const { regs } = await import("../runtime/regs.js");

const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs, exeBytes: readFileSync(resolve(ROOT, "binary/rct.exe")) });
const heap = r.heap;
const bytes = heap.bytes;
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(heap); enterScenarioPlay(heap);

// canonical ROTATE (same as _lockstep-auto / _soakhash), then POKE after it
const ROTATE = parseInt(process.env.ROTATE || "0", 10) & 3;
if (ROTATE) {
  let cpu = null; const CAP = 0x5da274; const prevCap = getEipHook(CAP);
  setEipHook(CAP, function (c) { cpu = c; return prevCap ? prevCap(c) : undefined; });
  try { r.runTick(); } catch {}
  if (prevCap) setEipHook(CAP, prevCap); else clearEipHook(CAP);
  let mainWin = 0;
  const listEnd = heap.u32(0x009a1164) >>> 0;
  for (let w = 0x009a013c; w < listEnd; w += 0x178) if (heap.u8(w + 0x174) === 0) { mainWin = w >>> 0; break; }
  if (!cpu || !mainWin) { console.log("ROTATE FAILED"); process.exit(1); }
  const stackTop = (bytes.byteLength - 0x800) >>> 0;
  for (let i = 0; i < ROTATE; i++) { cpu.regs.esi = mainWin;
    try { runFunction(cpu, 0x004340f5, { stackTop, limit: 50_000_000 }); } catch {} }
  try { r.runTick(); } catch {}
  console.log(`ROTATE: rotated ${ROTATE}x`);
}
for (const p of (process.env.POKE || "").split(",").filter((s) => s.length)) {
  const [lhs, rhs] = p.split("=");
  const [valStr, szStr] = rhs.split("/");
  const a = parseInt(lhs, 16) >>> 0, v = parseInt(valStr, 16) >>> 0, sz = szStr ? parseInt(szStr, 10) : 1;
  if (sz === 4) heap.setU32(a, v); else if (sz === 2) heap.setU16(a, v & 0xffff); else heap.setU8(a, v & 0xff);
  console.log(`  POKE [0x${a.toString(16)}] = 0x${v.toString(16)} (${sz}B)`);
}

// ---- Phase 1: discovery ----
let candidates = [];
if (process.env.ADDRS) {
  candidates = process.env.ADDRS.split(",").map((s) => parseInt(s, 16) >>> 0);
} else {
  const WARMUP = parseInt(process.env.WARMUP || "6", 10);
  globalThis.__fnSteps = new Map();
  for (let i = 0; i < WARMUP; i++) { try { r.runTick(); } catch {} }
  const rank = [...globalThis.__fnSteps].map(([addr, v]) => ({ addr, ...v }))
    .filter((e) => e.steps / Math.max(e.calls, 1) > 1)
    .sort((a, b) => b.steps - a.steps);
  globalThis.__fnSteps = undefined;
  console.log(`discovery: ${rank.length} real-work interp entries over ${WARMUP} ticks`);
  for (const e of rank) {
    const hex = e.addr.toString(16);
    const modPath = resolve(ROOT, "ported/auto", `${hex}.js`);
    const why = getEipHook(e.addr) ? "hooked already"
      : !existsSync(modPath) ? "no auto module"
      : readFileSync(modPath, "utf8").includes("INTERPRETER-DELEGATED") ? "interpreter-delegate (vacuous)"
      : null;
    console.log(`  0x${hex}  ${String(e.steps).padStart(7)} steps  ${String(e.calls).padStart(5)} calls  ${why ? "SKIP: " + why : "CANDIDATE"}`);
    if (!why) candidates.push(e.addr);
  }
}
if (candidates.length === 0) { console.log("no candidates — nothing to do"); process.exit(0); }

// ---- Phase 2: batch lockstep ----
const CMP_END = bytes.byteLength - 64 * 1024;
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);
let inside = false;
const stats = new Map(); // addr -> {calls, compared, skipped, memMis, eaxMis, jsThrew, firstDiff}
const fns = new Map();
for (const addr of candidates) {
  const hex = addr.toString(16);
  try {
    const mod = await import(`../ported/auto/${hex}.js`);
    const fn = mod[`FUN_00${hex}`] || mod[`FUN_${hex}`];
    if (typeof fn !== "function") { console.log(`0x${hex}: no FUN export — skipped`); continue; }
    fns.set(addr, fn);
  } catch (e) { console.log(`0x${hex}: import failed (${e.message.slice(0, 60)}) — skipped`); continue; }
  stats.set(addr, { calls: 0, compared: 0, skipped: 0, memMis: 0, eaxMis: 0, jsThrew: 0, firstDiff: null });
}

const runInterpLeg = (c, addr) => {
  const self = getEipHook(addr);
  if (self) clearEipHook(addr);
  const entryEsp = c.regs.esp >>> 0;
  c.regs.eip = addr >>> 0;               // ADDENDUM 67: leg A clobbers eip
  let n = 0;
  try {
    while (true) {
      const esp = c.regs.esp >>> 0, eip = c.regs.eip >>> 0;
      if (esp === entryEsp && eip < bytes.length) {
        const op = bytes[eip];
        if (op === 0xc3 || op === 0xc2) break;   // stop AT the top-level ret
      }
      if (!step(c) || ++n > 50_000_000) break;
    }
  } finally { if (self) setEipHook(addr, self); }
};

for (const addr of fns.keys()) {
  const st = stats.get(addr);
  const jsFn = fns.get(addr);
  setEipHook(addr, function batchLockstep(c) {
    st.calls++;
    if (inside) { st.skipped++; runInterpLeg(c, addr); return; }
    inside = true;
    try {
      save.set(bytes);
      const r0 = { eax: c.regs.eax >>> 0, ecx: c.regs.ecx >>> 0, edx: c.regs.edx >>> 0,
        ebx: c.regs.ebx >>> 0, esi: c.regs.esi >>> 0, edi: c.regs.edi >>> 0,
        ebp: c.regs.ebp >>> 0, esp: c.regs.esp >>> 0 };
      // leg A: JS
      regs.eax = r0.eax; regs.ecx = r0.ecx; regs.edx = r0.edx; regs.ebx = r0.ebx;
      regs.esi = r0.esi; regs.edi = r0.edi; regs.ebp = r0.ebp; regs.esp = r0.esp;
      let jsEax = 0, threw = false;
      try {
        const ret = jsFn(heap);
        if (typeof ret === "number") regs.eax = ret >>> 0;
        jsEax = regs.eax >>> 0;
      } catch { threw = true; st.jsThrew++; }
      afterJS.set(bytes);
      // restore, leg B: interp truth, LEFT LIVE
      bytes.set(save);
      c.regs.eax = r0.eax; c.regs.ecx = r0.ecx; c.regs.edx = r0.edx; c.regs.ebx = r0.ebx;
      c.regs.esi = r0.esi; c.regs.edi = r0.edi; c.regs.ebp = r0.ebp; c.regs.esp = r0.esp;
      runInterpLeg(c, addr);
      st.compared++;
      if (!threw) {
        if (jsEax !== (c.regs.eax >>> 0)) st.eaxMis++;
        for (let i = 0; i < CMP_END; i++) {
          if (afterJS[i] !== bytes[i]) {
            st.memMis++;
            if (!st.firstDiff) st.firstDiff = `0x${i.toString(16)}: js=${afterJS[i].toString(16)} in=${bytes[i].toString(16)}`;
            break;                       // one memMis per crossing is enough
          }
        }
      }
    } finally { inside = false; }
  });
}

const TICKS = parseInt(process.env.TICKS || "30", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${(e.message || e).toString().slice(0, 60)}`); } }
for (const addr of fns.keys()) clearEipHook(addr);

// ---- Phase 3: report ----
console.log(`\naddr        calls  compared  skipped  memMis  eaxMis  jsThrew  verdict`);
console.log(`--------------------------------------------------------------------------`);
const green = [];
for (const [addr, st] of stats) {
  const verdict = st.compared === 0 ? "NOT-REACHED"
    : (st.memMis === 0 && st.eaxMis === 0 && st.jsThrew === 0) ? "CLEAN" : "BROKEN";
  if (verdict === "CLEAN") green.push(addr);
  console.log(`0x${addr.toString(16).padEnd(8)} ${String(st.calls).padStart(6)} ${String(st.compared).padStart(9)} ${String(st.skipped).padStart(8)} ${String(st.memMis).padStart(7)} ${String(st.eaxMis).padStart(7)} ${String(st.jsThrew).padStart(8)}  ${verdict}${st.firstDiff ? "   first: " + st.firstDiff : ""}`);
}
if (green.length) {
  console.log(`\n// ready-to-paste wiring for the CLEAN set (verify each import path):`);
  for (const addr of green) {
    const hex = addr.toString(16);
    console.log(`import { FUN_00${hex} } from "../ported/auto/${hex}.js";`);
  }
  for (const addr of green) {
    const hex = addr.toString(16);
    console.log(`  installJsFnEipHook(0x${hex}, FUN_00${hex}, "__forceInterp${hex}", "warn");`);
  }
}
