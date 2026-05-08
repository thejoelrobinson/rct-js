// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4289e2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_009b438b } from "./9b438b.js";
export function FUN_004289e2(heap) {
  let unaff_ESI = 0;
  if ((heap.u32((unaff_ESI + 0x10)) >>> 5 & 1) == 0) {
    FUN_009b438b(heap);
    FUN_009b438b(heap, heap.u32(0x005f4b1e) + heap.u32((unaff_ESI + 0x22)) + 1, heap.u32(0x005f4b1a) + heap.u32((unaff_ESI + 0x20)) + 7, unaff_ESI);
    FUN_009b438b(heap);
  }
  return;
}
