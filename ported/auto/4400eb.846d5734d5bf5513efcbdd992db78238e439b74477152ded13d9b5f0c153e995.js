// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4400eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0043fe80 } from "./43fe80.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
export function FUN_004400eb(heap) {
  let in_AX = regs.eax & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  (regs.ecx = 0x17, regs.edx = 0x43e831, regs.ebx = 0x9e00c2, regs.eax = FUN_005e3c3c(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x00628cf0) & 0xffffffff);
  heap.setU32((unaff_ESI + 0xc), (heap.u32(0x00629180)) & 0xffffffff);
  heap.setU16((unaff_ESI + 0x30), (in_AX) & 0xffff);
  heap.setU16((unaff_ESI + 0x164), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x15c), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x168), (0) & 0xffff);
  heap.setU16((unaff_ESI + 0x16a), (0) & 0xffff);
  return (regs.eax = FUN_0043fe80(heap));
}
