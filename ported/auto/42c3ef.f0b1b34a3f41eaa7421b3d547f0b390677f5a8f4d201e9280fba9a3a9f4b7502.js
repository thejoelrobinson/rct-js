// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42c3ef.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0042c3ef(heap) {
  let in_EAX = regs.eax >>> 0;
  if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.u8(0x00991f5a) == 1)) && (heap.u8(0x00991f5c) == 10)) {
    return in_EAX;
  }
  return in_EAX;
}
