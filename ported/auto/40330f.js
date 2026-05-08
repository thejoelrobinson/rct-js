// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40330f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040330f(heap, param_1, param_2, param_3) {
  heap.u32(param_2) = param_1 >>> 3;
  heap.u32(param_3) = (1 << (param_1 & 7));
  return;
}
