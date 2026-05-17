#!/usr/bin/env node
// Track which painter writes to the primary surface by hooking heap writes
// and the painter-bridge's _currentPainter marker. But here we instead
// hook FUN_extra_paint_436b50 and other top-level dispatchers, then bucket
// writes by callstack.

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

// Wrap fnDispatch entries that are painters/blitters to log when they run
const painterAddrs = [
  0x431b6f, 0x436b2a, 0x436b50, 0x433bae, 0x433e1c, 0x4316f3,
  0x444820, 0x444927, 0x4449d4, 0x4367cb,
  0x4368d8, 0x4368e0, 0x4368ec, 0x4368ff,
  0x436a9c, 0x436aa4, 0x436ab0, 0x436ac3,
  0x42b079,
];
const callCount = new Map();
for (const a of painterAddrs) {
  const orig = state.fnDispatch.get(a);
  if (!orig) continue;
  callCount.set(a, 0);
  state.fnDispatch.set(a, function (...args) {
    callCount.set(a, (callCount.get(a) || 0) + 1);
    return orig(...args);
  });
}

// Find primary surface AFTER runInit
r.runInit();
let primary = null;
for (const [obj, surf] of state.ddrawSurfaces) {
  if (surf.isPrimary && surf.width >= 320) { primary = surf; break; }
}
console.log(`Primary: 0x${primary.bytes.toString(16)}, ${primary.width}x${primary.height}`);

// Snapshot before tick paint
const before = new Uint8Array(primary.width * primary.height);
for (let y = 0; y < primary.height; y++) {
  for (let x = 0; x < primary.width; x++) {
    before[y * primary.width + x] = r.heap.bytes[primary.bytes + y * primary.pitch + x];
  }
}

// Reset counts and run a single tick
for (const a of callCount.keys()) callCount.set(a, 0);

// Install a heap write probe to monitor surface writes per painter
// Use the dispatch interception to set a "currentTopPainter" marker
let currentTopPainter = "(none)";
const writesByTopPainter = new Map();
const topPainters = [0x4385d8, 0x40179d, 0x42b079, 0x4316f3, 0x436b50, 0x436b2a];

const surfaceLo = primary.bytes;
const surfaceHi = primary.bytes + primary.pitch * primary.height;
const back = (() => {
  for (const [_, s] of state.ddrawSurfaces) if (!s.isPrimary && s.width >= 320) return s;
  return null;
})();
const backLo = back?.bytes ?? 0;
const backHi = backLo + (back?.pitch || 0) * (back?.height || 0);

function addrInSurface(a) {
  if (a >= surfaceLo && a < surfaceHi) return "primary";
  if (back && a >= backLo && a < backHi) return "back";
  return null;
}

// Wrap top painters with marker installer
for (const a of topPainters) {
  const orig = state.fnDispatch.get(a);
  if (!orig) continue;
  const name = `0x${a.toString(16)}`;
  state.fnDispatch.set(a, function (...args) {
    const saved = currentTopPainter;
    currentTopPainter = name;
    try {
      return orig(...args);
    } finally {
      currentTopPainter = saved;
    }
  });
}

// Hook heap.setU8 / setU16 / setU32 to bucket writes that hit surface
const heap = r.heap;
const origSetU8 = heap.setU8.bind(heap);
const origSetU16 = heap.setU16.bind(heap);
const origSetU32 = heap.setU32.bind(heap);
function bumpWrite(addr, size) {
  const where = addrInSurface(addr) || addrInSurface(addr + size - 1);
  if (!where) return;
  const key = `${currentTopPainter}:${where}`;
  writesByTopPainter.set(key, (writesByTopPainter.get(key) || 0) + size);
}
heap.setU8 = function (addr, v) { bumpWrite(addr, 1); return origSetU8(addr, v); };
heap.setU16 = function (addr, v) { bumpWrite(addr, 2); return origSetU16(addr, v); };
heap.setU32 = function (addr, v) { bumpWrite(addr, 4); return origSetU32(addr, v); };
// Also hook direct heap.bytes writes via a proxy?
// We can't proxy a TypedArray, so monitor bytes via the heap.u8 API only.

// Run one tick with hooks
try { r.runTick(); } catch (e) { console.log(`tick threw: ${e.message?.slice(0, 80)}`); }

// Restore
heap.setU8 = origSetU8;
heap.setU16 = origSetU16;
heap.setU32 = origSetU32;

console.log(`\n=== Painter call counts (after 1 tick) ===`);
for (const [a, c] of [...callCount.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  0x${a.toString(16)}: ${c}`);
}

console.log(`\n=== heap.setU* writes by top painter (this misses direct bytes[] writes) ===`);
for (const [k, c] of [...writesByTopPainter.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${c}`);
}

// Compare snapshot before/after
const after = primary;
let changed = 0, changedRows = new Set();
for (let y = 0; y < primary.height; y++) {
  for (let x = 0; x < primary.width; x++) {
    const o = before[y * primary.width + x];
    const n = heap.bytes[primary.bytes + y * primary.pitch + x];
    if (o !== n) { changed++; changedRows.add(y); }
  }
}
console.log(`\n=== Primary surface diff (before vs after one tick) ===`);
console.log(`  pixels changed: ${changed}`);
console.log(`  rows touched:   ${changedRows.size} of ${primary.height}`);
const rowList = [...changedRows].sort((a, b) => a - b);
if (rowList.length > 0) {
  console.log(`  rows: ${rowList[0]}..${rowList[rowList.length - 1]} (first 30: ${rowList.slice(0, 30).join(",")})`);
}

// Same for back-buffer
if (back) {
  let bChanged = 0, bRows = new Set();
  // we don't have a snapshot of back-buffer; just dump current state
  let nz = 0;
  const bH = new Uint32Array(256);
  for (let y = 0; y < back.height; y++) {
    for (let x = 0; x < back.width; x++) {
      const v = heap.bytes[back.bytes + y * back.pitch + x];
      bH[v]++;
      if (v !== 0) nz++;
    }
  }
  let bDistinct = 0;
  for (let v = 0; v < 256; v++) if (bH[v] > 0) bDistinct++;
  console.log(`  back buffer distinct=${bDistinct} nz=${nz}/${back.width * back.height}`);
}
