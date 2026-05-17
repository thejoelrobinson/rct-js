#!/usr/bin/env node
// Locate the EXACT painter responsible for the noise.
// Strategy:
//   1. Hook heap.bytes[B+y*P+x] writes by wrapping the write APIs PLUS
//      monkey-patching every paint-chain function to bracket writes.
//   2. Also instrument 0x444820, 0x4449d4 directly (sprite/terrain painters)
//      which we believe do the per-pixel writes via direct bytes[] indexing
//      that bypasses heap.setU8.

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

// runInit & find surfaces
r.runInit();
let primary = null, back = null;
for (const [_, s] of state.ddrawSurfaces) {
  if (s.width < 320) continue;
  if (s.isPrimary) primary = s; else back = s;
}
const lo = back.bytes, hi = back.bytes + back.pitch * back.height;
console.log(`back-buffer range: 0x${lo.toString(16)}..0x${hi.toString(16)}`);
console.log(`primary-buffer range: 0x${primary.bytes.toString(16)}..0x${(primary.bytes + primary.pitch * primary.height).toString(16)}`);

// Wrap key paint functions to track entering/leaving + back-buffer delta
function snap(surf) {
  let nz = 0, distinct = 0;
  const h = new Uint8Array(256);
  for (let y = 0; y < surf.height; y++) {
    for (let x = 0; x < surf.width; x++) {
      const v = heap.bytes[surf.bytes + y * surf.pitch + x];
      h[v]++;
      if (v !== 0) nz++;
    }
  }
  for (let v = 0; v < 256; v++) if (h[v] > 0) distinct++;
  return { nz, distinct };
}

const trackFns = [
  [0x42b079, "42b079_wndproc"],
  [0x4316f3, "4316f3_stripiter"],
  [0x431b6f, "431b6f"],
  [0x436b2a, "436b2a"],
  [0x436b50, "436b50_paint_r0"],
  [0x433bae, "433bae"],
  [0x433e1c, "433e1c"],
  [0x444820, "444820_sprite_walk"],
  [0x4449d4, "4449d4"],
  [0x444927, "444927"],
  [0x4367cb, "4367cb"],
  [0x4368d8, "4368d8_bridge"],
  [0x436a9c, "436a9c_bridge"],
];

// Wrap fnDispatch entries
const depthCounter = { v: 0 };
const fnStats = new Map();
for (const [a, name] of trackFns) {
  const orig = state.fnDispatch.get(a);
  if (!orig) continue;
  fnStats.set(name, { calls: 0, deltaNz: 0, deltaDistinct: 0, threw: 0 });
  state.fnDispatch.set(a, function (...args) {
    const s = fnStats.get(name);
    s.calls++;
    const pre = snap(back);
    depthCounter.v++;
    let res;
    try { res = orig(...args); }
    catch (e) { s.threw++; depthCounter.v--; throw e; }
    depthCounter.v--;
    const post = snap(back);
    s.deltaNz += (post.nz - pre.nz);
    s.deltaDistinct += (post.distinct - pre.distinct);
    return res;
  });
}

// Run one tick
try { r.runTick(); } catch (e) { console.log(`tick threw: ${e.message?.slice(0, 80)}`); }

console.log(`\n=== Function stats (1 tick) ===`);
console.log(`name | calls | deltaNz | deltaDistinct | threw`);
for (const [name, s] of [...fnStats.entries()].sort((a, b) => Math.abs(b[1].deltaNz) - Math.abs(a[1].deltaNz))) {
  console.log(`  ${name.padEnd(24)} | ${String(s.calls).padStart(5)} | ${String(s.deltaNz).padStart(8)} | ${String(s.deltaDistinct).padStart(5)} | ${s.threw}`);
}

console.log(`\n=== Final state ===`);
const finalBack = snap(back);
const finalPri = snap(primary);
console.log(`  back:    nz=${finalBack.nz}/${back.width*back.height} distinct=${finalBack.distinct}`);
console.log(`  primary: nz=${finalPri.nz}/${primary.width*primary.height} distinct=${finalPri.distinct}`);
