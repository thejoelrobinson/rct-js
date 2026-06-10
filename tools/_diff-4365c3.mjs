// Differential oracle for FUN_004365c3 (tile-element compactor).
// Seeds identical synthetic element-pool states into (a) the x86
// interpreter on raw rct.exe and (b) the ported JS, runs both, and
// byte-diffs the pool region + the three globals the function touches.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { runOriginal } = await import(resolve(ROOT, "harness/emulator.js"));
const { Heap } = await import(resolve(ROOT, "runtime/heap.js"));
const { FUN_004365c3 } = await import(resolve(ROOT, "ported/auto/4365c3.js"));

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const POOL = 0x6e3b90;          // element pool base (binary constant)
const TBL = 0x971ef4;           // tile-pointer table
const CNT = 0x743b90;           // round-robin tile counter
const END = 0x981ef4;           // end-of-element-space pointer

// Each scenario returns {mem32: {...}, mem8: {...}} seed writes.
// Element = 8 bytes; +0 type (0xff = freed), +1 flags (0x80 = last).
function elem(mem8, at, type, flags, fill) {
  mem8[at] = type; mem8[at + 1] = flags;
  for (let i = 2; i < 8; i++) mem8[at + i] = fill;
}
const scenarios = {
  // Chain of 3 elements with a 2-slot freed gap below; trailing freed
  // slots under END. Exercises: scan-down, repoint, copy loop, byte
  // free-marks, end-pointer shrink.
  "gap-move": () => {
    const mem8 = {}, mem32 = {};
    const headIdx = 0x123;                 // tile index the call will pick
    mem32[CNT] = headIdx - 1;
    const src = POOL + 0x200;
    elem(mem8, src - 16, 0xff, 0x00, 0x55); // freed gap (stale bytes 0x55)
    elem(mem8, src - 8, 0xff, 0x00, 0x66);  // freed gap
    elem(mem8, src - 24, 0x10, 0x00, 0x77); // live element BELOW gap (stops scan)
    elem(mem8, src, 0x20, 0x00, 0x11);      // chain elem 0
    elem(mem8, src + 8, 0x24, 0x00, 0x22);  // chain elem 1
    elem(mem8, src + 16, 0x28, 0x80, 0x33); // chain elem 2 (last)
    mem32[TBL + headIdx * 4] = src;
    const end = src + 0x80;
    elem(mem8, end - 8, 0xff, 0x00, 0x44);  // trailing freed
    elem(mem8, end - 16, 0xff, 0x00, 0x44); // trailing freed
    elem(mem8, end - 24, 0x30, 0x80, 0x99); // last live before trailing free
    mem32[END] = end;
    return { mem8, mem32 };
  },
  // No freed slot below the chain — early return, nothing written
  // except the counter.
  "no-gap": () => {
    const mem8 = {}, mem32 = {};
    const headIdx = 0x456;
    mem32[CNT] = headIdx - 1;
    const src = POOL + 0x300;
    elem(mem8, src - 8, 0x10, 0x00, 0x77);  // live right below
    elem(mem8, src, 0x20, 0x80, 0x11);      // single-element chain
    mem32[TBL + headIdx * 4] = src;
    mem32[END] = src + 0x40;
    elem(mem8, src + 0x40 - 8, 0x30, 0x80, 0x99); // live tail (no shrink)
    return { mem8, mem32 };
  },
  // Chain starts just above the pool base; gap reaches the base bound.
  "base-bound": () => {
    const mem8 = {}, mem32 = {};
    const headIdx = 0x789;
    mem32[CNT] = headIdx - 1;
    const src = POOL + 8;                   // one freed slot below = pool base
    elem(mem8, POOL, 0xff, 0x00, 0x55);     // freed slot AT base
    elem(mem8, src, 0x20, 0x80, 0x11);      // single element
    mem32[TBL + headIdx * 4] = src;
    const end = src + 0x40;
    elem(mem8, end - 8, 0xff, 0x00, 0x44);
    elem(mem8, end - 16, 0x30, 0x80, 0x99);
    mem32[END] = end;
    return { mem8, mem32 };
  },
};

const WATCH = [ [POOL, POOL + 0x400], [TBL, TBL + 0x4000], [CNT, CNT + 4], [END, END + 4] ];
let allOk = true;
for (const [name, make] of Object.entries(scenarios)) {
  const { mem8, mem32 } = make();

  // --- interpreter side ---
  const init = { mem32: {}, regs: {} };
  for (const [a, v] of Object.entries(mem32)) init.mem32[a] = v >>> 0;
  // runOriginal has no mem8 — encode byte writes as u32 writes where safe:
  // group bytes into aligned u32s.
  const byByte = new Map(Object.entries(mem8).map(([a, v]) => [Number(a), v]));
  const words = new Map();
  for (const [a, v] of byByte) {
    const base = a & ~3;
    if (!words.has(base)) words.set(base, [null, null, null, null]);
    words.get(base)[a - base] = v;
  }
  // Byte seeds go in via init.pages (page = data.bin underlay + pokes).
  const PAGE = 0x1000;
  const pages = new Map();
  function pokeByte(a, v) {
    const p = Math.floor(a / PAGE);
    if (!pages.has(p)) {
      const base = p * PAGE;
      const bytes = new Uint8Array(PAGE);
      // page content = data.bin underlay (or zero past end)
      for (let i = 0; i < PAGE; i++) bytes[i] = base + i < dataBin.length ? dataBin[base + i] : 0;
      pages.set(p, bytes);
    }
    pages.get(p)[a % PAGE] = v;
  }
  for (const [a, v] of byByte) pokeByte(a, v);
  const res2 = runOriginal({
    funcAddr: 0x4365c3,
    init: {
      mem32: init.mem32,
      pages: [...pages.entries()].map(([page, bytes]) => ({ page, bytes })),
    },
    limit: 500000,
    returnMemory: true,
  });
  const interpMem = res2.memory;

  // --- ported JS side ---
  const total = Math.max(dataBin.length + 8 * 1024 * 1024, 0xa00000);
  const memory = new Uint8Array(total);
  memory.set(dataBin, 0);
  const heap = new Heap(memory, total);
  for (const [a, v] of Object.entries(mem32)) heap.setU32(Number(a), v >>> 0);
  for (const [a, v] of byByte) heap.setU8(a, v);
  FUN_004365c3(heap);

  // --- compare watched ranges ---
  let diffs = 0, first = null;
  for (const [lo, hi] of WATCH) {
    for (let a = lo; a < hi; a++) {
      const iv = interpMem[a], jv = memory[a];
      if (iv !== jv) { diffs++; if (!first) first = { a, iv, jv }; }
    }
  }
  if (diffs === 0) console.log(`PASS ${name}`);
  else {
    allOk = false;
    console.log(`FAIL ${name}: ${diffs} byte diffs; first @0x${first.a.toString(16)} interp=0x${(first.iv ?? -1).toString(16)} js=0x${(first.jv ?? -1).toString(16)}`);
  }
}
process.exit(allOk ? 0 : 1);
