// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e0d4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00405b58 } from "./405b58.js";
import { FUN_0040e2e6 } from "./40e2e6.js";
import { FUN_0040e2f8 } from "./40e2f8.js";
import { FUN_0040e32d } from "./40e32d.js";
import { FUN_0040e36f } from "./40e36f.js";
import { FUN_0040e383 } from "./40e383.js";
import { FUN_0040e38e } from "./40e38e.js";
import { FUN_0040e500 } from "./40e500.js";
import { FUN_0040e51d } from "./40e51d.js";
import { FUN_0040e528 } from "./40e528.js";
import { FUN_0040e533 } from "./40e533.js";
import { FUN_0040e63e } from "./40e63e.js";
import { FUN_0040e71a } from "./40e71a.js";
import { FUN_0040e725 } from "./40e725.js";
import { FUN_0040e730 } from "./40e730.js";
import { FUN_0040e73b } from "./40e73b.js";
import { FUN_0040ea49 } from "./40ea49.js";
import { FUN_0040eb48 } from "./40eb48.js";
import { FUN_0040ecca } from "./40ecca.js";
import { FUN_0040ecdc } from "./40ecdc.js";
import { FUN_0040ee0a } from "./40ee0a.js";
import { FUN_0040ee1c } from "./40ee1c.js";
import { FUN_0040ee94 } from "./40ee94.js";
import { FUN_0040ef6e } from "./40ef6e.js";
import { FUN_0040efca } from "./40efca.js";
import { FUN_0040f068 } from "./40f068.js";
import { FUN_0040f07a } from "./40f07a.js";
import { FUN_0040f13a } from "./40f13a.js";
import { FUN_0040f14c } from "./40f14c.js";
import { FUN_0040f2f4 } from "./40f2f4.js";
import { FUN_00413c90 } from "./413c90.js";
export function FUN_0040e0d4(heap) {
  let uVar1 = 0;
  let local_8 = 0;
  heap.setU32(0x005e916c, (FUN_00405b58(heap)) >>> 0);
  if (heap.u32(0x005e916c) == 0) {
    uVar1 = 0;
  } else {
    if (0 < heap.u32(0x005f12b4)) {
      FUN_00413c90(heap, 0x005ec0a0, 0x005ec090, 0x2cf);
    }
    for (local_8 = 0; local_8 < 0x100; local_8 = local_8 + 1) {
      heap.u32((0x005eee98) + (local_8 * 4) * 4) = local_8;
      heap.u32((0x005eee99) + (local_8 * 4) * 4) = heap.u32((0x005eee98) + (local_8 * 4) * 4);
      heap.u32((0x005eee9a) + (local_8 * 4) * 4) = heap.u32((0x005eee99) + (local_8 * 4) * 4);
      heap.u32((0x005eee9b) + (local_8 * 4) * 4) = 0;
    }
    heap.setU32(0x005ec07c, (FUN_0040f2f4(heap, 0x005eee98, 0x100, 0x005ef2a0)) >>> 0);
    if (heap.u32(0x005ec07c) == 0) {
      uVar1 = 0;
    } else {
      heap.setU32(0x005ebe50, (FUN_0040f14c) >>> 0);
      heap.setU32(0x005ebe54, (FUN_0040e2e6) >>> 0);
      heap.setU32(0x005ebe58, (FUN_0040e2f8) >>> 0);
      heap.setU32(0x005ebe5c, (FUN_0040e32d) >>> 0);
      heap.setU32(0x005ebe60, (FUN_0040e36f) >>> 0);
      heap.setU32(0x005ebe70, (FUN_0040e51d) >>> 0);
      heap.setU32(0x005ebe68, (FUN_0040e500) >>> 0);
      heap.setU32(0x005ebe6c, (FUN_0040e38e) >>> 0);
      heap.setU32(0x005ebe64, (FUN_0040e383) >>> 0);
      heap.setU32(0x005ebe74, (FUN_0040e528) >>> 0);
      heap.setU32(0x005ebe78, (FUN_0040e533) >>> 0);
      heap.setU32(0x005ebe7c, (FUN_0040e63e) >>> 0);
      heap.setU32(0x005ebe80, (FUN_0040e71a) >>> 0);
      heap.setU32(0x005ebe84, (FUN_0040e725) >>> 0);
      heap.setU32(0x005ebe88, (FUN_0040e730) >>> 0);
      heap.setU32(0x005ebe8c, (FUN_0040e73b) >>> 0);
      heap.setU32(0x005ebe90, (FUN_0040ea49) >>> 0);
      heap.setU32(0x005ebe94, (FUN_0040eb48) >>> 0);
      heap.setU32(0x005ebe98, (FUN_0040ecca) >>> 0);
      heap.setU32(0x005ebe9c, (FUN_0040ecdc) >>> 0);
      heap.setU32(0x005ebea0, (FUN_0040ee0a) >>> 0);
      heap.setU32(0x005ebea4, (FUN_0040ee94) >>> 0);
      heap.setU32(0x005ebea8, (FUN_0040ef6e) >>> 0);
      heap.setU32(0x005ebeac, (FUN_0040efca) >>> 0);
      heap.setU32(0x005ebeb0, (FUN_0040f068) >>> 0);
      heap.setU32(0x005ebeb4, (FUN_0040f07a) >>> 0);
      heap.setU32(0x005ebeb8, (FUN_0040f13a) >>> 0);
      heap.setU32(0x005e91cc, (FUN_0040ee1c) >>> 0);
      uVar1 = 1;
    }
  }
  return uVar1;
}
