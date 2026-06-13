#!/usr/bin/env node
// Dual whole-heap FNV-1a soak for the 421d2c palette-helper dispatch change.
//
// Run A (default): the 421d2c tail calls paintBody420d9c/420f4c/420502/42094b
//   DIRECTLY (the new path).
// Run B (FORCE=1): forces all four helper bodies to report a cold branch, so
//   callHelperDirect falls back to the binary body via the interpreter — i.e.
//   the helpers run through the x86 interpreter (the old callBridge path's
//   effect). The whole-heap hash after every tick must match run A exactly:
//   that proves the direct-call dispatch is byte-indistinguishable from the
//   interpreter dispatch over every tile painted in the soak.
//
//   node tools/_dualsoak-421d2c.mjs           # run A (JS direct)
//   FORCE=1 node tools/_dualsoak-421d2c.mjs   # run B (helpers via interp)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const ow = console.warn;
console.warn = (...a) => { const s = String(a[0] ?? ""); if (/^\[/.test(s)) return; ow(...a); };

if (process.env.FORCE) {
  globalThis._420d9c_force_fallback = true;
  globalThis._420f4c_force_fallback = true;
  globalThis.__forceInterp420502 = true;
  globalThis.__forceInterp42094b = true;
}

const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap);
enterScenarioPlay(r.heap);

function heapHash(bytes) {
  const end = bytes.byteLength - 64 * 1024;
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < end; i++) { h = (h ^ bytes[i]) >>> 0; h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}

const TICKS = parseInt(process.env.TICKS || "6", 10);
console.log(`mode=${process.env.FORCE ? "FORCE(helpers via interp)" : "JS-direct"} ticks=${TICKS}`);
for (let i = 0; i < TICKS; i++) {
  try { r.runTick(); } catch (e) { process.stderr.write(`tick ${i} ERR ${e.message}\n`); }
  console.log(`tick ${i} hash=${heapHash(r.heap.bytes).toString(16).padStart(8, "0")}`);
}
