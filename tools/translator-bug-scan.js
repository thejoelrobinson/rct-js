#!/usr/bin/env node
// tools/translator-bug-scan.js — static fingerprint scan over ported/auto/*.js
//
// Looks for known translator-class bugs without running the binary. The
// fingerprints come from the bug stories baked into the @manual files
// (the recurring fixes Phase 5 keeps re-applying by hand).
//
// Fingerprints (severity 1-3, 3 = highest):
//
//   F1: setU32(addr, x) followed within 3 lines by setU16(addr+2, y)
//       Indicates a packed u16/u32 field where the translator emitted
//       u32 stores for what should be u16. Severity 2. (9bb9f5.c family.)
//
//   F2: `let unaff_<REG> = regs.<reg>` at function top, where REG is
//       read in body without ever being assigned via `regs.<reg> =`
//       inside the function. Indicates unaff_REG smear missing.
//       Severity 3 for EBP (smear convention), 2 for ESI/EDI/EBX/EDX.
//
//   F3: `if (<cond>) { }` empty block — translator goto fell to a no-op.
//       Severity 2.
//
//   F4: `_gotoWarn(` call — explicit translator fallback for an
//       unsupported goto pattern. Severity 3.
//
//   F5: `heap.setU32(<framebuffer expr>, regs.<reg>)` — register
//       value written to a memory range that looks like a framebuffer
//       (puVar*, dest, ebp_target). Severity 3 (this is exactly the
//       9b30bc vertical-stripe bug fingerprint).
//
//   F6: a variable narrowed to UNSIGNED (`& 0xffff`, `& 0xff`, or `>>> 0`)
//       and then tested `< 0` — a provably-dead sign branch. The original C
//       compared a signed `short`/`char`/`int`; the translator masked it
//       unsigned, deleting the negative-clamp/sign branch. Severity 3.
//       Confirmed twice in production: 0x5e53ca and 0x444d07. Fix by
//       re-signing (`<<16>>16` short, `<<24>>24` char) instead of masking.
//       NOTE: static fingerprint only — a hit is a CANDIDATE, not a proven
//       live bug (0x5dcd40 has 4 F6 hits yet passes lockstep). Confirm at
//       runtime with tools/_lockstep-auto.mjs or tools/bulk-diff-test.js.
//
// Usage:
//   node tools/translator-bug-scan.js          # scan all ported/auto/*.js
//   node tools/translator-bug-scan.js 9b30bc   # scan one file
//
// Output:
//   /tmp/rct-translator-bugs.csv  — ranked: severity, file, line, fingerprint
//   stdout: top 20 by severity

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const PORTED_DIR = resolve(ROOT, "ported/auto");

const FILTER = process.argv[2];

// ---- fingerprint scanners ------------------------------------------------

// F1: setU32 then setU16(+2) within a few lines.
function scanF1(lines) {
  const hits = [];
  const setU32 = /heap\.setU32\(\s*([^,]+?),/;
  const setU16 = /heap\.setU16\(\s*([^,]+?),/;
  for (let i = 0; i < lines.length; i++) {
    const m32 = lines[i].match(setU32);
    if (!m32) continue;
    const base = m32[1].trim();
    for (let j = i + 1; j <= Math.min(i + 3, lines.length - 1); j++) {
      const m16 = lines[j].match(setU16);
      if (!m16) continue;
      const addr16 = m16[1].trim();
      // Match `<base>+2`, `<base> + 2`, `(<base>+2)`, `(<base> + 2) >>> 0`.
      const pattern = new RegExp(`^\\(?\\s*${escapeRe(base)}\\s*\\+\\s*2\\s*\\)?(\\s*>>>\\s*0)?$`);
      if (pattern.test(addr16)) {
        hits.push({ line: i + 1, kind: "F1", severity: 2,
                    note: `setU32 at line ${i + 1} then setU16(+2) at line ${j + 1} — likely packed u16` });
      }
    }
  }
  return hits;
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

// F2: unaff_<REG> read without later regs.<reg> = assignment.
function scanF2(lines, source) {
  const hits = [];
  const unaffDecl = /^\s*let\s+unaff_(EAX|EBX|ECX|EDX|ESI|EDI|EBP)\s*=\s*regs\.(eax|ebx|ecx|edx|esi|edi|ebp)/;
  const declared = new Map(); // reg -> line
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(unaffDecl);
    if (m) declared.set(m[1], i + 1);
  }
  for (const [reg, line] of declared) {
    const lower = reg.toLowerCase();
    // Find assignments to regs.<reg> = (excluding the initial `let unaff_X = regs.X` line).
    const writeRe = new RegExp(`\\bregs\\.${lower}\\s*=`);
    const hasWrite = lines.some((l, i) => i + 1 !== line && writeRe.test(l));
    if (!hasWrite) {
      hits.push({
        line,
        kind: "F2",
        severity: reg === "EBP" ? 3 : 2,
        note: `unaff_${reg} declared and never reassigned — caller-side propagation likely missing`,
      });
    }
  }
  return hits;
}

// F3: empty `if (...) { }` block. Allow whitespace and newlines.
function scanF3(text, lines) {
  const hits = [];
  const re = /if\s*\([^)]*\)\s*\{\s*\}/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const upto = text.slice(0, m.index);
    const line = upto.split("\n").length;
    hits.push({ line, kind: "F3", severity: 2,
                note: `empty if-block — translator goto fell through to a no-op` });
  }
  return hits;
}

// F4: _gotoWarn calls.
function scanF4(lines) {
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    if (/_gotoWarn\(/.test(lines[i])) {
      hits.push({ line: i + 1, kind: "F4", severity: 3,
                  note: `_gotoWarn — translator emitted soft-fail for unsupported goto` });
    }
  }
  return hits;
}

// F5: heap.setU32 with regs.<reg> RHS (any framebuffer-looking dest).
// Conservative: flag any setU32 where RHS is `regs.<reg>` exactly or `regs.<reg> >>> 0`.
function scanF5(lines) {
  const hits = [];
  const re = /heap\.setU32\(\s*([^,]+?)\s*,\s*regs\.(eax|ebx|ecx|edx|esi|edi|ebp)(\s*>>>\s*0)?\s*\)/;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(re);
    if (!m) continue;
    const dest = m[1].trim();
    // Looks like a framebuffer if dest is a local pointer variable (puVar*,
    // dest, ptr, fb*, *Out*) — not a fixed DAT address.
    if (/^(puVar|dest|ptr|fb|target|out|0x)/i.test(dest) || /\+/.test(dest) || /Var\d/.test(dest)) {
      hits.push({
        line: i + 1, kind: "F5", severity: 3,
        note: `setU32(${dest.slice(0, 32)}…, regs.${m[2]}) — register written into ptr range`,
      });
    }
  }
  return hits;
}

// F6: dead negative-clamp — a variable narrowed to UNSIGNED (`& 0xffff`,
// `& 0xff`, or `>>> 0`) and then tested `< 0` (or `<= -1`). After an unsigned
// narrow the value is provably >= 0 in JS, so the `< 0` branch is dead code.
// This is the signed-`short` bug class: Ghidra's source compared a signed
// `short`/`char`, but the translator masked it unsigned, silently deleting the
// negative-clamp / sign branch. Confirmed twice in production: 0x5e53ca (dirty
// rect clamp) and 0x444d07 (returned -300/0xfed4 instead of 0). To fix the
// flagged site, re-sign the value with `<<16>>16` (short) or `<<24>>24` (char)
// before the compare instead of masking it. Severity 3.
function scanF6(lines) {
  const hits = [];
  // an assignment whose RHS's final operation narrows to unsigned, ignoring
  // trailing close-parens / `;` / whitespace.
  const unsignedNarrowTail = /(&\s*0xffff|&\s*0xff|>>>\s*0)\s*\)*\s*;?\s*$/;
  const assignRe = /^\s*(?:let\s+|const\s+|var\s+)?([A-Za-z_$][\w$]*)\s*=\s*([^=].*)$/;
  // a provably-dead negative test on a bare variable: `X < 0` or `X <= -1`.
  const negTestRe = /\b([A-Za-z_$][\w$]*)\s*(?:<\s*0|<=\s*-1)\b/g;
  for (let i = 0; i < lines.length; i++) {
    let m;
    negTestRe.lastIndex = 0;
    while ((m = negTestRe.exec(lines[i])) !== null) {
      const v = m[1];
      // walk backward to the most-recent assignment of v.
      for (let j = i; j >= 0; j--) {
        // skip the comparison occurrence itself when it shares the line.
        const am = lines[j].match(assignRe);
        if (!am || am[1] !== v) continue;
        if (unsignedNarrowTail.test(am[2])) {
          hits.push({
            line: i + 1, kind: "F6", severity: 3,
            note: `${v} narrowed unsigned at line ${j + 1} then tested <0 at line ${i + 1} — dead sign branch (signed-short bug)`,
          });
        }
        break; // most-recent assignment decides; stop walking
      }
    }
  }
  return hits;
}

// ---- main ---------------------------------------------------------------

function listFiles() {
  const all = readdirSync(PORTED_DIR).filter(f => f.endsWith(".js") && !f.startsWith("_"));
  if (FILTER) return all.filter(f => f.includes(FILTER));
  return all;
}

function scanFile(file) {
  const path = join(PORTED_DIR, file);
  const text = readFileSync(path, "utf8");
  if (text.startsWith("// @manual")) return []; // skip hand-fixed files
  const lines = text.split("\n");
  return [
    ...scanF1(lines),
    ...scanF2(lines, text),
    ...scanF3(text, lines),
    ...scanF4(lines),
    ...scanF5(lines),
    ...scanF6(lines),
  ].map(h => ({ ...h, file }));
}

function main() {
  const files = listFiles();
  console.log(`scanning ${files.length} ported/auto/*.js files (skipping @manual)…`);
  const allHits = [];
  for (const f of files) allHits.push(...scanFile(f));
  allHits.sort((a, b) => b.severity - a.severity || a.file.localeCompare(b.file) || a.line - b.line);

  const csvRows = ["severity,file,line,kind,note"];
  for (const h of allHits) {
    const note = (h.note || "").replace(/[",\n]/g, " ").slice(0, 160);
    csvRows.push([h.severity, h.file, h.line, h.kind, `"${note}"`].join(","));
  }
  const out = "/tmp/rct-translator-bugs.csv";
  writeFileSync(out, csvRows.join("\n") + "\n");

  // Breakdown by kind.
  const byKind = new Map();
  for (const h of allHits) byKind.set(h.kind, (byKind.get(h.kind) || 0) + 1);
  console.log(`\n--- hits by fingerprint ---`);
  for (const [k, n] of [...byKind.entries()].sort()) console.log(`  ${k}: ${n}`);

  console.log(`\n--- top 20 by severity ---`);
  for (const h of allHits.slice(0, 20)) {
    console.log(`  sev${h.severity} ${h.kind} ${h.file}:${h.line} — ${h.note}`);
  }
  console.log(`\nwrote ${out} — ${allHits.length} total hits`);
}

main();
