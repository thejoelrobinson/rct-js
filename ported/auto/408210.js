// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408210.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetFilePointer } from "../../runtime/win32.js";
export function FUN_00408210(heap, param_1, param_2) {
  SetFilePointer(heap, param_1, param_2, 0x0, 0);
  return;
}
