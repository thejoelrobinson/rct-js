// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/443e98.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00443e92 } from "./443e92.js";
import { FUN_00443ef0 } from "./443ef0.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00443e98(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.eax = FUN_00443ef0(heap));
  }
  heap.setU16((unaff_ESI + ((0x59) * 4)), (0) & 0xffff);
  (regs.eax = FUN_005e43de(heap));
  heap.setU32((unaff_ESI + (7) * 4), (heap.u32(0x00630704)) & 0xffffffff);
  heap.setU32((unaff_ESI + (3) * 4), (heap.u32(0x00630740)) & 0xffffffff);
  heap.setU32((unaff_ESI + (6) * 4), (heap.u32(0x00630754)) & 0xffffffff);
  heap.setU32(unaff_ESI, (heap.u32(0x00630718)) & 0xffffffff);
  heap.setU32((unaff_ESI + (1) * 4), (heap.u32(0x0063072c)) & 0xffffffff);
  heap.setU32((unaff_ESI + (5) * 4), (0) & 0xffffffff);
  (regs.eax = FUN_00443e92(heap));
  return (regs.eax = 0x442a6e, regs.ecx = 0x1c, regs.eax = FUN_005e412c(heap));
}
