// Pre-pass scanner that finds DAT_<addr> globals which are byte-sized.
// The translator emits setU32 by default for DAT writes, which corrupts
// adjacent byte-sized DATs (e.g. setU32(0x971eee, 6) writes 4 bytes, the
// 4th of which lands on 0x971ef1 — clobbering byte 0x971ef0 if that's a
// separate char DAT).
//
// Detection signals (all conservative — false negatives ok, false
// positives cause width mis-classification of true int DATs):
//   1. Compared against char literal: `DAT_xxx == '\xNN'`, `<`, `<=`, etc.
//   2. Cast to char/byte: `(char)DAT_xxx`, `(byte)DAT_xxx`, `(undefined1)DAT_xxx`
//   3. Assigned to/from a char literal.
//   4. Dereferenced via `*(char *)&DAT_xxx`.
//
// Then expands via adjacency: if DAT_X is char and DAT_Y exists at X±1,
// X±2, or X±3, Y is also char. Iterates to fixed-point.
//
// Returns a Set of hex address strings (lowercase, no leading `0x`).

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

// In JS regex source, `\\x` means literal `\` + `x` — which matches `\x`
// in the C source, so `'\x01'` matches.
const CHAR_LIT_PATTERN          = /DAT_([0-9a-fA-F]+)\s*(?:==|!=|<=|>=|<|>)\s*'(?:\\x[0-9a-fA-F]+|\\[0nrt]|.)'/g;
const CHAR_REVCOMPARE_PATTERN   = /'(?:\\x[0-9a-fA-F]+|\\[0nrt]|.)'\s*(?:==|!=|<=|>=|<|>)\s*DAT_([0-9a-fA-F]+)/g;
const CHAR_CAST_PATTERN         = /\((?:char|byte|undefined1)\)\s*_?DAT_([0-9a-fA-F]+)/g;
// MUST require `&` — `*(char *)(DAT_xxx + N)` means DAT is a pointer (uint)
// to a char buffer, NOT that DAT itself is a char. Only `*(char *)&DAT_xxx`
// genuinely says DAT itself is a char.
const CHAR_DEREF_PATTERN        = /\*\(\s*(?:char|byte|undefined1)\s*\*\)\s*&\s*_?DAT_([0-9a-fA-F]+)/g;
const CHAR_ASSIGN_LIT_PATTERN   = /DAT_([0-9a-fA-F]+)\s*=\s*'(?:\\x[0-9a-fA-F]+|\\[0nrt]|.)'\s*[;,]/g;

export function scanCharDats(cDir) {
  const charDats = new Set();
  const allDats = new Set();
  const allDatRe = /DAT_([0-9a-fA-F]+)/g;
  const files = readdirSync(cDir).filter(f => f.endsWith(".c"));
  for (const f of files) {
    let text;
    try { text = readFileSync(resolve(cDir, f), "utf8"); } catch { continue; }
    // Collect every DAT address seen anywhere
    let m;
    allDatRe.lastIndex = 0;
    while ((m = allDatRe.exec(text)) !== null) allDats.add(m[1].toLowerCase());
    // Collect char DATs by pattern
    for (const re of [CHAR_LIT_PATTERN, CHAR_CAST_PATTERN, CHAR_REVCOMPARE_PATTERN, CHAR_DEREF_PATTERN, CHAR_ASSIGN_LIT_PATTERN]) {
      re.lastIndex = 0;
      while ((m = re.exec(text)) !== null) {
        charDats.add(m[1].toLowerCase());
      }
    }
  }
  // Adjacency expansion: if DAT_X is char and DAT_Y exists at X±1..±3,
  // mark Y as char. Repeat until fixed-point (capped to avoid runaway).
  // Addresses are normalized to 8-char zero-padded hex so .has() matches
  // regardless of source-side leading zeros.
  const pad = a => a.padStart(8, "0");
  const normCharDats = new Set([...charDats].map(pad));
  const normAllDats = new Set([...allDats].map(pad));
  let added = true;
  let iterations = 0;
  while (added && iterations < 8) {
    added = false;
    iterations++;
    for (const addr of [...normCharDats]) {
      const a = parseInt(addr, 16);
      for (let delta = -3; delta <= 3; delta++) {
        if (delta === 0) continue;
        const neighbour = pad((a + delta).toString(16));
        if (normAllDats.has(neighbour) && !normCharDats.has(neighbour)) {
          normCharDats.add(neighbour);
          added = true;
        }
      }
    }
  }
  return normCharDats;
}
