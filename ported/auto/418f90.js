// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418f90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418f90(heap, param_1) {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar1 = ((heap.u32(param_1)) >>> 0);
  uVar2 = ((heap.u32(param_1 + (1) * 4)) >>> 0);
  heap.setU32(param_1, (uVar1 * 2) & 0xffffffff);
  heap.setU32((param_1 + (1) * 4), (uVar2 * 2 | uVar1 >>> 0x1f) & 0xffffffff);
  heap.setU32((param_1 + (2) * 4), (heap.u32(param_1 + (2) * 4) << 1 | uVar2 >>> 0x1f) & 0xffffffff);
  return;
}
