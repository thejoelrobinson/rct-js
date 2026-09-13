// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4531b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00407a41 } from "./407a41.js";
import { FUN_00407b91 } from "./407b91.js";
export function FUN_004531b0(heap) {
  let iVar1 = 0;
  let psVar2 = 0;
  if ((heap.u32(0x006323f4) | 0) != -1) {
    psVar2 = ((0x00632608) >>> 0);
    do {
      if ((heap.i16(psVar2) | 0) != -1) {
        iVar1 = (((regs.eax = FUN_00407b91(heap, psVar2 + ((1) * 2)))) >>> 0);
        if (iVar1 != 1) {
          (regs.eax = FUN_00407a41(heap, psVar2 + ((1) * 2)));
          heap.setU32(psVar2, (-1) & 0xffffffff);
        }
      }
      psVar2 = ((psVar2 + ((0xb) * 2)) >>> 0);
    } while (psVar2 < 0x0063268c);
  }
  return;
}
