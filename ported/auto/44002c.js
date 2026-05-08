// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44002c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e429d } from "./5e429d.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_0044002c(heap) {
  let unaff_ESI = 0;
  if (heap.u32((unaff_ESI + 8)) == 0) {
    FUN_005e429d(heap);
    heap.setU32((unaff_ESI + 0x32), (heap.u32((unaff_ESI + 0x32)) | 4) >>> 0);
    FUN_005e43de(heap);
  }
  return;
}
