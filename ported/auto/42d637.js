// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d637.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00408342 } from "./408342.js";
export function FUN_0042d637(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f5558 = __sp + 0;
  try {
  let in_AX = 0;
  if (0x5f593f < heap.u32(0x005f554c)) {
    FUN_00408342(heap, heap.u32(0x005f5550), __addr_DAT_005f5558, 1000);
    heap.setU32(0x005f554c, (__addr_DAT_005f5558) >>> 0);
  }
  heap.setU32(heap.u32(0x005f554c), (in_AX) >>> 0);
  heap.setU32(0x005f554c, (heap.u32(0x005f554c) + 1) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
