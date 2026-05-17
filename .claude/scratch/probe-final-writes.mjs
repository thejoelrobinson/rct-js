// Find the LAST write to each of 0x5f96e0, 0x5f96e4, 0x5f96e8 in the tick — that's the corruptor.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = "/Users/joelrobinson/rct-js";
const LO = 0x005f96e0;
const HI = 0x005f96ed;

let lastWrite = { 0x5f96e0: null, 0x5f96e4: null, 0x5f96e8: null };

function cap(stack) {
  return stack.split("\n").slice(2, 10).join("\n");
}

function record(addr, size, value, src) {
  const stack = cap(new Error().stack);
  for (const tgt of [0x5f96e0, 0x5f96e4, 0x5f96e8]) {
    if (addr <= tgt && addr + size > tgt) {
      // What byte value contributes to tgt? value at byte offset (tgt-addr)..(tgt-addr+3)
      const off = tgt - addr;
      // Extract little-endian 32-bit value as seen from tgt: contribution is (value>>>(off*8)) & 0xff per byte.
      lastWrite[tgt] = { addr, size, value: value >>> 0, src, stack, byteAtTgt: (value >>> (off * 8)) & 0xff };
    }
  }
}

globalThis._x86Watch = { lo: LO, hi: HI, cb: (a, s, v) => record(a, s, v, "x86") };
globalThis._heapWatch = { lo: LO, hi: HI, cb: (a, s, v, k) => record(a, s, v, "heap-" + k) };

const { createRuntime } = await import(resolve(ROOT, "runtime/harness.js"));
const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const VFS_PLACEHOLDERS = ["css10.dat","css12.dat","css16.dat","tutl.dat"];
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const name of VFS_FILES) { try { vfs.set(name.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", name))); } catch (e) {} }
for (const name of VFS_PLACEHOLDERS) vfs.set(name.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch (e) { console.error("init err:", String(e).slice(0,200)); }

// Reset to capture only tick writes
lastWrite = { 0x5f96e0: null, 0x5f96e4: null, 0x5f96e8: null };
try { r.runTick(); } catch (e) { console.error("tick err:", String(e).slice(0,200)); }

console.log(`Final: [e0]=0x${r.heap.u32(0x5f96e0).toString(16).padStart(8,"0")} [e4]=0x${r.heap.u32(0x5f96e4).toString(16).padStart(8,"0")} [e8]=0x${r.heap.u32(0x5f96e8).toString(16).padStart(8,"0")}`);
console.log();

for (const tgt of [0x5f96e0, 0x5f96e4, 0x5f96e8]) {
  const w = lastWrite[tgt];
  if (!w) { console.log(`Target 0x${tgt.toString(16)}: NO WRITES`); continue; }
  console.log(`Target 0x${tgt.toString(16)} LAST WRITE: src=${w.src} addr=0x${w.addr.toString(16)} size=${w.size} value=0x${w.value.toString(16)} byteContribution=0x${w.byteAtTgt.toString(16)}`);
  console.log(w.stack);
  console.log();
}
