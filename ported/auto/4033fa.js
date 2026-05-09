// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4033fa.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004033fa(heap, param_1) {
  let uVar1 = 0;
  uVar1 = ((heap.u32(0x005e91d0) + 1 & 0x3f) >>> 0);
  if (uVar1 != heap.u32(0x005e91d4)) {
    heap.setU32((0x005f15e0 + heap.u32(0x005e91d0) * 8), (param_1) & 0xffffffff);
    heap.setU32((0x005f15e4 + heap.u32(0x005e91d0) * 8), (0) & 0xffffffff);
    heap.setU32(0x005e91d8, (heap.u32(0x005e91d0)) >>> 0);
    heap.setU32(0x005e91d0, (uVar1) >>> 0);
  }
  return;
}
