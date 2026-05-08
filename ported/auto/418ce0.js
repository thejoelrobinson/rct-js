// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418ce0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00413470 } from "./413470.js";
export function FUN_00418ce0(heap, param_1) {
  if (((heap.u32(param_1 + (3) * 4) & 0x83) != 0) && ((heap.u32(param_1 + (3) * 4) & 8) != 0)) {
    FUN_00413470(heap, heap.u32(param_1 + (2) * 4));
    heap.u32(param_1 + (3) * 4) = heap.u32(param_1 + (3) * 4) & 0xfffffbf7;
    heap.u32(param_1) = 0;
    heap.u32(param_1 + (2) * 4) = 0;
    heap.u32(param_1 + (1) * 4) = 0;
  }
  return;
}
