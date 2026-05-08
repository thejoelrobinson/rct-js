// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetOpenFileNameA } from "../../runtime/win32.js";
export function GetOpenFileNameA(heap, param_1) {
  let BVar1 = 0;
  BVar1 = GetOpenFileNameA(heap, param_1);
  return BVar1;
}
