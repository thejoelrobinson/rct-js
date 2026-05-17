#!/usr/bin/env node
// Track when the unbounded recursion starts. Hook EVERY write to
// 0x5f96de (zoom byte) and log call stack with EBX value.

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

const ZOOM_ADDR = 0x5f96de;
let zoomWriteCount = 0;
function hookHit(addr, size, v) {
  if (addr !== ZOOM_ADDR) return;
  zoomWriteCount++;
  if (zoomWriteCount <= 8) {
    const prev = heap.i16(ZOOM_ADDR);
    const stack = new Error().stack.split("\n").slice(2, 7).map(s => s.trim().replace(/file:\/\/.+\//, ""));
    console.log(`[#${zoomWriteCount}] write ${size}@${ZOOM_ADDR.toString(16)} prev=${prev} → new=${(v & 0xffff) << 16 >> 16}`);
    console.log(`  EBX=0x${(regs.ebx>>>0).toString(16)} EDI=0x${(regs.edi>>>0).toString(16)} ECX=${regs.ecx&0xffff} EDX=${regs.edx&0xffff}`);
    for (const s of stack) console.log(`    ${s}`);
  }
}
const origU8  = heap.setU8.bind(heap);
const origI8  = heap.setI8.bind(heap);
const origU16 = heap.setU16.bind(heap);
const origI16 = heap.setI16.bind(heap);
const origU32 = heap.setU32.bind(heap);
const origI32 = heap.setI32.bind(heap);
heap.setU8  = function(a, v) { hookHit(a, 1, v); return origU8(a, v); };
heap.setI8  = function(a, v) { hookHit(a, 1, v); return origI8(a, v); };
heap.setU16 = function(a, v) { hookHit(a, 2, v); return origU16(a, v); };
heap.setI16 = function(a, v) { hookHit(a, 2, v); return origI16(a, v); };
heap.setU32 = function(a, v) { hookHit(a, 4, v); return origU32(a, v); };
heap.setI32 = function(a, v) { hookHit(a, 4, v); return origI32(a, v); };

try { r.runTick(); } catch (e) { console.log(`\ntick threw: ${e.message?.slice(0,60)}`); }
console.log(`\ntotal zoom writes: ${zoomWriteCount}`);
