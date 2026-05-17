#!/usr/bin/env node
// Look at the top-22% region as a 2D image. Print rows side by side to see
// if there's any horizontal/vertical structure.

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
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

let primary = null;
for (const [_, s] of state.ddrawSurfaces)
  if (s.isPrimary && s.width >= 320) { primary = s; break; }

const B = primary.bytes, P = primary.pitch, W = primary.width, H = primary.height;
const bytes = heap.bytes;

// Render as PPM (RGB) using the captured palette so we can save and visualize
const pal = state.capturedPalette;
let ppm = `P6\n${W} ${H}\n255\n`;
let body = Buffer.alloc(W * H * 3);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = bytes[B + y * P + x];
    body[(y * W + x) * 3 + 0] = pal[idx * 4];
    body[(y * W + x) * 3 + 1] = pal[idx * 4 + 1];
    body[(y * W + x) * 3 + 2] = pal[idx * 4 + 2];
  }
}
const out = Buffer.concat([Buffer.from(ppm), body]);
const outPath = resolve(HERE, "screenshot-after-fix.ppm");
writeFileSync(outPath, out);
console.log(`wrote ${outPath} (${out.length} bytes)`);

// Also save palette-index version
const idxPath = resolve(HERE, "screenshot-after-fix-indices.bin");
const idxBuf = Buffer.alloc(W * H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    idxBuf[y * W + x] = bytes[B + y * P + x];
  }
}
writeFileSync(idxPath, idxBuf);
console.log(`wrote ${idxPath}`);

// Compare structural hash: per-row checksum
console.log(`\n=== Per-row checksum (top 32 rows) ===`);
for (let y = 0; y < 32; y++) {
  let sum = 0;
  for (let x = 0; x < W; x++) sum = (sum + bytes[B + y * P + x]) | 0;
  console.log(`  y=${y}: sum=${sum}, samples=[${[0, 80, 160, 240, 320, 400, 480, 560, 639].map(x => bytes[B + y * P + x].toString(16)).join(" ")}]`);
}

// Look at column 320 (center) — what's the vertical profile?
console.log(`\n=== Center column (x=320) vertical scan ===`);
for (let y = 0; y < H; y += 16) {
  console.log(`  y=${y}: val=0x${bytes[B + y * P + 320].toString(16)}`);
}
