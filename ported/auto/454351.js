// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/454351.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040d432 } from "./40d432.js";
import { FUN_0040d4b8 } from "./40d4b8.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_0045432a } from "./45432a.js";
export function FUN_00454351(heap) {
  let iVar1 = 0;
  if ((((heap.u32(0x006323f8) & 1) != 0) && ((heap.u8(0x006326bd) & 1) != 0)) && ((heap.u32(0x0099a500) & 1) != 0)) {
    if (heap.u8(0x0063297c) == 0) {
      (regs.eax = FUN_0042f239(heap));
      iVar1 = (((regs.eax = FUN_0040d432(heap, 3, 0x15, 0))) >>> 0);
      if (iVar1 != 0) {
        (regs.eax = FUN_0040d4b8(heap, 3, 1, 0, 0, 0));
      }
      heap.setU8(0x0063297c, (1) & 0xff);
    }
    return;
  }
  if (heap.u8(0x0063297c) != 0) {
    (regs.eax = FUN_0045432a(heap));
  }
  return;
}
