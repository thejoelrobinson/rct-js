// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42db0f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0042db0f(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_0042db1c = __sp + 0;
  try {
  let unaff_ESI = 0;
  (heap.u32(heap.u32((__addr_PTR_LAB_0042db1c) + (heap.u32((unaff_ESI + 1))) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
