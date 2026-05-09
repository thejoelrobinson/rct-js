// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44142c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0044142c(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let iVar1 = 0;
  if ((heap.i8((unaff_ESI + 0x2b)) == NaN) || (heap.i8((unaff_ESI + 0x2b)) == 3)) {
    iVar1 = ((heap.u32((unaff_ESI + 0x68)) * 0x260) >>> 0);
    heap.setU32(((0x0088752b) + (iVar1) * 4), (heap.u32((0x0088752b) + (iVar1) * 4) + -1) & 0xffffffff);
    heap.setU32(((0x0088751d) + (iVar1) * 4), (heap.u32((0x0088751d) + (iVar1) * 4) | 0xc) & 0xffffffff);
  }
  return;
}
