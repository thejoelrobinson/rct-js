// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4186d0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00418750 } from "./418750.js";
import { FUN_00419880 } from "./419880.js";
export function FUN_004186d0(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_local_c = __sp + 0;
  const __addr_stack0x00000004 = __sp + 4;
  const __addr_DAT_005f02b0 = __sp + 8;
  const __addr_DAT_005f02b4 = __sp + 12;
  const __addr_DAT_005f02d0 = __sp + 16;
  try {
  let local_8 = 0;
  let local_4 = 0;
  FUN_00418750(heap, __addr_local_c, __addr_stack0x00000004);
  heap.setU32(0x005f02d8, (FUN_00419880(heap, heap.u32(__addr_local_c), local_8, local_4, 0x11, 0, __addr_DAT_005f02b0)) >>> 0);
  heap.setU32(0x005f02d0, (heap.u32(0x005f02b2)) >>> 0);
  heap.setU32(0x005f02d4, (heap.u32(__addr_DAT_005f02b0)) >>> 0);
  heap.setU32(0x005f02dc, (__addr_DAT_005f02b4) >>> 0);
  return __addr_DAT_005f02d0;
} finally {
    heap.freeFrame(20);
  }
}
