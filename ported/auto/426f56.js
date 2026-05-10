// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/426f56.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00427108 } from "./427108.js";
import { FUN_0044294c } from "./44294c.js";
import { FUN_004429a8 } from "./4429a8.js";
import { FUN_004429db } from "./4429db.js";
export function FUN_00426f56(heap) {
  let uVar1 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  uVar1 = ((((unaff_EBX) & 0xffff)) & 0xffff);
  if (heap.u8(0x005f4a6a) == 0) {
    heap.setU32(0x00991efc, (0xffff) >>> 0);
  }
  heap.setU8(0x005f4a6a, (heap.u8(0x005f4a6a) + 1) & 0xff);
  uVar2 = ((unaff_EBX & 0xfffffffe) >>> 0);
  heap.setU8(0x005f4a68, (uVar1) & 0xff);
  (regs.eax = callIndirect(heap, heap.u32((0x005f49a0) + (unaff_ESI) * 4)));
  heap.setU8(0x005f4a68, (uVar1) & 0xff);
  if (uVar2 != 0x80000000) {
    if ((((heap.u8(0x005f4a6a) == 1) && ((unaff_EBX & 4) == 0)) && ((unaff_EBX & 0x20) == 0)) && (uVar2 != 0)) {
      (regs.eax = FUN_004429a8(heap));
    }
    uVar1 = ((heap.u8(0x005f4a68)) & 0xffff);
    heap.setU32(0x005f4a64, (uVar2) >>> 0);
    if (uVar2 != 0x80000000) {
      if ((unaff_EBX & 1) != 0) {
        (regs.eax = callIndirect(heap, heap.u32((0x005f49a0) + (unaff_ESI) * 4)));
        if ((unaff_EBX != 0x80000000) && (((unaff_EBX) >>> 0) <= ((uVar2) >>> 0))) {
          uVar2 = ((unaff_EBX) >>> 0);
        }
        heap.setU8(0x005f4a6a, (heap.u8(0x005f4a6a) + -1) & 0xff);
        heap.setU8(0x005f4a68, (uVar1) & 0xff);
        if (((heap.u8(0x005f4a6a) == 0) && ((uVar1 & 0x20) == 0)) && (((regs.eax = FUN_004429db(heap)), heap.u8(0x0099c163) == heap.u32(0x008d7ea4) && (uVar2 != 0)))) {
          (regs.eax = FUN_0044294c(heap));
        }
        return;
      }
      heap.setU8(0x005f4a6a, (heap.u8(0x005f4a6a) + -1) & 0xff);
      return;
    }
  }
  heap.setU8(0x005f4a6a, (heap.u8(0x005f4a6a) + -1) & 0xff);
  if ((((heap.u8(0x005f4a6a) == 0) && ((unaff_EBX & 1) != 0)) && (heap.u8(0x0099c163) == heap.u32(0x008d7ea4))) && ((unaff_EBX & 8) == 0)) {
    (regs.esi = 0x6, regs.eax = FUN_00427108(heap), regs.edx = 0x4271bb, regs.eax);
  }
  return;
}
