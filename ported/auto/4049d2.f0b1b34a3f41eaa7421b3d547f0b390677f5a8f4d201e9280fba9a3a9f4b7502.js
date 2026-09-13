// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4049d2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GlobalMemoryStatus } from "../../runtime/win32.js";
export function FUN_004049d2(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_24 = __sp + 0;
  try {
  GlobalMemoryStatus(heap, __addr_local_24);
  return heap.u32((__addr_local_24 + 28));
} finally {
    heap.freeFrame(128);
  }
}
