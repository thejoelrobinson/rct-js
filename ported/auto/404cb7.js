// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404cb7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LoadImageA } from "../../runtime/win32.js";
export function FUN_00404cb7(heap, param_1) {
  return LoadImageA(heap, ((0x0) | 0), param_1, 1, 0, 0, 0x10);
}
