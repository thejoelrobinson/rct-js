// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403b12.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00407266 } from "./407266.js";
export function FUN_00403b12(heap) {
  if (heap.u32(0x005e91c0) == 0) {
    heap.setU32(0x005e91c0, (1) >>> 0);
    FUN_00407266(heap);
  }
  return;
}
