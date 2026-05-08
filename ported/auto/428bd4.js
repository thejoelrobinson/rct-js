// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/428bd4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_009b438b } from "./9b438b.js";
export function FUN_00428bd4(heap) {
  let unaff_ESI = 0;
  if ((heap.u32((unaff_ESI + 0x10)) >>> 10 & 1) == 0) {
    FUN_009b438b(heap);
  }
  return;
}
