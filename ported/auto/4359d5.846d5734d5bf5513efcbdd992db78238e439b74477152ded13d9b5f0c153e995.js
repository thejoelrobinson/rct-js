// @manual — do not regenerate.
// Source: decompiled/c/4359d5.c
//
// Disassembly at 0x4359d5: calls FUN_00431510 (the tile-pick routine).
// FUN_00431510's epilogue at 0x431600..0x431614 reloads return values
// from a struct at 0x628914 (AX), 0x628916 (CX), 0x628918 (EDX = tile
// element pointer). The caller reads `byte at [EDX]` to get the tile's
// element-kind flags. Translator zeroed extraout_EDX → caller probed
// heap[0] which is always 0, making the bsf/landownership check
// degenerate. Fix: read the pointer from 0x628918 after the call.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00431510 } from "./431510.js";
import { FUN_00435005 } from "./435005.js";
export function FUN_004359d5(heap) {
  let sVar1 = 0;
  let unaff_BL = regs.ebx & 0xff;
  (regs.edx = 0xffda, regs.eax = FUN_00431510(heap));
  // Hand-fix: extraout_EDX is the tile-element pointer FUN_00431510
  // re-loads into EDX at its epilogue. 431510.js now publishes via
  // regs.edx, so read directly.
  const extraout_EDX = regs.edx >>> 0;
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
