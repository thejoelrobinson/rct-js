// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43115d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004310fa } from "./4310fa.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_0043115d(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f94e0 = __sp + 0;
  try {
  let unaff_ESI = 0;
  FUN_005e3c3c(heap);
  heap.setU32((unaff_ESI + 0x1c), (__addr_DAT_005f94e0) >>> 0);
  heap.setU32((unaff_ESI + 0xc), (heap.u32(0x005f9690)) >>> 0);
  heap.setU32((unaff_ESI + 0x30), (0) >>> 0);
  heap.setU32((unaff_ESI + 0x164), (0) >>> 0);
  heap.setU32((unaff_ESI + 0x168), (0) >>> 0);
  FUN_004310fa(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
