// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414300.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00414300(heap, param_1, param_2) {
  for (; param_1 < param_2; param_1 = param_1 + 1) {
    if (heap.u32(param_1) != 0x0) {
      (heap.u32(heap.u32(param_1)))();
    }
  }
  return;
}
