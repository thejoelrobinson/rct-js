// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/453900.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00453900(heap) {
  let unaff_DI = regs.edi & 0xffff;
  if ((heap.u8(0x006326bc) == 0) && ((heap.u32(0x006323fc) | 0) != -1)) {
    heap.setU32(0x00632600, (unaff_DI) >>> 0);
    return (regs.eax = callIndirect(heap, heap.u32((0x00453930) + (heap.u8(0x00991f88)) * 4)));
  }
  return;
}
