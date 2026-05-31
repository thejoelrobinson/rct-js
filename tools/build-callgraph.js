#!/usr/bin/env node
// Build a static call graph of the ported corpus from import edges.
//
// Each ported/auto/<addr>.js file imports the FUN_ symbols it calls
// (`import { FUN_00401120 } from "./401120.js"`), so its import set IS its
// direct-callee set. That covers all statically-resolved calls. Indirect
// calls go through `callIndirect(heap, heap.u32(<ptr>))` whose target is a
// runtime value — those edges can't be recovered from imports, so we
// supplement them from two sources:
//   1. lifter/extra-entries.json — the CODESEG painter jumptables Ghidra
//      couldn't follow (grouped by `_table`).
//   2. tools/subsystems.config.json `indirectEdges` — hand-curated
//      dispatcher -> [targets] edges for the known runtime jumptables
//      (sprite-class, per-sprite-update, input-mode, ...).
//
// Output: tools/callgraph.json
//   { nodes: { "0x401000": { name, file, section, callees:[...] }, ... },
//     indirectEdges: { "<dispatcher>": ["<target>", ...] },
//     meta: { generatedFromCommit?, fileCount, edgeCount } }
//
// Usage: node tools/build-callgraph.js [--out=tools/callgraph.json]

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const AUTO = resolve(ROOT, "ported/auto");

let outPath = "tools/callgraph.json";
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--out=")) outPath = a.slice(6);
}

const norm = (hex) => "0x" + parseInt(hex, 16).toString(16);

// --- 1. static import edges from ported/auto/*.js ------------------------
const IMPORT_RE = /import\s*\{\s*FUN_([0-9a-fA-F]+)\s*\}\s*from\s*"\.\/([0-9a-fA-F]+)\.js"/g;
const FILE_RE = /^([0-9a-fA-F]+)\.js$/;

const nodes = {};
let edgeCount = 0;

for (const fname of readdirSync(AUTO)) {
  const m = fname.match(FILE_RE);
  if (!m) continue; // skip _dispatch.js, extra_paint_*.js, etc.
  const addr = norm(m[1]);
  const src = readFileSync(resolve(AUTO, fname), "utf8");
  const callees = new Set();
  let im;
  IMPORT_RE.lastIndex = 0;
  while ((im = IMPORT_RE.exec(src)) !== null) {
    callees.add(norm(im[1]));
  }
  const manual = src.startsWith("// @manual");
  nodes[addr] = {
    name: `FUN_${m[1].toLowerCase()}`,
    file: `ported/auto/${fname}`,
    section: parseInt(m[1], 16) >= 0x9b0000 ? "CODESEG" : "text",
    manual,
    callees: [...callees].sort(),
  };
  edgeCount += callees.size;
}

// --- 2. CODESEG painter jumptable groups from extra-entries.json ---------
// These are painter targets reached via DAT_00991f88-indexed tables. We
// can't see the dispatcher address here (the table is a PTR_LAB label), so
// we record the painters as nodes grouped by their table; the dispatcher
// edge is added via subsystems.config.json indirectEdges.
const extraGroups = {};
try {
  const extra = JSON.parse(readFileSync(resolve(ROOT, "lifter/extra-entries.json"), "utf8"));
  for (const e of extra) {
    if (!e.addr) continue;
    const addr = norm(e.addr.replace(/^0x/, ""));
    (extraGroups[e._table] ||= []).push(addr);
    if (!nodes[addr]) {
      nodes[addr] = { name: e.name, file: null, section: e.section || "CODESEG", manual: false, callees: [] };
    }
  }
} catch (err) {
  process.stderr.write(`[build-callgraph] extra-entries.json: ${err.message}\n`);
}

// --- 3. hand-curated indirect dispatcher edges ---------------------------
let indirectEdges = {};
try {
  const cfg = JSON.parse(readFileSync(resolve(ROOT, "tools/subsystems.config.json"), "utf8"));
  const rawIndirect = cfg.indirectEdges || {};
  // Expand any "$table:PTR_LAB_xxx" references to the extra-entries group.
  // Skip underscore-prefixed comment keys and non-array values.
  for (const [disp, targets] of Object.entries(rawIndirect)) {
    if (disp.startsWith("_") || !Array.isArray(targets)) continue;
    indirectEdges[norm(disp.replace(/^0x/, ""))] = targets.flatMap((t) =>
      t.startsWith("$table:") ? (extraGroups[t.slice(7)] || []) : [norm(t.replace(/^0x/, ""))]
    );
  }
} catch (err) {
  process.stderr.write(`[build-callgraph] no subsystems.config.json indirectEdges yet (${err.message})\n`);
}

const out = {
  meta: { fileCount: Object.keys(nodes).length, edgeCount, tables: Object.keys(extraGroups).length },
  extraGroups,
  indirectEdges,
  nodes,
};

writeFileSync(resolve(ROOT, outPath), JSON.stringify(out, null, 2) + "\n");
console.log(`wrote ${outPath}: ${out.meta.fileCount} nodes, ${edgeCount} static edges, ` +
  `${Object.keys(extraGroups).length} painter tables, ${Object.keys(indirectEdges).length} indirect dispatchers`);
