// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40e2f8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
export function FUN_0040e2f8(heap, param_1) {
  _memset(heap, param_1, 0, 0xa8);
  heap.setU32((param_1 + 0x90), (1) >>> 0);
  return 1;
}
