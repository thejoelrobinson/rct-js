// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41a0cc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetOpenFileNameA } from "../../runtime/win32.js";
export function FUN_0041a0cc(heap, param_1) {
  let BVar1 = 0;
  BVar1 = ((GetOpenFileNameA(heap, param_1)) >>> 0);
  return BVar1;
}
