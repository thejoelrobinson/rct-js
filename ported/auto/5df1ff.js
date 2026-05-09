// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df1ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005df1ff(heap) {
  let pcVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  pcVar1 = (((unaff_ESI + 5)) >>> 0);
  heap.setU32(pcVar1, (heap.i8(pcVar1) + 1) & 0xffffffff);
  if (heap.i8(pcVar1) == 0) {
    heap.setI8((unaff_ESI + 5), (heap.i8((unaff_ESI + 5)) + -1) & 0xff);
  }
  return;
}
