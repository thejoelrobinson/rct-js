// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408b9d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00408b9d(heap) {
  heap.setU32(0x005ebf58, (heap.u32(0x005ebf58) + 1) >>> 0);
  return 1;
}
