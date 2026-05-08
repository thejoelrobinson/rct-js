// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417ce0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00417ce0(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f3e60 = __sp + 0;
  try {
  if (heap.u32(0x005f3f60) <= param_1) {
    return 0;
  }
  return heap.u32((heap.u32((__addr_DAT_005f3e60) + (param_1 >>> 5) * 4) + 4 + (param_1 & 0x1f) * 8)) & 0x40;
} finally {
    heap.freeFrame(4);
  }
}
