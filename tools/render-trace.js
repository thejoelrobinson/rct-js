#!/usr/bin/env node
// tools/render-trace.js — paint-chain instrumentation.
//
// Boots the native runtime like dump-frames.js, then wraps the
// fnDispatch entries for the eight paint-chain helpers the title-
// screen render path leans on. Every routed call is logged with the
// register snapshot at entry. After each tick we snapshot every DDraw
// surface's non-zero pixel count so per-tick paint productivity is
// visible alongside the call log.
//
// Usage:
//   node tools/render-trace.js                # default 500 ticks
//   TICKS=2000 node tools/render-trace.js
//
// Output:
//   /tmp/rct-render-trace.csv        — per-call records
//   /tmp/rct-render-trace-ticks.csv  — per-tick non-zero pixel totals
//
// Two capture paths:
//
//   (1) fnDispatch wrapping — catches WindowProc-dispatched entries and
//       any callIndirect routed to one of the eight addresses. Misses
//       direct ES-import calls between paint helpers.
//
//   (2) Source hook — paint helpers may call
//
//         if (typeof globalThis._renderTrace === "function")
//           globalThis._renderTrace("FUN_00xxxxxx");
//
//       at function entry. The hook reads regs itself, so the call site
//       is a single line. This catches ES-import calls that (1) misses.
//
// Per-tick: sample non-zero pixel counts AND fnv1a checksums for every
// DDraw surface. A changing checksum with a stable non-zero count means
// paint IS firing but writing zeros — invaluable for disambiguating
// "paint didn't run" from "paint ran but produced black pixels".

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { createRuntime } from "../runtime/harness.js";
import { state } from "../runtime/win32/context.js";
import { regs } from "../runtime/regs.js";
import { postWindowMessage } from "../runtime/win32/user32.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const WM_PAINT = 0x000F;
const WM_TIMER = 0x0113;
const TICKS = parseInt(process.env.TICKS || "500", 10);

// (address, friendly name) — keep these in lock-step with the helpers
// listed in ported/auto/42b079.js:54-59 plus master widget paint (5e4400)
// and background fill (5e0e07) per the Phase A plan.
const PAINT_TARGETS = [
  [0x9b30bc, "clear-rect"],
  [0x9b30f1, "sprite-blit"],
  [0x5e4400, "master-widget-paint"],
  [0x5e0e07, "background-fill"],
  [0x431b6f, "init-paint-slot-ring"],
  [0x436b2a, "terrain-dispatch"],
  [0x433bae, "sprite-z-sort"],
  [0x433e1c, "sprite-blit-inner"],
];

function loadVfs() {
  const vfs = new Map();
  const vfsRoot = resolve(ROOT, "web/assets");
  for (const f of readdirSync(vfsRoot)) {
    const p = join(vfsRoot, f);
    if (!statSync(p).isFile()) continue;
    vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
  }
  for (const name of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) {
    if (!vfs.has(name)) vfs.set(name, new Uint8Array(0));
  }
  return vfs;
}

// fnv1a 32-bit over a sparse rectangle in heap. Faster than crypto hash
// for byte-equality detection. ~3-5ms for 640x480 in V8.
function fnv1aSurface(bytes, base, width, height, pitch) {
  let h = 2166136261 >>> 0;
  for (let y = 0; y < height; y++) {
    const row = base + y * pitch;
    for (let x = 0; x < width; x++) {
      h = Math.imul(h ^ bytes[row + x], 16777619);
    }
  }
  return h >>> 0;
}

function sampleSurfaces(heap) {
  const out = [];
  for (const [addr, surf] of state.ddrawSurfaces) {
    const { width, height, pitch, bytes } = surf;
    let nonZero = 0;
    const src = heap.bytes;
    for (let y = 0; y < height; y++) {
      const row = bytes + y * pitch;
      for (let x = 0; x < width; x++) if (src[row + x] !== 0) nonZero++;
    }
    const hash = fnv1aSurface(src, bytes, width, height, pitch);
    out.push({ addr, w: width, h: height, nonZero, hash });
  }
  return out;
}

let currentTick = 0;
const callRecords = []; // { tick, source, fnAddr, name, eax, ... }
const tickRecords = []; // { tick, surfAddr, w, h, nonZero, hash }

function pushCallRecord(source, name, fnAddr) {
  callRecords.push({
    tick: currentTick,
    source,           // "dispatch" or "source-hook"
    fnAddr: fnAddr || 0,
    name,
    eax: regs.eax >>> 0,
    ebx: regs.ebx >>> 0,
    ecx: regs.ecx >>> 0,
    edx: regs.edx >>> 0,
    esi: regs.esi >>> 0,
    edi: regs.edi >>> 0,
    ebp: regs.ebp >>> 0,
  });
}

function installWrappers() {
  let wrapped = 0;
  for (const [addr, name] of PAINT_TARGETS) {
    const orig = state.fnDispatch.get(addr);
    if (typeof orig !== "function") {
      console.warn(`[render-trace] no fnDispatch entry for 0x${addr.toString(16)} (${name})`);
      continue;
    }
    state.fnDispatch.set(addr, function (heap, ...args) {
      pushCallRecord("dispatch", name, addr);
      return orig(heap, ...args);
    });
    wrapped++;
  }
  // Source hook — paint helpers invoke this at entry (added by hand).
  // Looks up the friendly name from the FUN_ prefix the caller passes.
  globalThis._renderTrace = function (fnName) {
    const target = PAINT_TARGETS.find(([a]) => "FUN_00" + a.toString(16).padStart(6, "0") === fnName);
    pushCallRecord("source-hook", target ? target[1] : fnName, target ? target[0] : 0);
  };
  return wrapped;
}

function writeCsv() {
  const callPath = "/tmp/rct-render-trace.csv";
  const tickPath = "/tmp/rct-render-trace-ticks.csv";
  const callRows = ["tick,source,addr,name,eax,ebx,ecx,edx,esi,edi,ebp"];
  for (const r of callRecords) {
    callRows.push([
      r.tick,
      r.source,
      "0x" + r.fnAddr.toString(16),
      r.name,
      "0x" + r.eax.toString(16),
      "0x" + r.ebx.toString(16),
      "0x" + r.ecx.toString(16),
      "0x" + r.edx.toString(16),
      "0x" + r.esi.toString(16),
      "0x" + r.edi.toString(16),
      "0x" + r.ebp.toString(16),
    ].join(","));
  }
  writeFileSync(callPath, callRows.join("\n") + "\n");

  const tickRows = ["tick,surface,width,height,non_zero_pixels,fnv1a"];
  for (const r of tickRecords) {
    tickRows.push([r.tick, "0x" + r.surfAddr.toString(16), r.w, r.h, r.nonZero, "0x" + r.hash.toString(16)].join(","));
  }
  writeFileSync(tickPath, tickRows.join("\n") + "\n");

  console.log(`wrote ${callPath} — ${callRecords.length} call records`);
  console.log(`wrote ${tickPath} — ${tickRecords.length} surface-tick rows`);
}

function summarize() {
  const byName = new Map();
  for (const r of callRecords) byName.set(r.name, (byName.get(r.name) || 0) + 1);
  console.log("\n--- paint-helper call counts ---");
  for (const [name, n] of [...byName.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${name.padEnd(24)} ${n}`);
  }
  const missing = PAINT_TARGETS.filter(([, n]) => !byName.has(n));
  if (missing.length > 0) {
    console.log("\n--- helpers never called ---");
    for (const [addr, name] of missing) {
      console.log(`  0x${addr.toString(16)}  ${name}`);
    }
  }
  // Hash-change analysis — distinguish "paint didn't run" from "paint ran
  // but wrote zeros".
  console.log(`\n--- per-surface checksum activity ---`);
  const perSurface = new Map();
  for (const r of tickRecords) {
    if (!perSurface.has(r.surfAddr)) perSurface.set(r.surfAddr, []);
    perSurface.get(r.surfAddr).push(r);
  }
  for (const [addr, rows] of perSurface) {
    const hashes = new Set(rows.map(r => r.hash));
    const last = rows[rows.length - 1];
    console.log(`  0x${addr.toString(16).padEnd(8)} ${last.w}x${last.h}  ` +
      `distinct hashes: ${hashes.size}  final non-zero: ${last.nonZero}  final hash: 0x${last.hash.toString(16)}`);
  }
}

async function main() {
  console.log(`render-trace: TICKS=${TICKS}`);
  const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
  const vfs = loadVfs();
  const runtime = createRuntime({ dataBin, vfs });

  try { runtime.runInit(); }
  catch (e) { console.error(`runInit threw: ${e.message}`); }

  const wrapped = installWrappers();
  console.log(`wrapped ${wrapped}/${PAINT_TARGETS.length} paint targets`);

  let tickErrors = 0;
  for (let i = 1; i <= TICKS; i++) {
    currentTick = i;
    const hwnd = state.firstHwnd || 0;
    if (hwnd) {
      postWindowMessage(hwnd, WM_TIMER, 1, 0);
      if ((i & 1) === 0) postWindowMessage(hwnd, WM_PAINT, 0, 0);
    }
    try { runtime.runTick(() => {}); }
    catch (e) {
      tickErrors++;
      if (tickErrors >= 20) { console.error("aborting after 20 tick errors"); break; }
    }
    // Sample surfaces every 25 ticks — full per-tick is too slow on large surfaces.
    if (i % 25 === 0 || i === TICKS) {
      for (const s of sampleSurfaces(runtime.heap)) {
        tickRecords.push({ tick: i, surfAddr: s.addr, w: s.w, h: s.h, nonZero: s.nonZero, hash: s.hash });
      }
    }
  }

  writeCsv();
  summarize();
}

main().catch((e) => {
  console.error(`[fatal] ${e.message}`);
  if (e.stack) console.error(e.stack.split("\n").slice(0, 8).join("\n"));
  process.exit(1);
});
