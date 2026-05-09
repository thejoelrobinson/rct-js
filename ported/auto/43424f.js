// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43424f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00431510 } from "./431510.js";
export function FUN_0043424f(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let extraout_CX = 0;
  let unaff_BL = regs.ebx & 0xff;
  sVar1 = (((regs.edx = 0xfffe, regs.eax = FUN_00431510(heap))) & 0xffff);
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
