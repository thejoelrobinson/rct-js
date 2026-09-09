// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/437fdc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00404656 } from "./404656.js";
import { FUN_0043803e } from "./43803e.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00437fdc(heap) {
  let iVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar2 = 0;
  bVar2 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar2) {
    iVar1 = (((regs.eax = FUN_00404656(heap, 0x10000, 0))) >>> 0);
    if (iVar1 == 0) {
      return;
    }
    heap.setU32(0x00628c44, (iVar1) >>> 0);
    (regs.eax = FUN_005e3c3c(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x00628a50) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 4) & 0xffffffff);
    (regs.eax = FUN_005e412c(heap));
    heap.setI16((unaff_ESI + 0x15a), (heap.i16(0x00991f88)) & 0xffff);
    (regs.eax = FUN_0043803e(heap));
  }
  return;
}
