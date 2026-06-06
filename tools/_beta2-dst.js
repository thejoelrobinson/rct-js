// Per-row back-surface write histogram for the currently-wired blit chain at
// tick 1 (interp via _x86Watch, JS via _heapWatch). Dumps writes-per-row so two
// chains can be diffed to see WHICH rows are over/under-drawn.
import { readFileSync } from "node:fs";
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

const rows = new Int32Array(H);
const cb = (a, sz) => { if (a >= surf && a < surf + N) rows[Math.floor((a - surf) / W)] += (sz || 1); };
globalThis._x86Watch = { lo: surf, hi: surf + N, cb };
globalThis._heapWatch = { lo: surf, hi: surf + N, cb };
try { r.runTick(); } catch {}

// Compact: print every 8th row's write count.
const out = [];
for (let y = 0; y < H; y += 8) {
  let s = 0; for (let k = 0; k < 8 && y + k < H; k++) s += rows[y + k];
  out.push(`${y}:${s}`);
}
console.log(out.join(" "));
