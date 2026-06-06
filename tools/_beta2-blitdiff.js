// Per-blit surface footprint via SNAPSHOT DIFF (method-agnostic: catches both
// heap.setU8 and direct heap.bytes[] writes, unlike the watchpoint tools).
// At each blit boundary (SRC_BASE write to 0x9a2010) diff the live surface vs
// the previous snapshot to get the just-finished blit's net changed pixels.
// Dumps "idx:minR,maxR,minC,maxC,count" to FILE. SRC_BASE order is identical
// across chains, so blit#N is the same sprite — run for JS and interp, diff.
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
const bytes = r.heap.bytes;

let snap = bytes.slice(surf, surf + N);   // baseline before tick 1
const fp = [];   // per blit
let idx = -1;
function closeBlit() {
  if (idx < 0) return;
  let minR=1e9,maxR=-1,minC=1e9,maxC=-1,cnt=0;
  for (let p=0;p<N;p++){ if(bytes[surf+p]!==snap[p]){ const row=(p/W)|0,col=p%W; if(row<minR)minR=row; if(row>maxR)maxR=row; if(col<minC)minC=col; if(col>maxC)maxC=col; cnt++; snap[p]=bytes[surf+p]; } }
  fp[idx] = cnt ? `${minR},${maxR},${minC},${maxC},${cnt}` : "-";
}
const cb = (a) => { if ((a>>>0) === 0x9a2010) { closeBlit(); idx++; } };
globalThis._x86Watch = { lo: 0x9a2010, hi: 0x9a2014, cb };
globalThis._heapWatch = { lo: 0x9a2010, hi: 0x9a2014, cb };
try { r.runTick(); } catch {}
closeBlit();

writeFileSync(process.env.FILE || "/tmp/beta2-bd.txt", fp.map((b,i)=>`${i}:${b||"-"}`).join("\n"));
console.log(`wrote ${fp.length} per-blit snapshot footprints`);
