#!/usr/bin/env node
// Replay captured full-entry-state scenarios (tools/capture-lockstep.js)
// into the x86 interpreter and diff against the ported JS for byte-equality.
// The binary (interpreter) is ground truth; divergences ARE the bugs.
//
// Two modes:
//   --self      interpreter-vs-interpreter from the captured state. Validates
//               that the capture is COMPLETE (must be byte-identical; if not,
//               the entry-state snapshot missed something). Run this first on
//               any new subsystem before trusting JS-vs-interpreter results.
//   (default)   interpreter-vs-ported-JS. The real differential test.
//
// Compares masked EAX (tools/lib/return-mask.js) for non-void returns, plus
// the first divergent memory offset across the full heap image. Functions
// whose interpreter run trips the Win32 shim trap are bucketed `win32` and
// reported separately (they can't be full-replayed — sub-divide them).
//
// Usage:
//   node tools/diff-lockstep.js --fixture=test/fixtures/lockstep/render-ingame.json [--self] [--addr=0x44e719] [--max=50]

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { runOriginal } from "../harness/emulator.js";
import { returnMaskFor } from "./lib/return-mask.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let fixturePath = null, selfMode = false, onlyAddr = null, maxScenarios = Infinity, limit = 50_000_000;
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--fixture=")) fixturePath = a.slice(10);
  else if (a.startsWith("--subsystem=")) fixturePath = `test/fixtures/lockstep/${a.slice(12)}.json`;
  else if (a === "--self") selfMode = true;
  else if (a.startsWith("--addr=")) onlyAddr = parseInt(a.slice(7), 16) >>> 0;
  else if (a.startsWith("--max=")) maxScenarios = parseInt(a.slice(6), 10);
  else if (a.startsWith("--limit=")) limit = parseInt(a.slice(8), 10);
}
if (!fixturePath) { console.error("need --fixture=<path> or --subsystem=<name>"); process.exit(1); }

const fx = JSON.parse(readFileSync(resolve(ROOT, fixturePath), "utf8"));
const { memSize, stackTop } = fx.meta;
const pagePool = fx.pagePool;

// Materialize a scenario's pages into the init.pages format runOriginal wants.
function pagesFor(sc) {
  return sc.pages.map(({ page, hash }) => ({ page, bytes: pagePool[hash] }));
}

// Lazily import the runtime only when needed (default mode).
let createRuntime, skipFadeIn, portedMap, dataBin, heapMod;
async function loadPorted() {
  if (createRuntime) return;
  let _t = 1700000000000; Date.now = () => ++_t;
  if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
  globalThis._renderTrace = () => {};
  ({ createRuntime, skipFadeIn } = await import("../runtime/harness.js"));
  heapMod = await import("../runtime/heap.js");
  const dispMod = await import("../ported/auto/_dispatch.js");
  portedMap = new Map(dispMod.portedDispatch.map(([a, f]) => [a >>> 0, f]));
  dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
}

function firstDivergence(a, b) {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) return i;
  if (a.length !== b.length) return n;
  return -1;
}

const results = { pass: 0, fail: 0, win32: 0, error: 0, details: [] };

let scenarios = fx.scenarios;
if (onlyAddr !== null) scenarios = scenarios.filter((s) => (parseInt(s.addr, 16) >>> 0) === onlyAddr);
scenarios = scenarios.slice(0, maxScenarios);

if (!selfMode) await loadPorted();

for (const sc of scenarios) {
  const addr = parseInt(sc.addr, 16) >>> 0;
  const initBase = { regs: sc.regs, pages: pagesFor(sc), memSize, stackTop };
  let interp;
  try {
    interp = runOriginal({ funcAddr: addr, init: initBase, limit, returnMemory: true });
  } catch (e) {
    if (e && e._wildShim) { results.win32++; results.details.push({ addr: sc.addr, verdict: "win32", note: "interpreter hit shim trap" }); continue; }
    results.error++; results.details.push({ addr: sc.addr, verdict: "error", note: (e.message || String(e)).slice(0, 120) });
    continue;
  }

  if (selfMode) {
    // Re-run identically; must match. This validates capture completeness.
    const interp2 = runOriginal({ funcAddr: addr, init: initBase, limit, returnMemory: true });
    const divEax = (interp.regs.eax >>> 0) !== (interp2.regs.eax >>> 0);
    const divMem = firstDivergence(interp.memory, interp2.memory);
    if (!divEax && divMem === -1) results.pass++;
    else { results.fail++; results.details.push({ addr: sc.addr, verdict: "self-fail", divEax, divMemAt: divMem >= 0 ? `0x${divMem.toString(16)}` : null }); }
    continue;
  }

  // interpreter vs ported JS: build a fresh ported heap from the same state.
  const memory = new Uint8Array(memSize);
  memory.set(dataBin, 0);
  for (const { page, bytes } of initBase.pages) {
    const buf = Buffer.from(bytes, "base64");
    memory.set(buf, page * fx.meta.pageSize);
  }
  const heap = new heapMod.Heap(memory, stackTop);
  const { regs } = await import("../runtime/regs.js");
  Object.assign(regs, sc.regs);
  let portedErr = null;
  const portedFn = portedMap.get(addr);
  if (!portedFn) {
    // Not in the static ported dispatch — this address only exists as an
    // interpreter-fallback painter (_paintShim), so its "ported" impl IS the
    // interpreter and a JS-vs-interpreter diff is not yet meaningful. Skip
    // until the painter is hand-ported into runtime/native/ (then add it to
    // portedDispatch and re-run).
    results.details.push({ addr: sc.addr, verdict: "no-js", note: "interpreter-fallback only; port to runtime/native first" });
    results.skipped = (results.skipped || 0) + 1;
    continue;
  }
  try {
    portedFn(heap);
  } catch (e) { portedErr = (e.message || String(e)).slice(0, 120); }

  const { mask, isVoid } = returnMaskFor(addr);
  let verdict = "pass", note = null;
  if (portedErr) { verdict = "error"; note = portedErr; results.error++; }
  else {
    const eaxOk = isVoid || ((interp.regs.eax >>> 0) & mask) === ((regs.eax >>> 0) & mask);
    const divMem = firstDivergence(interp.memory, memory.subarray(0, interp.memory.length));
    if (eaxOk && divMem === -1) { verdict = "pass"; results.pass++; }
    else { verdict = "fail"; results.fail++; note = `${eaxOk ? "" : `eax interp=0x${((interp.regs.eax>>>0)&mask).toString(16)} ported=0x${((regs.eax>>>0)&mask).toString(16)} `}${divMem >= 0 ? `mem@0x${divMem.toString(16)}` : ""}`; }
  }
  if (verdict !== "pass") results.details.push({ addr: sc.addr, verdict, note });
}

const mode = selfMode ? "SELF (capture-completeness)" : "interpreter-vs-ported";
console.log(`lockstep diff [${mode}] — ${fixturePath}`);
console.log(`  scenarios: ${scenarios.length}`);
console.log(`  pass=${results.pass}  fail=${results.fail}  win32=${results.win32}  error=${results.error}`);
const byAddr = {};
for (const d of results.details) (byAddr[d.addr] ||= []).push(d);
for (const [addr, ds] of Object.entries(byAddr)) {
  console.log(`  ${addr}: ${ds.map((d) => `${d.verdict}${d.note ? ` (${d.note})` : ""}${d.divMemAt ? ` @${d.divMemAt}` : ""}`).join(", ")}`);
}
process.exit(results.fail > 0 || results.error > 0 ? 1 : 0);
