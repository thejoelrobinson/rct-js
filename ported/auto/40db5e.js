// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40db5e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040db5e(heap, param_1, param_2, param_3, param_4) {
  heap.u32(param_4) = heap.u32(param_1);
  heap.u32(param_2) = param_1 + 1;
  heap.u32(param_3) = param_1 + 0x16;
  return 1;
}
