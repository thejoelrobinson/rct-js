// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4182c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004182c0(heap, param_1) {
  let iVar1 = 0;
  iVar1 = 0;
  do {
    if (heap.u32(param_1) != 0) {
      return 0;
    }
    iVar1 = iVar1 + 1;
    param_1 = param_1 + 1;
  } while (iVar1 < 3);
  return 1;
}
