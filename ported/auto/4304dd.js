// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4304dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_004304dd(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.eax = 0xff38, regs.ecx = 0x220, regs.edx = 0x430326, regs.ebx = 0xc80190, regs.ebp = 0x4301c6, regs.eax = FUN_005e3f31(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x005f8130) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 4) & 0xffffffff);
    (regs.eax = 0xff38, regs.edx = 0x430326, regs.eax = FUN_005e412c(heap));
    heap.setU16((unaff_ESI + 0x15a), (0xffff) & 0xffff);
    heap.setU16((unaff_ESI + 0x15c), (0xffff) & 0xffff);
  }
  return;
}
