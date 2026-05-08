// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40904c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040904c(heap, param_1) {
  if ((heap.u32((param_1 + 3)) != 0) && (heap.u32(param_1 + (0x20) * 4) != 0)) {
    (heap.u32(heap.u32((heap.u32(heap.u32(param_1 + (0x20) * 4)) + 0x80))))(heap.u32(param_1 + (0x20) * 4), 0);
    heap.setU32((param_1 + 3), (0) >>> 0);
    heap.setU32(param_1, (0) >>> 0);
    heap.setU32((param_1 + 2), (0) >>> 0);
    heap.setU32((param_1 + 6), (heap.u32((param_1 + 2))) >>> 0);
    heap.setU32((param_1 + 1), (0) >>> 0);
    heap.setU32((param_1 + (4) * 4), (0) >>> 0);
    heap.setU32((param_1 + 10), (0) >>> 0);
  }
  return;
}
