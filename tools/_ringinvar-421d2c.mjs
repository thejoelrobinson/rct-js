#!/usr/bin/env node
// Step-2 invariance oracle for the 421d2c per-tile palette-ring copy.
//
// The 421d2c tail copies 18 dwords from [0x999f9a..] and 18 from [0x999fdc..]
// into [0x5f4104..]/[0x5f4146..] on EVERY tile. If those two SOURCE rings are
// constant across all the tile paints in one frame, the 36-dword copy can run
// once per frame instead of per tile. This tool snapshots both source rings
// (0x48 bytes each) at the moment the 421d2c hook fires, for every call in the
// soak, and reports whether they ever change.
//
//   TICKS=2 node tools/_ringinvar-421d2c.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const ow = console.warn; console.warn = (...a) => { const s = String(a[0] ?? ""); if (/^\[/.test(s)) return; ow(...a); };

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");
const { setEipHook, getEipHook } = await import("../harness/x86.js");

const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);
const heap = r.heap, bytes = heap.bytes;

const SRC_LO = 0x00999f9a, SRC_HI = 0x00999fdc, LEN = 0x48; // 18 dwords each
const realHook = getEipHook(0x00421d2c);

function snap(base) { return Buffer.from(bytes.slice(base, base + LEN)).toString("hex"); }

let calls = 0;
// Per-frame tracking: reset at each frame boundary (we detect frame by call#1
// of a burst — simplest: just track first-seen-per-tick via an external loop).
let frameFirstLo = null, frameFirstHi = null;
let loChangesInFrame = 0, hiChangesInFrame = 0, prevLo = null, prevHi = null;
const frameStats = [];

setEipHook(0x00421d2c, function (c) {
  calls++;
  const lo = snap(SRC_LO), hi = snap(SRC_HI);
  if (frameFirstLo === null) { frameFirstLo = lo; frameFirstHi = hi; }
  else {
    if (lo !== frameFirstLo) loChangesInFrame++;
    if (hi !== frameFirstHi) hiChangesInFrame++;
  }
  prevLo = lo; prevHi = hi;
  realHook(c);
});

const TICKS = parseInt(process.env.TICKS || "2", 10);
for (let i = 0; i < TICKS; i++) {
  const c0 = calls; frameFirstLo = null; frameFirstHi = null; loChangesInFrame = 0; hiChangesInFrame = 0;
  try { r.runTick(); } catch (e) { console.log(`tick ${i} ERR ${e.message}`); }
  const n = calls - c0;
  frameStats.push({ tick: i, fires: n, loChanges: loChangesInFrame, hiChanges: hiChangesInFrame, first: frameFirstLo?.slice(0, 16) });
}
console.log(`total 421d2c calls=${calls}`);
for (const s of frameStats) {
  console.log(`tick ${s.tick}: fires=${s.fires}  LO-ring differs-from-first on ${s.loChanges} calls,  HI-ring differs on ${s.hiChanges} calls  (first LO bytes ${s.first})`);
}
console.log(loChangesInFrame === 0 && hiChangesInFrame === 0
  ? "(last tick: rings INVARIANT across the tile loop)"
  : "(rings vary across the tile loop — see per-tick counts)");
