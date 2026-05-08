// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4270f2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e38f5 } from "./5e38f5.js";
export function FUN_004270f2(heap) {
  let in_AX = 0;
  if (in_AX != 0) {
    heap.setU32(0x0099c163, (heap.u32(0x008d7ea4)) >>> 0);
    FUN_005e38f5(heap);
    return;
  }
  return;
}
