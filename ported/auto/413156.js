// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413156.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00413156(heap) {
  let in_EAX = regs.eax >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  heap.setU32(0x005ec270, (heap.u32((unaff_EBP + 8))) >>> 0);
  heap.setU32(0x005ec26c, (in_EAX) >>> 0);
  heap.setU32(0x005ec274, (unaff_EBP) >>> 0);
  return;
}
