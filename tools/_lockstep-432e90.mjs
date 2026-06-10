#!/usr/bin/env node
// Per-call lockstep oracle for the 0x432204 paint-slot allocator port.
// For every call to one of the four rotation entries during a scenario-play
// soak: run the JS body AND the interpreter from identical entry state,
// compare the write-set + exit registers, report the first divergences,
// and keep the INTERPRETER result live (so the chain continues on truth).
//
//   TICKS=2 node tools/_lockstep-432e90.mjs

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
const { paintBody432204 } = await import("../ported/auto/extra_paint_432204.js");
const { state } = await import("../runtime/win32/context.js");

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
  const parent = heap.u32(0x628928) >>> 0;
  return [
    ["slot", head, 0x30],
    ["parentSlot", parent, 0x30],
    ["parent", 0x628928, 4],
    ["anchor", 0x6288fc, 4],
    ["allocHead", 0x5f96e8, 4],
    ["bktMinMax", 0x6288ec, 8],
    ["bktTable", 0x6284ec, 0x400],
  ];
};
const snap = (rg) => rg.map(([, a, n]) => heap.bytes.slice(a, a + n));
const restore = (rg, s) => rg.forEach(([, a, n], i) => heap.bytes.set(s[i], a));
const REGN = ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"];
const FLAGN = ["CF", "ZF", "SF", "OF"];

let calls = 0, memMis = 0, regMis = 0, flagMis = 0, reported = 0;
const variants = [[0x00432ea0, 0], [0x0043300a, 1], [0x00433180, 2], [0x004332f8, 3]];
for (const [addr, rot] of variants) {
  const lockstep = (cpu) => {
    calls++;
    const rg = RANGES();
    const s0 = snap(rg);
    const r0 = { ...cpu.regs };
    const f0 = { ...cpu.eflags };

    // --- JS body (attach mode iff a parent slot is live) ---
    paintBody432204(heap, cpu, rot, (heap.u32(0x628928) >>> 0) !== 0);
    const sJS = snap(rg);
    const rJS = { ...cpu.regs };
    const fJS = { ...cpu.eflags };

    // --- restore, then interpreter ---
    restore(rg, s0);
    Object.assign(cpu.regs, r0);
    Object.assign(cpu.eflags, f0);
    const savedESP = cpu.regs.esp >>> 0;
    const savedEIP = cpu.regs.eip >>> 0;
    const savedCD = cpu.callDepth;
    clearEipHook(addr);
    try { runFunction(cpu, addr, { stackTop: savedESP, limit: 5_000_000 }); }
    catch (e) { console.log(`interp threw: ${e.message}`); }
    finally { setEipHook(addr, lockstep); }
    cpu.regs.esp = savedESP;
    cpu.regs.eip = savedEIP;
    cpu.callDepth = savedCD;
    const sIN = snap(rg);
    const rIN = { ...cpu.regs };
    const fIN = { ...cpu.eflags };

    // --- compare ---
    let bad = [];
    rg.forEach(([name, a], i) => {
      const x = sJS[i], y = sIN[i];
      for (let j = 0; j < x.length; j++) if (x[j] !== y[j]) { bad.push(`${name}+0x${j.toString(16)}: js=${x[j].toString(16)} in=${y[j].toString(16)} (addr 0x${(a + j).toString(16)})`); }
    });
    const badR = REGN.filter((n) => (rJS[n] >>> 0) !== (rIN[n] >>> 0)).map((n) => `${n}: js=${(rJS[n] >>> 0).toString(16)} in=${(rIN[n] >>> 0).toString(16)}`);
    const badF = FLAGN.filter((n) => (fJS[n] | 0) !== (fIN[n] | 0)).map((n) => `${n}: js=${fJS[n]} in=${fIN[n]}`);
    if (bad.length) memMis++;
    if (badR.length) regMis++;
    if (badF.length) flagMis++;
    if ((bad.length || badR.length) && reported < 6) {
      reported++;
      console.log(`--- MISMATCH call#${calls} rot=${rot} entry: ` + REGN.map((n) => `${n}=${(r0[n] >>> 0).toString(16)}`).join(" "));
      console.log(`    a4e8=${heap.u16(0x99a4e8).toString(16)} a4ea=${heap.u16(0x99a4ea).toString(16)} a4ec=${heap.u16(0x99a4ec).toString(16)} f70=${heap.u16(0x991f70).toString(16)} f74=${heap.u16(0x991f74).toString(16)}`);
      for (const b of bad.slice(0, 12)) console.log(`    mem ${b}`);
      for (const b of badR) console.log(`    reg ${b}`);
      for (const b of badF) console.log(`    flag ${b}`);
    }
  };
  setEipHook(addr, lockstep);
}

const TICKS = parseInt(process.env.TICKS || "2", 10);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
}
console.log(`calls=${calls} memMis=${memMis} regMis=${regMis} flagMis=${flagMis}`);
