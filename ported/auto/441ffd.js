// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441ffd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00441ffd(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0044200c = __sp + 0;
  try {
  (heap.u32(heap.u32((__addr_DAT_0044200c + heap.u32(0x0062d2ff) * 4))))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
