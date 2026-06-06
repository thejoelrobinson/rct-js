// β2 apples-to-apples probe: boot via the SAME deterministic harness as the
// replay gate, then report surface addr + tick-1 hash + pixel coverage for
// whatever blit chain is currently wired in ported/auto/9b{438b,...}.js.
// Run it once per chain (old / decoder / interp router) and compare.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defaultPalette } from "../harness/csg.js";

const LABEL = process.argv[2] || "chain";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let _tick = 1700000000000;
Date.now = () => ++_tick;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");

const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const r = createRuntime({ dataBin, vfs });
const heap = r.heap;
try { r.runInit(); } catch (e) { console.error("runInit:", e.message); }
try { r.runTick(); } catch (e) { console.error("tick0:", e.message); }
skipFadeIn(heap);

const W = 640, H = 480, N = W * H;
let surf = null, cands = [];
for (const [, s] of state.ddrawSurfaces || []) {
  if (s.width === W && s.height === H && typeof s.bytes === "number") cands.push(s.bytes);
}
surf = cands.length ? Math.max(...cands) : null;

r.runTick(); // tick 1

let h = 0x811c9dc5 >>> 0, nz = 0; const pal = new Set();
for (let i = 0; i < N; i++) {
  const b = heap.u8(surf + i);
  h ^= b; h = Math.imul(h, 0x01000193) >>> 0;
  if (b !== 0) { nz++; pal.add(b); }
}
console.log(`surface=0x${surf.toString(16)}  allCands=[${cands.map(c=>"0x"+c.toString(16)).join(",")}]`);
console.log(`tick1 hash=0x${(h>>>0).toString(16).padStart(8,"0")}  nonzero=${nz}/${N}  palette=${pal.size}`);

// Render the back surface to a PPM through the captured palette so the three
// chains can be compared VISUALLY (a hash can't tell better pixels from worse).
let palette = state.capturedPalette;
if (palette) {
  let nonBlack = 0;
  for (let i = 0; i < 256; i++) if (palette[i*4] || palette[i*4+1] || palette[i*4+2]) nonBlack++;
  if (nonBlack < 32) palette = defaultPalette();
} else palette = defaultPalette();
const px = Buffer.alloc(N * 3);
for (let i = 0; i < N; i++) {
  const idx = heap.u8(surf + i), p = idx * 4;
  px[i*3] = palette[p]; px[i*3+1] = palette[p+1]; px[i*3+2] = palette[p+2];
}
const ppmPath = `/tmp/beta2-${LABEL}.ppm`;
writeFileSync(ppmPath, Buffer.concat([Buffer.from(`P6\n${W} ${H}\n255\n`, "ascii"), px]));
console.log(`wrote ${ppmPath}`);
if (globalThis.__interpBlitStats) {
  const s = globalThis.__interpBlitStats;
  console.log(`interp-router: ${s.calls} calls, ${s.errors} errors`);
}
