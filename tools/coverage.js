// Opcode coverage analysis. Disassembles .text and CODESEG, counts mnemonic
// frequencies, cross-references with what harness/x86.js currently supports,
// and prints a prioritized list of opcodes to add next.
//
// Run: node tools/coverage.js

import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const RCT_EXE = resolve(HERE, "../binary/rct.exe");

// Sections to analyze, with their virtual address ranges (from PE header).
const SECTIONS = [
  { name: ".text",   start: 0x401000, end: 0x401000 + 0x1a1a6 },
  { name: "CODESEG", start: 0x41c000, end: 0x41c000 + 0x1cac5d },
];

// Mnemonics our interpreter currently handles (rough — by mnemonic string).
const SUPPORTED = new Set([
  "push", "pop", "ret", "mov", "xor", "ror", "add", "cmp",
  "leave", "jmp", "je", "jne", "jz", "jnz", "jl", "jg", "jle",
  "jge", "jb", "jae", "jbe", "ja", "js", "jns", "jo", "jno",
  "jc", "jnc",
]);

function disasm(start, end) {
  const cmd = `objdump -d --disassembler-options=intel ` +
              `--start-address=0x${start.toString(16)} ` +
              `--stop-address=0x${end.toString(16)} ` +
              `"${RCT_EXE}"`;
  return execSync(cmd, { encoding: "utf8", maxBuffer: 200 * 1024 * 1024 });
}

// Parse objdump lines like:  "  5df40c: 53                           	push	ebx"
const LINE_RE = /^\s*[0-9a-f]+:\s+(?:[0-9a-f]{2}\s+)+\s*([a-z][a-z0-9]*)/i;

function countMnemonics(text) {
  const counts = new Map();
  for (const line of text.split("\n")) {
    const m = LINE_RE.exec(line);
    if (!m) continue;
    const mnem = m[1].toLowerCase();
    counts.set(mnem, (counts.get(mnem) ?? 0) + 1);
  }
  return counts;
}

function merge(a, b) {
  for (const [k, v] of b) a.set(k, (a.get(k) ?? 0) + v);
  return a;
}

console.error("Disassembling sections...");
const allCounts = new Map();
const perSection = {};
for (const s of SECTIONS) {
  console.error(`  ${s.name}  (${(s.end - s.start).toLocaleString()} bytes)`);
  const text = disasm(s.start, s.end);
  const counts = countMnemonics(text);
  perSection[s.name] = counts;
  merge(allCounts, counts);
}

const sorted = [...allCounts.entries()].sort((a, b) => b[1] - a[1]);
const total = sorted.reduce((sum, [, v]) => sum + v, 0);

let supportedCount = 0;
let unsupportedCount = 0;
for (const [m, c] of sorted) {
  if (SUPPORTED.has(m)) supportedCount += c;
  else unsupportedCount += c;
}

console.log("\n=== TOTAL INSTRUCTION COVERAGE ===");
console.log(`Total decoded instructions:  ${total.toLocaleString()}`);
console.log(`Supported by interpreter:    ${supportedCount.toLocaleString()}  (${(100 * supportedCount / total).toFixed(1)}%)`);
console.log(`Unsupported:                 ${unsupportedCount.toLocaleString()}  (${(100 * unsupportedCount / total).toFixed(1)}%)`);

console.log("\n=== TOP 30 MISSING OPCODES (by frequency) ===");
console.log("count       %      mnemonic");
console.log("-".repeat(40));
let printed = 0;
for (const [mnem, count] of sorted) {
  if (SUPPORTED.has(mnem)) continue;
  const pct = (100 * count / total).toFixed(2);
  console.log(`${count.toString().padStart(7)}  ${pct.padStart(5)}%   ${mnem}`);
  if (++printed >= 30) break;
}

console.log("\n=== TOP 15 SUPPORTED OPCODES (sanity check) ===");
console.log("count       %      mnemonic");
console.log("-".repeat(40));
printed = 0;
for (const [mnem, count] of sorted) {
  if (!SUPPORTED.has(mnem)) continue;
  const pct = (100 * count / total).toFixed(2);
  console.log(`${count.toString().padStart(7)}  ${pct.padStart(5)}%   ${mnem}`);
  if (++printed >= 15) break;
}

console.log("\n=== BY SECTION ===");
for (const [name, counts] of Object.entries(perSection)) {
  const t = [...counts.values()].reduce((a, b) => a + b, 0);
  const sup = [...counts.entries()].filter(([m]) => SUPPORTED.has(m))
                .reduce((a, [, c]) => a + c, 0);
  console.log(`${name.padEnd(10)} ${t.toLocaleString().padStart(8)} insns  ${(100*sup/t).toFixed(1)}% supported`);
}
