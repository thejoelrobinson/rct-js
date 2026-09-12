// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43fc5e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";
export function FUN_0043fc5e(heap) {
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u32((unaff_ESI + 0x10)) >>> 7 & 1) == 0) {
    (regs.ebx = 0x5eff, regs.eax = FUN_009b438b(heap));
  }
  return;
}
