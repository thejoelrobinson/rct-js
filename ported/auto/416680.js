// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416680.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004165f0 } from "./4165f0.js";
export function FUN_00416680(heap, param_1, param_2, param_3, param_4) {
  let cVar1 = 0;
  do {
    if (param_2 < 1) {
      return;
    }
    param_2 = param_2 + -1;
    cVar1 = heap.u32(param_1);
    param_1 = param_1 + 1;
    FUN_004165f0(heap, cVar1, param_3, param_4);
  } while (heap.u32(param_4) != -1);
  return;
}
