// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40bbcf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040bbcf(heap) {
  if ((heap.u32(0x005ebf64) != 0) && (heap.u32(0x005ebf34) != 0x0)) {
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x80))))(heap.u32(0x005ebf34), 0);
    heap.setU32(0x005ebf64, (0) >>> 0);
  }
  return;
}
