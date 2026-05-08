// Scan memory after boot for plausible 256-entry palette data.
// A standard Windows palette is 256 × { R, G, B, flags } = 1024 bytes.
// Heuristic: first entry is (0,0,0) (black), reasonable variation across entries.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { loadPE } from "./harness/loader-node.js";
import { makeCpu, step, setShimInvoker } from "./harness/x86.js";
import { wireImports } from "./harness/imports.js";
import { bindShims, invokeShim, isShim, initHeap, setVfs, getDDrawObj } from "./harness/shims.js";
import { lifted } from "./generated/all.js";
import { setLiftedTable } from "./lifter/runtime.js";

const image = loadPE("./binary/rct.exe");
const STACK = 0x100000, HEAP = 64 * 1024 * 1024;
const memory = new Uint8Array(image.totalSize + STACK + HEAP);
memory.set(image.memory, 0);
const { iatEntries } = wireImports(memory, image);
bindShims(iatEntries);
setShimInvoker(invokeShim);
initHeap(image.totalSize + STACK, image.totalSize + STACK + HEAP);
const vfs = {};
const roots = ["/tmp/rct_mount/Data", "/tmp/rct_mount/English"];
for (const r of roots) try { for (const e of readdirSync(r)) { const p = join(r, e); if (statSync(p).isFile()) vfs[e] = readFileSync(p); } } catch {}
setVfs(vfs);
const cpu = makeCpu(memory);
cpu.regs.esp = (image.totalSize + STACK - 4) >>> 0;
const RET = 0xdeadbeef >>> 0;
memory[cpu.regs.esp]=RET&0xff; memory[cpu.regs.esp+1]=(RET>>>8)&0xff; memory[cpu.regs.esp+2]=(RET>>>16)&0xff; memory[cpu.regs.esp+3]=(RET>>>24)&0xff;
cpu.regs.eip = 0x401000;
memory[0x42ef8a] = 0xc3; memory[0x5df472] = 0xc3;
const lf = { ...lifted }; delete lf[0x42ef8a]; delete lf[0x5df472];
setLiftedTable(lf);
const ddr = getDDrawObj(cpu);
memory[0x5ebf30]=ddr&0xff; memory[0x5ebf31]=(ddr>>>8)&0xff; memory[0x5ebf32]=(ddr>>>16)&0xff; memory[0x5ebf33]=(ddr>>>24)&0xff;
memory[0x5ebf2c]=0; memory[0x5ebf2d]=0; memory[0x5ebf2e]=1; memory[0x5ebf2f]=0xe0;

console.log("Booting and running 5M steps...");
let n = 0;
try {
  while (n < 5_000_000) { step(cpu); n++; }
} catch (e) { console.log("threw at " + n + ": " + e.message); }
console.log("Stopped at step " + n);

// Now scan memory for palette-shaped data.
// Look for 1024-byte regions where:
//   bytes[0..3] == (0, 0, 0, 0)        ← first entry typically black
//   total RGB sum across all entries > 1000  ← non-trivial color data
//   no more than 80% zero bytes
console.log("\nScanning for palette-shaped regions in image-mapped memory...");
const candidates = [];
for (let addr = image.imageBase; addr < image.totalSize - 1024; addr += 4) {
  // First 4 bytes all zero (entry 0 = black + flags=0)
  if (memory[addr] !== 0 || memory[addr+1] !== 0 || memory[addr+2] !== 0) continue;
  // Look at 4-byte stride entries; check that flags bytes (every 4th starting at +3) are all 0
  let goodFlags = true;
  for (let i = 0; i < 256 && goodFlags; i++) {
    if (memory[addr + i*4 + 3] !== 0) { goodFlags = false; }
  }
  if (!goodFlags) continue;
  // Sum RGB
  let sum = 0;
  for (let i = 0; i < 256; i++) {
    sum += memory[addr + i*4] + memory[addr + i*4 + 1] + memory[addr + i*4 + 2];
  }
  if (sum < 5000) continue;
  // Count distinct entries
  const entries = new Set();
  for (let i = 0; i < 256; i++) {
    const e = (memory[addr+i*4] << 16) | (memory[addr+i*4+1] << 8) | memory[addr+i*4+2];
    entries.add(e);
  }
  if (entries.size < 32) continue;
  candidates.push({ addr, sum, distinct: entries.size });
}

// Score: penalize palettes where all colors are in a narrow hue range
// (those are color-cycling sub-palettes, not master palettes).
for (const c of candidates) {
  // Compute average hue spread by checking R, G, B variation
  let minR=255, maxR=0, minG=255, maxG=0, minB=255, maxB=0;
  for (let i = 0; i < 256; i++) {
    const r = memory[c.addr + i*4], g = memory[c.addr + i*4 + 1], b = memory[c.addr + i*4 + 2];
    if (r < minR) minR = r; if (r > maxR) maxR = r;
    if (g < minG) minG = g; if (g > maxG) maxG = g;
    if (b < minB) minB = b; if (b > maxB) maxB = b;
  }
  const rngR = maxR - minR, rngG = maxG - minG, rngB = maxB - minB;
  // Master palette has high variation in all three channels
  c.spread = Math.min(rngR, rngG, rngB);
  c.totalRange = rngR + rngG + rngB;
}

console.log(`Found ${candidates.length} candidates.`);
candidates.sort((a, b) => b.spread - a.spread);
console.log("\n=== Ranked by min-channel spread (master palette has high spread in ALL channels) ===");
for (const c of candidates.slice(0, 10)) {
  console.log(`  0x${c.addr.toString(16)} — distinct=${c.distinct} spread=${c.spread} totalRange=${c.totalRange}`);
  // Print first few entries
  const e = [];
  for (let i = 0; i < 8; i++) {
    e.push(`(${memory[c.addr+i*4]},${memory[c.addr+i*4+1]},${memory[c.addr+i*4+2]})`);
  }
  console.log(`    first 8: ${e.join(" ")}`);
}
