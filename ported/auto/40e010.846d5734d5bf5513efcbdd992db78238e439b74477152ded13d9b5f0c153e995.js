// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e010.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040e010(heap) {
  if ((heap.u32(0x005f14e0) == 1) || (heap.u32(0x005f14e0) == 2)) {
    heap.setU32(0x005f1294, (heap.u32(0x005f1294) | 1) >>> 0);
  }
  return;
}
