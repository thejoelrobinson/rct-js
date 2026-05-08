// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4123ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GlobalFree, HGLOBAL, HMMIO } from "../runtime/win32.js";
export function FUN_004123ff(heap, param_1, param_2) {
  if (heap.u32(param_2) != 0) {
    GlobalFree(heap, (HGLOBAL) * param_2);
    heap.u32(param_2) = 0;
  }
  if (heap.u32(param_1) != 0) {
    mmioClose((HMMIO) * param_1, 0);
    heap.u32(param_1) = 0;
  }
  return 0;
}
