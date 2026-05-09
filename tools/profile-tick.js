#!/usr/bin/env node
// Profile the first tick: wrap every ported function with op-counting and
// report the hottest. Identifies what to bound or optimise first.

import { Heap } from "../runtime/heap.js";
import { initHeap } from "../runtime/win32/kernel32.js";
import { state, setRuntimeContext } from "../runtime/win32/context.js";
import { dispatch as portedDispatch } from "../ported/auto/_dispatch.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync, readdirSync } from "node:fs";
import "../runtime/win32/ddraw.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_BIN = resolve(HERE, "../decompiled/data.bin");
const ASSETS_DIR = resolve(HERE, "../web/assets");

const dataBin = readFileSync(DATA_BIN);
const heapBase = dataBin.length;
const heapSize = 64 * 1024 * 1024;
const stackSize = 1 * 1024 * 1024;
const totalSize = heapBase + heapSize + stackSize;

const memory = new Uint8Array(totalSize);
memory.set(dataBin, 0);
const heap = new Heap(memory, totalSize);
initHeap(heapBase, heapBase + heapSize);

// Wrap heap ops with a counter.
let _ops = 0;
const _opStack = [];   // { addr, opsAtEntry }
const _byFunc = new Map(); // addr -> { calls, ops }
for (const name of ["u8","i8","u16","i16","u32","i32","setU8","setI8","setU16","setI16","setU32","setI32"]) {
  const orig = heap[name].bind(heap);
  heap[name] = (...args) => { _ops++; return orig(...args); };
}

// Wrap each ported function to count its self-time + ops.
const wrapped = new Map();
for (const [addr, fn] of portedDispatch) {
  if (typeof fn !== "function") continue;
  const w = (...args) => {
    const before = _ops;
    _opStack.push(addr);
    try { return fn(...args); }
    finally {
      const cost = _ops - before;
      _opStack.pop();
      let rec = _byFunc.get(addr);
      if (!rec) { rec = { calls: 0, ops: 0 }; _byFunc.set(addr, rec); }
      rec.calls++;
      rec.ops += cost;
    }
  };
  wrapped.set(addr, w);
}

// Build VFS from assets dir.
const vfs = new Map();
for (const f of readdirSync(ASSETS_DIR)) {
  vfs.set(f.toLowerCase(), readFileSync(resolve(ASSETS_DIR, f)));
}
console.error(`VFS: ${vfs.size} files.`);

// Populate dispatch with wrapped versions.
for (const [addr, w] of wrapped) state.fnDispatch.set(addr, w);

setRuntimeContext({ vfs, canvas: null });

// Inline runInit equivalent (mirrors runtime/harness.js).
const callW = (addr, ...args) => {
  const fn = wrapped.get(addr);
  if (!fn) throw new Error(`init: missing 0x${addr.toString(16)}`);
  return fn(heap, ...args);
};
heap.setU32(0x005f1398, 1);
heap.setU32(0x005e9190, 0);
callW(0x413170, 0x005f17e0, 0x005ebbcc);
callW(0x413170, 0x005f1ba0, 0x005e9030);
callW(0x404752);
callW(0x404b0e);
callW(0x405f2c);
callW(0x406d10);
callW(0x40d9a0);
callW(0x40df00);

console.error(`runInit done. ${_ops.toLocaleString()} heap ops.`);
const opsAfterInit = _ops;
_byFunc.clear();
_ops = 0;

// Now run first tick.
console.error(`First tick starting...`);
const t0 = Date.now();
const TIMEOUT_MS = 30_000;
const startOps = _ops;

// Wrap heap ops with a soft-cap so we don't actually run forever.
const HARD_CAP = 500_000_000;
let _hardStop = false;
for (const name of ["u8","i8","u16","i16","u32","i32","setU8","setI8","setU16","setI16","setU32","setI32"]) {
  const orig = heap[name].bind(heap);
  heap[name] = (...args) => {
    _ops++;
    if (_ops > HARD_CAP) { _hardStop = true; throw new Error(`hard-cap ${HARD_CAP} reached`); }
    if ((_ops & 0xfffff) === 0 && Date.now() - t0 > TIMEOUT_MS) {
      _hardStop = true; throw new Error(`timeout ${TIMEOUT_MS}ms after ${_ops.toLocaleString()} ops`);
    }
    return orig(...args);
  };
}

try {
  // Run pump + 4385d8 like runTick does.
  callW(0x403c2a);
  callW(0x402bef);
  callW(0x4385d8);
  if (heap.u32(0x005e9104) !== 0) callW(0x40179d);
  console.error(`tick done in ${Date.now() - t0}ms, ${_ops.toLocaleString()} ops`);
} catch (e) {
  console.error(`tick aborted: ${e.message}`);
}

// Top hottest functions by self-ops.
const sorted = [...wrapped.entries()].map(([addr]) => {
  const r = _byFunc.get(addr);
  return r ? { addr, calls: r.calls, ops: r.ops, opsPerCall: Math.floor(r.ops / r.calls) } : null;
}).filter(Boolean).sort((a, b) => b.ops - a.ops);

console.error(`\nTop 20 functions by total ops (incl. callee-time):`);
console.error(`  addr      calls       ops    ops/call`);
for (const r of sorted.slice(0, 20)) {
  console.error(`  ${r.addr.toString(16).padStart(8, "0")}  ${String(r.calls).padStart(6)}  ${String(r.ops).padStart(10)}  ${String(r.opsPerCall).padStart(10)}`);
}

console.error(`\nTotal heap ops in tick: ${_ops.toLocaleString()}`);
