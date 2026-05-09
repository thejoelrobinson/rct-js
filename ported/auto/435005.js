// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/435005.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00431510 } from "./431510.js";
export function FUN_00435005(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let extraout_CX = 0;
  let extraout_EDX = 0;
  let cVar3 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  sVar1 = (((regs.eax = FUN_00431510(heap))) & 0xffff);
  cVar3 = ((((unaff_BX) << 24 >> 24)) & 0xff);
  if (cVar3 == 0) {
    return 0x8000;
  }
  if ((cVar3 == 6) && (unaff_BX = ((heap.u16((extraout_EDX + 2)) * 4) & 0xffff), (heap.u8((extraout_EDX + 4)) & 4) != 0)) {
    unaff_BX = ((unaff_BX + 8) & 0xffff);
  }
  heap.setU32(0x00628a34, (sVar1 + 0x1f) >>> 0);
  heap.setU32(0x00628a36, (extraout_CX + 0x1f) >>> 0);
  heap.setU32(0x00628a2c, (extraout_EDX) >>> 0);
  heap.setU32(0x00628a30, (sVar1) >>> 0);
  heap.setU32(0x00628a32, (extraout_CX) >>> 0);
  heap.setU32(0x00628a38, (unaff_BX) >>> 0);
  heap.setU32(0x00628a3a, (cVar3) >>> 0);
  if (cVar3 != 6) {
    (regs.eax = FUN_00423677(heap));
  }
  uVar2 = (((regs.eax = callIndirect(heap, heap.u32((0x004350bc) + (heap.u8(0x00991f88)) * 4)))) & 0xffff);
  return uVar2;
}
