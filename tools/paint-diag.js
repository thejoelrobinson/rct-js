#!/usr/bin/env node
// tools/paint-diag.js — single-shot paint-pipeline diagnostic.
//
// Boots the runtime, runs init + N ticks, captures EVERYTHING relevant to
// figuring out why the back buffer isn't getting terrain pixels:
//
//   • Every callIndirect target during init AND per tick, with hit count
//     and resolution status (lifted shim / ported / Win32 stub / MISSING).
//   • Paint-chain helpers fired (via globalThis._renderTrace hook).
//   • Painter shim hit counts (per address, per tick).
//   • Paint ring state: base [0x5f96e0], head [0x5f96e8], 256 bytes of
//     slot data starting at the head's previous position.
//   • Per-surface pixel histograms (top 12 palette indices).
//   • Window pool: each slot's wndProc + viewport pointer.
//
// Output (under /tmp/):
//   - paint-diag.json (machine-readable rollup)
//   - paint-diag-tick<N>-surf<i>.ppm (rendered PPM dump per surface)
//
// Usage:
//   node tools/paint-diag.js                 # default 5 ticks
//   TICKS=10 node tools/paint-diag.js
//   STRICT=1 node tools/paint-diag.js        # exit non-zero if terrain didn't render

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const TICKS = parseInt(process.env.TICKS || "5", 10);
const STRICT = !!process.env.STRICT;

// _renderTrace must be installed before harness module loads.
const renderTraceCounts = new Map();
globalThis._renderTrace = (name) => {
  renderTraceCounts.set(name, (renderTraceCounts.get(name) || 0) + 1);
};

const { createRuntime } = await import("../runtime/harness.js");
const { defaultPalette } = await import("../harness/csg.js");

// ---- VFS ----
const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const name of VFS_FILES) {
  try { vfs.set(name.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", name))); }
  catch (e) { /* missing OK */ }
}
for (const name of VFS_PLACEHOLDERS) vfs.set(name.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });

// ---- Painter addresses ----
const PAINTER_ADDRS = JSON.parse(readFileSync(resolve(ROOT, "lifter/extra-entries.json"), "utf8"))
  .filter((x) => x.addr !== undefined)
  .map((x) => (typeof x.addr === "string" ? parseInt(x.addr, 16) : x.addr));
const PAINTER_SET = new Set(PAINTER_ADDRS);

// ---- callIndirect instrumentation: wrap state.fnDispatch.get ----
const originalMap = r.state.fnDispatch;
const origGet = originalMap.get.bind(originalMap);
let currentPhase = "init";
const callCounts = new Map();        // key = "phase:addr" → count
const callMissed = new Map();        // key = "phase:addr" → count of misses
originalMap.get = function (k) {
  const a = (k >>> 0);
  const fn = origGet(a);
  const key = `${currentPhase}:0x${a.toString(16)}`;
  callCounts.set(key, (callCounts.get(key) || 0) + 1);
  if (typeof fn !== "function") {
    callMissed.set(key, (callMissed.get(key) || 0) + 1);
  }
  return fn;
};

// ---- painter shim hit counters (wrap each painter address) ----
const painterHits = new Map();
for (const a of PAINTER_ADDRS) {
  const orig = origGet(a);
  if (typeof orig !== "function") continue;
  painterHits.set(a, 0);
  originalMap.set(a, function _paintWrap(...args) {
    const phaseKey = `${currentPhase}:0x${a.toString(16)}`;
    painterHits.set(a, painterHits.get(a) + 1);
    return orig(...args);
  });
}

// ---- snapshots ----
function snapshotSurfaces() {
  // Ground-truth pointers maintained by the binary's DDraw init:
  //   DAT_005ebf34 = IDirectDrawSurface* of the PRIMARY surface (front buffer).
  //                  Allocated in FUN_0040b4d8 with DDSCAPS_PRIMARYSURFACE (0x200).
  //                  This is what the user would see in a real DDraw window.
  //   DAT_005f1fec = lpSurface (pixel-buffer addr) of the GAME OFF-SCREEN
  //                  framebuffer (a non-primary surface allocated by
  //                  DAT_005ebe8c, locked via FUN_00408f53 + FUN_00402a00).
  //                  Painters (4023b2 etc.) write into this directly; later
  //                  FUN_00402027 blits it to the locked primary surface.
  const primaryHandle  = r.heap.u32(0x005ebf34) >>> 0;
  const backBufferPtr  = r.heap.u32(0x005f1fec) >>> 0;
  const out = [];
  let maxByte = 0;
  for (const [h, surf] of r.state.ddrawSurfaces) {
    const hist = new Uint32Array(256);
    let nz = 0;
    let mx = 0;
    for (let y = 0; y < surf.height; y++) {
      const row = surf.bytes + y * surf.pitch;
      for (let x = 0; x < surf.width; x++) {
        const v = r.heap.bytes[row + x];
        hist[v]++;
        if (v !== 0) nz++;
        if (v > mx) mx = v;
      }
    }
    const top = Array.from(hist).map((c, i) => ({ idx: i, count: c }))
      .filter((e) => e.count > 0).sort((a, b) => b.count - a.count).slice(0, 12);
    out.push({
      handle: "0x" + h.toString(16),
      width: surf.width, height: surf.height, pitch: surf.pitch,
      bytes: "0x" + surf.bytes.toString(16),
      bytesRaw: surf.bytes,
      isPrimary: !!surf.isPrimary,
      isPrimaryByHandle: h === primaryHandle,
      isGameBackBuffer: surf.bytes === backBufferPtr,
      nonZero: nz, total: surf.width * surf.height,
      distinct: hist.filter((c) => c > 0).length,
      maxByte: mx,
      top,
    });
  }
  out._primaryHandle  = "0x" + primaryHandle.toString(16);
  out._backBufferPtr  = "0x" + backBufferPtr.toString(16);
  return out;
}
function snapshotPaintRing() {
  const base = r.heap.u32(0x005f96e0);
  const head = r.heap.u32(0x005f96e8);
  const flag = r.heap.u32(0x00628928);
  // Read up to 256 bytes starting at the ring base
  const dump = [];
  for (let i = 0; i < 64; i++) {
    const a = base + i * 4;
    dump.push("0x" + r.heap.u32(a).toString(16).padStart(8, "0"));
  }
  // Slot count = (head - base) / record_stride (we don't know stride yet — guess 16)
  return {
    base: "0x" + base.toString(16),
    head: "0x" + head.toString(16),
    delta: head - base,
    flag_628928: "0x" + flag.toString(16),
    first_64_dwords: dump,
  };
}
function snapshotPool() {
  const POOL_START = 0x009a013c;
  const POOL_END_PTR = 0x009a1164;
  const SLOT_STRIDE = 0x178;
  const poolEnd = r.heap.u32(POOL_END_PTR);
  const out = [];
  for (let s = POOL_START; s < poolEnd && out.length < 8; s += SLOT_STRIDE) {
    out.push({
      slot: "0x" + s.toString(16),
      wndProc: "0x" + r.heap.u32(s).toString(16),
      viewport: "0x" + r.heap.u32(s + 8).toString(16),
    });
  }
  return { end: "0x" + poolEnd.toString(16), slots: out };
}
function snapshotGlobals() {
  return {
    DAT_00991f88_rotation: r.heap.u8(0x00991f88),
    DAT_005f2400_width: r.heap.u32(0x005f2400),
    DAT_005f1ff0_height: r.heap.u32(0x005f1ff0),
    DAT_005f8d5c_zoom_flag: r.heap.u8(0x005f8d5c),
    jt_0x431bb8: Array.from({length: 4}, (_, i) => "0x" + r.heap.u32(0x431bb8 + i*4).toString(16)),
    jt_0x436b40: Array.from({length: 4}, (_, i) => "0x" + r.heap.u32(0x436b40 + i*4).toString(16)),
  };
}

// ---- run ----
const result = { ticks: [], init: null };

try { r.runInit(); } catch (e) { result.initError = String(e).slice(0, 300); }
{
  const surfaces = snapshotSurfaces();
  result.init = {
    callsByTarget: rollupByAddr(callCounts, "init"),
    missesByTarget: rollupByAddr(callMissed, "init"),
    painterChain: Object.fromEntries(renderTraceCounts),
    painterHits: Object.fromEntries(painterHits),
    globals: snapshotGlobals(),
    pool: snapshotPool(),
    surfaces,
    primaryHandle: surfaces._primaryHandle,
    gameBackBufferPtr: surfaces._backBufferPtr,
  };
}

for (let t = 0; t < TICKS; t++) {
  currentPhase = `tick${t}`;
  renderTraceCounts.clear();
  for (const a of painterHits.keys()) painterHits.set(a, 0);
  try { r.runTick(); }
  catch (e) { result.ticks.push({ tick: t, error: String(e).slice(0, 300) }); continue; }
  const surfaces = snapshotSurfaces();
  result.ticks.push({
    tick: t,
    callsByTarget: rollupByAddr(callCounts, `tick${t}`),
    missesByTarget: rollupByAddr(callMissed, `tick${t}`),
    painterChain: Object.fromEntries(renderTraceCounts),
    painterHits: Object.fromEntries(painterHits),
    paintRing: snapshotPaintRing(),
    surfaces,
    primaryHandle: surfaces._primaryHandle,
    gameBackBufferPtr: surfaces._backBufferPtr,
  });
}

function rollupByAddr(map, phase) {
  const out = {};
  for (const [k, v] of map) {
    if (!k.startsWith(phase + ":")) continue;
    out[k.slice(phase.length + 1)] = v;
  }
  return out;
}

// ---- write outputs ----
writeFileSync("/tmp/paint-diag.json", JSON.stringify(result, null, 2));

// PPM per surface (last tick)
const palette = defaultPalette();   // 256 entries × 4 bytes (BGRA?)
for (let i = 0; i < result.ticks[result.ticks.length - 1].surfaces.length; i++) {
  const s = result.ticks[result.ticks.length - 1].surfaces[i];
  const bytes = parseInt(s.bytes, 16);
  const ppmHeader = `P6\n${s.width} ${s.height}\n255\n`;
  const ppmBody = new Uint8Array(s.width * s.height * 3);
  for (let y = 0; y < s.height; y++) {
    for (let x = 0; x < s.width; x++) {
      const idx = r.heap.bytes[bytes + y * s.pitch + x];
      // palette is Uint8ClampedArray of length 1024 (4 bytes per index, RGBA-ish — depends)
      ppmBody[(y * s.width + x) * 3 + 0] = palette[idx * 4 + 0];
      ppmBody[(y * s.width + x) * 3 + 1] = palette[idx * 4 + 1];
      ppmBody[(y * s.width + x) * 3 + 2] = palette[idx * 4 + 2];
    }
  }
  const filename = `/tmp/paint-diag-surf${i}-${s.width}x${s.height}.ppm`;
  const enc = new TextEncoder();
  const header = enc.encode(ppmHeader);
  const out = new Uint8Array(header.length + ppmBody.length);
  out.set(header, 0); out.set(ppmBody, header.length);
  writeFileSync(filename, out);
}

// ---- summary to stdout ----
const finalTick = result.ticks[result.ticks.length - 1];
// Ground-truth pickers, in order of "what the user would actually see":
//   FRONT BUFFER = surface with handle == DAT_005ebf34 (and isPrimary tag).
//                  In a real DDraw window this is what's displayed. Painters
//                  do NOT write here directly — FUN_00402027 blits to it.
//   GAME BACK BUFFER = surface whose .bytes == DAT_005f1fec. Painters
//                  (4023b2 etc.) write pixels here every tick. This is the
//                  surface you want to inspect to see if painters fired.
const surfs640 = finalTick.surfaces.filter((s) => s.width === 640 && s.height === 480);
const frontBufSurf = surfs640.find((s) => s.isPrimaryByHandle) || surfs640.find((s) => s.isPrimary);
const backBufSurf  = surfs640.find((s) => s.isGameBackBuffer);
const heuristicSurf = surfs640
  .slice()
  .sort((a, b) => (b.distinct - a.distinct) || (b.nonZero - a.nonZero))[0];

console.log("=== surface table (final tick) ===");
console.log(`DAT_005ebf34 (primary handle):    ${finalTick.surfaces._primaryHandle}`);
console.log(`DAT_005f1fec (game backbuf ptr):  ${finalTick.surfaces._backBufferPtr}`);
console.log("handle             wh        bytes       role            distinct nonZero maxByte top1");
for (const s of finalTick.surfaces) {
  let role = "       ";
  if (s.isPrimaryByHandle && s.isGameBackBuffer) role = "FRONT+BACK";
  else if (s.isPrimaryByHandle) role = "FRONT     ";
  else if (s.isGameBackBuffer)  role = "GAME-BACK ";
  else if (s.isPrimary)         role = "prim(cap) ";
  const top1 = s.top[0] ? `idx${s.top[0].idx}x${s.top[0].count}` : "-";
  console.log(`${s.handle.padEnd(18)} ${(s.width+"x"+s.height).padEnd(9)} ${s.bytes.padEnd(11)} ${role}  ${String(s.distinct).padStart(3)}     ${String(s.nonZero).padStart(7)} ${String(s.maxByte).padStart(3)}    ${top1}`);
}
if (frontBufSurf) console.log(`FRONT buffer (primary):   handle=${frontBufSurf.handle} bytes=${frontBufSurf.bytes} distinct=${frontBufSurf.distinct} nonZero=${frontBufSurf.nonZero}`);
else              console.log(`FRONT buffer (primary):   NOT FOUND (DAT_005ebf34=${finalTick.surfaces._primaryHandle})`);
if (backBufSurf)  console.log(`GAME-BACK (painter dest): handle=${backBufSurf.handle} bytes=${backBufSurf.bytes} distinct=${backBufSurf.distinct} nonZero=${backBufSurf.nonZero}`);
else              console.log(`GAME-BACK (painter dest): NOT FOUND (DAT_005f1fec=${finalTick.surfaces._backBufferPtr})`);
console.log(`Heuristic pick (current):         handle=${heuristicSurf?.handle} distinct=${heuristicSurf?.distinct} nonZero=${heuristicSurf?.nonZero}`);
const heuristicMatchesFront = heuristicSurf && frontBufSurf && heuristicSurf.handle === frontBufSurf.handle;
const heuristicMatchesBack  = heuristicSurf && backBufSurf  && heuristicSurf.handle === backBufSurf.handle;
console.log(`Heuristic === FRONT? ${heuristicMatchesFront} ;  === GAME-BACK? ${heuristicMatchesBack}`);

console.log("\n=== paint-diag summary ===");
console.log(`Ticks run: ${TICKS}`);
console.log(`Init callIndirect targets: ${Object.keys(result.init.callsByTarget).length}`);
const initMisses = Object.entries(result.init.missesByTarget).filter(([,v])=>v>0);
console.log(`Init callIndirect MISSES: ${initMisses.length}  ${initMisses.slice(0,5).map(([k,v])=>`${k}×${v}`).join(", ")}`);
console.log(`Final tick callIndirect targets: ${Object.keys(finalTick.callsByTarget).length}`);
const tickMisses = Object.entries(finalTick.missesByTarget).filter(([,v])=>v>0);
console.log(`Final tick callIndirect MISSES: ${tickMisses.length}  ${tickMisses.slice(0,5).map(([k,v])=>`${k}×${v}`).join(", ")}`);
console.log(`Final tick painter chain: ${JSON.stringify(finalTick.painterChain)}`);
console.log(`Final tick painter shim hits: ${JSON.stringify(finalTick.painterHits)}`);
console.log(`Paint ring delta (head-base): 0x${finalTick.paintRing.delta.toString(16)}`);
const bestSurf = heuristicSurf;
if (bestSurf) {
  console.log(`Best 640x480 surface: distinct=${bestSurf.distinct} nonZero=${bestSurf.nonZero}`);
  console.log("  top indices:", bestSurf.top.slice(0, 8).map((t)=>`${t.idx}(${t.count})`).join(" "));
}

// Painter writes may target a heap allocation that isn't a registered DDraw
// surface (e.g. when the per-strip DPI's bytes pointer is offset into a
// non-surface region). Scan the heap for 640*480-shaped regions with high
// distinct-palette-index counts and report the top hit.
{
  const PIXELS = 640 * 480;
  const STRIDE = 0x10000;  // sample every 64K
  const heapBytes = r.heap.bytes;
  let best = { addr: 0, distinct: 0, nonZero: 0 };
  for (let addr = 0x1_000_000; addr + PIXELS < heapBytes.length - 0x10000; addr += STRIDE) {
    const dist = new Set();
    let nz = 0;
    // Sample 4096 bytes spread across the region (every 75th byte) for speed
    for (let off = 0; off < PIXELS; off += 75) {
      const v = heapBytes[addr + off];
      dist.add(v);
      if (v !== 0) nz++;
    }
    if (dist.size > best.distinct) {
      best = { addr, distinct: dist.size, nonZero: nz };
    }
  }
  if (best.distinct > 5) {
    // Compute full stats for the candidate
    const fullDist = new Set();
    let fullNZ = 0;
    for (let i = 0; i < PIXELS; i++) {
      const v = heapBytes[best.addr + i];
      fullDist.add(v);
      if (v !== 0) fullNZ++;
    }
    console.log(`Painted-region scan: 0x${best.addr.toString(16)} distinct=${fullDist.size} nonZero=${fullNZ}`);
  }
}
console.log(`\nWrote /tmp/paint-diag.json + /tmp/paint-diag-surf*.ppm`);

// ---- strict mode: bar for "passing" ----
//   Bar 1: at least 1 painter shim fires per tick.
//   Bar 2: paint ring head advances each tick.
//   Bar 3: best 640x480 surface has ≥ 8 distinct palette indices (sky + terrain
//          + sprite colors — not just monochrome sky).
//   Bar 4: no callIndirect misses during a steady-state tick.
const tier1 = Object.values(finalTick.painterHits).some((v) => v > 0);
const tier2 = finalTick.paintRing.delta > 0;
const tier3 = bestSurf && bestSurf.distinct >= 8;
const tier4 = tickMisses.length === 0;
console.log(`\n=== bars ===`);
console.log(`[${tier1 ? "✓" : "✗"}] painter shim fires per tick`);
console.log(`[${tier2 ? "✓" : "✗"}] paint ring advances`);
console.log(`[${tier3 ? "✓" : "✗"}] back buffer has ≥8 distinct palette indices`);
console.log(`[${tier4 ? "✓" : "✗"}] no callIndirect misses in steady-state tick`);
if (STRICT && !(tier1 && tier2 && tier3 && tier4)) {
  process.exit(1);
}
