#!/usr/bin/env node
// Phase 1 — dynamic call-graph trace.
//
// The static graph (tools/build-callgraph.js) only sees `import { FUN_xxx }`
// edges and misses all indirect (function-pointer) calls. But in the JS port
// EVERY indirect call funnels through `callIndirect()` in runtime/win32/context.js,
// which we hook (globalThis.__indirectHook). The caller is recovered from the JS
// stack (ported fns are named FUN_xxxxxxxx); the callee is the resolved address.
//
// This sidesteps bridging the x86 interpreter into Win32: the JS port already
// runs a real tick with working shims, so we trace there. We capture indirect
// edges across init + a title tick (+ optional gameplay tick via skipTitleIntro)
// and MERGE them into the static graph → tools/dynamic-callgraph.json, which
// cluster-subsystems.js consumes unchanged.
//
// Usage:
//   node tools/trace-callgraph.js                 # init + title tick(s)
//   node tools/trace-callgraph.js --gameplay      # also skipTitleIntro + ticks (slow)
//   node tools/trace-callgraph.js --ticks=3 --out=tools/dynamic-callgraph.json

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let ticks = 2, gameplay = false, outPath = "tools/dynamic-callgraph.json", painterCap = 20000;
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--ticks=")) ticks = parseInt(a.slice(8), 10);
  else if (a === "--gameplay") gameplay = true;
  else if (a.startsWith("--out=")) outPath = a.slice(6);
  else if (a.startsWith("--painter-cap=")) painterCap = parseInt(a.slice(14), 10);
}
// Cap the per-painter interpreter step budget so a gameplay tick RETURNS (the
// painters render wrong under the cap, but we only need the CALL EDGES, which
// fire before the cap bites). Without this, --gameplay never finishes. The
// painter-bridge reads this global (default 50M when unset).
if (gameplay) globalThis.__painterStepLimit = painterCap;

// Determinism (same monotonic-clock trick as replay-runner) — install before imports.
let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

// --- the indirect-edge recorder. Map<callerHex, Map<calleeHex, {resolved,count}>> ---
const dynEdges = new Map();
let totalIndirect = 0, unresolved = 0;
const CALLER_RE = /FUN_([0-9a-fA-F]{5,8})\b/;
globalThis.__indirectHook = (callee, resolved) => {
  totalIndirect++;
  if (!resolved) unresolved++;
  // Walk the JS stack for the nearest ported-function frame = the caller.
  const stack = new Error().stack;
  let caller = "0xunknown";
  if (stack) {
    const lines = stack.split("\n");
    // skip frame 0 (Error) + frame 1 (this hook) + frame 2 (callIndirect itself)
    for (let i = 2; i < lines.length; i++) {
      const m = lines[i].match(CALLER_RE);
      if (m) { caller = "0x" + parseInt(m[1], 16).toString(16); break; }
    }
  }
  const calleeHex = "0x" + (callee >>> 0).toString(16);
  let inner = dynEdges.get(caller);
  if (!inner) { inner = new Map(); dynEdges.set(caller, inner); }
  const rec = inner.get(calleeHex) || { resolved, count: 0 };
  rec.count++; rec.resolved = rec.resolved || resolved;
  inner.set(calleeHex, rec);
};

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
const log = (m) => process.stderr.write(`[trace] ${m}\n`);

log("createRuntime + runInit (captures init-time indirect edges)...");
const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch (e) { log(`runInit threw: ${(e.message || e).slice(0, 120)}`); }
try { r.runTick(); } catch (e) { log(`first runTick threw: ${(e.message || e).slice(0, 120)}`); }
skipFadeIn(r.heap);

log(`title ticks x${ticks}...`);
for (let i = 0; i < ticks; i++) { try { r.runTick(); } catch (e) { log(`tick ${i}: ${(e.message || e).slice(0, 80)}`); } }

if (gameplay) {
  log("skipTitleIntro + gameplay ticks (slow — interpreter-fallback painters)...");
  skipTitleIntro(r.heap);
  for (let i = 0; i < ticks; i++) { try { r.runTick(); } catch (e) { log(`gtick ${i}: ${(e.message || e).slice(0, 80)}`); } }
}

log(`captured ${totalIndirect} indirect calls (${unresolved} unresolved) across ${dynEdges.size} callers`);

// --- merge into the static graph ---
let staticCg;
try {
  staticCg = JSON.parse(readFileSync(resolve(ROOT, "tools/callgraph.json"), "utf8"));
} catch (e) {
  log("no tools/callgraph.json — run `node tools/build-callgraph.js` first"); process.exit(1);
}

const nodes = staticCg.nodes;
let addedEdges = 0, newCalleeNodes = 0;
for (const [caller, inner] of dynEdges) {
  if (caller === "0xunknown") continue;
  let node = nodes[caller];
  if (!node) continue; // caller not a known ported fn (shouldn't happen)
  const callees = new Set(node.callees);
  node.dynamicCallees = node.dynamicCallees || [];
  const dynSet = new Set(node.dynamicCallees);
  for (const [callee, rec] of inner) {
    if (!callees.has(callee) && !dynSet.has(callee)) {
      node.dynamicCallees.push(callee);
      dynSet.add(callee);
      addedEdges++;
    }
    // Ensure the callee exists as a node so reachability can traverse it.
    if (!nodes[callee] && rec.resolved) {
      const hx = callee.slice(2).padStart(6, "0");
      nodes[callee] = { name: `FUN_${hx}`, file: null, section: parseInt(callee, 16) >= 0x9b0000 ? "CODESEG" : "text", manual: false, callees: [], dynamicCallees: [], fromDynamic: true };
      newCalleeNodes++;
    }
  }
}

// cluster-subsystems.js follows `callees`; fold dynamic edges into a combined
// view it can consume. We keep them separate AND merged: `callees` stays the
// static set; add `allCallees` = static ∪ dynamic for traversal.
for (const [addr, node] of Object.entries(nodes)) {
  node.allCallees = [...new Set([...(node.callees || []), ...(node.dynamicCallees || [])])].sort();
}

const out = {
  meta: {
    ...staticCg.meta,
    dynamic: { indirectCalls: totalIndirect, unresolved, callers: dynEdges.size, addedEdges, newCalleeNodes, gameplay, ticks },
    note: "static callgraph.json + dynamic indirect edges. `allCallees` = static ∪ dynamic; cluster-subsystems should traverse allCallees.",
  },
  extraGroups: staticCg.extraGroups,
  indirectEdges: staticCg.indirectEdges,
  nodes,
};
writeFileSync(resolve(ROOT, outPath), JSON.stringify(out, null, 2) + "\n");
log(`wrote ${outPath}: +${addedEdges} dynamic edges, +${newCalleeNodes} new callee nodes`);
console.log(`dynamic trace: ${totalIndirect} indirect calls, +${addedEdges} edges static graph missed, +${newCalleeNodes} newly-reachable nodes`);
