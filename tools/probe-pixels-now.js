#!/usr/bin/env node
// tools/probe-pixels-now.js — boot the runtime, run TICKS ticks, report
// the largest DDraw surface's pixel stats: non-zero count and distinct
// palette-index count. Used to gate perf optimisations on terrain painters:
//   - non-zero pixel count should not regress (~290k+ for typical title scene)
//   - distinct palette indices should not drop below ~248
// Also reports per-tick wall time after the heavy first init tick.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { createRuntime } from "../runtime/harness.js";
import { state } from "../runtime/win32/context.js";
import { postWindowMessage } from "../runtime/win32/user32.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const WM_PAINT = 0x000F;
const WM_TIMER = 0x0113;
const TICKS = parseInt(process.env.TICKS || "12", 10);

function loadVfs() {
  const vfs = new Map();
  const vfsRoot = resolve(ROOT, "web/assets");
  for (const f of readdirSync(vfsRoot)) {
    const p = join(vfsRoot, f);
    if (!statSync(p).isFile()) continue;
    vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
  }
  for (const name of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) {
    if (!vfs.has(name)) vfs.set(name, new Uint8Array(0));
  }
  return vfs;
}

function findLargestSurface() {
  let best = null;
  let bestArea = 0;
  for (const [addr, surf] of state.ddrawSurfaces) {
    const area = surf.width * surf.height;
    if (area > bestArea) { bestArea = area; best = { addr, ...surf }; }
  }
  return best;
}

function statsForSurface(heap, surf) {
  const { width, height, pitch, bytes } = surf;
  const src = heap.bytes;
  let nonZero = 0;
  const seen = new Uint8Array(256);
  for (let y = 0; y < height; y++) {
    const row = bytes + y * pitch;
    for (let x = 0; x < width; x++) {
      const b = src[row + x];
      if (b !== 0) nonZero++;
      seen[b] = 1;
    }
  }
  let distinct = 0;
  for (let i = 0; i < 256; i++) if (seen[i]) distinct++;
  return { nonZero, distinct };
}

async function main() {
  const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
  const vfs = loadVfs();
  const runtime = createRuntime({ dataBin, vfs });

  try { runtime.runInit(); }
  catch (e) { console.error(`runInit threw: ${e.message}`); }

  const perTick = [];
  for (let i = 1; i <= TICKS; i++) {
    const hwnd = state.firstHwnd || 0;
    if (hwnd) {
      postWindowMessage(hwnd, WM_TIMER, 1, 0);
      if ((i & 1) === 0) postWindowMessage(hwnd, WM_PAINT, 0, 0);
    }
    const t0 = Date.now();
    try { runtime.runTick(() => {}); } catch (_) {}
    perTick.push(Date.now() - t0);
  }

  const surf = findLargestSurface();
  if (!surf) {
    console.log("no surface allocated");
    process.exit(1);
  }
  const s = statsForSurface(runtime.heap, surf);
  console.log(`surface 0x${surf.addr.toString(16)}  ${surf.width}x${surf.height}  bytes=0x${surf.bytes.toString(16)}`);
  console.log(`non-zero pixels: ${s.nonZero}`);
  console.log(`distinct palette indices: ${s.distinct}`);
  console.log(`per-tick ms (skipping first 2 init ticks): ${perTick.slice(2).join(",")}`);
  const stable = perTick.slice(2);
  if (stable.length) {
    const avg = stable.reduce((a,b) => a+b, 0) / stable.length;
    console.log(`avg per-tick ms (post-init): ${avg.toFixed(1)}`);
  }
}

main().catch((e) => {
  console.error(`[fatal] ${e.message}`);
  if (e.stack) console.error(e.stack.split("\n").slice(0, 8).join("\n"));
  process.exit(1);
});
