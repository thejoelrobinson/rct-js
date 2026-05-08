// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404ba4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetCursor } from "../../runtime/win32.js";
export function FUN_00404ba4(heap, param_1) {
  heap.setU32(0x005e91c8, (param_1) >>> 0);
  SetCursor(heap, param_1);
  return;
}
