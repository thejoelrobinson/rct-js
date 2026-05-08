// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4306ee.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004306ee(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_0043071c = __sp + 0;
  try {
  if ((heap.u32(0x0099a500) & 1) != 0) {
    if (heap.u32(0x005f9430) == 0) {
      (heap.u32(heap.u32((__addr_PTR_LAB_0043071c) + (heap.u32(heap.u32(0x005f942c))) * 4)))();
      return;
    }
    heap.setU32(0x005f9430, (heap.u32(0x005f9430) + -1) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
