// Find tiny functions by parsing decompiled_all.c (function entries) and
// objdump'ing each to compute its size (entry → first ret).

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const DECOMP = "/tmp/rct_work/decompiled_all.c";
const RCT = "/Users/joelrobinson/rct-js/binary/rct.exe";

const text = readFileSync(DECOMP, "utf8");
// Match: // ===== FUN_005df40c @ 005df40c (section CODESEG) =====
const HEADER = /\/\/ ===== (FUN_[0-9a-f]+) @ ([0-9a-f]+) \(section ([^)]+)\)/g;

const targets = [];
let m;
while ((m = HEADER.exec(text)) !== null) {
  targets.push({ name: m[1], addr: parseInt(m[2], 16), section: m[3] });
}

console.error(`Found ${targets.length} function entries.`);

// For each, run objdump on a small window and find the first `ret`.
function sizeOf(addr) {
  const window = 200;
  let cmd;
  try {
    cmd = execSync(
      `objdump -d --disassembler-options=intel --start-address=0x${addr.toString(16)} --stop-address=0x${(addr + window).toString(16)} "${RCT}"`,
      { encoding: "utf8", maxBuffer: 1024 * 1024 },
    );
  } catch { return null; }
  let lastAddr = addr;
  let instCount = 0;
  for (const line of cmd.split("\n")) {
    const lm = /^\s*([0-9a-f]+):\s+(?:[0-9a-f]{2}\s+)+\s*([a-z][a-z0-9]*)/i.exec(line);
    if (!lm) continue;
    const a = parseInt(lm[1], 16);
    if (a < addr) continue;
    instCount++;
    lastAddr = a;
    if (lm[2].toLowerCase() === "ret") return { bytes: a - addr + 1, insts: instCount };
  }
  return null;
}

const sized = [];
for (const t of targets) {
  if (t.section !== "CODESEG" && t.section !== ".text") continue;
  const s = sizeOf(t.addr);
  if (s && s.insts <= 10) sized.push({ ...t, ...s });
}

sized.sort((a, b) => a.insts - b.insts);
console.log(`# Tiny functions (≤ 10 instructions ending in ret), ${sized.length} total\n`);
console.log("insts  bytes  section   name           addr");
console.log("-".repeat(60));
for (const s of sized.slice(0, 30)) {
  console.log(
    `${String(s.insts).padStart(5)}  ${String(s.bytes).padStart(5)}  ${s.section.padEnd(8)}  ${s.name.padEnd(14)} 0x${s.addr.toString(16)}`,
  );
}
