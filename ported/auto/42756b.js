// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42756b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004275d5 } from "./4275d5.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_0042756b(heap) {
  let unaff_ESI = regs.esi >>> 0;
  (regs.eax = FUN_005e3c3c(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x005f4ac8) & 0xffffffff);
  heap.setU32((unaff_ESI + 0xc), (heap.u32(0x005f50d8)) & 0xffffffff);
  heap.setU16((unaff_ESI + 0x30), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x164), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x15c), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x168), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x16a), (0xffff) & 0xffff);
  heap.setU16((unaff_ESI + 0x166), (0xffff) & 0xffff);
  heap.setU16((unaff_ESI + 0x16c), (0) & 0xffff);
  return (regs.eax = FUN_004275d5(heap));
}
