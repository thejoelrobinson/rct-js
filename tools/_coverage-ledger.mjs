#!/usr/bin/env node
// tools/_coverage-ledger.mjs — THE ENDGAME LEDGER (ADDENDUM 85).
//
// Measures the TRUE remaining interpreter work across the full content
// matrix: every retail scenario, N ticks each, one process per scenario
// (spawned serially to keep heap states isolated). Aggregates every
// runFunction entry that does real interp work (steps/call > 1) into a
// single table: which scenarios reach it, peak steps/tick, and its port
// status (hooked / delegate / auto-exists / no-module).
//
//   node tools/_coverage-ledger.mjs                 # all *.sc4 in web/assets
//   SCENARIOS=sc0.SC4,sc2.SC4 TICKS=12 node tools/_coverage-ledger.mjs
//
// Output: the ledger table + a JSON dump for tooling.
import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const scenarios = process.env.SCENARIOS
  ? process.env.SCENARIOS.split(",")
  : readdirSync(resolve(ROOT, "web/assets")).filter((f) => /\.sc4$/i.test(f)).sort();
const TICKS = process.env.TICKS || "12";

// child worker: soak one scenario, print JSON of real-work interp entries
const WORKER = `
import { readFileSync } from "node:fs";
const ROOT = ${JSON.stringify(ROOT)};
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
globalThis.__scenarioFile = process.env.SCEN.toLowerCase();
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import(ROOT + "/runtime/harness.js");
const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat"];
const vfs = new Map();
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(ROOT + "/web/assets/" + n)); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
try { vfs.set(process.env.SCEN.toLowerCase(), readFileSync(ROOT + "/web/assets/" + process.env.SCEN)); } catch (e) { console.log(JSON.stringify({err: "load: " + e.message})); process.exit(0); }
let r;
try {
  r = createRuntime({ dataBin: readFileSync(ROOT + "/decompiled/data.bin"), vfs, exeBytes: readFileSync(ROOT + "/binary/rct.exe") });
  r.runInit(); r.runTick(); skipFadeIn(r.heap); enterScenarioPlay(r.heap);
} catch (e) { console.log(JSON.stringify({err: "boot: " + (e.message||e).toString().slice(0,80)})); process.exit(0); }
globalThis.__fnSteps = new Map();
let tickErrs = 0;
const T = parseInt(process.env.T, 10);
for (let i = 0; i < T; i++) { try { r.runTick(); } catch { tickErrs++; } }
const entries = [...globalThis.__fnSteps]
  .map(([addr, v]) => ({ addr, steps: v.steps, calls: v.calls }))
  .filter((e) => e.steps / Math.max(e.calls, 1) > 1);
console.log(JSON.stringify({ entries, tickErrs }));
`;

const agg = new Map();  // addr -> {scenarios: [], maxStepsPerTick, totalSteps}
const scenarioErrs = [];
for (const scen of scenarios) {
  let out;
  try {
    out = execFileSync("node", ["--input-type=module", "-e", WORKER], {
      env: { ...process.env, SCEN: scen, T: TICKS }, timeout: 240000,
      maxBuffer: 32 * 1024 * 1024,
    }).toString();
  } catch (e) { scenarioErrs.push(`${scen}: worker died (${(e.message || "").slice(0, 60)})`); continue; }
  const line = out.trim().split("\n").filter((l) => l.startsWith("{")).pop();
  if (!line) { scenarioErrs.push(`${scen}: no JSON`); continue; }
  const j = JSON.parse(line);
  if (j.err) { scenarioErrs.push(`${scen}: ${j.err}`); continue; }
  const label = scen.toLowerCase().replace(".sc4", "");
  process.stderr.write(`${label}: ${j.entries.length} real-work entries${j.tickErrs ? ` (tickErrs=${j.tickErrs})` : ""}\n`);
  for (const e of j.entries) {
    if (!agg.has(e.addr)) agg.set(e.addr, { scenarios: [], maxSpt: 0, totalSteps: 0 });
    const a = agg.get(e.addr);
    a.scenarios.push(label);
    a.maxSpt = Math.max(a.maxSpt, Math.round(e.steps / parseInt(TICKS, 10)));
    a.totalSteps += e.steps;
  }
}

// classify port status
const { getEipHook } = await import("../harness/x86.js");  // (no runtime booted here: hooks map is empty — classify statically instead)
function status(addr) {
  const hex = addr.toString(16);
  const modPath = resolve(ROOT, "ported/auto", `${hex}.js`);
  // wired = appears in painter-bridge installJsFnEipHook / setEipHook lines
  if (!status._bridge) status._bridge = readFileSync(resolve(ROOT, "runtime/painter-bridge.js"), "utf8");
  if (status._bridge.includes(`0x${hex}`)) return "WIRED/hook-adjacent";
  if (!existsSync(modPath)) return "NO-MODULE (port from asm)";
  const src = readFileSync(modPath, "utf8");
  if (src.includes("INTERPRETER-DELEGATED")) return "DELEGATE (hand-port job)";
  return "AUTO-EXISTS (batch-validate)";
}

const rows = [...agg].map(([addr, a]) => ({ addr, ...a, status: status(addr) }))
  .sort((x, y) => y.maxSpt - x.maxSpt);
console.log(`\n=== ENDGAME LEDGER: ${rows.length} distinct real-work interp fns across ${scenarios.length} scenarios (${TICKS} ticks each) ===`);
console.log(`addr        maxSteps/tick  #scen  status`);
for (const r2 of rows) console.log(`0x${r2.addr.toString(16).padEnd(9)} ${String(r2.maxSpt).padStart(12)} ${String(r2.scenarios.length).padStart(6)}  ${r2.status}   [${r2.scenarios.slice(0, 6).join(",")}${r2.scenarios.length > 6 ? "…" : ""}]`);
if (scenarioErrs.length) { console.log(`\nscenario errors:`); for (const e of scenarioErrs) console.log("  " + e); }
writeFileSync("/tmp/rct-ledger.json", JSON.stringify(rows, null, 1));
console.log(`\nledger JSON: /tmp/rct-ledger.json`);
