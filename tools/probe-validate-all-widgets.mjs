// Validate that ALL 20 toolbar widgets work via the native dispatch chain.
//
// For each widget index (0..19), post WM_LBUTTONDOWN+WM_LBUTTONUP at the
// widget's center, tick a few times, and check observable state changes.
//
// Watches:
//   widget 0 — pause:        DAT_0099c169
//   widget 2 — sound:        DAT_006326bd
//   widget 3 — zoom out:     viewport+0x10
//   widget 4 — zoom in:      viewport+0x10
//   widget 5 — rotate:       DAT_00991f88
//   widget 7 — map:          DAT_0099c16b
//   widget 8..19 — sub-window: window-pool count growth or active-flag latches
//
// Also wraps fnDispatch[0x42a830] with a call counter to know when the
// native chain actually invoked the toolbar handler.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];

function packLParam(x, y) { return (((y & 0xffff) << 16) | (x & 0xffff)) >>> 0; }

globalThis._renderTrace = () => {};
globalThis._gotoWarn = () => {};

// Suppress painter-bridge spam.
const origWarn = console.warn;
console.warn = (...args) => {
  const s = String(args[0] ?? "");
  if (s.startsWith("[painter-bridge]") || s.startsWith("[callIndirect]") ||
      s.startsWith("[harness]") || s.startsWith("[runtime/win32 stub]")) return;
  origWarn(...args);
};

const dispMod = await import("../ported/auto/_dispatch.js");
const dispatch = dispMod.dispatch;

const regsMod = await import("../runtime/regs.js");
const regs = regsMod.regs;

const { createRuntime, skipFadeIn } = await import("../runtime/harness.js");
const ctx = await import("../runtime/win32/context.js");
const state = ctx.state;
const { postWindowMessage } = await import("../runtime/win32/user32.js");

let toolbarCalls = 0;
let widgetIdxSeen = [];
let widgetEbpSeen = [];

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const n of VFS_FILES) {
  try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
  catch (_) { }
}
for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

const runtime = createRuntime({ dataBin, vfs });
runtime.runInit();
runtime.runTick();
skipFadeIn(runtime.heap);

// Wrap the bridge'd 0x42a830 entry AFTER createRuntime, since the bridge
// installs it into state.fnDispatch during init.
const origToolbar = state.fnDispatch.get(0x42a830);
if (typeof origToolbar === "function") {
  state.fnDispatch.set(0x42a830, function (...args) {
    toolbarCalls += 1;
    widgetIdxSeen.push(regs.edx | 0);
    widgetEbpSeen.push(regs.ebp | 0);
    return origToolbar.apply(this, args);
  });
}

// Repair PTR_LAB_005f49a0 (game-cmd jumptable) from data.bin (see agent-42a830-findings).
const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
for (let i = 0; i < 16; i++) {
  const v = dv.getUint32(0x005f49a0 + i * 4, true);
  runtime.heap.setU32(0x005f49a0 + i * 4, v);
}

// Find pool slots + widget table.
const POOL_START = 0x009a013c;
const POOL_END_PTR = 0x009a1164;
const SLOT_STRIDE = 0x178;

function poolSlots() {
  const slots = [];
  const poolEnd = runtime.heap.u32(POOL_END_PTR);
  for (let s = POOL_START; s < poolEnd; s += SLOT_STRIDE) {
    slots.push({ addr: s, wp: runtime.heap.u32(s) });
  }
  return slots;
}

function findToolbar() {
  const poolEnd = runtime.heap.u32(POOL_END_PTR);
  for (let s = POOL_START; s < poolEnd; s += SLOT_STRIDE) {
    if (runtime.heap.u32(s) === 0x42afb5) return s;
  }
  return 0;
}

function findViewport() {
  const poolEnd = runtime.heap.u32(POOL_END_PTR);
  for (let s = POOL_START; s < poolEnd; s += SLOT_STRIDE) {
    if (runtime.heap.u32(s) === 0x42b079) return runtime.heap.u32(s + 8);
  }
  return 0;
}

const toolbarSlot = findToolbar();
console.log("toolbar slot:", toolbarSlot ? toolbarSlot.toString(16) : "MISSING");
console.log("pool slots:", poolSlots().map(s => ({ a: s.addr.toString(16), wp: s.wp.toString(16) })));

// Read the toolbar widget rects from the table.
const W0 = 0x005f5124;
console.log("\nwidget rects (from 0x005f5124):");
const widgetRects = [];
for (let i = 0; i < 22; i++) {
  const a = W0 + i * 0x10;
  const type = runtime.heap.u8(a);
  if (type === 0xff) {
    console.log(`  [${i}] type=0xff sentinel`);
    break;
  }
  const l = runtime.heap.i16(a + 2);
  const r = runtime.heap.i16(a + 4);
  const t = runtime.heap.i16(a + 6);
  const b = runtime.heap.i16(a + 8);
  widgetRects[i] = { l, r, t, b, type };
  console.log(`  [${i}] type=0x${type.toString(16)} L=${l}..${r} T=${t}..${b}`);
}

// Snapshot relevant globals before each click.
function snapshot() {
  const vp = findViewport();
  return {
    pause: runtime.heap.u8(0x0099c169),
    sound: runtime.heap.u8(0x006326bd),
    zoom: vp ? runtime.heap.u8(vp + 0x10) : -1,
    rotate: runtime.heap.u8(0x00991f88),
    mapView: runtime.heap.u8(0x0099c16b),
    poolEnd: runtime.heap.u32(POOL_END_PTR),
    // Some active-flag region near 0x991f5c — used to detect tool latch.
    activeFlag: runtime.heap.u32(0x00991f5c),
    // Tool active mask (bit 6 around 0x991f30)
    toolMask: runtime.heap.u32(0x00991f30),
  };
}

function diff(a, b) {
  const out = {};
  for (const k of Object.keys(a)) {
    if (a[k] !== b[k]) out[k] = `${a[k]} → ${b[k]}`;
  }
  return out;
}

console.log("\n=== Per-widget native dispatch test ===");
const hwnd = state.firstHwnd;
const results = [];

for (let i = 0; i < 20; i++) {
  const rect = widgetRects[i];
  if (!rect || rect.type !== 0x06) {
    console.log(`[${i}] SKIPPED (no button rect)`);
    continue;
  }
  // Reset zoom to a known mid value so we can see direction changes for widgets 3/4.
  const vp = findViewport();
  if (vp) runtime.heap.setU8(vp + 0x10, 1);
  // Reset rotate to 0 to make rotate-step visible.
  if (i === 5) runtime.heap.setU8(0x00991f88, 0);
  const cx = (rect.l + rect.r) >> 1;
  const cy = (rect.t + rect.b) >> 1;
  const before = snapshot();
  const callsBefore = toolbarCalls;
  widgetIdxSeen = [];
  widgetEbpSeen = [];

  postWindowMessage(hwnd, 0x0201, 1, packLParam(cx, cy));
  postWindowMessage(hwnd, 0x0202, 0, packLParam(cx, cy));
  // Tick 3 times to let the event drain through ring buffer and dispatch.
  for (let t = 0; t < 3; t++) {
    try { runtime.runTick(); } catch (e) { /* noisy painter bridge, non-fatal */ }
  }
  const after = snapshot();
  const callsAfter = toolbarCalls;
  const d = diff(before, after);
  const handlerCalls = callsAfter - callsBefore;
  const observedIdx = widgetIdxSeen.length ? widgetIdxSeen.join(",") : "-";
  const observedBp = widgetEbpSeen.length ? widgetEbpSeen.join(",") : "-";
  results.push({ i, cx, cy, handlerCalls, observedIdx, diff: d });
  console.log(`[${i}] cx=${cx} cy=${cy} handler=${handlerCalls} idxSeen=[${observedIdx}] bp=[${observedBp}] diff=${JSON.stringify(d)}`);
}

console.log("\n=== Summary ===");
for (const r of results) {
  const changed = Object.keys(r.diff).length > 0;
  const ok = r.handlerCalls > 0 && changed;
  console.log(`widget ${r.i}: handler=${r.handlerCalls} stateChanged=${changed} ${ok ? "OK" : "?"}`);
}
