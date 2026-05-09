// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44e6d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0044e6d3(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.ecx = 0xf, regs.edx = 0x44e735, regs.ebx = 0xf00154, regs.ebp = 0x44e9e7, regs.eax = FUN_005e3c3c(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x00631a00) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0x1dc) & 0xffffffff);
    (regs.edx = 0x44e735, regs.eax = FUN_005e412c(heap));
    heap.setU8((unaff_ESI + 0x158), (0) & 0xff);
    heap.setU8((unaff_ESI + 0x159), (0xff) & 0xff);
    heap.setU16((unaff_ESI + 0x168), (0) & 0xffff);
  }
  heap.setU8(0x00631d54, (0) & 0xff);
  heap.setU16((unaff_ESI + 0x16a), (0) & 0xffff);
  return;
}
