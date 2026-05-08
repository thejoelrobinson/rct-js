// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/426f56.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00427108 } from "./427108.js";
import { FUN_0044294c } from "./44294c.js";
import { FUN_004429a8 } from "./4429a8.js";
import { FUN_004429db } from "./4429db.js";
export function FUN_00426f56(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_005f49a0 = __sp + 0;
  try {
  let uVar1 = 0;
  let unaff_EBX = 0;
  let uVar2 = 0;
  let unaff_ESI = 0;
  uVar1 = unaff_EBX;
  if (heap.u32(0x005f4a6a) == '\0') {
    heap.setU32(0x00991efc, (0xffff) >>> 0);
  }
  heap.setU32(0x005f4a6a, (heap.u32(0x005f4a6a) + '\x01') >>> 0);
  uVar2 = unaff_EBX & 0xfffffffe;
  heap.setU32(0x005f4a68, (uVar1) >>> 0);
  (heap.u32(heap.u32((__addr_PTR_LAB_005f49a0) + (unaff_ESI) * 4)))();
  heap.setU32(0x005f4a68, (uVar1) >>> 0);
  if (uVar2 != 0x80000000) {
    if ((((heap.u32(0x005f4a6a) == '\x01') && ((unaff_EBX & 4) == 0)) && ((unaff_EBX & 0x20) == 0)) && (uVar2 != 0)) {
      FUN_004429a8(heap);
    }
    uVar1 = heap.u32(0x005f4a68);
    heap.setU32(0x005f4a64, (uVar2) >>> 0);
    if (uVar2 != 0x80000000) {
      if ((unaff_EBX & 1) != 0) {
        (heap.u32(heap.u32((__addr_PTR_LAB_005f49a0) + (unaff_ESI) * 4)))();
        if ((unaff_EBX != 0x80000000) && (unaff_EBX <= uVar2)) {
          uVar2 = unaff_EBX;
        }
        heap.setU32(0x005f4a6a, (heap.u32(0x005f4a6a) + -1) >>> 0);
        heap.setU32(0x005f4a68, (uVar1) >>> 0);
        if (((heap.u32(0x005f4a6a) == '\0') && ((uVar1 & 0x20) == 0)) && ((FUN_004429db(heap), heap.u32(0x0099c163) == heap.u32(0x008d7ea4) && (uVar2 != 0)))) {
          FUN_0044294c(heap);
        }
        return;
      }
      heap.setU32(0x005f4a6a, (heap.u32(0x005f4a6a) + -1) >>> 0);
      return;
    }
  }
  heap.setU32(0x005f4a6a, (heap.u32(0x005f4a6a) + -1) >>> 0);
  if ((((heap.u32(0x005f4a6a) == '\0') && ((unaff_EBX & 1) != 0)) && (heap.u32(0x0099c163) == heap.u32(0x008d7ea4))) && ((unaff_EBX & 8) == 0)) {
    FUN_00427108(heap);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
