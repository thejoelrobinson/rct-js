// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40db14.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0040da11 } from "./40da11.js";
import { FUN_0040dae1 } from "./40dae1.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_0040db14(heap) {
  heap.setU32(0x005ebf0c, (FUN_0040da11(heap)) >>> 0);
  heap.setU32(0x005ebf10, (FUN_004133c0(heap, heap.u32(0x005ebf0c) * 0x210)) >>> 0);
  if (heap.u32(0x005ebf10) != 0) {
    FUN_0040dae1(heap);
  }
  return;
}
