// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4026ec.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004026ec(heap) {
  const __sp = heap.allocFrame(184);
  const __addr_local_bc = __sp + 0;
  const __addr_local_ac = __sp + 16;
  const __addr_local_b8 = __sp + 4;
  const __addr_local_b4 = __sp + 8;
  const __addr_local_b0 = __sp + 12;
  try {
  heap.setU32(__addr_local_b8, (0) >>> 0);
  heap.setU32(__addr_local_bc, (0) >>> 0);
  heap.setU32(__addr_local_b4, (heap.u32(0x005f15c4)) >>> 0);
  heap.setU32(__addr_local_b0, (heap.u32(0x005f1b34)) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32(0x005ebe58), __addr_local_ac));
  heap.setU32(0x005f1fe0, (4) >>> 0);
  return (regs.eax = callIndirect(heap, heap.u32(0x005ebe94), heap.u32(0x005e9100), __addr_local_bc, __addr_local_ac, __addr_local_bc));
} finally {
    heap.freeFrame(184);
  }
}
