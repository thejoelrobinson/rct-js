// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40592b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetCursorPos } from "../../runtime/win32.js";
export function FUN_0040592b(heap, param_1, param_2) {
  let pHVar1 = 0;
  pHVar1 = ((SetCursorPos(heap, ((param_1) | 0), param_2)) >>> 0);
  return pHVar1;
}
