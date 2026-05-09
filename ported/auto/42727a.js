// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42727a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042756b } from "./42756b.js";
import { FUN_00428c0b } from "./428c0b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0042727a(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.eax = FUN_0042756b(heap));
    heap.setU32((unaff_ESI + (0x57) * 4), (0xffffffff) & 0xffffffff);
  }
  heap.setU16((unaff_ESI + ((0x59) * 4)), (0) & 0xffff);
  (regs.eax = FUN_005e43de(heap));
  heap.setU32((unaff_ESI + (7) * 4), (heap.u32(0x005f5084)) & 0xffffffff);
  heap.setU32((unaff_ESI + (3) * 4), (heap.u32(0x005f50d8)) & 0xffffffff);
  heap.setU32((unaff_ESI + (6) * 4), (heap.u32(0x005f50f4)) & 0xffffffff);
  heap.setU32(unaff_ESI, (heap.u32(0x005f50a0)) & 0xffffffff);
  heap.setU32((unaff_ESI + (1) * 4), (heap.u32(0x005f50bc)) & 0xffffffff);
  heap.setU32((unaff_ESI + (5) * 4), (0) & 0xffffffff);
  (regs.eax = 0x4275db, regs.ecx = 0x1b, regs.eax = FUN_005e412c(heap));
  (regs.ecx = 0x1b, regs.eax = FUN_00428c0b(heap));
  return;
}
