// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441891.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00441891(heap) {
  let unaff_ESI = regs.esi >>> 0;
  heap.setU32((unaff_ESI + 0xcc), (0xffffffff) & 0xffffffff);
  return;
}
