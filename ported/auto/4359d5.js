// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4359d5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00431510 } from "./431510.js";
import { FUN_00435005 } from "./435005.js";
export function FUN_004359d5(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f4970 = __sp + 0;
  try {
  let sVar1 = 0;
  let unaff_BL = 0;
  FUN_00431510(heap);
  if ((unaff_BL == '\x03') && ((heap.u32(extraout_EDX) & 0x3c) == 0x10)) {
    if ((heap.u32((__addr_DAT_005f4970) + (heap.u32(extraout_EDX + (4) * 4) * 0x10 + (heap.u32(extraout_EDX + (5) * 4) & 0xf)) * 4) & 0xf) != 0) {
      sVar1 = 0;
      if (heap.u32((__addr_DAT_005f4970 + heap.u32(extraout_EDX + (4) * 4) * 0x10 + (heap.u32(extraout_EDX + (5) * 4) & 0xf))) != 0) {
        for (; (heap.u32((__addr_DAT_005f4970 + heap.u32(extraout_EDX + (4) * 4) * 0x10 + (heap.u32(extraout_EDX + (5) * 4) & 0xf))) >>> sVar1 & 1) == 0; sVar1 = sVar1 + 1) {
        
        }
      }
      return;
    }
  }
  FUN_00435005(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
