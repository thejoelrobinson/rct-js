// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bbfb3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_009b438b } from "./9b438b.js";
import { FUN_009bbff8 } from "./9bbff8.js";
export function FUN_009bbfb3(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009b22f0 = __sp + 0;
  try {
  if (heap.u32(0x00971ef0) != '\0') {
    if (heap.u32(0x00991f64) != -1) {
      FUN_009b438b(heap);
    }
    if (heap.u32((__addr_DAT_009b22f0 + heap.u32(0x008d7eb6) * 4)) != -1) {
      FUN_009bbff8(heap);
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
