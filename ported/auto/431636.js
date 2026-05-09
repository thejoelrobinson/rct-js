// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/431636.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004316f3 } from "./4316f3.js";
export function FUN_00431636(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let sVar1 = 0;
  if ((((heap.i16(unaff_ESI + (2) * 2) < ((in_EDX) << 16 >> 16)) && (heap.i16(unaff_ESI + (3) * 2) < unaff_BP)) && (((in_EAX) << 16 >> 16) < (((heap.i16(unaff_ESI + (2) * 2) + heap.i16(unaff_ESI))) << 16 >> 16))) && (sVar1 = ((heap.i16(unaff_ESI + (3) * 2) + heap.i16(unaff_ESI + (1) * 2)) & 0xffff), unaff_BX < sVar1)) {
    if (unaff_BX < heap.i16(unaff_ESI + (3) * 2)) {
      unaff_BX = ((heap.i16(unaff_ESI + (3) * 2)) & 0xffff);
    }
    if (sVar1 < unaff_BP) {
      unaff_BP = ((sVar1) & 0xffff);
    }
    if (0x180 < ((((unaff_BP - heap.i16(unaff_ESI + (3) * 2) << (heap.u8((unaff_ESI + ((8) * 2))) & 0x1f)) + heap.i16(unaff_ESI + (5) * 2)) - ((unaff_BX - heap.i16(unaff_ESI + (3) * 2) << (heap.u8((unaff_ESI + ((8) * 2))) & 0x1f)) + heap.i16(unaff_ESI + (5) * 2))) & 0xffff)) {
      (regs.eax = FUN_004316f3(heap));
    }
    (regs.eax = FUN_004316f3(heap));
    return 1;
  }
  return 1;
}
