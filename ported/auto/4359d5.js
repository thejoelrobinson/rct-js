// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4359d5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00431510 } from "./431510.js";
import { FUN_00435005 } from "./435005.js";
export function FUN_004359d5(heap) {
  let sVar1 = 0;
  let extraout_EDX = 0;
  let unaff_BL = regs.ebx & 0xff;
  (regs.edx = 0xffda, regs.eax = FUN_00431510(heap));
  if ((unaff_BL == 3) && ((heap.u8(extraout_EDX) & 0x3c) == 0x10)) {
    if ((heap.u32((0x005f4970) + (((heap.u8(extraout_EDX + (4))) >>> 0) * 0x10 + (heap.u8(extraout_EDX + (5)) & 0xf)) * 4) & 0xf) != 0) {
      sVar1 = ((0) & 0xffff);
      if (heap.u16((0x005f4970 + ((heap.u8(extraout_EDX + (4))) >>> 0) * 0x10 + (heap.u8(extraout_EDX + (5)) & 0xf))) != 0) {
        for (; (heap.u16((0x005f4970 + ((heap.u8(extraout_EDX + (4))) >>> 0) * 0x10 + (heap.u8(extraout_EDX + (5)) & 0xf))) >>> sVar1 & 1) == 0; sVar1 = (((sVar1 + 1) & 0xffff)) >>> 0) {
        
        }
      }
      return;
    }
  }
  return (regs.eax = FUN_00435005(heap));
}
