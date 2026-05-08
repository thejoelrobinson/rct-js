// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4061f5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00408b0b } from "./408b0b.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_004061f5(heap) {
  FUN_00408b0b(heap);
  if (heap.u32(0x005ebe38) != 0) {
    FUN_00413470(heap, heap.u32(0x005ebe38));
    heap.setU32(0x005ebe38, (0) >>> 0);
  }
  heap.setU32(0x005ebe34, (0) >>> 0);
  return;
}
