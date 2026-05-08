#!/usr/bin/env node
// One-shot. Extracts the binary's data sections (.data + .rdata, anything
// non-executable + non-IAT) into a single sparse blob keyed by virtual
// address. The runtime loads this on startup; rct.exe is no longer needed
// at runtime.
//
// Output:
//   decompiled/data.bin           — flat byte image, length = imageBase + sizeOfImage
//   decompiled/data-manifest.json — image base, size, list of {name, va, size} ranges
//
// Why a flat image instead of per-section blobs: it lets `Heap` index by
// virtual address with zero translation, exactly like the binary saw it
// when loaded into Windows process memory.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { loadPEFromBytes } from "../harness/loader.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const RCT  = resolve(ROOT, "binary/rct.exe");
const OUT_BIN  = resolve(ROOT, "decompiled/data.bin");
const OUT_JSON = resolve(ROOT, "decompiled/data-manifest.json");

// Section characteristics:
//   IMAGE_SCN_CNT_CODE              0x00000020
//   IMAGE_SCN_CNT_INITIALIZED_DATA  0x00000040
//   IMAGE_SCN_CNT_UNINITIALIZED_DATA 0x00000080
//   IMAGE_SCN_MEM_EXECUTE           0x20000000
//   IMAGE_SCN_MEM_READ              0x40000000
//   IMAGE_SCN_MEM_WRITE             0x80000000
const SCN_CODE                  = 0x00000020;
const SCN_INITIALIZED_DATA      = 0x00000040;
const SCN_UNINITIALIZED_DATA    = 0x00000080;
const SCN_MEM_EXECUTE           = 0x20000000;

const exe = readFileSync(RCT);
const image = loadPEFromBytes(exe);
console.log(`PE loaded: imageBase=0x${image.imageBase.toString(16)}, sizeOfImage=0x${image.sizeOfImage.toString(16)}, ${image.sections.length} sections`);

// Build a manifest of which ranges to keep. We keep:
//   - The PE headers at imageBase (some code reads ImageBase from there)
//   - Every section that is initialized data (incl. .rdata, .data, .rsrc, .idata)
//   - Uninitialized data sections (.bss) — virtually mapped, bytes are zero
// We drop:
//   - Executable-only sections (.text, CODESEG)
//
// The output blob is a sparse copy: same length as image.memory, but with
// executable sections zeroed out so JS gzip/compression can squeeze it.
const memory = image.memory;
const out = new Uint8Array(image.imageBase + image.sizeOfImage);

// Always keep the PE headers (the binary's CRT reads imageBase + offset).
const SIZEOF_HEADERS = 0x1000; // conservative — the actual SizeOfHeaders is in the PE optional header
out.set(memory.subarray(image.imageBase, image.imageBase + Math.min(SIZEOF_HEADERS, memory.length - image.imageBase)), image.imageBase);

const ranges = [];
let kept = 0, skipped = 0;
for (const s of image.sections) {
  const va = image.imageBase + s.virtualAddress;
  const size = s.virtualSize;
  const isCode = (s.characteristics & SCN_CODE) !== 0
              || (s.characteristics & SCN_MEM_EXECUTE) !== 0;
  const isData = (s.characteristics & SCN_INITIALIZED_DATA) !== 0
              || (s.characteristics & SCN_UNINITIALIZED_DATA) !== 0;
  if (isCode && !isData) {
    skipped += size;
    ranges.push({ name: s.name, va: `0x${va.toString(16)}`, size, kept: false, reason: "code" });
    continue;
  }
  // Copy bytes at VA. memory[] already has them positioned correctly.
  out.set(memory.subarray(va, va + size), va);
  kept += size;
  ranges.push({ name: s.name, va: `0x${va.toString(16)}`, size, kept: true });
}

const manifest = {
  imageBase: `0x${image.imageBase.toString(16)}`,
  sizeOfImage: `0x${image.sizeOfImage.toString(16)}`,
  totalSize: image.imageBase + image.sizeOfImage,
  ranges,
  generatedAt: new Date().toISOString(),
};

mkdirSync(resolve(ROOT, "decompiled"), { recursive: true });
writeFileSync(OUT_BIN, out);
writeFileSync(OUT_JSON, JSON.stringify(manifest, null, 2));

console.log(`\nKept   ${kept.toLocaleString()} bytes of data`);
console.log(`Skipped ${skipped.toLocaleString()} bytes of code`);
console.log(`\nOutput: ${OUT_BIN} (${out.length.toLocaleString()} bytes — sparse, mostly zero past the data sections)`);
console.log(`        ${OUT_JSON}`);
