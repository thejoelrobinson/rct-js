// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e56d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005e56d3(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_005e56ec = __sp + 0;
  try {
  (heap.u32(heap.u32((__addr_PTR_LAB_005e56ec) + (heap.u32(0x00991f88)) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
