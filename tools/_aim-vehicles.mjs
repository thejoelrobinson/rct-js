// Derive a vehicle-aimed viewport POKE for rotated-camera oracles (ADD.59).
// Captures the live vehicle descriptors at rot0 (fnDispatch wrap of 0x5d7503),
// rotates canonically (FUN_004340f5), lets a few ticks refresh the 444927-
// cached iso bboxes, aims viewport slot 0 at the cluster median, and counts
// 0x5d7503 crossings to prove the aim works. Prints the POKE= string for
// tools/_lockstep-auto.mjs / tools/_soakhash.mjs.
//   ROTATE=1 TICKS=10 node tools/_aim-vehicles.mjs
import { readFileSync } from "node:fs";
const ROOT = "/Users/joelrobinson/rct-js";
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import(ROOT + "/runtime/harness.js");
const { setEipHook, getEipHook, clearEipHook, runFunction } = await import(ROOT + "/harness/x86.js");
const { state } = await import(ROOT + "/runtime/win32/context.js");
const { regs } = await import(ROOT + "/runtime/regs.js");
const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(ROOT + "/web/assets/" + n)); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(ROOT + "/decompiled/data.bin"), vfs });
const heap = r.heap;
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(heap); enterScenarioPlay(heap);

// phase 1: record vehicle descs at rot0
const descs = new Set();
const origFn = state.fnDispatch.get(0x5d7503);
state.fnDispatch.set(0x5d7503, function (...a) { descs.add(regs.esi >>> 0); return origFn(...a); });
for (let i = 0; i < 6; i++) { try { r.runTick(); } catch {} }
console.log(`captured ${descs.size} vehicle descs at rot0`);

// phase 2: canonical rotate
const ROTATE = parseInt(process.env.ROTATE || "1", 10) & 3;
if (ROTATE) {
  let cpu = null; const CAP = 0x5da274; const prevCap = getEipHook(CAP);
  setEipHook(CAP, function (c) { cpu = c; return prevCap ? prevCap(c) : undefined; });
  try { r.runTick(); } catch {}
  if (prevCap) setEipHook(CAP, prevCap); else clearEipHook(CAP);
  let mainWin = 0;
  const listEnd = heap.u32(0x009a1164) >>> 0;
  for (let w = 0x009a013c; w < listEnd; w += 0x178) if (heap.u8(w + 0x174) === 0) { mainWin = w >>> 0; break; }
  const stackTop = (heap.bytes.byteLength - 0x800) >>> 0;
  for (let i = 0; i < ROTATE; i++) { cpu.regs.esi = mainWin;
    try { runFunction(cpu, 0x004340f5, { stackTop, limit: 50_000_000 }); } catch (e) { console.log("rot threw", e.message); } }
  try { r.runTick(); } catch {}
  for (let i = 0; i < 3; i++) { try { r.runTick(); } catch {} }   // refresh bboxes
}
const s16 = (v) => (v << 16) >> 16;
const pts = [];
for (const esi of descs) {
  const l = s16(heap.u16(esi + 0x16)), t = s16(heap.u16(esi + 0x18));
  const rt = s16(heap.u16(esi + 0x1a)), b = s16(heap.u16(esi + 0x1c));
  if (l < rt && t < b) pts.push({ cx: (l + rt) >> 1, cy: (t + b) >> 1 });
}
const xs = pts.map(p => p.cx).sort((a,b)=>a-b), ys = pts.map(p => p.cy).sort((a,b)=>a-b);
const cx = xs[xs.length >> 1], cy = ys[ys.length >> 1];
const VP = 0x009a1168;
const vw = heap.u16(VP + 0x0c), vh = heap.u16(VP + 0x0e);
const vx = (cx - (vw >> 1)) & 0xffff, vy = (cy - (vh >> 1)) & 0xffff;
heap.setU16(VP + 0x08, vx); heap.setU16(VP + 0x0a, vy);
console.log(`rot=${heap.u32(0x991f88)} cluster=(${cx},${cy}) aimed=(${s16(vx)},${s16(vy)})  POKE=9a1170=${vx.toString(16)}/2,9a1172=${vy.toString(16)}/2`);

let viaDispatch = 0, viaHook = 0;
const orig2 = state.fnDispatch.get(0x5d7503);
state.fnDispatch.set(0x5d7503, function (...a) { viaDispatch++; return orig2(...a); });
const origHook = getEipHook(0x5d7503);
setEipHook(0x5d7503, function (c) { viaHook++; return origHook(c); });
const TICKS = parseInt(process.env.TICKS || "10", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch {} }
console.log(`ROTATE=${ROTATE} TICKS=${TICKS} viaDispatch=${viaDispatch} viaHook=${viaHook}`);
