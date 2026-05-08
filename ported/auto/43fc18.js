// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43fc18.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_009b438b } from "./9b438b.js";
export function FUN_0043fc18(heap) {
  let unaff_ESI = 0;
  if ((heap.u32((unaff_ESI + 0x10)) >>> 4 & 1) == 0) {
    FUN_009b438b(heap);
  }
  return;
}
