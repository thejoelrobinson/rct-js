// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429361.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00429361(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_0042937c = __sp + 0;
  try {
  if (heap.u32(0x0087d718) != -0x80000000) {
    return;
  }
  (heap.u32(heap.u32((__addr_PTR_LAB_0042937c) + (heap.u32(0x0087d0d0)) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
