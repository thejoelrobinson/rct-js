// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e34d7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e34d7(heap) {
  let iVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  for (iVar1 = ((heap.i32((unaff_ESI + 0x1c))) >>> 0); iVar1 != unaff_EDI; iVar1 = (((iVar1 + 0x10) >>> 0)) >>> 0) {
  
  }
  return;
}
