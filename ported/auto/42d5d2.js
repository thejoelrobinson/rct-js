// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d5d2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408342 } from "./408342.js";
import { FUN_00408387 } from "./408387.js";
export function FUN_0042d5d2(heap) {
  if (heap.u32(0x005f554c) + -0x5f5558 != 0) {
    FUN_00408342(heap, heap.u32(0x005f5550), 0x005f5558, heap.u32(0x005f554c) + -0x5f5558);
  }
  FUN_00408387(heap, heap.u32(0x005f5550));
  heap.setU32(0x0099c16b, (0) >>> 0);
  return;
}
