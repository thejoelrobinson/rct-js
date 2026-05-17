#!/usr/bin/env node
// probe-surface-content.js — diagnose what's on each ddraw surface and what
// presentFrame picks. Outputs:
//   * list of all surfaces (addr, size, isPrimary)
//   * for each surface: byte distribution histogram, distinct values count,
//     spatial entropy estimate, dominant value
//   * which surface presentFrame would pick

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const TICKS = parseInt(process.env.TICKS || "5", 10);

const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfsRoot = resolve(ROOT, "web/assets");
const vfs = new Map();
try {
  for (const f of readdirSync(vfsRoot)) {
    const p = join(vfsRoot, f);
    if (!statSync(p).isFile()) continue;
    vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
  }
} catch {}

const r = createRuntime({ dataBin, vfs });
console.log(`[probe] runInit() ...`);
r.runInit();
console.log(`[probe] ${TICKS} ticks ...`);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); }
  catch (e) { console.log(`tick ${i} threw: ${(e.message || e).slice(0, 100)}`); }
}

const heap = r.heap;

console.log(`\n=== ddrawSurfaces (count=${state.ddrawSurfaces.size}) ===`);
let i = 0;
const surfaces = [];
for (const [obj, surf] of state.ddrawSurfaces) {
  surfaces.push({ obj, surf, idx: i++ });
}

function analyzeSurface(surf) {
  const W = surf.width, H = surf.height, P = surf.pitch, B = surf.bytes;
  const total = P * H;
  const bytes = heap.bytes;
  // Histogram of 256 possible byte values
  const hist = new Uint32Array(256);
  for (let y = 0; y < H; y++) {
    const rowOff = B + y * P;
    for (let x = 0; x < W; x++) {
      hist[bytes[rowOff + x]]++;
    }
  }
  // Distinct values, top values, non-zero count
  let distinct = 0, nonZero = 0, total2 = 0;
  for (let v = 0; v < 256; v++) {
    if (hist[v] > 0) distinct++;
    if (v !== 0) nonZero += hist[v];
    total2 += hist[v];
  }
  // Top 5 values
  const top = [...hist.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  // Same-neighbor count (horizontal)
  let sameH = 0;
  for (let y = 0; y < H; y++) {
    const rowOff = B + y * P;
    for (let x = 1; x < W; x++) {
      if (bytes[rowOff + x] === bytes[rowOff + x - 1]) sameH++;
    }
  }
  const sameHRatio = sameH / (H * (W - 1));
  // Region scan: split into 4 quadrants and count distinct
  const quadStats = [];
  for (let qy = 0; qy < 2; qy++) {
    for (let qx = 0; qx < 2; qx++) {
      const h2 = new Uint32Array(256);
      for (let y = (qy * H) >> 1; y < ((qy + 1) * H) >> 1; y++) {
        const rowOff = B + y * P;
        for (let x = (qx * W) >> 1; x < ((qx + 1) * W) >> 1; x++) {
          h2[bytes[rowOff + x]]++;
        }
      }
      let qd = 0, qnz = 0;
      for (let v = 0; v < 256; v++) {
        if (h2[v] > 0) qd++;
        if (v !== 0) qnz += h2[v];
      }
      quadStats.push({ qx, qy, distinct: qd, nonZero: qnz });
    }
  }
  return { total: W * H, distinct, nonZero, sameHRatio, top, quadStats };
}

for (const { obj, surf, idx } of surfaces) {
  console.log(`\n--- Surface #${idx} obj=0x${obj.toString(16)} ---`);
  console.log(`  bytes=0x${surf.bytes.toString(16)}, ${surf.width}x${surf.height}, pitch=${surf.pitch}, isPrimary=${surf.isPrimary}`);
  if (surf.width >= 320 && surf.height >= 240) {
    const a = analyzeSurface(surf);
    console.log(`  total=${a.total}, nonZero=${a.nonZero}, distinct=${a.distinct}`);
    console.log(`  horizSameNeighbor=${(a.sameHRatio * 100).toFixed(1)}%`);
    console.log(`  top vals: ${a.top.map(([v, c]) => `0x${v.toString(16)}:${c}`).join(", ")}`);
    console.log(`  quadrants (TL TR BL BR):`);
    for (const q of a.quadStats) {
      console.log(`    [${q.qx},${q.qy}] distinct=${q.distinct} nonZero=${q.nonZero}`);
    }
  } else {
    console.log(`  (skipped: too small)`);
  }
}

// Simulate presentFrame's selection logic
console.log(`\n=== presentFrame surface selection (replicating canvas.js logic) ===`);
let bestNonZero = 0, bestSurface = null, bestKey = -1;
for (const [obj, surf] of state.ddrawSurfaces) {
  if (surf.width < 320 || surf.height < 240) continue;
  let nz = 0;
  const sz = surf.width * surf.height;
  const stride256 = Math.max(1, sz >> 8);
  for (let i = 0; i < sz; i += stride256) if (heap.bytes[surf.bytes + i] !== 0) nz++;
  console.log(`  obj=0x${obj.toString(16)} isPrimary=${surf.isPrimary} sampled nz=${nz}/256`);
  if (nz > bestNonZero || (bestSurface === null && surf.isPrimary)) {
    bestNonZero = nz;
    bestSurface = surf;
    bestKey = obj;
  }
}
console.log(`Picked obj=0x${bestKey.toString(16)} nz=${bestNonZero}/256 isPrimary=${bestSurface?.isPrimary}`);

// Also dump some known back-buffer pointers
console.log(`\n=== Important globals ===`);
console.log(`  DAT_005f1fec back-buffer ptr  = 0x${heap.u32(0x005f1fec).toString(16)}`);
console.log(`  DAT_005f1ff0 height           = ${heap.u32(0x005f1ff0)}`);
console.log(`  DAT_005f2400 width            = ${heap.u32(0x005f2400)}`);
console.log(`  DAT_0099fb7c+0 DPI bytes      = 0x${heap.u32(0x0099fb7c).toString(16)}`);
console.log(`  DAT_0099fb7c+4 DPI clipX/Y    = ${heap.u16(0x0099fb80)},${heap.u16(0x0099fb82)}`);
console.log(`  DAT_0099fb7c+8 DPI clipW/H    = ${heap.u16(0x0099fb84)}x${heap.u16(0x0099fb86)}`);
console.log(`  Viewport slot 0 view_x/y      = ${heap.u16(0x009a1168 + 8)},${heap.u16(0x009a1168 + 0xa)}`);
console.log(`  Viewport slot 0 screen_w/h    = ${heap.u16(0x009a1168 + 0)}x${heap.u16(0x009a1168 + 2)}`);
console.log(`  Viewport slot 0 screen_x/y    = ${heap.u16(0x009a1168 + 4)},${heap.u16(0x009a1168 + 6)}`);
