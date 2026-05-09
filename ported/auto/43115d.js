// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43115d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004310fa } from "./4310fa.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_0043115d(heap) {
  let unaff_ESI = regs.esi >>> 0;
  (regs.eax = FUN_005e3c3c(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x005f94e0) & 0xffffffff);
  heap.setU32((unaff_ESI + 0xc), (heap.u32(0x005f9690)) & 0xffffffff);
  heap.setU16((unaff_ESI + 0x30), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x164), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x168), (0) & 0xffff);
  return (regs.eax = FUN_004310fa(heap));
}
