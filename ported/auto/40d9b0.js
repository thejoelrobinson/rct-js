// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d9b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00407696 } from "./407696.js";
import { FUN_0040776d } from "./40776d.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_0040d9b0(heap) {
  if (heap.u32(0x005ebf10) != 0) {
    FUN_00413470(heap, heap.u32(0x005ebf10));
    heap.setU32(0x005ebf10, (0) >>> 0);
  }
  heap.setU32(0x005ebf0c, (0) >>> 0);
  FUN_00407696(heap);
  FUN_0040776d(heap);
  return;
}
