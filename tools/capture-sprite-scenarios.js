#!/usr/bin/env node
// Capture real-world entry-state scenarios for the in-game RLE sprite decoder
// chain (FUN_009b35fa + 5 siblings) by hooking dispatch.get() calls during a
// normal harness boot+tick. Writes a manifest JSON suitable for
// `node tools/diff-subsystem.js --manifest=...`.
//
// Usage: node tools/capture-sprite-scenarios.js [--out=lifter/sprite-subsystem.json]
//                                                [--max-per-addr=4]
//                                                [--ticks=2]

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

let outPath = "lifter/sprite-subsystem.json";
let maxPerAddr = 4;
let ticks = 2;
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--out=")) outPath = a.slice(6);
  else if (a.startsWith("--max-per-addr=")) maxPerAddr = parseInt(a.slice(15), 10);
  else if (a.startsWith("--ticks=")) ticks = parseInt(a.slice(8), 10);
}

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

globalThis._renderTrace = () => {};

const { createRuntime, skipFadeIn, skipTitleIntro } = await import("../runtime/harness.js");
const { regs } = await import("../runtime/regs.js");

const TARGET_ADDRS = [0x9b438b];

// Per-address capture buckets — keep first N entries with distinct (eax,ebx,ecx,edx,edi)
// tuples to avoid recording 1000 near-identical scenarios.
const buckets = new Map(TARGET_ADDRS.map((a) => [a, { seen: new Set(), entries: [] }]));

// Hook the chain-entry function via the globalThis._spriteCapture sentinel
// (a temporary instrumented line at the top of ported/auto/9b35fa.js). The
// auto-translated callers use direct ES module imports, so dispatch.get
// overrides don't intercept them.
globalThis._spriteCapture = (addr, heap) => {
  const bucket = buckets.get(addr);
  if (!bucket) return;
  const key = `${regs.eax >>> 0}.${regs.ebx >>> 0}.${regs.ecx >>> 0}.${regs.edx >>> 0}.${regs.edi >>> 0}`;
  if (bucket.entries.length >= maxPerAddr || bucket.seen.has(key)) return;
  bucket.seen.add(key);
  bucket.entries.push({
    name: `0x${addr.toString(16)}_n${bucket.entries.length}`,
    addr: `0x${addr.toString(16)}`,
    regs: {
      eax: regs.eax >>> 0,
      ebx: regs.ebx >>> 0,
      ecx: regs.ecx >>> 0,
      edx: regs.edx >>> 0,
      esi: regs.esi >>> 0,
      edi: regs.edi >>> 0,
      ebp: regs.ebp >>> 0,
    },
    // Mem32 of the cluster of globals the decoder reads on entry.
    mem32: snapshotGlobals(heap),
    // Pixel-write region the decoder chain mutates. The diff tool compares
    // this byte range after both runs to confirm the rewrite is byte-equal.
    compareRange: ["0x9a2000", "0x9a3000"],
  });
};

function snapshotGlobals(heap) {
  // These are the globals the decoder chain reads on entry per
  // decompiled/c/9b35fa.c (DAT_009a2010..009a202c, DAT_008dc0b4-area is
  // sprite-table data already in data.bin so we don't need to override).
  const addrs = [
    0x009a2010, 0x009a2014, 0x009a2018, 0x009a201c, 0x009a2020,
    0x009a2024, 0x009a2028, 0x009a202c, 0x009a2030, 0x009a2032,
    0x005f96c0, 0x005f96c4, 0x005f96c8, 0x005f96cc, 0x005f96d0,
    0x005f96d4, 0x005f96d8, 0x005f96dc,
  ];
  const out = {};
  for (const a of addrs) {
    out[`0x${a.toString(16)}`] = heap.u32(a);
  }
  return out;
}

// Build VFS + boot.
const VFS = [
  "csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat",
  "css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat",
  "css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat",
  "css15.dat","css17.dat","sc21.sc4",
];
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const n of VFS) {
  try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
  catch (_) {}
}
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
// Run init tick to populate state, then skip the slow intro path.
r.runTick();
skipFadeIn(r.heap);
skipTitleIntro(r.heap);
for (let i = 0; i < ticks; i++) {
  try { r.runTick(); } catch (e) { console.warn(`tick ${i+1} threw: ${e.message.slice(0,80)}`); }
}

// Flatten buckets into a single scenarios array.
const scenarios = [];
for (const [addr, bucket] of buckets) {
  console.error(`captured ${bucket.entries.length} scenario(s) for 0x${addr.toString(16)}`);
  scenarios.push(...bucket.entries);
}

const manifest = {
  description: "In-game RLE sprite decoder chain (FUN_009b35fa + 5 siblings). Captured from harness boot+tick.",
  scenarios,
};

writeFileSync(resolve(ROOT, outPath), JSON.stringify(manifest, null, 2) + "\n");
console.error(`wrote ${scenarios.length} scenarios to ${outPath}`);
