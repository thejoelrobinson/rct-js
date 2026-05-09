// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/455c5b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00455a66 } from "./455a66.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_00455c5b(heap) {
  let in_AX = regs.eax & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  (regs.eax = FUN_005e3c3c(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x00632b40) & 0xffffffff);
  heap.setU32((unaff_ESI + 0xc), (heap.u32(0x00632db0)) & 0xffffffff);
  heap.setU16((unaff_ESI + 0x30), (in_AX) & 0xffff);
  heap.setU16((unaff_ESI + 0x164), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x15c), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x168), (0) & 0xffff);
  return (regs.eax = FUN_00455a66(heap));
}
