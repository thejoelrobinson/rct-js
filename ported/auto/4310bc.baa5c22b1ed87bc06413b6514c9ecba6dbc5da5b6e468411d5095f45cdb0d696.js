// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4310bc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";
export function FUN_004310bc(heap) {
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u32((unaff_ESI + 0x10)) >>> 5 & 1) == 0) {
    (regs.ebx = 0x5f41, regs.eax = FUN_009b438b(heap));
  }
  return;
}
