// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/401f79.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00402027 } from "./402027.js";
import { FUN_00402144 } from "./402144.js";
import { FUN_004023b2 } from "./4023b2.js";
export function FUN_00401f79(heap) {
  if ((heap.u32(0x005e9174) != 0) && (heap.u32(0x005e9178) == 0)) {
    if (heap.u32(0x005e9154) == 0) {
      if (0 < heap.u32(0x005e9158)) {
        if (heap.u32(0x005e9144) == 0) {
          FUN_004023b2(heap);
        } else {
          FUN_00402144(heap);
        }
      }
    } else {
      FUN_00402027(heap);
    }
  }
  return;
}
