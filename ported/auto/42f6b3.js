// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f6b3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042f6b3(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f88b0 = __sp + 0;
  try {
  heap.setU32(0x005f88a8, (__addr_DAT_005f88b0) >>> 0);
  heap.setU32(0x005f88ac, (0) >>> 0);
  heap.setU32(0x005f88ae, (0) >>> 0);
  heap.setU32(0x005f88af, (0) >>> 0);
  heap.setU32(0x005f8d36, (0) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
