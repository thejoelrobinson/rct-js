// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c698.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0043c60b } from "./43c60b.js";
export function FUN_0043c698(heap) {
  let in_AL = 0;
  let unaff_ESI = 0;
  if (in_AL != heap.u32((unaff_ESI + 0x6d))) {
    heap.u32((unaff_ESI + 0x6d)) = in_AL;
    if (0xfd < heap.u32((unaff_ESI + 0x71))) {
      heap.u32((unaff_ESI + 0x70)) = 0;
    }
    FUN_0043c60b(heap);
  }
  return;
}
