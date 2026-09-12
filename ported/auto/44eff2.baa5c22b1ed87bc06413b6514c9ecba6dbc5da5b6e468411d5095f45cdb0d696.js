// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44eff2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0045163c } from "./45163c.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0044eff2(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.ecx = 0x10, regs.edx = 0x450ec1, regs.ebx = 0x15c01b8, regs.eax = FUN_005e3c3c(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x00631b08) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0xbf4) & 0xffffffff);
    (regs.edx = 0x450ec1, regs.eax = FUN_005e412c(heap));
    (regs.eax = FUN_0045163c(heap));
    heap.setU16((unaff_ESI + 0x168), (0) & 0xffff);
  }
  return;
}
