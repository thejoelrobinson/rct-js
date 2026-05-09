// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418290.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418290(heap, param_1, param_2) {
  let iVar1 = 0;
  param_1 = ((param_1 - ((param_2) >>> 0)) >>> 0);
  iVar1 = ((3) >>> 0);
  do {
    heap.setU32((((param_2) >>> 0) + param_1), (heap.u32(param_2)) & 0xffffffff);
    param_2 = ((param_2 + 1) >>> 0);
    iVar1 = ((iVar1 + -1) >>> 0);
  } while (iVar1 != 0);
  return;
}
