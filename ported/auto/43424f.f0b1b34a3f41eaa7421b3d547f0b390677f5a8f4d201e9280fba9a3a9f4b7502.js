// @manual — do not regenerate.
// Source: decompiled/c/43424f.c
//
// Same FUN_00431510-return-channel issue as 4359d5: that function's
// epilogue at 0x431600..0x431614 reloads AX from 0x628914 and CX from
// 0x628916. The translator left extraout_CX at 0, so the rect stored
// for cursor display was {sVar1, 0, sVar1+0x1f, 0x1f} instead of the
// real tile-y span — visually a horizontal sliver instead of a tile.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00431510 } from "./431510.js";
export function FUN_0043424f(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let unaff_BL = regs.ebx & 0xff;
  sVar1 = (((regs.edx = 0xfffe, regs.eax = FUN_00431510(heap))) & 0xffff);
  // Hand-fix: extraout_CX is the y-coordinate FUN_00431510 reloads into
  // CX at its epilogue. 431510.js now publishes via regs.ecx.
  const extraout_CX = regs.ecx & 0xffff;
  if (unaff_BL != 0) {
    heap.setU32(0x00628a34, (sVar1 + 0x1f) >>> 0);
    heap.setU32(0x00628a36, (extraout_CX + 0x1f) >>> 0);
    heap.setU32(0x00628a30, (sVar1) >>> 0);
    heap.setU32(0x00628a32, (extraout_CX) >>> 0);
    (regs.eax = FUN_00423677(heap));
    uVar2 = (((regs.eax = callIndirect(heap, heap.u32((0x004342c0) + (heap.u8(0x00991f88)) * 4)))) & 0xffff);
    return uVar2;
  }
  return 0x8000;
}
