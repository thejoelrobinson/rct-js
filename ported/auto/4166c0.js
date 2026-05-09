// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4166c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004166c0(heap, param_1) {
  let puVar1 = 0;
  puVar1 = ((heap.u32(param_1)) >>> 0);
  heap.setU32(param_1, ((((puVar1 + ((1) * 4))) >>> 0)) & 0xffffffff);
  return heap.u32(puVar1);
}
