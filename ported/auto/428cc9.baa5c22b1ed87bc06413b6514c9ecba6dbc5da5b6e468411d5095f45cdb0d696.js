// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/428cc9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e429d } from "./5e429d.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_00428cc9(heap) {
  let unaff_ESI = regs.esi >>> 0;
  if (heap.i32((unaff_ESI + 8)) == 0) {
    (regs.eax = 0xc70006, regs.ebx = 0xff38fffa, regs.eax = FUN_005e429d(heap), regs.ecx = 0x200000, regs.eax);
    heap.setU16((unaff_ESI + 0x32), (heap.u16((unaff_ESI + 0x32)) | 4) & 0xffff);
    (regs.eax = FUN_005e43de(heap), regs.ecx = 0x200000, regs.eax);
  }
  return;
}
