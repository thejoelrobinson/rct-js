// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ab29.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040ab29(heap, param_1) {
  heap.u32((heap.u32(0x005ebf38) + heap.u32(0x005f0ef0) * 4)) = param_1;
  heap.setU32(0x005f0ef0, (heap.u32(0x005f0ef0) + 1) >>> 0);
  return 1;
}
