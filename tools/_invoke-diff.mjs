#!/usr/bin/env node
// tools/_invoke-diff.mjs — TARGETED-INVOCATION differential oracle (ADDENDUM 39).
//
// Validates a JS port FUN_00<addr> vs the x86 interpreter for a function that the
// gameplay soak NEVER REACHES (so tools/_lockstep-auto.mjs reports calls=0 and
// cannot test it). Instead of waiting for a crossing, it invokes the function
// DIRECTLY from the live post-enterScenarioPlay heap: both legs start from the same
// crafted entry register state, the same scratch stack, the same heap snapshot.
//
// Why this is sound with arbitrary entry state: both legs read the SAME heap and the
// SAME registers, so any divergence in the heap write-set or the exit registers is a
// JS-port BUG, not an artifact of the inputs (a "garbage" pointer is walked
// identically by both). Coverage is per-input: set meaningful entry regs for the
// function (e.g. ESI=0x99a888 for a string helper) and/or sweep several cases.
//
//   ADDR=0x458a7c ESI=0x99a888 node tools/_invoke-diff.mjs
//   ADDR=0x4183a0 EAX=.. ECX=.. node tools/_invoke-diff.mjs   # register entry
//   ADDR=0x417420 STACK=0x4 node tools/_invoke-diff.mjs       # one u32 stack arg = 4
//
// Entry regs default to the live cpu.regs after a warm-up tick; override any with the
// env vars EAX/ECX/EDX/EBX/ESI/EDI/EBP. STACK="a,b,c" writes u32 args at [esp+4..]
// (cdecl). Compares heap [0,CMP_END) (excludes the 64K stack carve) + exit registers.

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
const { setEipHook, clearEipHook, getEipHook, runFunction } = await import("../harness/x86.js");
const { regs } = await import("../runtime/regs.js");

const ADDR = parseInt(process.env.ADDR || "0x458a7c", 16) >>> 0;
const hex = ADDR.toString(16);
const mod = await import(`../ported/auto/${hex}.js`);
const autoFn = mod[`FUN_00${hex}`] || mod[`FUN_${hex}`] || mod.default;
if (typeof autoFn !== "function") { console.log(`ADDR=0x${hex}: no auto fn export (keys: ${Object.keys(mod).join(",")})`); process.exit(0); }

const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);
const heap = r.heap;
const bytes = heap.bytes;
const CMP_END = bytes.byteLength - 64 * 1024;

// Capture the painter-bridge cpu (rct.exe code overlaid) by briefly hooking a
// reliably-fired address and running one tick.
let cpu = null;
const CAP = 0x5da274;
const prev = getEipHook(CAP);
setEipHook(CAP, function (c) { cpu = c; return prev ? prev(c) : undefined; });
try { r.runTick(); } catch {}
if (prev) setEipHook(CAP, prev); else clearEipHook(CAP);
if (!cpu) { console.log(`ADDR=0x${hex}: could not capture painter cpu (CAP 0x${CAP.toString(16)} never fired)`); process.exit(1); }

// Entry register state: live cpu.regs after warm-up, overridable per register.
const envReg = (name, fallback) => process.env[name] !== undefined ? (parseInt(process.env[name], 16) >>> 0) : fallback;
const STACK_TOP = (bytes.byteLength - 0x800) >>> 0;   // scratch stack, inside the 64K carve
const entry = {
  eax: envReg("EAX", cpu.regs.eax >>> 0), ecx: envReg("ECX", cpu.regs.ecx >>> 0),
  edx: envReg("EDX", cpu.regs.edx >>> 0), ebx: envReg("EBX", cpu.regs.ebx >>> 0),
  esi: envReg("ESI", cpu.regs.esi >>> 0), edi: envReg("EDI", cpu.regs.edi >>> 0),
  ebp: envReg("EBP", cpu.regs.ebp >>> 0), esp: (STACK_TOP - 4) >>> 0,
};
const stackArgs = (process.env.STACK || "").split(",").filter(s => s.length).map(s => parseInt(s, 16) >>> 0);

const save = new Uint8Array(bytes); // post-warm-up baseline both legs restore from
const afterJS = new Uint8Array(bytes.byteLength);
const dv = new DataView(bytes.buffer);
const writeFrame = () => {
  dv.setUint32((STACK_TOP - 4) >>> 0, 0xdeadbeef, true);          // sentinel ret addr
  for (let i = 0; i < stackArgs.length; i++) dv.setUint32((STACK_TOP + i * 4) >>> 0, stackArgs[i], true);
};

// --- leg A: JS port ---
bytes.set(save); writeFrame();
regs.eax = entry.eax; regs.ecx = entry.ecx; regs.edx = entry.edx; regs.ebx = entry.ebx;
regs.esi = entry.esi; regs.edi = entry.edi; regs.ebp = entry.ebp; regs.esp = entry.esp;
let threw = null;
try { autoFn(heap, ...stackArgs); } catch (e) { threw = e; }
afterJS.set(bytes);
const jsR = { eax: regs.eax >>> 0, ecx: regs.ecx >>> 0, esi: regs.esi >>> 0, edi: regs.edi >>> 0, ebp: regs.ebp >>> 0, ebx: regs.ebx >>> 0 };

// --- leg B: interpreter (truth) ---
bytes.set(save); writeFrame();
const selfHook = getEipHook(ADDR); clearEipHook(ADDR);
cpu.regs.eax = entry.eax; cpu.regs.ecx = entry.ecx; cpu.regs.edx = entry.edx; cpu.regs.ebx = entry.ebx;
cpu.regs.esi = entry.esi; cpu.regs.edi = entry.edi; cpu.regs.ebp = entry.ebp;
let inThrew = null;
try { runFunction(cpu, ADDR, { stackTop: STACK_TOP, limit: 5_000_000 }); } catch (e) { inThrew = e; }
if (selfHook) setEipHook(ADDR, selfHook);
const inR = { eax: cpu.regs.eax >>> 0, ecx: cpu.regs.ecx >>> 0, esi: cpu.regs.esi >>> 0, edi: cpu.regs.edi >>> 0, ebp: cpu.regs.ebp >>> 0, ebx: cpu.regs.ebx >>> 0 };

// --- compare ---
let memMis = 0; const diffs = [];
for (let i = 0; i < CMP_END; i++) if (afterJS[i] !== bytes[i]) { memMis++; if (diffs.length < 8) diffs.push(`0x${i.toString(16)}:js=${afterJS[i].toString(16)}/in=${bytes[i].toString(16)}`); }
const regDiffs = [];
for (const k of ["eax", "ecx", "esi", "edi", "ebp", "ebx"]) if (jsR[k] !== inR[k]) regDiffs.push(`${k}:js=${jsR[k].toString(16)}/in=${inR[k].toString(16)}`);

const entryStr = `eax=${entry.eax.toString(16)} ecx=${entry.ecx.toString(16)} esi=${entry.esi.toString(16)} edi=${entry.edi.toString(16)}${stackArgs.length ? " stack=[" + stackArgs.map(a => a.toString(16)).join(",") + "]" : ""}`;
const verdict = (threw || inThrew) ? "THREW" : (memMis === 0 && regDiffs.length === 0) ? "MATCH" : "DIFF";
console.log(`ADDR=0x${hex} ${verdict}  entry{${entryStr}}`);
if (threw) console.log(`  JS THREW: ${(threw.message || threw).toString().slice(0, 120)}`);
if (inThrew) console.log(`  INTERP THREW: ${(inThrew.message || inThrew).toString().slice(0, 120)}`);
console.log(`  memMis=${memMis}${diffs.length ? " " + diffs.join(" ") : ""}`);
if (regDiffs.length) console.log(`  regMis: ${regDiffs.join(" ")}`);
