// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d58d0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005d58d0(heap) {
  if (((heap.u32(0x00652288) != '\x06') && (heap.u32(0x00652288) != '\a')) && (heap.u32(0x00652288) != '\b')) {
    return;
  }
  if ((heap.u32(0x00652292) & 1) != 0) {
    FUN_005e5562(heap);
    heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffb) >>> 0);
  }
  return;
}
