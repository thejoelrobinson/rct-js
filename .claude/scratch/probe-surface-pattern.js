#!/usr/bin/env node
// Probe pattern in the noisy region (top 22%) — is it spatially random,
// structured (sprite-like blocks), or a flat memcpy of heap bytes?

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfsRoot = resolve(ROOT, "web/assets");
const vfs = new Map();
for (const f of readdirSync(vfsRoot)) {
  const p = join(vfsRoot, f);
  if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
}

const r = createRuntime({ dataBin, vfs });
r.runInit();
for (let i = 0; i < 3; i++) try { r.runTick(); } catch {}

const heap = r.heap;

// Pick the primary surface
let primary = null;
for (const [obj, surf] of state.ddrawSurfaces) {
  if (surf.isPrimary && surf.width >= 320) { primary = surf; break; }
}
console.log(`Primary surface at bytes=0x${primary.bytes.toString(16)}, ${primary.width}x${primary.height}, pitch=${primary.pitch}`);

const B = primary.bytes, P = primary.pitch, W = primary.width, H = primary.height;
const bytes = heap.bytes;

// 1. Row-by-row characterization: distinct count + first/last non-bg col
console.log(`\n=== Per-row characterization ===`);
console.log(`row | distinct | nz/W | dominant | first..last non-1 col`);
for (let y = 0; y < H; y += 10) {
  const rowOff = B + y * P;
  const h = new Uint8Array(256);
  let nz = 0;
  let firstNot1 = -1, lastNot1 = -1;
  for (let x = 0; x < W; x++) {
    const v = bytes[rowOff + x];
    h[v]++;
    if (v !== 0) nz++;
    if (v !== 1) {
      if (firstNot1 < 0) firstNot1 = x;
      lastNot1 = x;
    }
  }
  let distinct = 0, dom = 0, domV = 0;
  for (let v = 0; v < 256; v++) {
    if (h[v] > 0) distinct++;
    if (h[v] > dom) { dom = h[v]; domV = v; }
  }
  console.log(`y=${String(y).padStart(3)} | ${String(distinct).padStart(3)} | ${nz}/${W} | 0x${domV.toString(16).padStart(2, "0")}:${dom} | ${firstNot1}..${lastNot1}`);
}

// 2. Sample raw bytes from row 30 to see spatial pattern
console.log(`\n=== Raw byte sequences ===`);
for (const y of [0, 30, 60, 90, 120, 150, 180, 200, 240]) {
  const rowOff = B + y * P;
  const sample = [];
  for (let x = 0; x < 64; x++) sample.push(bytes[rowOff + x].toString(16).padStart(2, "0"));
  console.log(`y=${y} x=0..63: ${sample.join(" ")}`);
}

// 3. Look for memcpy-from-heap signatures: are the bytes at the surface
// the same as another region of memory at an offset?
console.log(`\n=== Surface origin search ===`);
// Take first 128 bytes of the surface
const sigLen = 128;
const sig = [];
for (let i = 0; i < sigLen; i++) sig.push(bytes[B + i]);

// Search heap for first match outside the surface
const searchEnd = heap.bytes.length;
let matches = 0;
const matchLocs = [];
// Stride-fast scan
for (let p = 0; p < searchEnd - sigLen; p += 1) {
  if (p >= B && p < B + P * H) { p += P * H - 1; continue; }
  if (bytes[p] !== sig[0]) continue;
  let ok = true;
  for (let i = 1; i < 16; i++) {
    if (bytes[p + i] !== sig[i]) { ok = false; break; }
  }
  if (!ok) continue;
  // Full match check on 128
  for (let i = 16; i < sigLen; i++) {
    if (bytes[p + i] !== sig[i]) { ok = false; break; }
  }
  if (ok) {
    matches++;
    matchLocs.push(p);
    if (matches < 10) console.log(`  signature found at 0x${p.toString(16)}`);
    if (matches > 10) break;
  }
}
console.log(`  total matches in heap (≠surface): ${matches}`);

// Also check if surface content correlates with heap at an offset
// Compare surface row 30 to several heap regions
console.log(`\n=== Surface row 30 vs known regions ===`);
const row30 = [];
for (let x = 0; x < 32; x++) row30.push(bytes[B + 30 * P + x]);
console.log(`  surface row 30 [0..31]: ${row30.map(v => v.toString(16).padStart(2, "0")).join(" ")}`);

// Check whether the noise pattern is the chunk being copied from elsewhere
const candidates = [
  ["secondary back", 0x2428da0],
  ["DPI bytes ptr", heap.u32(0x0099fb7c)],
  ["DAT_005f1fec", heap.u32(0x005f1fec)],
  ["world map start", 0x006e3b80],
  ["sprite pool", 0x010ec1f8],
];
for (const [name, addr] of candidates) {
  if (!addr || addr < 0 || addr + 32 >= heap.bytes.length) continue;
  if (addr === B) { console.log(`  ${name}: same as surface`); continue; }
  const row = [];
  for (let x = 0; x < 32; x++) row.push(bytes[addr + 30 * P + x]);
  console.log(`  ${name} 0x${addr.toString(16)} +30*P [0..31]: ${row.map(v => v.toString(16).padStart(2, "0")).join(" ")}`);
}

// 4. Count writes by column to detect strip-painter signature
console.log(`\n=== Non-1 byte count by column ===`);
const colCounts = new Uint32Array(W);
for (let y = 0; y < H; y++) {
  const rowOff = B + y * P;
  for (let x = 0; x < W; x++) {
    if (bytes[rowOff + x] !== 1) colCounts[x]++;
  }
}
// Print histogram in 32-col buckets (strip width is 32)
console.log(`32-col-bucket non-1 counts (sum of col counts in bucket):`);
for (let b = 0; b < W; b += 32) {
  let s = 0;
  for (let x = b; x < b + 32; x++) s += colCounts[x];
  console.log(`  cols ${b}..${b+31}: ${s}`);
}
