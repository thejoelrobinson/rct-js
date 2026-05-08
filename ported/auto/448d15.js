// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448d15.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00448d15(heap) {
  let in_DL = 0;
  if (in_DL != -1) {
    heap.u32(heap.u32(0x00630bdc)) = in_DL;
    heap.setU32(0x00630bdc, (heap.u32(0x00630bdc) + 1) >>> 0);
  }
  return;
}
