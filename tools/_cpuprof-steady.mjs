// Steady-state CPU profile of the REAL gameplay tick (session 5, Workstream A).
//
// Boots exactly like tools/probe-gameplay.js (fake clock, skipFadeIn +
// skipTitleIntro into enterScenarioPlay-equivalent gameplay), runs WARMUP
// ticks unprofiled, then starts the V8 sampling profiler (node:inspector)
// over TICKS gameplay ticks ONLY — so boot/first-tick samples never pollute
// the read. Prints a top-N self-time table (functionName grouped by url:line)
// and writes the raw .cpuprofile to /tmp/steady.cpuprofile.
//
//   node tools/_cpuprof-steady.mjs            # 60 profiled ticks
//   TICKS=120 WARMUP=10 node tools/_cpuprof-steady.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Session } from "node:inspector";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let _t = 1700000000000; Date.now = () => ++_t;
const realNow = process.hrtime.bigint;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, skipTitleIntro } = await import(resolve(ROOT, "runtime/harness.js"));
const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {} try { r.runTick(); } catch {}
skipFadeIn(r.heap); skipTitleIntro(r.heap);

const WARMUP = parseInt(process.env.WARMUP || "10", 10);
const TICKS  = parseInt(process.env.TICKS  || "60", 10);
for (let i = 0; i < WARMUP; i++) { try { r.runTick(); } catch {} }
process.stdout.write(`boot+${WARMUP} warm-up ticks done; profiling ${TICKS} ticks...\n`);

const session = new Session();
session.connect();
const post = (m, p) => new Promise((res, rej) => session.post(m, p, (e, x) => e ? rej(e) : res(x)));
await post("Profiler.enable");
await post("Profiler.setSamplingInterval", { interval: 100 }); // 100µs
await post("Profiler.start");

const t0 = realNow();
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { process.stdout.write(`tick ${i} ERR ${e.message}\n`); } }
const wallMs = Number(realNow() - t0) / 1e6;

const { profile } = await post("Profiler.stop");
writeFileSync("/tmp/steady.cpuprofile", JSON.stringify(profile));
process.stdout.write(`${TICKS} ticks in ${wallMs.toFixed(0)}ms = ${(wallMs / TICKS).toFixed(1)} ms/tick\n`);

// ---- self-time aggregation ----
const totalSamples = profile.samples.length;
const byNode = new Map();
for (const id of profile.samples) byNode.set(id, (byNode.get(id) || 0) + 1);
const nodes = new Map(profile.nodes.map(n => [n.id, n]));
const agg = new Map(); // key -> {self, fn, loc}
for (const [id, hits] of byNode) {
  const n = nodes.get(id);
  if (!n) continue;
  const cf = n.callFrame;
  const url = (cf.url || "").replace(/^file:\/\/.*\/rct-js\//, "");
  const key = `${cf.functionName || "(anon)"} @ ${url}:${cf.lineNumber + 1}`;
  agg.set(key, (agg.get(key) || 0) + hits);
}
const rows = [...agg.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);
process.stdout.write(`\ntop self-time over ${totalSamples} samples (${TICKS} ticks):\n`);
for (const [key, hits] of rows) {
  const pct = (hits * 100 / totalSamples).toFixed(1).padStart(5);
  const ms = (hits * 100 / 1000 / TICKS).toFixed(2).padStart(6); // 100µs/sample → ms/tick
  process.stdout.write(`${pct}%  ${ms} ms/tick  ${key}\n`);
}
process.exit(0);
