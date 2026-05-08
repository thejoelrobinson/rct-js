// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4065d5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DeleteObject } from "../../runtime/win32.js";
export function FUN_004065d5(heap, param_1) {
  DeleteObject(heap, param_1);
  return;
}
