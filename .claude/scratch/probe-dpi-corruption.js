#!/usr/bin/env node
// Watch writes to 0x5f96d0..0x5f96e0 (the per-strip DPI region) to find
// who corrupts the zoom field.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");
const { regs } = await import("../../runtime/regs.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfsRoot = resolve(ROOT, "web/assets");
const vfs = new Map();
for (const f of readdirSync(vfsRoot)) {
  const p = join(vfsRoot, f);
  if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
}

const r = createRuntime({ dataBin, vfs });
const heap = r.heap;
r.runInit();

const TARGET_LO = 0x5f96d0;
const TARGET_HI = 0x5f96f0;

// Wrap setU8/setU16/setU32 to log writes
const origSetU8 = heap.setU8.bind(heap);
const origSetU16 = heap.setU16.bind(heap);
const origSetU32 = heap.setU32.bind(heap);
let writes = 0;
const writeLog = [];
function logWrite(addr, size, value) {
  if (addr < TARGET_LO || addr >= TARGET_HI) return;
  if (writes < 200) {
    const stack = new Error().stack.split("\n").slice(2, 4).map(s => s.trim().match(/at\s+(\S+)/)?.[1]).filter(Boolean);
    writeLog.push(`+${(addr - TARGET_LO).toString().padStart(2)} size=${size} val=0x${(value >>> 0).toString(16)} from ${stack.join(" ← ")}`);
  }
  writes++;
}
heap.setU8 = function (addr, v) { logWrite(addr, 1, v); return origSetU8(addr, v); };
heap.setU16 = function (addr, v) { logWrite(addr, 2, v); return origSetU16(addr, v); };
heap.setU32 = function (addr, v) { logWrite(addr, 4, v); return origSetU32(addr, v); };
const origSetI16 = heap.setI16.bind(heap);
const origSetI32 = heap.setI32.bind(heap);
heap.setI16 = function (addr, v) { logWrite(addr, 2, v); return origSetI16(addr, v); };
heap.setI32 = function (addr, v) { logWrite(addr, 4, v); return origSetI32(addr, v); };

try { r.runTick(); } catch (e) { console.log(`tick threw: ${e.message?.slice(0,80)}`); }

console.log(`Total writes to ${TARGET_LO.toString(16)}..${TARGET_HI.toString(16)}: ${writes}`);
console.log(`First ${writeLog.length} writes:`);
for (const w of writeLog) console.log(`  ${w}`);

console.log(`\nFinal state of region:`);
for (let off = 0; off < 0x20; off += 2) {
  console.log(`  +${off.toString(16).padStart(2,"0")}: u16=0x${heap.u16(TARGET_LO+off).toString(16).padStart(4,"0")} i16=${heap.i16(TARGET_LO+off)}`);
}
