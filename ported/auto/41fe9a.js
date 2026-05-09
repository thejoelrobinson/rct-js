// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41fe9a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0041fe9a(heap) {
  let unaff_EDI = regs.edi >>> 0;
  return heap.u32((unaff_EDI + 199)) * 0x2800 >>> 0x10;
}
