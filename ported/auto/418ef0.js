// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418ef0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418ef0(heap, param_1, param_2, param_3) {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar2 = 0;
  uVar1 = param_2 + param_1;
  if ((uVar1 < param_1) || (uVar1 < param_2)) {
    uVar2 = 1;
  }
  heap.setU32(param_3, (uVar1) >>> 0);
  return uVar2;
}
