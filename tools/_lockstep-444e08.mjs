#!/usr/bin/env node
// Per-call lockstep oracle for the 0x444e08 wall-painter port.
// For every call during a scenario-play soak: run the JS body AND the
// interpreter from identical entry state, compare the write-set + exit
// registers + flags, report the first divergences, and keep the
// INTERPRETER result live (so the chain continues on truth).
// Fallback calls (door cases / banner / shade-overlay — paintBody returns
// false) are not compared (the production path runs them in the
// interpreter anyway); they are counted per reason.
//
//   TICKS=2 node tools/_lockstep-444e08.mjs

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
const { setEipHook, clearEipHook, runFunction } = await import("../harness/x86.js");
const { paintBody444e08 } = await import("../ported/auto/extra_paint_444e08.js");

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

const RANGES = () => {
  const head = heap.u32(0x5f96e8) >>> 0;
  return [
    ["slots", head, 0x30 * 64],
    ["parent", 0x628928, 4],
    ["anchor", 0x6288fc, 4],
    ["allocHead", 0x5f96e8, 4],
    ["bktMinMax", 0x6288ec, 8],
    ["bktTable", 0x6284ec, 0x400],
    ["b2c", 0x630b2c, 4],
    ["c40", 0x630c40, 2],
    ["f00", 0x991f00, 0x94],
    ["a4e8", 0x99a4e8, 8],
    ["rings", 0x999f9a, 0x250],
    ["ctr", 0x99c165, 2],
    ["sup", 0x5f4949, 1],
  ];
};
const snap = (rg) => rg.map(([, a, n]) => heap.bytes.slice(a, a + n));
const restore = (rg, s) => rg.forEach(([, a, n], i) => heap.bytes.set(s[i], a));
const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
const FLAGN = ["CF", "ZF", "SF", "OF"];

let calls = 0, memMis = 0, regMis = 0, flagMis = 0, reported = 0;
const fallbacks = { door: 0, banner: 0, shade: 0 };
const ADDR = 0x00444e08;

const lockstep = (cpu) => {
  // Entry fallback classification (mirrors paintBody444e08's predicates).
  const esi0 = cpu.regs.esi >>> 0;
  const e4 = heap.u8(esi0 + 4);
  const e5 = heap.u8(esi0 + 5);
  const dpi = heap.u32(0x981ef8) >>> 0;
  const zoom = heap.u16(dpi + 0xe);
  const f8c = heap.u16(0x991f8c);
  const runInterp = () => {
    const savedESP = cpu.regs.esp >>> 0;
    const savedEIP = cpu.regs.eip >>> 0;
    const savedCD = cpu.callDepth;
    clearEipHook(ADDR);
    try { runFunction(cpu, ADDR, { stackTop: savedESP, limit: 50_000_000 }); }
    catch (e) { console.log(`interp threw: ${e.message}`); }
    finally { setEipHook(ADDR, lockstep); }
    cpu.regs.esp = savedESP;
    cpu.regs.eip = savedEIP;
    cpu.callDepth = savedCD;
  };
  if ((f8c & 0x40) !== 0 && zoom === 0) { fallbacks.shade++; runInterp(); return; }
  if (zoom <= 1 && (e5 & 0xf) !== 0) { fallbacks.door++; runInterp(); return; }
  if (zoom <= 1 && (e4 & 0xf0) === 0 && (e4 & 8) !== 0) { fallbacks.banner++; runInterp(); return; }

  calls++;
  const rg = RANGES();
  const s0 = snap(rg);
  const r0 = { ...cpu.regs };
  const f0 = { ...cpu.eflags };

  // --- JS body ---
  const jsESP = cpu.regs.esp >>> 0;
  const jsEIP = cpu.regs.eip >>> 0;
  const jsCD = cpu.callDepth;
  let jsThrew = null;
  try { paintBody444e08(heap, cpu, runFunction); }
  catch (e) { jsThrew = e; }
  cpu.regs.esp = jsESP;
  cpu.regs.eip = jsEIP;
  cpu.callDepth = jsCD;
  const sJS = snap(rg);
  const rJS = { ...cpu.regs };
  const fJS = { ...cpu.eflags };

  // --- restore, then interpreter (truth stays live) ---
  restore(rg, s0);
  Object.assign(cpu.regs, r0);
  Object.assign(cpu.eflags, f0);
  runInterp();
  const sIN = snap(rg);
  const rIN = { ...cpu.regs };
  const fIN = { ...cpu.eflags };

  // --- compare ---
  let bad = [];
  rg.forEach(([name, a], i) => {
    const x = sJS[i], y = sIN[i];
    for (let j = 0; j < x.length; j++) {
      if (x[j] !== y[j]) bad.push(`${name}+0x${j.toString(16)}: js=${x[j].toString(16)} in=${y[j].toString(16)} (addr 0x${(a + j).toString(16)})`);
    }
  });
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0)).map((n) => `${n}: js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`);
  const badF = FLAGN.filter((n) => (fJS[n] | 0) !== (fIN[n] | 0)).map((n) => `${n}: js=${fJS[n]} in=${fIN[n]}`);
  if (bad.length) memMis++;
  if (badR.length) regMis++;
  if (badF.length) flagMis++;
  if ((bad.length || badR.length || badF.length || jsThrew) && reported < 8) {
    reported++;
    console.log(`--- MISMATCH call#${calls} entry: ` + REGN.map((n) => `${n}=${(r0[n] >>> 0).toString(16)}`).join(" "));
    console.log(`    e4=${e4.toString(16)} e5=${e5.toString(16)} e6=${heap.u8(esi0 + 6).toString(16)} f8c=${f8c.toString(16)} f84=${heap.u16(0x991f84).toString(16)} zoom=${zoom}`);
    if (jsThrew) console.log(`    JS THREW: ${jsThrew.stack?.split("\n").slice(0, 3).join(" | ")}`);
    for (const b of bad.slice(0, 16)) console.log(`    mem ${b}`);
    for (const b of badR) console.log(`    reg ${b}`);
    for (const b of badF) console.log(`    flag ${b}`);
  }
};
setEipHook(ADDR, lockstep);

const TICKS = parseInt(process.env.TICKS || "2", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} regMis=${regMis} flagMis=${flagMis} fallbacks=${JSON.stringify(fallbacks)}`);
