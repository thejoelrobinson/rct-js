// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402aa4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00402b77 } from "./402b77.js";
export function FUN_00402aa4(heap) {
  (heap.u32(heap.u32(0x005ebe60)))(heap.u32(0x005e9100));
  heap.setU32(0x005e9108, (0) >>> 0);
  if (heap.u32(0x005e9130) != 0) {
    FUN_00402b77(heap);
  }
  return;
}
