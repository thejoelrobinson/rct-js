// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40fb47.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
export function FUN_0040fb47(heap, param_1) {
  _memset(heap, param_1, 0, 0xa8);
  heap.setU32((((param_1) >>> 0) + 0x90), (1) & 0xffffffff);
  return 1;
}
