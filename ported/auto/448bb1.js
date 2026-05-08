// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448bb1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00448bb1(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00630be0 = __sp + 0;
  try {
  heap.setU32(0x00630bdc, (__addr_DAT_00630be0) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
