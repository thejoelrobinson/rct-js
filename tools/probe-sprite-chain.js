#!/usr/bin/env node
// Probe the sprite-walker chain after DAT_008d7eb6 becomes non-zero.
// Wraps fnDispatch entries to count calls per function for the sprite chain
// and related, then reports surface pixel state.

import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { readFileSync, readdirSync, statSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const TICKS = parseInt(process.env.TICKS || "5000", 10);

const { createRuntime } = await import("../runtime/harness.js");
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
const vfsRoot = resolve(ROOT, "web/assets");
try {
  for (const f of readdirSync(vfsRoot)) {
    const p = join(vfsRoot, f);
    if (!statSync(p).isFile()) continue;
    vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
  }
} catch {}

const runtime = createRuntime({ dataBin, vfs });

// Functions of interest (sprite walker chain + sprite system init chain)
const WATCH = [
  // sprite walker
  0x009bbfb3, 0x009bbff8, 0x009bc041, 0x009b438b,
  // sprite system init chain
  0x00454520, 0x004575af, 0x00436558, 0x00436d2d, 0x005e06cc,
  // ddraw / drawing
  0x00406d10, 0x0040d9a0, 0x0040df00,
];

const counts = new Map();
const fnDispatch = runtime.state.fnDispatch;
for (const addr of WATCH) {
  const fn = fnDispatch.get(addr);
  if (!fn) {
    console.log(`MISSING from dispatch: 0x${addr.toString(16)}`);
    continue;
  }
  fnDispatch.set(addr, function (...args) {
    counts.set(addr, (counts.get(addr) || 0) + 1);
    return fn.apply(this, args);
  });
}

// Also wrap IDDS_Lock by intercepting state.ddrawSurfaces accesses (we'll
// instead watch surfaces via state.ddrawSurfaces sizes).

console.log("calling runInit...");
runtime.runInit();
console.log("runInit done");

let firstNonZero = -1;
let tStart = Date.now();
for (let i = 1; i <= TICKS; i++) {
  const t0 = Date.now();
  runtime.runTick();
  const dt = Date.now() - t0;
  if (firstNonZero < 0 && runtime.heap.u8(0x008d7eb6) !== 0) {
    firstNonZero = i;
    console.log(`tick ${i}: DAT_008d7eb6 became non-zero (=${runtime.heap.u8(0x008d7eb6)})`);
  }
  if (dt > 200 || i === 1 || i % 50 === 0) {
    console.log(`  tick ${i} (${dt}ms total ${Date.now()-tStart}ms) eb6=${runtime.heap.u8(0x008d7eb6)} cb9=${runtime.heap.u8(0x00628cb9)} c169=${runtime.heap.u8(0x0099c169)}`);
  }
  if (dt > 3000) {
    console.log(`  tick ${i} stalled (${dt}ms) — aborting`);
    break;
  }
}

const eb6 = runtime.heap.u8(0x008d7eb6);
console.log(`\n=== After ${TICKS} ticks ===`);
console.log(`DAT_008d7eb6 = ${eb6}`);
console.log(`first non-zero at tick: ${firstNonZero}`);

// Read the sprite-table base array at DAT_009b22f0[eb6]
console.log("\n=== DAT_009b22f0[] sprite-table-base array (32 entries) ===");
for (let i = 0; i < 16; i++) {
  const v = runtime.heap.i32(0x009b22f0 + i * 4) | 0;
  const u = runtime.heap.u32(0x009b22f0 + i * 4) >>> 0;
  console.log(`  [${i.toString().padStart(2)}] = 0x${u.toString(16).padStart(8, '0')} (i32: ${v})`);
}

console.log("\n=== Call counts ===");
for (const addr of WATCH) {
  const c = counts.get(addr) || 0;
  console.log(`  FUN_${addr.toString(16).padStart(6, '0')}: ${c}`);
}

console.log("\n=== DDraw surfaces ===");
const surfaces = runtime.state.ddrawSurfaces;
console.log(`  count: ${surfaces.size}`);
let idx = 0;
for (const [obj, s] of surfaces) {
  let nonZero = 0;
  for (let i = 0; i < s.pitch * s.height; i++) {
    if (runtime.heap.bytes[s.bytes + i] !== 0) nonZero++;
  }
  console.log(`  [${idx++}] obj=0x${obj.toString(16)} ${s.width}x${s.height} pitch=${s.pitch} bytes=0x${s.bytes.toString(16)} primary=${s.isPrimary} nonZero=${nonZero}`);
}
