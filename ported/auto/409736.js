// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409736.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00409736(heap, param_1, param_2) {
  if ((heap.u32((param_1 + 0xc)) != 0) && (heap.u32((param_1 + 0x80)) != 0)) {
    (heap.u32(heap.u32((heap.u32(heap.u32((param_1 + 0x80))) + 0x68))))(heap.u32((param_1 + 0x80)), param_2);
    heap.u32((param_1 + 0xc)) = 0;
  }
  return;
}
