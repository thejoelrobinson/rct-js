// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ec7b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040ec7b(heap, param_1, param_2, param_3, param_4) {
  let local_c = 0;
  for (local_c = param_2; local_c < param_3 + param_2; local_c = local_c + 1) {
    heap.u32((heap.u32((param_1 + 0x88)) + 0x28 + local_c * 4)) = heap.u32(param_4);
    param_4 = param_4 + 1;
  }
  return;
}
