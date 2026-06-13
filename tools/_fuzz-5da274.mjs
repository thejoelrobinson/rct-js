#!/usr/bin/env node
// Synthetic fuzz lockstep for FUN_005da274 — the scenario soak only ever
// dispatches dl=8 / dh=1 with no eax mode bits set (the fast path), so the
// per-call lockstep (tools/_lockstep-5da274.mjs) cannot exercise the branchy
// arms: dl in {2,4,5,7}, dh in {0,2}, the eax 0x300/0x40/0x80/0x20/0x10/8
// mode-bit dispatch, the station chain walk (dl==7,dh==1), and arm5daebd
// (dl==5). This tool drives the SAME hooked function from RANDOMIZED but
// plausible entry states (real live sprites picked from the sprite pool,
// with dl/dh forced across their domain) and byte-diffs the JS body vs the
// interpreter from identical state — the strongest available verification
// for arms the scenario won't trigger.
//
// It mutates ONLY the entry registers (dl/dh/esi) and lets 0x5dbeeb return
// whatever the real binary computes for that sprite (so the eax mode bits
// are genuine, not fabricated). Heap is snapshot/restored around each trial.
//
//   N=4000 node tools/_fuzz-5da274.mjs
//
// memMis is the gate; arms that fire are reported by dl/dh. Trials that the
// interpreter itself faults on (wild esi) are skipped (not counted).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { getEipHook, setEipHook } = await import("../harness/x86.js");

const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);
// Warm the sim a few ticks so the sprite pool has live vehicles.
for (let i = 0; i < 4; i++) { try { r.runTick(); } catch {} }

const heap = r.heap;
const bytes = heap.bytes;
const CMP_END = bytes.byteLength - 64 * 1024;
const save = new Uint8Array(bytes.byteLength);
const afterJS = new Uint8Array(bytes.byteLength);

const prodHook = getEipHook(0x5da274);

// Collect live vehicle sprite bases by capturing the esi values the soak
// dispatches with. We re-run a couple of ticks under a capturing hook.
const liveEsi = new Set();
setEipHook(0x5da274, (c) => { liveEsi.add(c.regs.esi >>> 0); return prodHook(c); });
for (let i = 0; i < 3; i++) { try { r.runTick(); } catch {} }
setEipHook(0x5da274, prodHook);
const esiArr = [...liveEsi];
if (esiArr.length === 0) { console.log("no live vehicle sprites captured"); process.exit(1); }

// A tiny deterministic PRNG.
let _s = 0x9e3779b9 >>> 0;
const rnd = () => { _s ^= _s << 13; _s ^= _s >>> 17; _s ^= _s << 5; _s >>>= 0; return _s; };

const snap = (c) => ({ eax:c.regs.eax>>>0, ecx:c.regs.ecx>>>0, edx:c.regs.edx>>>0, ebx:c.regs.ebx>>>0, esi:c.regs.esi>>>0, edi:c.regs.edi>>>0, ebp:c.regs.ebp>>>0, esp:c.regs.esp>>>0 });
const setr = (c,s) => { c.regs.eax=s.eax>>>0;c.regs.ecx=s.ecx>>>0;c.regs.edx=s.edx>>>0;c.regs.ebx=s.ebx>>>0;c.regs.esi=s.esi>>>0;c.regs.edi=s.edi>>>0;c.regs.ebp=s.ebp>>>0;c.regs.esp=s.esp>>>0;c.regs.eip=0x5da274; };

const cpu = (await import("../runtime/win32/context.js")).state.__painterCpu;

const N = parseInt(process.env.N || "4000", 10);
let trials = 0, memMis = 0, skipped = 0, reported = 0;
const armSeen = new Map();

// Build a base esp/frame for the crossing: push a dummy return addr.
function freshFrame() {
  const STACK = (cpu.regs.esp >>> 0) || 0x200000;
  return STACK;
}

for (let t = 0; t < N; t++) {
  const esi = esiArr[rnd() % esiArr.length];
  const dl = rnd() & 0x1f;             // 0..31 covers all dl cases (2,4,5,7,8,...)
  const dh = rnd() & 3;                // 0..3 covers dh 0,1,2
  const base = freshFrame();
  const entry = { eax:0, ecx:0, edx:((dh&0xff)<<8)|(dl&0xff), ebx:0, esi, edi:0, ebp:0, esp:base };

  save.set(bytes);
  // leg A: JS body
  setr(cpu, entry);
  let jsErr = null;
  try { prodHook(cpu); } catch (e) { jsErr = e; }
  afterJS.set(bytes);

  // restore, leg B: interpreter truth
  bytes.set(save);
  setr(cpu, entry);
  globalThis.__forceInterp5da274 = true;
  let inErr = null;
  try { prodHook(cpu); } catch (e) { inErr = e; } finally { globalThis.__forceInterp5da274 = false; }

  if (inErr) { skipped++; bytes.set(save); continue; }  // interp faulted -> wild state, skip
  trials++;
  const key = `dl=${dl}/dh=${dh}`;
  armSeen.set(key, (armSeen.get(key) || 0) + 1);

  const a = Buffer.from(afterJS.buffer, 0, CMP_END);
  const b = Buffer.from(bytes.buffer, 0, CMP_END);
  if (!a.equals(b)) {
    memMis++;
    if (reported < 12) {
      reported++;
      let diffs = [];
      for (let i = 0; i < CMP_END && diffs.length < 8; i++) if (afterJS[i] !== bytes[i]) diffs.push(`0x${i.toString(16)}: js=${afterJS[i].toString(16)} in=${bytes[i].toString(16)}`);
      console.log(`MISMATCH ${key} esi=0x${esi.toString(16)}${jsErr ? " JSERR:"+jsErr.message : ""}`);
      for (const d of diffs) console.log("   " + d);
    }
  }
  bytes.set(save); // reset for next trial (keep sim state pristine)
}

console.log(`trials=${trials} memMis=${memMis} skipped(interp-fault)=${skipped}`);
console.log("arms exercised:", [...armSeen.entries()].sort().map(([k,v])=>`${k}:${v}`).join(" "));
