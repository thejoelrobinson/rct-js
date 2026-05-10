// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4491eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00424db7 } from "./424db7.js";
import { FUN_00449904 } from "./449904.js";
import { FUN_005e0c2f } from "./5e0c2f.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
import { FUN_005e680e } from "./5e680e.js";
import { FUN_005e687d } from "./5e687d.js";
import { FUN_005e6bcd } from "./5e6bcd.js";
export function FUN_004491eb(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.eax = FUN_005e5fcb(heap));
  if (bVar1) {
    (regs.eax = 0x200000, regs.ecx = 0x14, regs.edx = 0x44927d, regs.ebx = 0x19a0078, regs.eax = FUN_005e3f31(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x00630cd4) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0x1f7804) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0xc003f0) & 0xffffffff);
    (regs.eax = 0x200000, regs.edx = 0x44927d, regs.eax = FUN_005e412c(heap));
    (regs.eax = 0x200000, regs.edx = 0x44927d, regs.eax = FUN_005e6bcd(heap));
    (regs.eax = FUN_005e0c2f(heap));
    (regs.eax = FUN_00424db7(heap));
  }
  (regs.eax = FUN_005e687d(heap));
  heap.setU8(0x00630b21, (0) & 0xff);
  (regs.eax = 0x200010, regs.edx = 0x440016, regs.eax = FUN_005e680e(heap));
  heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x40) >>> 0);
  heap.setU32(0x00630b27, (0) >>> 0);
  if (heap.u32(0x00630b28) == 0) {
    heap.setU32(0x00630b28, (1) >>> 0);
  }
  return (regs.eax = 0x200010, regs.edx = 0x440016, regs.eax = FUN_00449904(heap));
}
