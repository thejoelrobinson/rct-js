// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fa3a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408342 } from "./408342.js";
export function FUN_0042fa3a(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f88b0 = __sp + 0;
  try {
  heap.setU32(0x005f88b0, (heap.u32(0x005f8d36) + -0x1a67c) >>> 0);
  FUN_00408342(heap, heap.u32(0x005f88a4), __addr_DAT_005f88b0, 4);
  return;
} finally {
    heap.freeFrame(4);
  }
}
