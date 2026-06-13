#!/usr/bin/env node
// Per-call lockstep oracle for the 0x421d2c terrain-surface painter port.
//
// 0x421d2c is an eip-hook on the bridge cpu (installed by install421d2cHook),
// NOT a state.fnDispatch entry — so this tool wraps the eip-hook itself (the
// same entry the production render path reaches via the 4368d8 per-element
// dispatch).
//
// For every hook fire during a scenario-play soak: snapshot the whole heap +
// the bridge cpu's entry registers, run the REAL JS hook (paintBody421d2c +
// its fallbacks), capture; restore heap+regs; run the FULL BINARY body via
// the interpreter (hook cleared) from identical entry state; compare the
// whole heap (minus the bridge cpu's 64 KB stack carve) + exit registers,
// and keep the INTERPRETER result live.
//
//   TICKS=8 node tools/_lockstep-421d2c.mjs
//
// memMis is the gate; it must be 0. regMis* are informational (the binary's
// epilogue restores caller-saved registers; the production caller is the
// 4368d8 dispatch loop, which discards the painter's scratch registers).
//
// This is the BEFORE/AFTER oracle for the ADDENDUM 10 work: removing the 4
// per-tile interpreter crossings (calling paintBody420d9c/420f4c/420502/
// 42094b directly) must keep memMis=0, because the exact same JS runs either
// way (only the dispatch mechanism — direct call vs runFunction crossing —
// changes).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
// Silence the painter-bridge fallback warnings (start with "[").
const ow = console.warn;
console.warn = (...a) => { const s = String(a[0] ?? ""); if (/^\[/.test(s)) return; ow(...a); };

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");
const { setEipHook, clearEipHook, getEipHook, runFunction } = await import("../harness/x86.js");

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
const cpu = state.__painterCpu;
if (!cpu) { console.error("no bridge cpu"); process.exit(1); }

const bytes = heap.bytes;
const CMP_END = bytes.byteLength - 64 * 1024;   // exclude bridge stack carve
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);

const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
let calls = 0, memMis = 0, regMisInfo = 0, reported = 0;

const ADDR = 0x00421d2c;
const realHook = getEipHook(ADDR);
if (!realHook) { console.error("no 421d2c hook installed"); process.exit(1); }

function snapRegs() { const o = {}; for (const n of REGN) o[n] = cpu.regs[n] >>> 0; o.esp = cpu.regs.esp >>> 0; o.eip = cpu.regs.eip >>> 0; return o; }
function restoreRegs(o) { for (const n of REGN) cpu.regs[n] = o[n] >>> 0; cpu.regs.esp = o.esp >>> 0; cpu.regs.eip = o.eip >>> 0; }

const MAXCALLS = parseInt(process.env.MAXCALLS || "0", 10); // 0 = all
setEipHook(ADDR, function lockstep(c) {
  calls++;
  // After MAXCALLS deep checks, just run the JS hook (no interpreter leg) so
  // the soak advances ticks fast while keeping the heap on the JS chain.
  if (MAXCALLS && calls > MAXCALLS) { realHook(c); return; }
  save.set(bytes);
  const r0 = snapRegs();
  const cd0 = cpu.callDepth;

  // --- JS leg: run the real hook (mutates heap + cpu.regs, leaves esp/eip
  //     as the body restored them; the caller step() will simulate the ret) ---
  realHook(c);
  afterJS.set(bytes);
  const rJS = snapRegs();
  const cdJS = cpu.callDepth;

  // --- restore, run the FULL BINARY body (interpreter), truth stays live ---
  bytes.set(save);
  restoreRegs(r0);
  cpu.callDepth = cd0;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  const sESP = cpu.regs.esp >>> 0;
  clearEipHook(ADDR);
  try {
    runFunction(cpu, ADDR, { stackTop: sESP, limit: 8_000_000 });
  } catch (_) { /* tolerate */ } finally {
    setEipHook(ADDR, lockstep);
  }
  // runFunction reset esp/eip to its sentinel frame; restore the JS leg's
  // post-state esp/eip/callDepth so the outer caller's ret simulation is
  // consistent with what the JS hook would have left.
  cpu.regs.esp = rJS.esp >>> 0;
  cpu.regs.eip = rJS.eip >>> 0;
  cpu.callDepth = cdJS;
  const rIN = snapRegs();

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
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0));
  if (badR.length) regMisInfo++;
  if (firstDiffs.length && reported < 8) {
    reported++;
    const e = r0.esi >>> 0;
    console.log(`--- MISMATCH call#${calls} esi=${e.toString(16)} [esi+4]=${save[e + 4]?.toString(16)} [esi+5]=${save[e + 5]?.toString(16)} [esi+7]=${save[e + 7]?.toString(16)}`);
    console.log(`    entry: eax=${r0.eax.toString(16)} ecx=${r0.ecx.toString(16)} edx=${r0.edx.toString(16)} ebx=${r0.ebx.toString(16)} edi=${r0.edi.toString(16)} ebp=${r0.ebp.toString(16)}`);
    for (const d of firstDiffs) console.log(`    mem ${d}`);
    if (badR.length) console.log(`    (info) regs differing: ${badR.map((n) => `${n} js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`).join(", ")}`);
  }
});

const TICKS = parseInt(process.env.TICKS || "4", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} regMisInfo=${regMisInfo}`);
