// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418ea0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418ea0(heap, param_1) {
  if ((param_1 < heap.u32(0x005f3f60)) && ((heap.u8((heap.u32((0x005f3e60) + (((param_1) | 0) >>> 5) * 4) + 4 + (param_1 & 0x1f) * 8)) & 1) != 0)) {
    return heap.u32((heap.u32((0x005f3e60) + (((param_1) | 0) >>> 5) * 4) + (param_1 & 0x1f) * 8));
  }
  heap.setU32(0x005efec0, (9) >>> 0);
  heap.setU32(0x005efec4, (0) >>> 0);
  return 0xffffffff;
}
