// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450188.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00450188(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_00450198 = __sp + 0;
  try {
  (heap.u32(heap.u32((__addr_PTR_LAB_00450198) + (heap.u32(0x008ae949)) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
