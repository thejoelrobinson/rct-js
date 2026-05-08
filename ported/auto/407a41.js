// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407a41.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040dd0c } from "./40dd0c.js";
export function FUN_00407a41(heap, param_1) {
  if (heap.u32(param_1) != 0) {
    (heap.u32(heap.u32((heap.u32(heap.u32(param_1)) + 8))))(heap.u32(param_1));
    heap.setU32(param_1, (0) >>> 0);
    FUN_0040dd0c(heap, param_1);
  }
  return;
}
