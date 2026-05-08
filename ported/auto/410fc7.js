// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410fc7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00410e47 } from "./410e47.js";
export function FUN_00410fc7(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  if ((param_4 & 1) == 0) {
    if ((heap.u32(0x005ec15c) == 0) || (heap.u32(0x005ec170) != param_1)) {
      uVar1 = FUN_00410e47(heap, param_1, param_3, param_2);
    } else {
      uVar1 = 1;
    }
  } else {
    uVar1 = 1;
  }
  return uVar1;
}
