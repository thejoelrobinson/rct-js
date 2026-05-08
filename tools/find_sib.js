// Find tiny functions that use SIB-mode addressing.
// SIB-using instructions appear in objdump as `[N*reg ...]`.

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const DECOMP = "/tmp/rct_work/decompiled_all.c";
const RCT = "/Users/joelrobinson/rct-js/binary/rct.exe";

const text = readFileSync(DECOMP, "utf8");
const HEADER = /\/\/ ===== (FUN_[0-9a-f]+) @ ([0-9a-f]+) \(section ([^)]+)\)/g;
const targets = [];
let m;
while ((m = HEADER.exec(text)) !== null) {
  targets.push({ name: m[1], addr: parseInt(m[2], 16), section: m[3] });
}

function disasmTo200(addr) {
  try {
    return execSync(
      `objdump -d --disassembler-options=intel --start-address=0x${addr.toString(16)} --stop-address=0x${(addr + 200).toString(16)} "${RCT}"`,
      { encoding: "utf8", maxBuffer: 1024 * 1024 },
    );
  } catch { return ""; }
}

const SIB_RE = /\[\d\*[a-z]/;
const found = [];
for (const t of targets) {
  if (t.section !== "CODESEG" && t.section !== ".text") continue;
  const dis = disasmTo200(t.addr);
  let usesSib = false;
  let insts = 0;
  for (const line of dis.split("\n")) {
    const lm = /^\s*([0-9a-f]+):\s+(?:[0-9a-f]{2}\s+)+\s*([a-z][a-z0-9]*)/i.exec(line);
    if (!lm) continue;
    if (parseInt(lm[1], 16) < t.addr) continue;
    insts++;
    if (SIB_RE.test(line)) usesSib = true;
    if (lm[2].toLowerCase() === "ret") break;
  }
  if (usesSib && insts <= 8) found.push({ ...t, insts });
}
found.sort((a, b) => a.insts - b.insts);

console.log(`# Tiny SIB-using functions (≤ 8 insts)`);
console.log("insts  name           addr");
for (const f of found.slice(0, 15)) {
  console.log(`${String(f.insts).padStart(5)}  ${f.name.padEnd(14)} 0x${f.addr.toString(16)}`);
}
