// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43424f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00423677 } from "./423677.js";
import { FUN_00431510 } from "./431510.js";
export function FUN_0043424f(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_004342c0 = __sp + 0;
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let extraout_CX = 0;
  let unaff_BL = 0;
  sVar1 = FUN_00431510(heap);
  if (unaff_BL != '\0') {
    heap.setU32(0x00628a34, (sVar1 + 0x1f) >>> 0);
    heap.setU32(0x00628a36, (extraout_CX + 0x1f) >>> 0);
    heap.setU32(0x00628a30, (sVar1) >>> 0);
    heap.setU32(0x00628a32, (extraout_CX) >>> 0);
    FUN_00423677(heap);
    uVar2 = (heap.u32(heap.u32((__addr_PTR_LAB_004342c0) + (heap.u32(0x00991f88)) * 4)))();
    return uVar2;
  }
  return 0x8000;
} finally {
    heap.freeFrame(4);
  }
}
