// Lean direct-test: instantiate runtime, inject toolbar slot, exercise the
// new widget-2 sound-toggle path. Avoids vitest entirely.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];

globalThis._renderTrace = () => {};
const { createRuntime } = await import(resolve(ROOT, "runtime/harness.js"));
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const n of VFS_FILES) {
  try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
  catch (_) {}
}
for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

const runtime = createRuntime({ dataBin, vfs });
runtime.runInit();
runtime.runTick();

// Inject toolbar slot (same trick as the vitest helper).
const POOL_START = 0x009a013c;
const POOL_END_PTR = 0x009a1164;
const SLOT_STRIDE = 0x178;
function ensureToolbarSlot() {
  let poolEnd = runtime.heap.u32(POOL_END_PTR);
  if (poolEnd < POOL_START) poolEnd = POOL_START;
  for (let s = POOL_START; s < poolEnd; s += SLOT_STRIDE) {
    if (runtime.heap.u32(s) === 0x42afb5) return s;
  }
  const slot = poolEnd;
  runtime.heap.setU32(slot, 0x42afb5);
  runtime.heap.setU32(slot + 4, 0x42a830);
  runtime.heap.setU32(slot + 0x1c, 0x005f5124);
  runtime.heap.setI16(slot + 0x20, 0);
  runtime.heap.setI16(slot + 0x22, 0);
  runtime.heap.setI16(slot + 0x24, 640);
  runtime.heap.setI16(slot + 0x26, 30);
  runtime.heap.setU32(POOL_END_PTR, slot + SLOT_STRIDE);
  return slot;
}
ensureToolbarSlot();

// Populate the widget table — the binary's MainOpen would normally do this
// via FUN_004298a0, but at +1 tick it hasn't fired yet (boot fade-in gate).
// Stamp the documented rects so clickToolbar() can route hits.
function setWidget(idx, type, l, r, t, b) {
  const base = 0x005f5124 + idx * 0x10;
  runtime.heap.setU8(base, type);
  runtime.heap.setI16(base + 2, l);
  runtime.heap.setI16(base + 4, r);
  runtime.heap.setI16(base + 6, t);
  runtime.heap.setI16(base + 8, b);
}
setWidget(0, 0x06,   0,  29, 0, 29);  // pause
setWidget(1, 0x06,  30,  59, 0, 29);  // file menu icon
setWidget(2, 0x06,  60,  89, 0, 29);  // sound mute
setWidget(3, 0x06, 104, 133, 0, 29);  // zoom out
setWidget(4, 0x06, 134, 163, 0, 29);  // zoom in
setWidget(5, 0x06, 164, 193, 0, 29);  // rotate
setWidget(6, 0x06, 194, 223, 0, 29);  // view options
setWidget(7, 0x06, 224, 253, 0, 29);  // map view
setWidget(8, 0x06, 267, 296, 0, 29);  // land
setWidget(9, 0xff, -1, -1, -1, -1);   // sentinel

const { toggleSound, clickToolbar } = await import(resolve(ROOT, "runtime/input.js"));

let pass = 0, fail = 0;
const check = (name, cond) => {
  if (cond) { pass++; console.log("PASS:", name); }
  else { fail++; console.log("FAIL:", name); }
};

// Direct helper test.
runtime.heap.setU8(0x006326bd, 0);
const r1 = toggleSound(runtime.heap);
check("toggleSound 0→1 returns 1", r1 === 1);
check("DAT_006326bd is 1 after toggle", (runtime.heap.u8(0x006326bd) & 1) === 1);
const r2 = toggleSound(runtime.heap);
check("toggleSound 1→0 returns 0", r2 === 0);
check("DAT_006326bd is 0 after second toggle", (runtime.heap.u8(0x006326bd) & 1) === 0);

// Click-routing test: x=75, y=10 is inside widget 2 (L=60..89, T=0..29).
runtime.heap.setU8(0x006326bd, 0);
const idx = clickToolbar(runtime.heap, 75, 10);
check("clickToolbar(75,10) returns widget index 2", idx === 2);
check("DAT_006326bd flipped to 1 after click", (runtime.heap.u8(0x006326bd) & 1) === 1);

// Verify existing widgets still work.
runtime.heap.setU8(0x0099c169, 0);
const pIdx = clickToolbar(runtime.heap, 10, 10);
check("widget 0 (pause) still returns 0", pIdx === 0);
check("pause bit toggled", (runtime.heap.u8(0x0099c169) & 1) === 1);

// Negative — widget 8 still unmapped.
const lidx = clickToolbar(runtime.heap, 280, 10);
check("widget 8 (land) still returns -1", lidx === -1);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
