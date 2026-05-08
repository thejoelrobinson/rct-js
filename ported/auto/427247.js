// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/427247.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004528a0 } from "./4528a0.js";
import { FUN_004528c4 } from "./4528c4.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00427247(heap) {
  let unaff_EBX = 0;
  if ((unaff_EBX & 1) != 0) {
    heap.setU32(0x0099c169, (heap.u32(0x0099c169) ^ 1) >>> 0);
    FUN_005e5301(heap);
    if ((heap.u32(0x0099c169) & 1) == 0) {
      FUN_004528c4(heap);
    } else {
      FUN_004528a0(heap);
    }
  }
  return;
}
