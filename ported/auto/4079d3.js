// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4079d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0040dcaf } from "./40dcaf.js";
export function FUN_004079d3(heap, param_1, param_2) {
  let iVar1 = 0;
  iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec05c)) + 0x14))))(heap.u32(0x005ec05c), heap.u32(param_2), param_1);
  if (iVar1 == 0) {
    heap.u32((param_1 + 8)) = heap.u32(param_2 + (2) * 4);
    heap.u32((param_1 + 4)) = heap.u32(param_2 + (1) * 4);
    heap.u32((param_1 + 0xc)) = heap.u32(param_2 + (3) * 4);
    FUN_0040dcaf(heap, param_1);
  }
  return iVar1 == 0;
}
