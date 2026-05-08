// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e59ec.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e59ec(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_005e5a08 = __sp + 0;
  try {
  (heap.u32(heap.u32((__addr_PTR_LAB_005e5a08) + (heap.u32(0x00991f88)) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
