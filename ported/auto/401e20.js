// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/401e20.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00401e20(heap) {
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
  let iVar1 = 0;
  let uVar2 = 0;
  heap.setU32(__addr_local_b8, (0x005f2420) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32(0x005ebe58), __addr_local_b0));
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32(0x005ebea4), heap.u32(0x005e9100), __addr_local_b0))) >>> 0);
  if (iVar1 == 0) {
    uVar2 = ((0) >>> 0);
  } else {
    for (heap.setU32(__addr_local_b4, (0) >>> 0); heap.u32(__addr_local_b4) < heap.u32(0x005f1b34); heap.setU32(__addr_local_b4, (heap.u32(__addr_local_b4) + 8) >>> 0)) {
      heap.setU32(__addr_local_8, (0) >>> 0);
      while (iVar1 = ((heap.u32(__addr_local_8)) >>> 0), heap.u32(__addr_local_8) < 0x500) {
        if (heap.i8(heap.u32(__addr_local_b8)) == 0) {
          heap.setU32(__addr_local_b8, (heap.u32(__addr_local_b8) + 1) >>> 0);
          heap.setU32(__addr_local_8, (heap.u32(__addr_local_8) + 0x40) >>> 0);
        } else {
          heap.setU32(__addr_local_c8, (heap.u32(__addr_local_8)) >>> 0);
          heap.setU32(__addr_local_c4, (heap.u32(__addr_local_b4)) >>> 0);
          heap.setU32(__addr_local_bc, (heap.u32(__addr_local_b4) + 8) >>> 0);
          for (; (heap.u32(__addr_local_8) < 0x500 && (heap.i8(heap.u32(__addr_local_b8)) != 0)); heap.setU32(__addr_local_b8, (heap.u32(__addr_local_b8) + 1) >>> 0)) {
            heap.setU32(heap.u32(__addr_local_b8), (0) & 0xffffffff);
            heap.setU32(__addr_local_8, (heap.u32(__addr_local_8) + 0x40) >>> 0);
          }
          heap.setU32(__addr_local_c0, (heap.u32(__addr_local_8)) >>> 0);
          (regs.eax = callIndirect(heap, heap.u32(0x005ebeb4), __addr_local_c8, iVar1, heap.u32(__addr_local_b4)));
          heap.setU32(0x005f2404, (heap.u32(0x005f2404) + 1) >>> 0);
        }
      }
    }
    (regs.eax = callIndirect(heap, heap.u32(0x005ebea8)));
    heap.setU32(0x005f1fe0, (5) >>> 0);
    uVar2 = ((1) >>> 0);
  }
  return uVar2;
} finally {
    heap.freeFrame(196);
  }
}
