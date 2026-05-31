#!/usr/bin/env node
// Phase 2 — semantic atlas builder.
//
// Cross-references three sources to turn opaque FUN_xxxxxxxx addresses into
// understood, field-aware entries:
//   (b) OpenRCT2 RCT1.h struct offset annotations  → offset→field maps
//   (a) the dynamic call graph + struct-access scan → which fns touch which struct
//   (c) consolidated existing address→meaning notes → seed names
//
// This step (--structs) does source (b) only: parse RCT1.h into a struct
// offset→field map and validate against known-good offsets. Later steps add
// (a) access-scanning and (c) note-consolidation into tools/atlas.json.
//
// OpenRCT2 is the ANSWER KEY (RCT1 structs match exactly: Peep 0x100, Ride
// 0x260); the interpreter oracle remains the only correctness authority.
//
// Usage:
//   node tools/atlas-build.js --structs        # parse + validate RCT1.h offsets
//   node tools/atlas-build.js --structs --out=tools/struct-offsets.json

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const RCT1_H = "/Users/joelrobinson/Desktop/RCTycoon-WASM/openrct2-src/src/openrct2/rct1/RCT1.h";

// Structs whose RCT1 memory layout we care about, with their authoritative
// sizes (from RCT1.h static_asserts) for validation, and the runtime base
// address of their array in the JS-port heap (from the project's @manual notes).
const STRUCTS = {
  Peep:   { size: 0x100, arrayBase: 0x743b94, stride: 0x100 },
  Ride:   { size: 0x260, arrayBase: 0x887420, stride: 0x260 },
  Entity: { size: 0x100, arrayBase: null,     stride: 0x100 },
};

// A field annotation line:  <type...> <Name>[opt array];  // 0xNN  [opt comment]
// Capture: the field name (last identifier before the [array]/;), the offset.
const FIELD_RE = /^\s*([A-Za-z_][\w:<>,\s\*&]*?)\s+([A-Za-z_]\w*)\s*(\[[^\]]*\]|\{[^}]*\})?\s*;\s*\/\/\s*(0x[0-9A-Fa-f]+)\b(.*)$/;

function parseStruct(src, name) {
  const startRe = new RegExp(`struct\\s+${name}\\b`);
  const lines = src.split("\n");
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (startRe.test(lines[i])) { start = i; break; }
  }
  if (start < 0) return null;
  // End at the struct's static_assert(sizeof(Name) ...) or the next `struct `.
  const endRe = new RegExp(`static_assert\\(sizeof\\(${name}\\)`);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (endRe.test(lines[i]) || /^\s*struct\s+\w/.test(lines[i])) { end = i; break; }
  }
  const fields = [];
  for (let i = start; i < end; i++) {
    const m = lines[i].match(FIELD_RE);
    if (!m) continue;
    const [, type, fname, arr, off, rest] = m;
    fields.push({
      offset: parseInt(off, 16),
      name: fname,
      type: type.trim().replace(/\s+/g, " "),
      array: arr || null,
      note: rest.trim() || null,
    });
  }
  fields.sort((a, b) => a.offset - b.offset);
  return { startLine: start + 1, endLine: end + 1, fields };
}

const args = process.argv.slice(2);
const outPath = (args.find((a) => a.startsWith("--out=")) || "").slice(6) || "tools/struct-offsets.json";

if (args.includes("--structs")) {
  let src;
  try { src = readFileSync(RCT1_H, "utf8"); }
  catch (e) { console.error(`cannot read RCT1.h at ${RCT1_H}: ${e.message}`); process.exit(1); }

  const out = { source: RCT1_H, structs: {} };
  for (const [name, meta] of Object.entries(STRUCTS)) {
    const parsed = parseStruct(src, name);
    if (!parsed) { console.error(`struct ${name} not found`); continue; }
    out.structs[name] = { ...meta, fieldCount: parsed.fields.length, fields: parsed.fields };
  }

  // --- validation against known-good offsets (catches parser drift) ---
  const expect = [
    ["Peep", 0x2b, "State"], ["Peep", 0x3a, "Happiness"], ["Peep", 0x3e, "Hunger"],
    ["Peep", 0x2c, "SubState"], ["Peep", 0xa0, "CashInPocket"],
  ];
  let ok = 0, fail = 0;
  const byOff = (st, off) => (out.structs[st]?.fields || []).find((f) => f.offset === off);
  for (const [st, off, expName] of expect) {
    const f = byOff(st, off);
    if (f && f.name === expName) { ok++; }
    else { fail++; console.error(`VALIDATION FAIL ${st}@0x${off.toString(16)} expected ${expName}, got ${f ? f.name : "(none)"}`); }
  }
  writeFileSync(resolve(ROOT, outPath), JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ${outPath}`);
  for (const [name, s] of Object.entries(out.structs)) {
    console.log(`  ${name.padEnd(8)} ${s.fieldCount} annotated fields (size 0x${s.size.toString(16)}, array @ ${s.arrayBase ? "0x" + s.arrayBase.toString(16) : "n/a"})`);
  }
  console.log(`validation: ${ok} ok, ${fail} fail`);
  process.exit(fail > 0 ? 1 : 0);
}

if (args.includes("--assemble")) {
  // Merge three sources into tools/atlas.json:
  //   (b) struct-offsets.json  — offset→field maps (run --structs first)
  //   (a) access scan          — which fns reference a struct array base, and
  //                              which offset literals they use (→ field labels)
  //   (c) subsystem map        — subsystems.json (uses dynamic graph)
  //   (c) seed names           — the known address→meaning mappings
  const structOffsets = JSON.parse(readFileSync(resolve(ROOT, "tools/struct-offsets.json"), "utf8"));
  const subs = JSON.parse(readFileSync(resolve(ROOT, "tools/subsystems.json"), "utf8"));

  // Known address→meaning seeds (source c) — consolidated from CLAUDE.md /
  // @manual headers / subsystems.config / memory. confidence: 'known'.
  const SEEDS = {
    "0x4385d8": "tick entry / sprite-update gate",
    "0x402bef": "tick cycle mgmt",
    "0x40179d": "per-tick paint flush (GdiFlush)",
    "0x5d94b6": "peep update / AI loop",
    "0x9b438b": "sprite dispatch (RLE/bitmap blit)",
    "0x9b4457": "sprite dispatch w/ palette remap",
    "0x9b4660": "RLE row decoder",
    "0x9b4911": "bitmap row decoder",
    "0x421d2c": "per-element terrain painter",
    "0x42f4be": "scenario (.sc4) loader",
    "0x42f98e": "RLE decompressor",
    "0x42f3a2": "post-load fixup",
  };

  // address → owning subsystem (invert subsystems.json).
  const ownerOf = {};
  for (const [sub, rec] of Object.entries(subs.subsystems)) {
    for (const fn of rec.functions) ownerOf[fn] = sub;
  }

  // Access scan: for each ported fn file, which struct array bases it
  // references, and which in-range offset literals it uses.
  const AUTO = resolve(ROOT, "ported/auto");
  const baseToStruct = {};
  for (const [name, s] of Object.entries(structOffsets.structs)) {
    if (s.arrayBase) baseToStruct["0x" + s.arrayBase.toString(16)] = name;
  }
  const offsetLitRe = /\b0x([0-9a-fA-F]{1,3})\b/g;
  const fieldByOffset = (struct, off) =>
    (structOffsets.structs[struct]?.fields || []).find((f) => f.offset === off);

  const access = {}; // addr → { structs:Set, fields:Set }
  for (const fname of readdirSync(AUTO)) {
    const m = fname.match(/^([0-9a-fA-F]+)\.js$/);
    if (!m) continue;
    const addr = "0x" + parseInt(m[1], 16).toString(16);
    const src = readFileSync(resolve(AUTO, fname), "utf8");
    const touched = [];
    for (const [base, struct] of Object.entries(baseToStruct)) {
      if (src.includes(base)) touched.push(struct);
    }
    if (!touched.length) continue;
    // Collect offset literals and label any that match a field of a touched struct.
    const fields = new Set();
    let lit;
    offsetLitRe.lastIndex = 0;
    while ((lit = offsetLitRe.exec(src)) !== null) {
      const off = parseInt(lit[1], 16);
      for (const struct of touched) {
        const f = fieldByOffset(struct, off);
        if (f) fields.add(`${struct}.${f.name}`);
      }
    }
    access[addr] = { structs: touched, fields: [...fields].sort() };
  }

  // Assemble per-address atlas entries for anything with ANY meaning.
  const atlas = {};
  const allAddrs = new Set([...Object.keys(SEEDS), ...Object.keys(access), ...Object.keys(ownerOf)]);
  for (const addr of allAddrs) {
    const owner = ownerOf[addr] || "unknown";
    if (!SEEDS[addr] && !access[addr] && (owner === "unreached" || owner === "unknown")) continue;
    atlas[addr] = {
      addr,
      name: SEEDS[addr] || null,
      subsystem: owner,
      touchesStructs: access[addr]?.structs || [],
      touchesFields: access[addr]?.fields || [],
      confidence: SEEDS[addr] ? "known" : (access[addr] ? "behavioral" : "subsystem-only"),
    };
  }

  const out = {
    meta: {
      generated: "node tools/atlas-build.js --assemble",
      structSource: structOffsets.source,
      entries: Object.keys(atlas).length,
      withName: Object.values(atlas).filter((e) => e.name).length,
      withFields: Object.values(atlas).filter((e) => e.touchesFields.length).length,
    },
    structOffsets: structOffsets.structs,
    atlas,
  };
  writeFileSync(resolve(ROOT, "tools/atlas.json"), JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote tools/atlas.json: ${out.meta.entries} entries, ${out.meta.withName} named, ${out.meta.withFields} with field-level access`);
  // peep/ride function rosters (behavioral identification)
  const peepFns = Object.values(atlas).filter((e) => e.touchesStructs.includes("Peep")).map((e) => e.addr);
  const rideFns = Object.values(atlas).filter((e) => e.touchesStructs.includes("Ride")).map((e) => e.addr);
  console.log(`  Peep-touching fns (${peepFns.length}): ${peepFns.slice(0, 12).join(" ")}${peepFns.length > 12 ? " …" : ""}`);
  console.log(`  Ride-touching fns (${rideFns.length}): ${rideFns.slice(0, 12).join(" ")}${rideFns.length > 12 ? " …" : ""}`);
  process.exit(0);
}

if (args.includes("--match")) {
  // (c-identity) Upgrade `behavioral` atlas entries to *named* by matching each
  // rct-js fn's field-access signature against OpenRCT2's NAMED functions.
  //
  // OpenRCT2 member fns (Guest::UpdateHunger etc.) access Peep/Ride fields by
  // bare name. We extract, per OpenRCT2 fn, the set of struct field names in its
  // body, then score it against each atlas entry's touchesFields (prefix stripped)
  // by overlap. Best match above a threshold → candidate name + openrct2Ref.
  //
  // This NAMES addresses; it does NOT verify them — the interpreter oracle does
  // that in Phase 3. A match is a hypothesis with a confidence score.
  const atlasDoc = JSON.parse(readFileSync(resolve(ROOT, "tools/atlas.json"), "utf8"));
  const structOffsets = JSON.parse(readFileSync(resolve(ROOT, "tools/struct-offsets.json"), "utf8"));

  // All known field names per struct (for identifier matching in OpenRCT2 src).
  const fieldNames = {};
  for (const [st, s] of Object.entries(structOffsets.structs)) {
    fieldNames[st] = new Set(s.fields.map((f) => f.name));
  }

  const OPENRCT2 = "/Users/joelrobinson/Desktop/RCTycoon-WASM/openrct2-src/src/openrct2";
  const SOURCES = [
    { file: "entity/Guest.cpp", struct: "Peep" },
    { file: "entity/Peep.cpp", struct: "Peep" },
    { file: "peep/GuestPathfinding.cpp", struct: "Peep" },
    { file: "ride/Ride.cpp", struct: "Ride" },
  ];

  // Parse a .cpp into top-level function bodies: `RetType Class::Method(...) { ... }`.
  // Brace-count from the signature's opening { to its matching close.
  function parseFunctions(src) {
    const fns = [];
    const sigRe = /(?:^|\n)[ \t]*(?:static\s+)?[A-Za-z_][\w:<>,\s\*&]*?\b([A-Za-z_]\w*)::([A-Za-z_]\w*)\s*\([^;{]*?\)\s*(?:const\s*)?\{/g;
    let m;
    while ((m = sigRe.exec(src)) !== null) {
      const cls = m[1], method = m[2];
      let i = src.indexOf("{", m.index + m[0].length - 1);
      if (i < 0) continue;
      let depth = 0, j = i;
      for (; j < src.length; j++) {
        if (src[j] === "{") depth++;
        else if (src[j] === "}") { depth--; if (depth === 0) { j++; break; } }
      }
      fns.push({ name: `${cls}::${method}`, body: src.slice(i, j) });
      sigRe.lastIndex = j;
    }
    return fns;
  }

  // Build OpenRCT2 fn → field-name signature.
  const orFns = [];
  for (const { file, struct } of SOURCES) {
    let src;
    try { src = readFileSync(resolve(OPENRCT2, file), "utf8"); }
    catch { console.error(`skip ${file} (not found)`); continue; }
    const names = fieldNames[struct];
    for (const fn of parseFunctions(src)) {
      const sig = new Set();
      // word-boundary identifier scan, keep those that are struct fields
      for (const id of fn.body.match(/\b[A-Za-z_]\w*\b/g) || []) {
        if (names.has(id)) sig.add(id);
      }
      if (sig.size >= 2) orFns.push({ name: fn.name, file, struct, sig });
    }
  }
  console.error(`[match] parsed ${orFns.length} OpenRCT2 fns with >=2 field accesses`);

  // Jaccard-ish overlap: |A∩B| / |A∪B|, but bias toward covering the atlas
  // entry's fields (precision on our side matters more than OpenRCT2 breadth).
  function score(atlasFields, orSig) {
    if (!atlasFields.size || !orSig.size) return 0;
    let inter = 0;
    for (const f of atlasFields) if (orSig.has(f)) inter++;
    const union = atlasFields.size + orSig.size - inter;
    const jaccard = inter / union;
    const coverage = inter / atlasFields.size; // how much of OUR fields OpenRCT2 explains
    return 0.5 * jaccard + 0.5 * coverage;
  }

  let named = 0, ambiguous = 0;
  const THRESH = 0.34;
  for (const [addr, entry] of Object.entries(atlasDoc.atlas)) {
    if (!entry.touchesFields.length) continue;
    if (entry.confidence === "known") continue; // don't override seeds
    // bare field names for THIS entry, partitioned by struct
    const myFields = {};
    for (const tf of entry.touchesFields) {
      const [st, fld] = tf.split(".");
      (myFields[st] ||= new Set()).add(fld);
    }
    let best = null, second = 0;
    for (const orFn of orFns) {
      const mine = myFields[orFn.struct];
      if (!mine) continue;
      const sc = score(mine, orFn.sig);
      if (!best || sc > best.score) { second = best ? best.score : 0; best = { ...orFn, score: sc }; }
      else if (sc > second) second = sc;
    }
    if (best && best.score >= THRESH) {
      entry.candidateName = best.name;
      entry.openrct2Ref = best.file;
      entry.matchScore = Math.round(best.score * 100) / 100;
      entry.matchMargin = Math.round((best.score - second) * 100) / 100;
      entry.confidence = best.matchMargin <= 0.05 ? "matched-weak" : "matched";
      if (entry.matchMargin <= 0.05) ambiguous++;
      named++;
    }
  }

  atlasDoc.meta.matched = named;
  atlasDoc.meta.matchedAmbiguous = ambiguous;
  atlasDoc.meta.matchSources = SOURCES.map((s) => s.file);
  writeFileSync(resolve(ROOT, "tools/atlas.json"), JSON.stringify(atlasDoc, null, 2) + "\n");
  console.log(`matched ${named} entries to OpenRCT2 fns (${ambiguous} weak/ambiguous). Top matches:`);
  const top = Object.values(atlasDoc.atlas)
    .filter((e) => e.candidateName)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 15);
  for (const e of top) {
    console.log(`  ${e.addr} → ${e.candidateName}  (score ${e.matchScore}, margin ${e.matchMargin}, ${e.confidence})  [${e.touchesFields.length} fields]`);
  }
  process.exit(0);
}

console.error("specify a step: --structs | --assemble | --match");
process.exit(1);
