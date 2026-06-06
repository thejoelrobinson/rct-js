// Compare the dst pointer (regs.edi) the JS OUTER computes for each blit vs the
// binary's actual first surface-write position. MODE=js routes the inner
// blitters through the logging interp router (capturing JS-outer regs.edi).
// MODE=ip runs full-interp and records the first surface write per blit. Both
// are method-agnostic (regs.edi for JS; x86 writes for the binary). Run both,
// diff per blit → blits where the JS-outer dst != binary dst are position bugs.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const ROOT = process.cwd();
const MODE = process.env.MODE || "js";
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

globalThis.__blitN = -1;
const out = [];   // out[blitN] = "row,col"
if (MODE === "js") {
  globalThis.__ediLog = [];
  // count blits on SRC_BASE write (JS outer uses heap.setU32 → _heapWatch)
  globalThis._heapWatch = { lo: 0x9a2010, hi: 0x9a2014, cb: (a) => { if ((a>>>0)===0x9a2010) globalThis.__blitN++; } };
  try { r.runTick(); } catch {}
  for (const [n, edi] of globalThis.__ediLog) {
    if (out[n] === undefined && edi >= surf && edi < surf + N) { const o = edi - surf; out[n] = `${(o/W)|0},${o%W}`; }
  }
} else {
  // full-interp: first surface write per blit (interp writes via x86 → _x86Watch)
  globalThis._x86Watch = { lo: 0x9a2010, hi: surf + N, cb: (a) => {
    a = a >>> 0;
    if (a === 0x9a2010) { globalThis.__blitN++; return; }
    const n = globalThis.__blitN;
    if (n >= 0 && out[n] === undefined && a >= surf && a < surf + N) { const o = a - surf; out[n] = `${(o/W)|0},${o%W}`; }
  } };
  try { r.runTick(); } catch {}
}
writeFileSync(process.env.FILE || `/tmp/beta2-edi-${MODE}.txt`, out.map((v,i)=>`${i}:${v||"-"}`).join("\n"));
console.log(`MODE=${MODE}: wrote ${out.filter(Boolean).length} dst positions`);
