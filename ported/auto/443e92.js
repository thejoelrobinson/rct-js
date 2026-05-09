// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/443e92.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00443e92(heap) {
  let unaff_ESI = regs.esi >>> 0;
  heap.setU32((unaff_ESI + 0x10), (0) & 0xffffffff);
  return;
}
