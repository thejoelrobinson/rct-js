// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44e5a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";
export function FUN_0044e5a0(heap) {
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u32((unaff_ESI + 0x10)) >>> 0xb & 1) == 0) {
    (regs.edx = 0xfffa, regs.ebx = 0xa7306394, regs.eax = FUN_009b438b(heap));
  }
  return;
}
