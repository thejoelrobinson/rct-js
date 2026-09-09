// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4528d6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00407a41 } from "./407a41.js";
export function FUN_004528d6(heap) {
  let sVar1 = 0;
  let psVar2 = 0;
  if ((heap.u32(0x006323f4) | 0) != -1) {
    psVar2 = ((0x00632448) >>> 0);
    sVar1 = ((6) & 0xffff);
    do {
      if ((heap.i16(psVar2) | 0) != -1) {
        if ((heap.i16(psVar2 + (0xc) * 2) | 0) != -1) {
          (regs.eax = FUN_00407a41(heap, psVar2 + ((2) * 2)));
        }
        if ((heap.i16(psVar2 + (0x1a) * 2) | 0) != -1) {
          (regs.eax = FUN_00407a41(heap, psVar2 + ((0x10) * 2)));
        }
        heap.setU32(psVar2, (-1) & 0xffffffff);
      }
      psVar2 = ((psVar2 + ((0x1e) * 2)) >>> 0);
      sVar1 = ((sVar1 + -1) & 0xffff);
    } while (sVar1 != 0);
  }
  return;
}
