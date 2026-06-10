#!/usr/bin/env node
// Painter-ranking soak: boots into genuine scenario play (enterScenarioPlay),
// installs the per-funcAddr runFunction step accounting (globalThis.__fnSteps
// in harness/x86.js), runs TICKS gameplay ticks, and ranks every interpreter
// entry address by steps consumed.
//
// Unlike __painterSteps (which painter-bridge fills only for top-level
// _paintShim entries), __fnSteps counts EVERY runFunction call — including
// the per-element painter sub-calls made inside the extra_paint_* eip hooks
// (install4368d8Hooks dispatches per-element painters via runFunction;
// ~17.8k crossings/tick). This is the ranking that drives Workstream A
// item 1 (hand-port the hottest painters).
//
//   TICKS=8 OUT=/tmp/painter-rank.json node tools/probe-painter-rank.js
//
// Output JSON (flushed after every tick so a wall-clock kill still leaves
// usable data): { ticks, totalMs, perTickMs, tickMs, rank: [{addr, steps,
// calls, stepsPerTick}] }

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

// Deterministic fake clock for the binary's timing reads (same as
// tools/probe-gameplay.js); real wall time via hrtime below.
let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const realMs = () => Number(process.hrtime.bigint() / 1000n) / 1000;

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const TICKS = parseInt(process.env.TICKS || "8", 10);
const OUT = process.env.OUT || "/tmp/painter-rank.json";

const t0 = realMs();
const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch (e) { process.stderr.write(`runInit: ${e.message}\n`); }
try { r.runTick(); } catch (e) { process.stderr.write(`tick0: ${e.message}\n`); }
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);
process.stderr.write(`[rank] boot done in ${(realMs() - t0) | 0}ms real\n`);

// Warm one tick (gate-open transients) without accounting, then measure.
try { r.runTick(); } catch (e) { process.stderr.write(`warm tick: ${e.message}\n`); }

globalThis.__fnSteps = new Map();
const tickMs = [];
for (let i = 0; i < TICKS; i++) {
  const t = realMs();
  try { r.runTick(); } catch (e) { process.stderr.write(`tick ${i} ERR ${e.message}\n`); }
  tickMs.push(realMs() - t);
  process.stderr.write(`tick ${i}: ${tickMs[i] | 0}ms\n`);
  // Flush incrementally so a wall-clock kill still leaves usable output.
  const rank = [...globalThis.__fnSteps.entries()]
    .map(([addr, v]) => ({ addr: "0x" + addr.toString(16), steps: v.steps, calls: v.calls, stepsPerTick: Math.round(v.steps / (i + 1)) }))
    .sort((a, b) => b.steps - a.steps);
  const total = tickMs.reduce((a, b) => a + b, 0);
  writeFileSync(OUT, JSON.stringify({ ticks: i + 1, totalMs: total, perTickMs: total / (i + 1), tickMs, rank }, null, 1));
}
const total = tickMs.reduce((a, b) => a + b, 0);
process.stderr.write(`DONE ${TICKS} ticks, avg ${(total / TICKS) | 0}ms/tick; rank written to ${OUT}\n`);
console.log("addr        total_steps    calls  steps/call  steps/tick");
console.log("-".repeat(60));
for (const [addr, v] of [...globalThis.__fnSteps.entries()].sort((a, b) => b[1].steps - a[1].steps).slice(0, 25)) {
  console.log(`0x${addr.toString(16).padEnd(8)} ${String(v.steps).padStart(12)} ${String(v.calls).padStart(8)} ${String(Math.round(v.steps / Math.max(1, v.calls))).padStart(11)} ${String(Math.round(v.steps / TICKS)).padStart(11)}`);
}
