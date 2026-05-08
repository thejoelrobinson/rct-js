// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403b39.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004072bc } from "./4072bc.js";
export function FUN_00403b39(heap) {
  if (heap.u32(0x005e91c0) != 0) {
    heap.setU32(0x005e91c0, (0) >>> 0);
    FUN_004072bc(heap);
  }
  return;
}
