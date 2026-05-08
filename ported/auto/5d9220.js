// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d9220.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005d9220(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_0065e3c4 = __sp + 0;
  try {
  let unaff_ESI = 0;
  (heap.u32(heap.u32((__addr_PTR_LAB_0065e3c4) + (heap.u32((unaff_ESI + 0x36)) >>> 2) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
