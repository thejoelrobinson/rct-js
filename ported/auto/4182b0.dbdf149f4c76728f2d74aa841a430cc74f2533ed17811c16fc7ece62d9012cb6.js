// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4182b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004182b0(heap, param_1) {
  heap.setU32(param_1, (0) & 0xffffffff);
  heap.setU32((param_1 + (1) * 4), (0) & 0xffffffff);
  heap.setU32((param_1 + (2) * 4), (0) & 0xffffffff);
  return;
}
