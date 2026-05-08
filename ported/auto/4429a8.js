// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4429a8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004429a8(heap) {
  let unaff_EBP = 0;
  if ((((-1 < unaff_EBP) && ((heap.u32(0x0099c163) & 0xf0) == 0)) && (0 < unaff_EBP)) && (heap.u32(0x0087c3b4) < unaff_EBP)) {
    heap.setU32(0x00971e86, (unaff_EBP) >>> 0);
    heap.setU32(0x00991efc, (0x33a) >>> 0);
    return;
  }
  return;
}
