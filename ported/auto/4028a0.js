// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4028a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004028a0(heap) {
  const __sp = heap.allocFrame(196);
  const __addr_local_c8 = __sp + 0;
  const __addr_local_b0 = __sp + 24;
  const __addr_local_c4 = __sp + 4;
  const __addr_local_c0 = __sp + 8;
  const __addr_local_bc = __sp + 12;
  const __addr_local_b8 = __sp + 16;
  const __addr_local_b4 = __sp + 20;
  const __addr_local_8 = __sp + 192;
  try {
  let local_cc = 0;
  heap.setU32(__addr_local_b8, (0x005f2420) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32(0x005ebe58), __addr_local_b0));
  heap.setU32(__addr_local_8, (0) >>> 0);
  // @manual HAND-FIX (painter-noise round 2): see 4023b2.js — clip the
  // outer loop bounds to the actual back-surface dimensions to avoid OOB
  // reads when the binary's window dims (800x600 from GetSystemMetrics)
  // exceed the runtime's hardcoded 640x480 surfaces.
  const __wBound = Math.min(heap.u32(0x005f15c4) >>> 0, heap.u32(0x005f2400) >>> 0);
  const __hBound = Math.min(heap.u32(0x005f1b34) >>> 0, heap.u32(0x005f1ff0) >>> 0);
  do {
    if (__wBound <= heap.u32(__addr_local_8)) {
      heap.setU32(0x005f1fe0, (6) >>> 0);
      return 1;
    }
    local_cc = ((0) >>> 0);
    heap.setU32(__addr_local_b4, (0) >>> 0);
    while (heap.u32(__addr_local_b4) < __hBound) {
      if (heap.u8(heap.u32(__addr_local_b8) + (local_cc)) == 0) {
        local_cc = ((local_cc + 0x14) >>> 0);
        heap.setU32(__addr_local_b4, (heap.u32(__addr_local_b4) + 8) >>> 0);
      } else {
        heap.setU32(__addr_local_c8, (heap.u32(__addr_local_8)) >>> 0);
        heap.setU32(__addr_local_c4, (heap.u32(__addr_local_b4)) >>> 0);
        heap.setU32(__addr_local_c0, (heap.u32(__addr_local_8) + 0x40) >>> 0);
        do {
          heap.setU8((heap.u32(__addr_local_b8) + (local_cc)), (0) & 0xff);
          local_cc = ((local_cc + 0x14) >>> 0);
          heap.setU32(__addr_local_bc, (heap.u32(__addr_local_b4) + 8) >>> 0);
          heap.setU32(__addr_local_b4, (heap.u32(__addr_local_bc)) >>> 0);
          if (__hBound <= heap.u32(__addr_local_bc)) {
            break;
          }
        } while (heap.u8(heap.u32(__addr_local_b8) + (local_cc)) != 0);
        (regs.eax = callIndirect(heap, heap.u32(0x005ebe94), heap.u32(0x005e9100), __addr_local_c8, __addr_local_b0, __addr_local_c8));
        heap.setU32(0x005f2404, (heap.u32(0x005f2404) + 1) >>> 0);
      }
    }
    heap.setU32(__addr_local_b8, (heap.u32(__addr_local_b8) + 1) >>> 0);
    heap.setU32(__addr_local_8, (heap.u32(__addr_local_8) + 0x40) >>> 0);
  } while (true);
} finally {
    heap.freeFrame(196);
  }
}
