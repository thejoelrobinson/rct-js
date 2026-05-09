// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410f7e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00410f7e(heap, param_1) {
  let local_8 = 0;
  for (local_8 = ((heap.u32(0x005ec14c)) >>> 0); (local_8 != 0x0 && (heap.i32(local_8) != param_1)); local_8 = (((heap.i32(local_8 + (0x13) * 4)) >>> 0)) >>> 0) {
  
  }
  return local_8;
}
