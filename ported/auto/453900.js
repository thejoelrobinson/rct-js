// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/453900.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00453900(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_00453930 = __sp + 0;
  try {
  let unaff_DI = 0;
  if ((heap.u32(0x006326bc) == '\0') && (heap.u32(0x006323fc) != -1)) {
    heap.setU32(0x00632600, (unaff_DI) >>> 0);
    (heap.u32(heap.u32((__addr_PTR_LAB_00453930) + (heap.u32(0x00991f88)) * 4)))();
    return;
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
