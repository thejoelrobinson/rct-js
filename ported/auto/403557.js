// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403557.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00403557(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f15e4 = __sp + 0;
  try {
  let iVar1 = 0;
  do {
    if (heap.u32(0x005e91d4) == heap.u32(0x005e91d0)) {
      return 0;
    }
    iVar1 = heap.u32(0x005e91d4) * 8;
    heap.setU32(0x005e91d4, (heap.u32(0x005e91d4) + 1) >>> 0);
    heap.setU32(0x005e91d4, (heap.u32(0x005e91d4) & 0x3f) >>> 0);
  } while (heap.u32((__addr_DAT_005f15e4 + iVar1)) == 0);
  return heap.u32((__addr_DAT_005f15e4 + iVar1));
} finally {
    heap.freeFrame(4);
  }
}
