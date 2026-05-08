// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448e26.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00426f56 } from "./426f56.js";
import { FUN_004490cb } from "./4490cb.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_00448e26(heap) {
  if (heap.u32(0x00630b21) == '\x02') {
    if ((heap.u32(0x00630b1a) & 1) == 0) {
      if ((heap.u32(0x00630b1a) & 2) != 0) {
        heap.setU32(0x00630b1a, (heap.u32(0x00630b1a) & 0xfd) >>> 0);
        FUN_00426f56(heap);
        return;
      }
    } else {
      FUN_004490cb(heap);
      FUN_005e5562(heap);
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffb) >>> 0);
    }
  }
  return;
}
