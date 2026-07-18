// Per-widget fresh validation. For each widget we close any open sub-windows
// (by destroying the pool entries beyond viewport/toolbar/statusbar) and
// reset relevant flags before each click. This avoids interference from
// earlier widgets' opened windows that intercept later clicks.

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
const origWarn = console.warn;
console.warn = (...args) => {
  const s = String(args[0] ?? "");
  if (s.startsWith("[painter-bridge]") || s.startsWith("[callIndirect]") ||
      s.startsWith("[harness]") || s.startsWith("[runtime/win32 stub]")) return;
  origWarn(...args);
};

const regsMod = await import("../runtime/regs.js");
const regs = regsMod.regs;

const { createRuntime, skipFadeIn } = await import("../runtime/harness.js");
const ctx = await import("../runtime/win32/context.js");
const state = ctx.state;
const { postWindowMessage } = await import("../runtime/win32/user32.js");

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

// Repair PTR_LAB_005f49a0.
const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
for (let i = 0; i < 16; i++) {
  const v = dv.getUint32(0x005f49a0 + i * 4, true);
  runtime.heap.setU32(0x005f49a0 + i * 4, v);
}

// Wrap toolbar handler to count calls per click.
let toolbarCalls = 0;
let widgetIdxSeen = [];
let widgetBpSeen = [];
const origToolbar = state.fnDispatch.get(0x42a830);
state.fnDispatch.set(0x42a830, function (...args) {
  toolbarCalls += 1;
  widgetIdxSeen.push(regs.edx | 0);
  widgetBpSeen.push(regs.ebp | 0);
  return origToolbar.apply(this, args);
});

const POOL_START = 0x009a013c;
const POOL_END_PTR = 0x009a1164;
const SLOT_STRIDE = 0x178;

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

// Snapshot the initial pool end so we can truncate back to baseline between clicks.
const baselinePoolEnd = runtime.heap.u32(POOL_END_PTR);
console.log("baseline pool end:", baselinePoolEnd.toString(16));

function resetPool() {
  // Force pool back to baseline — clears any sub-windows opened by earlier clicks.
  runtime.heap.setU32(POOL_END_PTR, baselinePoolEnd);
  // Clear bytes from baselinePoolEnd onward so dirty slots don't get re-matched.
  const TOTAL_POOL_BYTES = 0x09a1164 - POOL_START;
  for (let a = baselinePoolEnd; a < POOL_START + TOTAL_POOL_BYTES; a += 4) {
    runtime.heap.setU32(a, 0);
  }
}

// Read widget rects.
const W0 = 0x005f5124;
const widgetRects = [];
for (let i = 0; i < 22; i++) {
  const a = W0 + i * 0x10;
  const type = runtime.heap.u8(a);
  if (type === 0xff) break;
  widgetRects[i] = {
    l: runtime.heap.i16(a + 2),
    r: runtime.heap.i16(a + 4),
    t: runtime.heap.i16(a + 6),
    b: runtime.heap.i16(a + 8),
    type,
  };
}

function snapshot() {
  const vp = findViewport();
  return {
    pause: runtime.heap.u8(0x0099c169),
    sound: runtime.heap.u8(0x006326bd),
    zoom: vp ? runtime.heap.u8(vp + 0x10) : -1,
    rotate: runtime.heap.u8(0x00991f88),
    mapView: runtime.heap.u8(0x0099c16b),
    poolEnd: runtime.heap.u32(POOL_END_PTR),
    activeFlag: runtime.heap.u32(0x00991f5c),
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

const hwnd = state.firstHwnd;

// Widgets in observable categories. For each widget, define the expected
// observable effect to check (rather than just any state change).
const WIDGET_EXPECTATIONS = {
  0:  { name: "pause",      check: (b, a) => a.pause !== b.pause },
  1:  { name: "file menu",  check: (b, a) => a.poolEnd > b.poolEnd },  // dropdown opens
  2:  { name: "sound",      check: (b, a) => a.sound !== b.sound },
  3:  { name: "zoom out",   check: (b, a) => a.zoom > b.zoom },
  4:  { name: "zoom in",    check: (b, a) => a.zoom < b.zoom },
  5:  { name: "rotate",     check: (b, a) => a.rotate !== b.rotate },
  6:  { name: "view opts",  check: (b, a) => a.poolEnd > b.poolEnd },  // dropdown
  7:  { name: "map view",   check: (b, a) => a.mapView !== b.mapView || a.poolEnd > b.poolEnd },
  8:  { name: "land",       check: (b, a) => a.poolEnd > b.poolEnd || a.toolMask !== b.toolMask },
  9:  { name: "water",      check: (b, a) => a.poolEnd > b.poolEnd },
  10: { name: "scenery",    check: (b, a) => a.poolEnd > b.poolEnd },
  11: { name: "path",       check: (b, a) => a.poolEnd > b.poolEnd },
  12: { name: "ride",       check: (b, a) => a.poolEnd > b.poolEnd },
  13: { name: "park",       check: (b, a) => a.poolEnd > b.poolEnd },
  14: { name: "staff",      check: (b, a) => a.poolEnd > b.poolEnd },
  15: { name: "guests",     check: (b, a) => a.poolEnd > b.poolEnd },
  16: { name: "research",   check: (b, a) => a.poolEnd > b.poolEnd },
  17: { name: "finances",   check: (b, a) => a.poolEnd > b.poolEnd },
  18: { name: "news",       check: (b, a) => a.poolEnd > b.poolEnd },
  19: { name: "options",    check: (b, a) => a.poolEnd > b.poolEnd },
};

console.log("\n=== Native-dispatch per-widget validation (fresh pool per click) ===");
const results = [];

for (let i = 0; i < 20; i++) {
  const rect = widgetRects[i];
  if (!rect || rect.type !== 0x06) continue;
  resetPool();
  // Reset all flags so each click sees a known state.
  runtime.heap.setU8(0x0099c169, 0);   // pause
  runtime.heap.setU8(0x006326bd, 0);   // sound
  runtime.heap.setU8(0x00991f88, 0);   // rotate
  runtime.heap.setU8(0x0099c16b, 0);   // map view
  runtime.heap.setU32(0x00991f5c, 0);  // active flag
  runtime.heap.setU32(0x00991f30, 0);  // tool mask
  const vp = findViewport();
  if (vp) runtime.heap.setU8(vp + 0x10, 1); // zoom mid

  const cx = (rect.l + rect.r) >> 1;
  const cy = (rect.t + rect.b) >> 1;
  const before = snapshot();
  const callsBefore = toolbarCalls;
  widgetIdxSeen = [];
  widgetBpSeen = [];

  postWindowMessage(hwnd, 0x0201, 1, packLParam(cx, cy));
  postWindowMessage(hwnd, 0x0202, 0, packLParam(cx, cy));
  for (let t = 0; t < 3; t++) {
    try { runtime.runTick(); } catch (_) { }
  }
  const after = snapshot();
  const handlerCalls = toolbarCalls - callsBefore;
  // Find widget-index in idxSeen for the bp == 2 (LMB down) entries.
  const idxForLMB = widgetIdxSeen.filter((_, k) => widgetBpSeen[k] === 2 || widgetBpSeen[k] === 1);
  const exp = WIDGET_EXPECTATIONS[i];
  const passed = exp.check(before, after);
  const d = diff(before, after);
  results.push({ i, name: exp.name, handlerCalls, idxForLMB, passed, diff: d });
  console.log(`[${i}/${exp.name}] handler=${handlerCalls} idxLMB=[${idxForLMB.join(",")}] pass=${passed} diff=${JSON.stringify(d)}`);
}

console.log("\n=== Summary ===");
const pass = results.filter(r => r.passed).length;
console.log(`${pass}/${results.length} widgets pass native-dispatch validation`);
console.log("Failed widgets:", results.filter(r => !r.passed).map(r => `${r.i}:${r.name}`).join(", ") || "(none)");
