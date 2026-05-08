// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e32d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040e32d(heap, param_1) {
  if (heap.u32((param_1 + 0x90)) == 0) {
    heap.setU32((param_1 + 4), (4) >>> 0);
    heap.setU32((param_1 + 10), (1) >>> 0);
    heap.setU32((param_1 + 0xc), (1) >>> 0);
  } else {
    param_1 = 0;
  }
  return param_1;
}
