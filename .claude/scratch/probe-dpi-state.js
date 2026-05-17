#!/usr/bin/env node
// Inspect the DPI struct state at the moment 42b079 enters.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");
const { regs } = await import("../../runtime/regs.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfsRoot = resolve(ROOT, "web/assets");
const vfs = new Map();
for (const f of readdirSync(vfsRoot)) {
  const p = join(vfsRoot, f);
  if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
}

const r = createRuntime({ dataBin, vfs });
const heap = r.heap;
r.runInit();

// Hook 42b079 — dump EDI (DPI ptr) and DPI contents at entry
const orig = state.fnDispatch.get(0x42b079);
state.fnDispatch.set(0x42b079, function (...args) {
  const dpi = regs.edi >>> 0;
  console.log(`\n[42b079] entry: regs.edi (dpi) = 0x${dpi.toString(16)}`);
  if (dpi !== 0xffffffff) {
    console.log(`  DPI+0    bytes=0x${heap.u32(dpi).toString(16)}`);
    console.log(`  DPI+4    clipX = ${heap.i16(dpi + 4)}`);
    console.log(`  DPI+6    clipY = ${heap.i16(dpi + 6)}`);
    console.log(`  DPI+8    clipW = ${heap.i16(dpi + 8)}`);
    console.log(`  DPI+a    clipH = ${heap.i16(dpi + 0xa)}`);
    console.log(`  DPI+c    pitch_diff = ${heap.i16(dpi + 0xc)}`);
    console.log(`  DPI+e    zoom  = ${heap.i16(dpi + 0xe)}`);
  }
  console.log(`  regs.esi (window) = 0x${(regs.esi >>> 0).toString(16)}`);
  // wndow+8 = viewport pointer
  const vp = heap.u32((regs.esi >>> 0) + 8) >>> 0;
  console.log(`  window+8 (viewport) = 0x${vp.toString(16)}`);
  if (vp !== 0) {
    console.log(`    vp+0  screen_w=${heap.u16(vp)}, vp+2 screen_h=${heap.u16(vp+2)}`);
    console.log(`    vp+4  screen_x=${heap.u16(vp+4)}, vp+6 screen_y=${heap.u16(vp+6)}`);
    console.log(`    vp+8  view_x=${heap.u16(vp+8)}, vp+a view_y=${heap.u16(vp+0xa)}`);
    console.log(`    vp+10 zoom  =${heap.u8(vp+0x10)}`);
    console.log(`    vp+12 (read by 4316f3 setU16 991f8c) = ${heap.u16(vp+0x12)}`);
  }
  try { return orig(...args); } catch (e) { console.log(`[42b079] EXC: ${e.message?.slice(0,80)}`); throw e; }
});

try { r.runTick(); } catch (e) { console.log(`tick threw: ${e.message?.slice(0,80)}`); }

// After tick, look at the recursion-blowing state
console.log(`\nAfter tick (DPI state if recoverable):`);
// We can't recover the recursion-time state — but we know the values.
console.log(`(see EXC above)`);

// Let's directly invoke FUN_009b8491 with the actual EDI and observe.
// First find the canonical DPI ptr — try the per-strip one at 0x981ef8 OR
// the back-buffer DPI at 0x99fb7c.
console.log(`\nKey DPI pointers:`);
console.log(`  [0x99fb7c] DPI bytes ptr = 0x${heap.u32(0x99fb7c).toString(16)}`);
console.log(`  [0x99fb80] DPI clipX     = ${heap.i16(0x99fb80)}`);
console.log(`  [0x99fb82] DPI clipY     = ${heap.i16(0x99fb82)}`);
console.log(`  [0x99fb84] DPI clipW     = ${heap.i16(0x99fb84)}`);
console.log(`  [0x99fb86] DPI clipH     = ${heap.i16(0x99fb86)}`);
console.log(`  [0x99fb88] DPI pitch     = ${heap.i16(0x99fb88)}`);
console.log(`  [0x99fb8a] DPI zoom      = ${heap.i16(0x99fb8a)}`);
console.log();
console.log(`  [0x981ef8] per-strip DPI = 0x${heap.u32(0x981ef8).toString(16)}`);
const sdpi = heap.u32(0x981ef8) >>> 0;
if (sdpi !== 0) {
  console.log(`    DPI+0 bytes  = 0x${heap.u32(sdpi).toString(16)}`);
  console.log(`    DPI+4 clipX  = ${heap.i16(sdpi+4)}`);
  console.log(`    DPI+6 clipY  = ${heap.i16(sdpi+6)}`);
  console.log(`    DPI+8 clipW  = ${heap.i16(sdpi+8)}`);
  console.log(`    DPI+a clipH  = ${heap.i16(sdpi+0xa)}`);
  console.log(`    DPI+c pitch  = ${heap.i16(sdpi+0xc)}`);
  console.log(`    DPI+e zoom   = ${heap.i16(sdpi+0xe)}`);
}
