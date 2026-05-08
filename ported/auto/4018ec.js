// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4018ec.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00401972 } from "./401972.js";
import { FUN_00401c9b } from "./401c9b.js";
import { FUN_00401e20 } from "./401e20.js";
export function FUN_004018ec(heap) {
  if (heap.u32(0x005e9154) == 0) {
    if (0 < heap.u32(0x005e9158)) {
      if (heap.u32(0x005e9144) == 0) {
        FUN_00401c9b(heap);
      } else {
        FUN_00401e20(heap);
      }
    }
  } else {
    FUN_00401972(heap);
  }
  return;
}
