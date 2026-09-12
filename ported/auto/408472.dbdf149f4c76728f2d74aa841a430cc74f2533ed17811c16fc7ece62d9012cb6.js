// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408472.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FindNextFileA } from "../../runtime/win32.js";
export function FUN_00408472(heap, param_1, param_2) {
  let pHVar1 = 0;
  pHVar1 = ((FindNextFileA(heap, param_1, param_2)) >>> 0);
  return pHVar1;
}
