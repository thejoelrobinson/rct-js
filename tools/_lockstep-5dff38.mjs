#!/usr/bin/env node
// Per-call lockstep oracle for the 0x5dff38 corner-fence painter port.
// JS body vs interpreter from identical entry state, comparing the
// write-set + exit registers per call; keeps the interpreter result live.
// The inner 432204 dispatches run the JS port on BOTH sides (the eip hooks
// stay installed for the interpreter run), isolating 5dff38's own logic.
//
//   TICKS=3 node tools/_lockstep-5dff38.mjs

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
const { paintBody5dff38 } = await import("../ported/auto/extra_paint_5dff38.js");

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

const ADDR = 0x5dff38;
const RANGES = () => {
  const head = heap.u32(0x5f96e8) >>> 0;
  return [
    ["slots", head, 0x100],          // up to 4 fresh 0x30-byte slots
    ["parent", 0x628928, 4],
    ["anchor", 0x6288fc, 4],
    ["allocHead", 0x5f96e8, 4],
    ["bktMinMax", 0x6288ec, 8],
    ["bktTable", 0x6284ec, 0x400],
    ["f78", 0x991f78, 1],
    ["f80", 0x991f80, 2],
    ["fba0", 0x99fba0, 4],
    ["a4e8", 0x99a4e8, 6],
  ];
};
const snap = (rg) => rg.map(([, a, n]) => heap.bytes.slice(a, a + n));
const restore = (rg, s) => rg.forEach(([, a, n], i) => heap.bytes.set(s[i], a));
const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
const FLAGN = ["CF", "ZF", "SF", "OF"];

let calls = 0, memMis = 0, regMis = 0, flagMis = 0, reported = 0;
const lockstep = (cpu) => {
  calls++;
  const rg = RANGES();
  const s0 = snap(rg);
  const r0 = { ...cpu.regs };
  const f0 = { ...cpu.eflags };

  paintBody5dff38(heap, cpu);
  const sJS = snap(rg);
  const rJS = { ...cpu.regs };
  const fJS = { ...cpu.eflags };

  restore(rg, s0);
  Object.assign(cpu.regs, r0);
  Object.assign(cpu.eflags, f0);
  const savedESP = cpu.regs.esp >>> 0;
  const savedEIP = cpu.regs.eip >>> 0;
  const savedCD = cpu.callDepth;
  clearEipHook(ADDR);
  try { runFunction(cpu, ADDR, { stackTop: savedESP, limit: 5_000_000 }); }
  catch (e) { console.log(`interp threw: ${e.message}`); }
  finally { setEipHook(ADDR, lockstep); }
  cpu.regs.esp = savedESP;
  cpu.regs.eip = savedEIP;
  cpu.callDepth = savedCD;
  const sIN = snap(rg);
  const rIN = { ...cpu.regs };
  const fIN = { ...cpu.eflags };

  let bad = [];
  rg.forEach(([name, a], i) => {
    const x = sJS[i], y = sIN[i];
    for (let j = 0; j < x.length; j++) if (x[j] !== y[j]) bad.push(`${name}+0x${j.toString(16)}: js=${x[j].toString(16)} in=${y[j].toString(16)} (addr 0x${(a + j).toString(16)})`);
  });
  const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0)).map((n) => `${n}: js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`);
  const badF = FLAGN.filter((n) => (fJS[n] | 0) !== (fIN[n] | 0)).map((n) => `${n}: js=${fJS[n]} in=${fIN[n]}`);
  if (bad.length) memMis++;
  if (badR.length) regMis++;
  if (badF.length) flagMis++;
  if ((bad.length || badR.length || badF.length) && reported < 6) {
    reported++;
    console.log(`--- MISMATCH call#${calls} entry: ` + REGN.map((n) => `${n}=${(r0[n] >>> 0).toString(16)}`).join(" "));
    console.log(`    el: [esi]=${heap.u8(r0.esi).toString(16)} [esi+4]=${heap.u8(r0.esi + 4).toString(16)} [esi+5]=${heap.u8(r0.esi + 5).toString(16)} [esi+6..7]=${heap.u16(r0.esi + 6).toString(16)}`);
    for (const b of bad.slice(0, 12)) console.log(`    mem ${b}`);
    for (const b of badR) console.log(`    reg ${b}`);
    for (const b of badF) console.log(`    flag ${b}`);
  }
};
setEipHook(ADDR, lockstep);

const TICKS = parseInt(process.env.TICKS || "3", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} regMis=${regMis} flagMis=${flagMis}`);
