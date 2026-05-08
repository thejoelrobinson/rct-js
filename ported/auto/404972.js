// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404972.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GlobalMemoryStatus } from "../runtime/win32.js";
export function FUN_00404972(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_24 = __sp + 0;
  try {
  GlobalMemoryStatus(heap, __addr_local_24);
  return heap.u32((__addr_local_24 + 4));
} finally {
    heap.freeFrame(128);
  }
}
