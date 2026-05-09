// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45292a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0045292a(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.ecx = 0x13, regs.edx = 0x45296a, regs.ebx = 0x147012c, regs.ebp = 0x452eef, regs.eax = FUN_005e3c3c(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x00632984) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0x36ff4) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0x6d80000) & 0xffffffff);
    (regs.edx = 0x45296a, regs.ecx = 0x13, regs.eax = FUN_005e412c(heap));
  }
  return;
}
