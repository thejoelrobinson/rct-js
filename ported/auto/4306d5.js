// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4306d5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004306ee } from "./4306ee.js";
export function FUN_004306d5(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f9432 = __sp + 0;
  try {
  heap.setU32(0x005f942c, (__addr_DAT_005f9432) >>> 0);
  heap.setU32(0x005f9430, (0) >>> 0);
  FUN_004306ee(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
