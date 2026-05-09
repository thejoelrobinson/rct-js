#!/usr/bin/env node
// Bulk diff-test runner. Spawns one node subprocess per candidate via
// child_process so a hard wall-clock timeout can be enforced — pure-JS
// busy loops escape any in-process budget tripwire.
//
// For every "leaf" ported function (no FUN_xxx imports) with no parameters
// beyond `heap`, we shell out to tools/diff-one.js with the address and
// classify the result.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const PORTED = resolve(ROOT, "ported/auto");
const REPORT = resolve(HERE, "bulk-diff-report.json");
const ONE = resolve(HERE, "diff-one.js");

const args = process.argv.slice(2);
let limit = Infinity;
let budget = 200_000;
let timeoutMs = 3000;
let includeDeps = false;     // include functions with FUN_xxx imports
let multiArg = false;        // include multi-arg functions (pass zeros)
let includeVoid = false;     // include void-return functions (memory-diff mode)
for (const a of args) {
  if (a.startsWith("--limit=")) limit = parseInt(a.slice(8), 10);
  else if (a.startsWith("--budget=")) budget = parseInt(a.slice(9), 10);
  else if (a.startsWith("--timeout=")) timeoutMs = parseInt(a.slice(10), 10);
  else if (a === "--include-deps") includeDeps = true;
  else if (a === "--multi-arg") multiArg = true;
  else if (a === "--include-void") includeVoid = true;
  // --all: include all return-valued functions (deps + multi-arg).
  // --include-void must be opted in separately — memory-hash comparisons are
  // sensitive to memory-layout differences and produce many false positives.
  else if (a === "--all") { includeDeps = true; multiArg = true; }
}

const C_DIR = resolve(ROOT, "decompiled/c");
const excluded = { void: 0, registers: 0, multiArg: 0, deps: 0 };
const candidates = [];
// Match `let unaff_NAME` and `let in_REGISTER` (Ghidra's "register live on
// entry" markers). Functions with these need real x86 register state at
// entry; the zero-input harness can't drive them, so loops walk into the
// data section and spin forever.
const REG_PATTERN = /let (unaff_[A-Z]+|in_(?:E[A-D]X|E[SD]I|EBP|ESP|C[LH]|[A-D][LH]|[A-D]X|BP|SI|DI))\b/;
for (const f of readdirSync(PORTED)) {
  if (!f.endsWith(".js") || f === "_dispatch.js") continue;
  const src = readFileSync(resolve(PORTED, f), "utf8");
  if (!includeDeps && /import \{ FUN_/.test(src)) { excluded.deps++; continue; }
  const sigMatch = src.match(/export function FUN_[0-9a-f]+\((heap[^)]*)\)/);
  if (!sigMatch) continue;
  const params = sigMatch[1].split(",").map(s => s.trim());
  const _extraArgCount = params.length - 1; // params beyond `heap`
  if (_extraArgCount > 0 && !multiArg) { excluded.multiArg++; continue; }
  // Skip functions that depend on caller register state — fundamentally
  // untestable in this harness. Reported separately from coverage filters.
  if (REG_PATTERN.test(src)) { excluded.registers++; continue; }
  // Void-return functions: in default mode their eax is undefined, so we
  // skip. With --include-void, diff-one switches to memory-mutation hash
  // comparison (see voidMode handling).
  if (!includeVoid) {
    const cPath = resolve(C_DIR, f.replace(/\.js$/, ".c"));
    try {
      const cSrc = readFileSync(cPath, "utf8");
      if (/^\s*void\s+FUN_/m.test(cSrc)) { excluded.void++; continue; }
    } catch {}
  }
  candidates.push({ addr: parseInt(f.replace(/\.js$/, ""), 16), extraArgs: _extraArgCount });
}
candidates.sort((a, b) => a.addr - b.addr);
if (candidates.length > limit) candidates.length = limit;
console.log(`Bulk diff-test: ${candidates.length} candidate leaf functions, budget=${budget}, timeout=${timeoutMs}ms`);
console.log(`  excluded: ${excluded.deps} have FUN_ deps, ${excluded.multiArg} multi-arg, ${excluded.registers} need register state, ${excluded.void} void-return`);

const results = { ok: [], throwBoth: [], mismatch: [], throwPortedOnly: [], throwInterpOnly: [], timedOut: [] };

let i = 0;
const t0 = Date.now();
for (const c of candidates) {
  i++;
  if (i % 25 === 0) {
    const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
    console.log(`  progress: ${i}/${candidates.length}  (${elapsed}s)`);
  }
  const r = runOne(c.addr, c.extraArgs);
  results[r.bucket].push({ addr: `0x${c.addr.toString(16)}`, ...r });
}

const N = candidates.length;
const totalSec = ((Date.now() - t0) / 1000).toFixed(1);
const _consistent = results.ok.length + results.throwBoth.length + results.throwInterpOnly.length;
console.log(`\n=== Results (${N}) in ${totalSec}s ===`);
console.log(`  ok                : ${results.ok.length}  (${(results.ok.length/N*100).toFixed(1)}%)`);
console.log(`  throw-both        : ${results.throwBoth.length}`);
console.log(`  throw-interp-only : ${results.throwInterpOnly.length}`);
console.log(`  --- consistent    : ${_consistent}  (${(_consistent/N*100).toFixed(1)}%) ---`);
console.log(`  mismatch          : ${results.mismatch.length}`);
console.log(`  throw-ported-only : ${results.throwPortedOnly.length}`);
console.log(`  timed-out         : ${results.timedOut.length}`);

const errorBuckets = new Map();
for (const r of [...results.throwPortedOnly, ...results.throwBoth]) {
  if (!r.portedErr) continue;
  const sig = r.portedErr.split("\n")[0].slice(0, 100);
  errorBuckets.set(sig, (errorBuckets.get(sig) || 0) + 1);
}
if (errorBuckets.size > 0) {
  console.log(`\n=== Top ported-error buckets ===`);
  const sorted = [...errorBuckets.entries()].sort((a, b) => b[1] - a[1]);
  for (const [msg, count] of sorted.slice(0, 12)) {
    console.log(`  ${String(count).padStart(4)}  ${msg}`);
  }
}

const consistent = results.ok.length + results.throwBoth.length + results.throwInterpOnly.length;
writeFileSync(REPORT, JSON.stringify({
  summary: {
    total: N,
    ok: results.ok.length,
    okRate: (results.ok.length / N * 100).toFixed(1) + "%",
    consistent,
    consistencyRate: (consistent / N * 100).toFixed(1) + "%",
    throwBoth: results.throwBoth.length,
    mismatch: results.mismatch.length,
    throwPortedOnly: results.throwPortedOnly.length,
    throwInterpOnly: results.throwInterpOnly.length,
    timedOut: results.timedOut.length,
    elapsedSec: Number(totalSec),
  },
  excluded,
  errorBuckets: [...errorBuckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30).map(([msg, count]) => ({ count, msg })),
  samples: {
    mismatch: results.mismatch.slice(0, 30),
    throwPortedOnly: results.throwPortedOnly.slice(0, 30),
    timedOut: results.timedOut.slice(0, 30),
  },
}, null, 2));
console.log(`\nFull report: ${REPORT}`);

function runOne(addr, extraArgs = 0) {
  const argv = [ONE, `--addr=0x${addr.toString(16)}`, `--budget=${budget}`];
  if (extraArgs > 0) argv.push(`--args=${Array(extraArgs).fill("0").join(",")}`);
  const r = spawnSync(process.execPath, argv, {
    timeout: timeoutMs,
    encoding: "utf8",
  });

  if (r.error && r.error.code === "ETIMEDOUT") {
    return { bucket: "timedOut", portedErr: `wallclock ${timeoutMs}ms` };
  }
  if (r.signal === "SIGTERM" || r.status === null) {
    return { bucket: "timedOut", portedErr: `killed (${r.signal || "no exit"})` };
  }
  let parsed;
  const m = r.stdout?.match(/===DIFF_ONE_RESULT===([\s\S]*?)===END===/);
  if (!m) return { bucket: "timedOut", portedErr: `no result sentinel; stdout: ${r.stdout?.slice(0, 80)} | stderr: ${r.stderr?.slice(0, 80)}` };
  try { parsed = JSON.parse(m[1]); }
  catch { return { bucket: "timedOut", portedErr: `unparseable JSON: ${m[1].slice(0, 80)}` }; }

  const { interpEax, interpErr, portedVal, portedErr, voidMode, interpMemHash, portedMemHash } = parsed;
  if (interpErr && portedErr) return { bucket: "throwBoth", interpErr, portedErr };
  if (portedErr) {
    if (portedErr.startsWith("budget exceeded")) return { bucket: "timedOut", portedErr };
    return { bucket: "throwPortedOnly", portedErr, interpEax };
  }
  if (interpErr) return { bucket: "throwInterpOnly", interpErr, portedVal };
  // Void-return mode: compare memory-mutation hashes instead of eax.
  if (voidMode) {
    if (interpMemHash === portedMemHash) return { bucket: "ok", val: interpMemHash };
    return { bucket: "mismatch", interpMemHash, portedMemHash };
  }
  if (interpEax === portedVal) return { bucket: "ok", val: interpEax };
  return { bucket: "mismatch", interpEax, portedVal };
}
