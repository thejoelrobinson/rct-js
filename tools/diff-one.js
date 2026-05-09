#!/usr/bin/env node
// Diff-test a single function. Writes JSON to stdout; designed to be called
// via child_process from bulk-diff-test.js so the parent can enforce a hard
// wall-clock timeout (pure-JS busy loops escape any in-process budget).
//
// Usage: node tools/diff-one.js --addr=0xNNNN [--budget=200000]

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { dispatch } from "../ported/auto/_dispatch.js";
import { Heap } from "../runtime/heap.js";
import { initHeap } from "../runtime/win32/kernel32.js";
import { resetState } from "../runtime/win32/context.js";
import { runOriginal } from "../harness/emulator.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

let addr = null;
let budget = 200_000;
let extraArgs = []; // additional positional args to pass after `heap`
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--addr=")) addr = parseInt(a.slice(7), 16);
  else if (a.startsWith("--budget=")) budget = parseInt(a.slice(9), 10);
  else if (a.startsWith("--args=")) {
    extraArgs = a.slice(7).split(",").map(s => parseInt(s, 0));
  }
}
if (!addr) {
  console.error("usage: diff-one.js --addr=0xNNNN [--args=0,0,0]");
  process.exit(2);
}

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const STACK = 256 * 1024;
const HEAP = 4 * 1024 * 1024;
const total = dataBin.length + HEAP + STACK;

// Read the C source's return type so we can mask both sides to its width
// before comparing — Ghidra's `ushort` return only sets `ax` (16 bits) on
// the interp side, while ported returns the full 32-bit value. For void
// returns, switch to memory-diff mode (compare global mutations).
let returnMask = 0xffffffff;
let isVoidReturn = false;
try {
  const cPath = resolve(ROOT, "decompiled/c", `${addr.toString(16)}.c`);
  const cSrc = readFileSync(cPath, "utf8");
  const m = cSrc.match(/^\s*(\w[\w\s]*?)\s+FUN_/m);
  if (m) {
    const t = m[1].trim().replace(/\s+/g, " ");
    if (t === "void") isVoidReturn = true;
    else if (t === "char" || t === "byte" || t === "uchar" || t === "undefined1") returnMask = 0xff;
    else if (t === "short" || t === "ushort" || t === "undefined2") returnMask = 0xffff;
  }
} catch {}

// Apply the return-width mask via mask-then-unsigned to avoid JS's bitwise
// operators converting `& 0xffffffff` into signed -1.
const applyMask = (v) => (((v >>> 0) & returnMask) >>> 0);

// Map extra args to x86 calling convention. Ghidra typically detects
// __fastcall when it sees register-passed args (ECX, EDX). Without per-fn
// convention info we just zero-init both — extraArgs are all zero in the
// bulk harness anyway, so this matches what register-pass would produce.
const initRegs = {};
if (extraArgs.length >= 1) initRegs.ecx = extraArgs[0] | 0;
if (extraArgs.length >= 2) initRegs.edx = extraArgs[1] | 0;

let interpEax, interpErr, interpMemHash;
try {
  const res = runOriginal({
    funcAddr: addr,
    init: { regs: initRegs },
    observe: [],
    limit: 500000,
    returnMemory: isVoidReturn,
  });
  interpEax = applyMask(res.regs.eax);
  if (isVoidReturn && res.memory) interpMemHash = hashMutations(res.memory, dataBin);
} catch (e) { interpErr = e.message; }

let portedVal, portedErr, portedMemHash;
try {
  const memory = new Uint8Array(total);
  memory.set(dataBin, 0);
  const heap = wrapWithBudget(new Heap(memory, total), budget);
  initHeap(dataBin.length, dataBin.length + HEAP);
  resetState();
  const fn = dispatch.get(addr);
  if (!fn) throw new Error(`no JS function at 0x${addr.toString(16)}`);
  portedVal = applyMask(fn(heap, ...extraArgs));
  if (isVoidReturn) portedMemHash = hashMutations(memory.subarray(0, dataBin.length), dataBin);
} catch (e) { portedErr = e.message; }

const out = {
  addr: `0x${addr.toString(16)}`,
  interpEax: interpEax !== undefined ? `0x${interpEax.toString(16)}` : null,
  interpErr: interpErr || null,
  portedVal: portedVal !== undefined ? `0x${portedVal.toString(16)}` : null,
  portedErr: portedErr || null,
};
if (isVoidReturn) {
  // Override return-value comparison with memory-mutation hash. Both sides
  // succeed → buckets ok/mismatch by hash equality.
  out.voidMode = true;
  out.interpMemHash = interpMemHash !== undefined ? interpMemHash : null;
  out.portedMemHash = portedMemHash !== undefined ? portedMemHash : null;
}

// Hash the diff between post-call memory and the baseline data.bin. We
// only consider regions where bytes changed; absolute positions matter.
function hashMutations(after, baseline) {
  // FNV-1a 32-bit on (offset, byte) tuples for changed positions.
  let h = 0x811c9dc5 >>> 0;
  const n = Math.min(after.length, baseline.length);
  for (let i = 0; i < n; i++) {
    if (after[i] !== baseline[i]) {
      h = ((h ^ (i & 0xff)) * 0x01000193) >>> 0;
      h = ((h ^ ((i >>> 8) & 0xff)) * 0x01000193) >>> 0;
      h = ((h ^ ((i >>> 16) & 0xff)) * 0x01000193) >>> 0;
      h = ((h ^ ((i >>> 24) & 0xff)) * 0x01000193) >>> 0;
      h = ((h ^ after[i]) * 0x01000193) >>> 0;
    }
  }
  return `0x${h.toString(16).padStart(8, "0")}`;
}
// Sentinel-wrapped so any console.log noise from runtime stubs doesn't
// corrupt the parent's JSON parse.
process.stdout.write(`===DIFF_ONE_RESULT===${JSON.stringify(out)}===END===`);

function wrapWithBudget(heap, budget) {
  let ops = 0;
  const wrap = (name) => {
    const orig = heap[name].bind(heap);
    heap[name] = (...args) => {
      if (++ops > budget) throw new Error(`budget exceeded (${budget} heap ops in one call)`);
      return orig(...args);
    };
  };
  for (const name of ["u8","i8","u16","i16","u32","i32","setU8","setI8","setU16","setI16","setU32","setI32"]) {
    wrap(name);
  }
  return heap;
}
