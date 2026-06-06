// Per-blit back-surface footprint for the currently-wired chain at tick 1:
// for each blit (segmented by SRC_BASE writes to 0x9a2010), record the bounding
// box (minRow,maxRow,minCol,maxCol) and write count of its surface writes.
// Dump as "idx:minR,maxR,minC,maxC,count" to FILE. Run for JS and interp, diff.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const ROOT = process.cwd();
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");
const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {} try { r.runTick(); } catch {} skipFadeIn(r.heap);

const W = 640, H = 480, N = W * H;
let cands = [];
for (const [, s] of state.ddrawSurfaces || []) if (s.width === W && s.height === H && typeof s.bytes === "number") cands.push(s.bytes);
const surf = Math.max(...cands);

const fp = [];  // per-blit footprint
let cur = null;
const cb = (a) => {
  a = a >>> 0;
  if (a === 0x9a2010) { cur = { minR: 1e9, maxR: -1, minC: 1e9, maxC: -1, n: 0 }; fp.push(cur); return; }
  if (cur && a >= surf && a < surf + N) {
    const o = a - surf, row = (o / W) | 0, col = o % W;
    if (row < cur.minR) cur.minR = row; if (row > cur.maxR) cur.maxR = row;
    if (col < cur.minC) cur.minC = col; if (col > cur.maxC) cur.maxC = col;
    cur.n++;
  }
};
globalThis._x86Watch = { lo: 0x9a2010, hi: surf + N, cb };
globalThis._heapWatch = { lo: 0x9a2010, hi: surf + N, cb };
try { r.runTick(); } catch {}

const out = fp.map((b, i) => b.n ? `${i}:${b.minR},${b.maxR},${b.minC},${b.maxC},${b.n}` : `${i}:-`).join("\n");
writeFileSync(process.env.FILE || "/tmp/beta2-fp.txt", out);
console.log(`wrote ${fp.length} blit footprints to ${process.env.FILE || "/tmp/beta2-fp.txt"}`);
