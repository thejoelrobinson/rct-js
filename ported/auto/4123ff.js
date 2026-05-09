// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4123ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GlobalFree, mmioClose } from "../../runtime/win32.js";
export function FUN_004123ff(heap, param_1, param_2) {
  if (heap.i32(param_2) != 0) {
    GlobalFree(heap, ((heap.i32(param_2)) >>> 0));
    heap.setU32(param_2, (0) & 0xffffffff);
  }
  if (heap.i32(param_1) != 0) {
    mmioClose(heap, ((heap.i32(param_1)) >>> 0), 0);
    heap.setU32(param_1, (0) & 0xffffffff);
  }
  return 0;
}
