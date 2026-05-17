// Count distinct palette indices in the best back-buffer surface after a tick.
// If the fix works, distinct count > 1 (i.e. terrain pixels visible).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = "/Users/joelrobinson/rct-js";

const { createRuntime } = await import(resolve(ROOT, "runtime/harness.js"));
const { state } = await import(resolve(ROOT, "runtime/win32/context.js"));

const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const VFS_PLACEHOLDERS = ["css10.dat","css12.dat","css16.dat","tutl.dat"];
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const name of VFS_FILES) { try { vfs.set(name.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", name))); } catch (e) {} }
for (const name of VFS_PLACEHOLDERS) vfs.set(name.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch (e) { console.error("init err:", String(e).slice(0,200)); }
try { r.runTick(); } catch (e) { console.error("tick err:", String(e).slice(0,200)); }

// Find the best back-buffer surface and count distinct values
let best = null;
let bestNz = 0;
for (const s of state.ddrawSurfaces.values()) {
  if (s.width < 320 || s.height < 240) continue;
  const sz = s.width * s.height;
  let nz = 0;
  const stride256 = Math.max(1, sz >> 8);
  for (let i = 0; i < sz; i += stride256) if (r.heap.bytes[s.bytes + i] !== 0) nz++;
  if (nz > bestNz || (best === null && s.isPrimary)) { bestNz = nz; best = s; }
}

if (!best) {
  console.log("No suitable surface found");
  process.exit(0);
}

console.log(`Surface: ${best.width}x${best.height} isPrimary=${best.isPrimary} pitch=${best.pitch} addr=0x${best.bytes.toString(16)}`);

const palette = new Set();
const sz = best.pitch * best.height;
for (let i = 0; i < sz; i++) palette.add(r.heap.bytes[best.bytes + i]);
console.log(`Distinct palette indices: ${palette.size}`);

// Histogram of top values
const hist = new Map();
for (let i = 0; i < sz; i++) {
  const v = r.heap.bytes[best.bytes + i];
  hist.set(v, (hist.get(v) || 0) + 1);
}
const sorted = [...hist.entries()].sort((a,b) => b[1] - a[1]);
console.log("Top 10 palette indices:");
for (const [v, c] of sorted.slice(0, 10)) {
  console.log(`  0x${v.toString(16).padStart(2,"0")}: ${c} pixels (${(c/sz*100).toFixed(1)}%)`);
}
console.log(`Total pixels: ${sz}`);
console.log(`Surfaces total: ${state.ddrawSurfaces.size}`);
