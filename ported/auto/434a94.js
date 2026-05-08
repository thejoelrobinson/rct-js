// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/434a94.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00434a94(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_00434a9c = __sp + 0;
  try {
  let in_EDX = 0;
  (heap.u32(heap.u32((__addr_PTR_LAB_00434a9c) + (in_EDX) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
