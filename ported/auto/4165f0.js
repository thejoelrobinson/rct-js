// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4165f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00415b30 } from "./415b30.js";
export function FUN_004165f0(heap, param_1, param_2, param_3) {
  let iVar1 = 0;
  iVar1 = heap.u32(param_2 + (1) * 4);
  heap.u32(param_2 + (1) * 4) = iVar1 + -1;
  if (iVar1 + -1 < 0) {
    param_1 = FUN_00415b30(heap, param_1, param_2);
  } else {
    heap.u32(heap.u32(param_2)) = param_1;
    param_1 = param_1 & 0xff;
    heap.u32(param_2) = heap.u32(param_2) + 1;
  }
  if (param_1 == 0xffffffff) {
    heap.u32(param_3) = -1;
    return;
  }
  heap.u32(param_3) = heap.u32(param_3) + 1;
  return;
}
