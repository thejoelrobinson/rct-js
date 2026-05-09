// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43feb6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0043feb6(heap) {
  let in_EAX = regs.eax >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u32((0x0062d434) + (heap.u8((unaff_ESI + 0x2b))) * 4) & 1) != 0) {
    return in_EAX;
  }
  return in_EAX;
}
