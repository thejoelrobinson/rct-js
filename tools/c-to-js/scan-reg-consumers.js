// Pre-pass that identifies which 32-bit register each ported function reads
// on entry (via Ghidra's `in_*` / `unaff_*` convention).
//
// We scan the ALREADY-TRANSLATED `ported/auto/*.js` files because the
// translator already replaced `let in_X = 0;` with `let in_X = regs.<reg>...;`
// for every register input. Parsing the JS is a single regex per file.
//
// Returns Map<addr, Set<"eax"|"ebx"|"ecx"|"edx"|"esi"|"edi"|"ebp">>.
// 8/16-bit reads (AL/AX/BL/BX/...) are folded into their 32-bit parent
// because that's what the caller has to set in regs.* before the call.
//
// This module is fully synchronous; load once at translator start, query
// per call site.

import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Map sub-register name → 32-bit parent.
const REG_PARENT = {
  EAX: "eax", AX: "eax", AL: "eax", AH: "eax",
  EBX: "ebx", BX: "ebx", BL: "ebx", BH: "ebx",
  ECX: "ecx", CX: "ecx", CL: "ecx", CH: "ecx",
  EDX: "edx", DX: "edx", DL: "edx", DH: "edx",
  ESI: "esi", SI: "esi",
  EDI: "edi", DI: "edi",
  EBP: "ebp", BP: "ebp",
  // ZF/CF aren't propagated as args (they come from arithmetic) — skip.
};

// `let in_EAX = regs.eax >>> 0;` or `let unaff_ESI = regs.esi >>> 0;` etc.
// Also catches hand-port style `const ebx = regs.ebx | 0;`.
const REG_READ = /\blet\s+(?:in_|unaff_)([A-Z]{2,3})\s*=\s*(?:regs\.|.*regs\.)/g;
// Hand-port style: `regs.<reg>` appearing as a value (not on LHS of `=`).
// Capture register name; we'll convert to lowercase for matching.
const REG_READ_HAND = /(?<![.=])regs\.(eax|ebx|ecx|edx|esi|edi|ebp)\b(?!\s*=[^=])/g;

export function scanRegConsumers(portedDir) {
  const out = new Map();
  const files = readdirSync(portedDir).filter(f => /^[0-9a-f]+\.js$/.test(f));
  for (const file of files) {
    const addr = parseInt(file.replace(/\.js$/, ""), 16);
    let text;
    try { text = readFileSync(resolve(portedDir, file), "utf8"); } catch { continue; }
    const regs = new Set();
    REG_READ.lastIndex = 0;
    let m;
    while ((m = REG_READ.exec(text)) !== null) {
      const parent = REG_PARENT[m[1]];
      if (parent) regs.add(parent);
    }
    // Strip comments before scanning hand-port style regs.<reg> reads — comment
    // mentions like "// without caller setting regs.ebx" would otherwise be
    // false positives.
    const noComments = text
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split("\n").map(l => l.replace(/\/\/.*$/, "")).join("\n");
    REG_READ_HAND.lastIndex = 0;
    while ((m = REG_READ_HAND.exec(noComments)) !== null) {
      regs.add(m[1]);   // already lowercase
    }
    if (regs.size > 0) out.set(addr, regs);
  }
  return out;
}
