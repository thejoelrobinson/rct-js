// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407a7d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00407a41 } from "./407a41.js";
export function FUN_00407a7d(heap) {
  while (heap.u32(0x005ec054) != 0) {
    FUN_00407a41(heap, heap.u32(0x005ec054));
  }
  return;
}
