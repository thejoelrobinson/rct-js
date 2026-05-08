// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/453f0a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00407a41 } from "./407a41.js";
export function FUN_00453f0a(heap) {
  if (heap.u32(0x006323f4) != -1) {
    if (heap.u32(0x00632924) != 1) {
      FUN_00407a41(heap, 0x00632928);
      heap.setU32(0x00632924, (1) >>> 0);
    }
    if (heap.u32(0x0063293c) != 8) {
      FUN_00407a41(heap, 0x00632940);
      heap.setU32(0x0063293c, (8) >>> 0);
    }
    if (heap.u32(0x00632954) != 8) {
      FUN_00407a41(heap, 0x00632958);
      heap.setU32(0x00632954, (8) >>> 0);
    }
  }
  return;
}
