#!/usr/bin/env node
// Phase R+13a — diagnose the skipTitleIntro slow-path.
//
// Goal. After `skipFadeIn(heap) + skipTitleIntro(heap)` open the cb9==0
// sprite-update gate at ported/auto/4385d8.js:186, per-tick wall time
// explodes from ~80ms to multiple minutes. Identify which dispatched
// callee burns the time so we can hand-port (or stub) it.
//
// Strategy. We can't rely on per-dispatch wall-time wrappers alone:
// runTick() never returns within the budget, and the painter-bridge's
// runFunction() can loop ~50M interpreter steps inside a single call.
// So we combine two techniques:
//
//   (A) Inspector CPU profiler — samples by stack at fixed cadence,
//       independent of when calls return. Lets us see the hottest JS
//       function (which for painter shims means `_paintShim` itself and
//       step() in harness/x86.js). Pair with the bottom-up symbol table
//       to identify which CODESEG painter is running.
//
//   (B) state.fnDispatch wrappers — count + accumulate inclusive wall
//       time per EIP. Useful when calls DO return (painter shims with
//       <30s runtime each, or callIndirect targets in non-painter
//       chains). Wrappers also enforce a hard tick deadline by becoming
//       no-ops once exceeded so the tick unwinds and we get a stable
//       end-of-run aggregate.
//
// The probe also writes a partial CPU profile to
// /tmp/probe-cb9-cpuprofile.cpuprofile (only on clean exit — see note
// below) and a top-N report to stdout. Because JS busy loops never yield
// to the event loop, no JS-side timer can interrupt a running tick.
//
// Recommended invocation (gets profiling output even when the tick hangs
// past the wall budget):
//
//   $ node --prof tools/probe-cb9-slowpath.js > /tmp/probe-cb9.log 2>&1 &
//   # wait ~75s, then SIGKILL the node process. --prof writes
//   # isolate-<hex>.log continuously, so killed runs still have a profile.
//   $ kill -9 $(pgrep -f probe-cb9-slowpath.js)
//   $ node --prof-process isolate-*.log | head -200
//
// The bottom-up profile shows which runFunction → callBridge chains
// dominate. As of Phase R+13a the dominant chain is
//   paintBody421d2c → callBridge → runFunction → step
// i.e. the cold-tail fallbacks inside the hand-port at 0x421d2c.
//
// Constraints (per task brief):
//   - DIAGNOSTIC ONLY. No edits to runtime/ or ported/auto/.
//   - skipTitleIntro must NOT appear in any committed test/fixture.
//   - One commit. No remote push.

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import * as inspector from "node:inspector";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
globalThis._renderTrace = () => {};

const TICK_DEADLINE_MS = 30_000;
const WALL_DEADLINE_MS = 120_000;
const TOP_N = 25;
const PARTIAL_DUMP_PATH = "/tmp/probe-cb9-slowpath-partial.json";
const CPUPROFILE_PATH = "/tmp/probe-cb9-cpuprofile.cpuprofile";
const SLOW_CALL_LOG_MS = 250;
const PARTIAL_DUMP_EVERY = 500;

const EXTRA = JSON.parse(readFileSync(resolve(ROOT, "lifter/extra-entries.json"), "utf8"));
const PAINTER_EIPS = new Set(
  EXTRA.filter((x) => x.addr !== undefined).map((x) =>
    typeof x.addr === "string" ? parseInt(x.addr, 16) >>> 0 : (x.addr >>> 0)
  ),
);

const { createRuntime, skipFadeIn, skipTitleIntro } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
const DATA_FILES = [
  "csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat",
  "css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat",
  "css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4",
];
for (const n of DATA_FILES) {
  try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch (_) {}
}
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));

console.log("[probe] createRuntime...");
const r = createRuntime({ dataBin, vfs });
console.log("[probe] runInit...");
r.runInit();
console.log("[probe] runTick #1 (warm-up; pre-skip)...");
const t0Init = Date.now();
try { r.runTick(); } catch (e) { console.warn(`tick warmup threw: ${(e.message || e).slice(0, 160)}`); }
console.log(`[probe] warm-up tick = ${Date.now() - t0Init}ms`);

// === Wrap state.fnDispatch for inclusive-wall-time per-EIP stats. ===
const stats = new Map();
let invocationCount = 0;
let tickStartWall = 0;
let tickAborted = false;

function getStat(eip) {
  let s = stats.get(eip);
  if (!s) { s = { calls: 0, ms: 0, painter: PAINTER_EIPS.has(eip) }; stats.set(eip, s); }
  return s;
}
function dumpPartial() {
  const rows = [];
  for (const [eip, s] of stats) {
    if (s.calls === 0) continue;
    rows.push({ eip: "0x" + eip.toString(16), calls: s.calls, ms: s.ms, painter: s.painter });
  }
  rows.sort((a, b) => b.ms - a.ms);
  try {
    writeFileSync(PARTIAL_DUMP_PATH, JSON.stringify({
      wallMs: tickStartWall ? Date.now() - tickStartWall : 0,
      aborted: tickAborted,
      top: rows.slice(0, 50),
    }, null, 2));
  } catch (_) {}
}

const original = new Map();
for (const [eip, fn] of state.fnDispatch.entries()) {
  if (typeof fn !== "function") continue;
  if (eip >= 0x10000000) continue;
  original.set(eip, fn);
  state.fnDispatch.set(eip, function _probeShim(heap, ...args) {
    if (tickAborted) return 0;
    if (tickStartWall && (Date.now() - tickStartWall) > TICK_DEADLINE_MS) {
      tickAborted = true;
      process.stdout.write(`[probe] TICK DEADLINE: ${TICK_DEADLINE_MS}ms exceeded — short-circuiting dispatch\n`);
      dumpPartial();
      return 0;
    }
    const t0 = Date.now();
    const s = getStat(eip);
    s.calls++;
    invocationCount++;
    if ((invocationCount % PARTIAL_DUMP_EVERY) === 0) dumpPartial();
    try {
      return fn(heap, ...args);
    } finally {
      const dt = Date.now() - t0;
      s.ms += dt;
      if (dt >= SLOW_CALL_LOG_MS) {
        process.stdout.write(`[probe] SLOW 0x${eip.toString(16).padStart(6,"0")} ${
          s.painter ? "INTERP" : "JS    "} ${String(dt).padStart(5)}ms (call #${s.calls}, cum ${s.ms}ms)\n`);
        dumpPartial();
      }
    }
  });
}
console.log(`[probe] wrapped ${original.size} fnDispatch entries (${PAINTER_EIPS.size} painter-bridge addrs)`);

// === Start Inspector CPU profile so we capture sampling data even if a
// single dispatch call hangs longer than the deadline. The profiler runs
// asynchronously inside V8; samples are taken at the V8 default rate
// (~1ms) and indexed by JS callstack, so we get hotspots without
// relying on any wrapper firing. ===
const session = new inspector.Session();
session.connect();
await new Promise((res) => session.post("Profiler.enable", res));
await new Promise((res) => session.post("Profiler.setSamplingInterval", { interval: 1000 }, res));
await new Promise((res) => session.post("Profiler.start", res));

console.log("[probe] skipFadeIn + skipTitleIntro...");
skipFadeIn(r.heap);
skipTitleIntro(r.heap);
console.log("[probe] runTick #2 (PROFILED — failure pattern)...");
tickStartWall = Date.now();
try {
  r.runTick();
} catch (e) {
  console.warn(`[probe] profiled tick threw: ${(e.message || e).slice(0, 200)}`);
}
const tickWallMs = Date.now() - tickStartWall;
console.log(`[probe] profiled tick = ${tickWallMs}ms (aborted=${tickAborted}, invocations=${invocationCount})`);

const { profile } = await new Promise((resolve, reject) => {
  session.post("Profiler.stop", (err, params) => err ? reject(err) : resolve(params));
});
session.disconnect();
try { writeFileSync(CPUPROFILE_PATH, JSON.stringify(profile)); } catch (_) {}
console.log(`[probe] cpuprofile written: ${CPUPROFILE_PATH}`);

// === Report dispatch-wrapper aggregates (inclusive ms per EIP) ===
const rows = [];
for (const [eip, s] of stats) {
  if (s.calls === 0) continue;
  rows.push({
    eip, calls: s.calls, ms: s.ms,
    avgUs: (s.ms * 1000) / s.calls,
    painter: s.painter,
  });
}
rows.sort((a, b) => b.ms - a.ms);

console.log("\n=== TOP " + TOP_N + " EIPs BY INCLUSIVE WALL TIME (single profiled tick) ===");
console.log("rank  eip         kind        calls    total_ms   avg_us  decompiled");
for (let i = 0; i < Math.min(TOP_N, rows.length); i++) {
  const r = rows[i];
  const kind = r.painter ? "INTERP" : "JS";
  const eipHex = "0x" + r.eip.toString(16).padStart(6, "0");
  const cPath = `decompiled/c/${r.eip.toString(16)}.c`;
  const cExists = existsSync(resolve(ROOT, cPath)) ? cPath : "(no .c — CODESEG)";
  console.log(
    `${String(i + 1).padStart(2)}    ${eipHex}    ${kind.padEnd(7)} ${
      String(r.calls).padStart(7)}  ${String(r.ms).padStart(8)}  ${
      r.avgUs.toFixed(1).padStart(7)}  ${cExists}`,
  );
}

const totalInclMs = rows.reduce((a, x) => a + x.ms, 0);
console.log(`\n[probe] tick wall ${tickWallMs}ms; sum-of-inclusive ${totalInclMs}ms ` +
  `(>tick because nested dispatches double-count)`);
console.log(`[probe] painter-bridge inclusive ms: ${
  rows.filter(r => r.painter).reduce((a, x) => a + x.ms, 0)}`);
console.log(`[probe] JS-translated inclusive ms: ${
  rows.filter(r => !r.painter).reduce((a, x) => a + x.ms, 0)}`);

// === Aggregate CPU-profile self-time so we can spot a tight loop that
// dispatches at all (i.e. lives entirely inside one JS module). Aggregates
// by callFrame.functionName + url so a hot translator-emitted function
// shows up by its FUN_xxxxxxxx name. ===
console.log("\n=== TOP 30 CPU-PROFILE FUNCTIONS BY SELF TIME ===");
const nodes = profile.nodes;
const samples = profile.samples || [];
const timeDeltas = profile.timeDeltas || [];
const selfUs = new Map();
for (let i = 0; i < samples.length; i++) {
  const dt = timeDeltas[i] || 0;
  selfUs.set(samples[i], (selfUs.get(samples[i]) || 0) + dt);
}
const byNode = new Map();
for (const n of nodes) byNode.set(n.id, n);
const cpuRows = [];
for (const [id, t] of selfUs) {
  const n = byNode.get(id);
  if (!n) continue;
  const cf = n.callFrame;
  cpuRows.push({
    fn: cf.functionName || "(anonymous)",
    url: cf.url ? cf.url.replace("file://", "").replace(ROOT + "/", "") : "",
    line: cf.lineNumber,
    selfUs: t,
  });
}
cpuRows.sort((a, b) => b.selfUs - a.selfUs);
const cpuTotalMs = cpuRows.reduce((a, x) => a + x.selfUs, 0) / 1000;
console.log(`(sum of all self times: ${cpuTotalMs.toFixed(0)}ms)`);
for (const cr of cpuRows.slice(0, 30)) {
  console.log(`  ${(cr.selfUs/1000).toFixed(0).padStart(6)}ms  ${cr.fn.padEnd(40)} ${cr.url}:${cr.line}`);
}

// === Aggregate CPU-profile by ported/auto/<addr>.js URL — this gives us
// the per-function inclusive contribution from the perspective of the JS
// file, which directly maps to a FUN_xxxxxxxx address. ===
console.log("\n=== TOP 20 ported/auto/*.js FILES BY SELF TIME (CPU profile) ===");
const byFile = new Map();
for (const cr of cpuRows) {
  if (!cr.url.startsWith("ported/auto/")) continue;
  const key = cr.url;
  byFile.set(key, (byFile.get(key) || 0) + cr.selfUs);
}
const fileRows = [];
for (const [url, us] of byFile) fileRows.push({ url, selfUs: us });
fileRows.sort((a, b) => b.selfUs - a.selfUs);
for (const fr of fileRows.slice(0, 20)) {
  console.log(`  ${(fr.selfUs/1000).toFixed(0).padStart(6)}ms  ${fr.url}`);
}

// === Print decompiled-C heads for the top-3 dispatched EIPs. ===
console.log("\n=== TOP 3 DISPATCH-WRAPPER EIPS: decompiled/c/<addr>.c HEADS ===");
for (let i = 0; i < Math.min(3, rows.length); i++) {
  const r = rows[i];
  const cPath = resolve(ROOT, `decompiled/c/${r.eip.toString(16)}.c`);
  console.log(`\n--- rank ${i + 1}: 0x${r.eip.toString(16)} (${r.painter ? "INTERP" : "JS"}, ${
    r.calls} calls, ${r.ms}ms incl) ---`);
  if (!existsSync(cPath)) {
    console.log(`(no decompiled/c file — CODESEG painter)`);
    continue;
  }
  try {
    const c = readFileSync(cPath, "utf8");
    const lines = c.split("\n");
    for (const line of lines.slice(0, 80)) console.log(line);
    if (lines.length > 80) console.log(`...(truncated; total ${lines.length} lines)`);
  } catch (e) {
    console.log(`(read error: ${(e.message || e).slice(0, 160)})`);
  }
}

if (Date.now() - t0Init > WALL_DEADLINE_MS) {
  console.warn(`[probe] WALL DEADLINE: exceeded ${WALL_DEADLINE_MS}ms`);
}
