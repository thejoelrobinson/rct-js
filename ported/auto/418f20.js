// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418f20.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00418ef0 } from "./418ef0.js";
export function FUN_00418f20(heap, param_1, param_2) {
  let iVar1 = 0;
  iVar1 = FUN_00418ef0(heap, heap.u32(param_1), heap.u32(param_2), param_1);
  if (iVar1 != 0) {
    iVar1 = FUN_00418ef0(heap, heap.u32(param_1 + (1) * 4), 1, param_1 + 1);
    if (iVar1 != 0) {
      heap.u32(param_1 + (2) * 4) = heap.u32(param_1 + (2) * 4) + 1;
    }
  }
  iVar1 = FUN_00418ef0(heap, heap.u32(param_1 + (1) * 4), heap.u32(param_2 + (1) * 4), param_1 + 1);
  if (iVar1 != 0) {
    heap.u32(param_1 + (2) * 4) = heap.u32(param_1 + (2) * 4) + 1;
  }
  FUN_00418ef0(heap, heap.u32(param_1 + (2) * 4), heap.u32(param_2 + (2) * 4), param_1 + 2);
  return;
}
