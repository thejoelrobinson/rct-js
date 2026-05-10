// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42cc19.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042cc5f } from "./42cc5f.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0042cc19(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.ecx = 0x1e, regs.edx = 0x42cc8f, regs.ebx = 0x12c0190, regs.eax = FUN_005e3c3c(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x005f54a4) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 4) & 0xffffffff);
    (regs.edx = 0x42cc8f, regs.eax = FUN_005e412c(heap));
    heap.setU16((unaff_ESI + 0x15a), (0xffff) & 0xffff);
  }
  return (regs.eax = FUN_0042cc5f(heap));
}
