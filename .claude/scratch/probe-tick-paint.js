#!/usr/bin/env node
// Snapshot back-buffer at every step of the synthetic paint pump inside
// runTick, so we can pinpoint which wndProc(s) are filling it with noise.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");
const { dispatch: portedDispatch } = await import("../../ported/auto/_dispatch.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfsRoot = resolve(ROOT, "web/assets");
const vfs = new Map();
for (const f of readdirSync(vfsRoot)) {
  const p = join(vfsRoot, f);
  if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
}

const r = createRuntime({ dataBin, vfs });
const heap = r.heap;

// Wrap state.fnDispatch for all wndProcs in window pool — that's where
// runTick's synthetic paint pump invokes painting. We'll instrument any
// fnDispatch entry called during runTick.
let totalCalls = 0;
const callOrder = [];

// Find primary + back surface
function findSurfaces() {
  let pri = null, back = null;
  for (const [_, s] of state.ddrawSurfaces) {
    if (s.width < 320) continue;
    if (s.isPrimary) pri = s; else back = s;
  }
  return { pri, back };
}

function snap(surf) {
  if (!surf) return { nz: 0, distinct: 0 };
  let nz = 0;
  const h = new Uint32Array(256);
  for (let y = 0; y < surf.height; y++) {
    for (let x = 0; x < surf.width; x++) {
      const v = heap.bytes[surf.bytes + y * surf.pitch + x];
      h[v]++;
      if (v !== 0) nz++;
    }
  }
  let distinct = 0;
  for (let v = 0; v < 256; v++) if (h[v] > 0) distinct++;
  return { nz, distinct };
}

// Pre-init by running runInit. Surfaces should be empty after.
r.runInit();
const { pri: primary, back } = findSurfaces();
console.log(`After runInit: primary nz=${snap(primary).nz} back nz=${snap(back).nz}`);

// Now hook every fnDispatch entry to snapshot back-buffer delta.
// Specifically wrap the addresses in the window pool wndProcs and
// the 40179d / 4385d8 / 402bef / 403c2a entries.
const POOL_START = 0x009a013c >>> 0;
const POOL_END_PTR = 0x009a1164 >>> 0;
const SLOT_STRIDE = 0x178;
const poolEnd = heap.u32(POOL_END_PTR) >>> 0;
console.log(`pool range: 0x${POOL_START.toString(16)}..0x${poolEnd.toString(16)} (stride ${SLOT_STRIDE.toString(16)})`);

const wndProcs = new Set();
for (let slot = POOL_START; slot < poolEnd; slot += SLOT_STRIDE) {
  const proc = heap.u32(slot) >>> 0;
  if (proc && proc !== 0xffffffff) wndProcs.add(proc);
}
console.log(`distinct wndProcs in pool: ${wndProcs.size}: ${[...wndProcs].map(x=>"0x"+x.toString(16)).join(",")}`);

// Snapshot before / after each wndProc invocation
let beforeBack = snap(back);
console.log(`Pre-tick back: ${JSON.stringify(beforeBack)}`);

for (const a of [...wndProcs, 0x40179d, 0x4385d8, 0x402bef, 0x403c2a]) {
  const orig = state.fnDispatch.get(a);
  if (!orig) continue;
  state.fnDispatch.set(a, function (...args) {
    const pre = snap(back);
    let res;
    try { res = orig(...args); }
    catch (e) { console.log(`  EXC in 0x${a.toString(16)}: ${e.message?.slice(0, 60)}`); throw e; }
    const post = snap(back);
    if (post.nz !== pre.nz || post.distinct !== pre.distinct) {
      console.log(`  fn=0x${a.toString(16)} back: nz ${pre.nz}->${post.nz} distinct ${pre.distinct}->${post.distinct}`);
    }
    return res;
  });
}

console.log(`\n=== Tick 1 ===`);
try { r.runTick(); } catch (e) { console.log(`tick threw: ${e.message?.slice(0, 80)}`); }
console.log(`After tick: primary nz=${snap(primary).nz} distinct=${snap(primary).distinct}`);
console.log(`After tick: back nz=${snap(back).nz} distinct=${snap(back).distinct}`);

// Now let me also check which color is filling rows 0-107 (noise) vs 108+ (fill)
console.log(`\n=== Per-row distinct counts (primary, tick 1) ===`);
for (let y = 0; y < primary.height; y += 16) {
  let nz = 0;
  const h = new Uint8Array(256);
  for (let x = 0; x < primary.width; x++) {
    const v = heap.bytes[primary.bytes + y * primary.pitch + x];
    h[v]++;
    if (v !== 0) nz++;
  }
  let distinct = 0;
  for (let v = 0; v < 256; v++) if (h[v] > 0) distinct++;
  let dom = 0, domV = 0;
  for (let v = 0; v < 256; v++) if (h[v] > dom) { dom = h[v]; domV = v; }
  console.log(`  y=${y}: distinct=${distinct} dom=0x${domV.toString(16)}:${dom}`);
}
