// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44e607.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_0044e607(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.ecx = 0xb, regs.eax = FUN_005e3b2b(heap));
  if ((!in_ZF) && (heap.i16((unaff_ESI + 0x164)) == 1)) {
    (regs.eax = FUN_005e5bd8(heap));
  }
  return;
}
