// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41fa6f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0041fa6f(heap) {
  let unaff_EDI = regs.edi >>> 0;
  return heap.u32((unaff_EDI + 0xb0)) * 0x5555 >>> 0x10;
}
