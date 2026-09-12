// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/434e44.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_00434e44(heap) {
  let psVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  sVar2 = (((regs.eax = FUN_005e3ace(heap))) & 0xffff);
  if ((((unaff_ESI != 0) && (psVar1 = ((heap.u32((unaff_ESI + 8))) >>> 0), psVar1 != 0x0)) && (heap.i16(psVar1 + (2) * 2) <= sVar2)) && ((((((sVar2 - heap.i16(psVar1 + (2) * 2))) << 16 >> 16) < heap.i16(psVar1) && (heap.i16(psVar1 + (3) * 2) <= unaff_BX)) && ((((unaff_BX - heap.i16(psVar1 + (3) * 2))) << 16 >> 16) < heap.i16(psVar1 + (1) * 2))))) {
    uVar3 = (((regs.eax = callIndirect(heap, heap.u32((0x00434e98) + (heap.u8(0x00991f88)) * 4)))) & 0xffff);
    return uVar3;
  }
  return 0x8000;
}
