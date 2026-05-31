#!/usr/bin/env node
// Rank the interpreter-fallback painters by INTERPRETER STEPS consumed during
// a gameplay tick — the true cost driver behind the slow tick. (Wall-time
// under a step cap is misleading: capping painters to near-nothing removes the
// very signal we want.) We run with the FULL 50M step budget but bound total
// work by capping the number of ticks AND installing a global step accumulator
// (globalThis.__painterSteps) that painter-bridge fills per painter address.
//
// To keep the run bounded even with the full budget, we cap each painter via
// __painterStepLimit at a value high enough to let cheap painters finish but
// bounded so one runaway painter can't hang the probe; painters that hit the
// cap are exactly the expensive ones we want to port (reported as capped).
//
// Usage: node tools/probe-painter-rank.js [--limit=2000000] [--ticks=1]

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let stepLimit = 2_000_000, ticks = 1, sampleBudget = 600;
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--limit=")) stepLimit = parseInt(a.slice(8), 10);
  else if (a.startsWith("--ticks=")) ticks = parseInt(a.slice(8), 10);
  else if (a.startsWith("--samples=")) sampleBudget = parseInt(a.slice(10), 10);
}
globalThis.__painterStepLimit = stepLimit;
globalThis.__painterSteps = new Map();
globalThis.__painterSampleBudget = sampleBudget; // unwind tick after N painter calls

// The gameplay tick may never return within a sane wall-budget (that's the
// whole problem we're measuring). Dump the accumulated ranking on SIGTERM so
// `kill <pid>` after N seconds yields real partial data instead of nothing.
function dumpRanking(reason) {
  const rows = [...globalThis.__painterSteps.entries()]
    .map(([addr, v]) => ({ addr, steps: v.steps, calls: v.calls }))
    .sort((a, b) => b.steps - a.steps)
    .slice(0, 30);
  console.log(`\n[rank dump: ${reason}]`);
  console.log("  addr        total_steps    calls  steps/call");
  console.log("  " + "-".repeat(48));
  for (const row of rows) {
    console.log(`  0x${row.addr.toString(16).padEnd(8)} ${String(row.steps).padStart(12)} ${String(row.calls).padStart(6)} ${String(Math.round(row.steps / Math.max(1, row.calls))).padStart(11)}`);
  }
  console.log(`  total painter steps measured: ${rows.reduce((a, r) => a + r.steps, 0)}`);
}
process.on("SIGTERM", () => { dumpRanking("SIGTERM"); process.exit(0); });
process.on("SIGINT", () => { dumpRanking("SIGINT"); process.exit(0); });

let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, skipTitleIntro } = await import("../runtime/harness.js");

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
process.stderr.write(`[rank] booting (painter step cap = ${stepLimit})...\n`);
const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch (e) { process.stderr.write(`runInit: ${e.message}\n`); }
try { r.runTick(); } catch (e) { process.stderr.write(`warmup: ${e.message}\n`); }
skipFadeIn(r.heap);
skipTitleIntro(r.heap);
globalThis.__painterSteps.clear(); // ignore init/warmup; measure gameplay ticks only

process.stderr.write(`[rank] running gameplay tick(s); will unwind after ${sampleBudget} painter calls...\n`);
const t0 = Date.now();
for (let i = 0; i < ticks; i++) {
  try { r.runTick(); }
  catch (e) {
    if (e && e.__painterDone) { process.stderr.write(`[rank] sample budget reached on tick ${i}; unwound.\n`); break; }
    process.stderr.write(`tick ${i}: ${e.message}\n`);
  }
}
process.stderr.write(`[rank] done in ${Date.now() - t0} virtual-ms; ${globalThis.__painterSampleCount || 0} painter calls sampled\n`);

dumpRanking("clean end-of-tick");
