// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/440659.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_00440659(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.eax = FUN_005e3c3c(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x006291b0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 500) & 0xffffffff);
    (regs.eax = FUN_005e412c(heap));
    heap.setU8(0x0062d2fc, (0xffff) & 0xff);
    heap.setU16((unaff_ESI + 0x16a), (0) & 0xffff);
    heap.setU8(0x0062d2fe, (0) & 0xff);
    heap.setU8(0x0062d2fa, (0xff) & 0xff);
    heap.setU16((unaff_ESI + 0x16c), (0) & 0xffff);
  }
  return;
}
