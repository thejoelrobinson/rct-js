// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4166c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004166c0(heap, param_1) {
  puVar1 = heap.u32(param_1);
  heap.u32(param_1) = (puVar1 + 1);
  return heap.u32(puVar1);
}
