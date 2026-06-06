// Capture the back-surface writes produced by a single blit (default the Nth,
// segmented by SRC_BASE writes to 0x9a2010) for the currently-wired chain.
// Wide watchpoint catches both the 0x9a2010 blit markers and surface writes.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const ROOT = process.cwd();
const TARGET = parseInt(process.env.BLIT || "0", 10);
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

let blit = -1;
const hits = [];
const cb = (a) => {
  a = a >>> 0;
  if (a === 0x9a2010) { blit++; return; }
  if (blit === TARGET && a >= surf && a < surf + N) hits.push(a - surf);
};
globalThis._x86Watch = { lo: 0x9a2010, hi: surf + N, cb };
globalThis._heapWatch = { lo: 0x9a2010, hi: surf + N, cb };
try { r.runTick(); } catch {}

if (!hits.length) { console.log(`blit #${TARGET}: NO surface writes`); }
else {
  let minR = 1e9, maxR = -1, minC = 1e9, maxC = -1;
  for (const o of hits) { const row = (o / W) | 0, col = o % W; if (row<minR)minR=row; if(row>maxR)maxR=row; if(col<minC)minC=col; if(col>maxC)maxC=col; }
  console.log(`blit #${TARGET}: ${hits.length} writes, rows ${minR}..${maxR}, cols ${minC}..${maxC}`);
  console.log(`  first dst offsets: ${hits.slice(0,6).map(o=>`r${(o/W)|0}c${o%W}`).join(" ")}`);
}
