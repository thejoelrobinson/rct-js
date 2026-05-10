// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4186d0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00418750 } from "./418750.js";
import { FUN_00419880 } from "./419880.js";
export function FUN_004186d0(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_local_c = __sp + 0;
  const __addr_stack0x00000004 = __sp + 4;
  const __addr_local_8 = __sp + 4;
  const __addr_local_4 = __sp + 8;
  try {
  (regs.eax = FUN_00418750(heap, __addr_local_c, __addr_stack0x00000004));
  heap.setU32(0x005f02d8, ((regs.eax = FUN_00419880(heap, heap.u32(__addr_local_c), heap.u32(__addr_local_8), heap.u32(__addr_local_4), 0x11, 0, 0x005f02b0))) >>> 0);
  heap.setU32(0x005f02d0, (heap.i32(0x005f02b2)) >>> 0);
  heap.setU32(0x005f02d4, (heap.i32(0x005f02b0)) >>> 0);
  heap.setU32(0x005f02dc, (0x005f02b4) >>> 0);
  return 0x005f02d0;
} finally {
    heap.freeFrame(12);
  }
}
