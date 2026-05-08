// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43feb6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0043feb6(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0062d434 = __sp + 0;
  try {
  let in_EAX = 0;
  let unaff_ESI = 0;
  if ((heap.u32((__addr_DAT_0062d434) + (heap.u32((unaff_ESI + 0x2b))) * 4) & 1) != 0) {
    return in_EAX;
  }
  return in_EAX;
} finally {
    heap.freeFrame(4);
  }
}
