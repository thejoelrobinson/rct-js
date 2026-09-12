// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/427108.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e5b80 } from "./5e5b80.js";
export function FUN_00427108(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  heap.setU32(0x005f4a98, (heap.u32(0x00971e86)) >>> 0);
  heap.setU32(0x005f4a9c, (heap.u32(0x00971e8a)) >>> 0);
  heap.setU32(0x005f4aa0, (heap.u32(0x00971e8e)) >>> 0);
  heap.setU32(0x005f4aa4, (heap.u32(0x00971e92)) >>> 0);
  heap.setU32(0x005f4aa8, (heap.u32(0x00971e96)) >>> 0);
  heap.setU32(0x005f4aac, (4) >>> 0);
  heap.setU32(0x005f4a94, (unaff_BX) >>> 0);
  heap.setU32(0x005f4a96, (in_DX) >>> 0);
  (regs.ecx = 0xc, regs.eax = FUN_005e5b80(heap));
  (regs.eax = 0x7feb0000, regs.ecx = 0x20c, regs.edx = 0x4271bb, regs.ebx = 0x2a00f0, regs.eax = FUN_005e3f31(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x005f4ab4) & 0xffffffff);
  heap.setU16((unaff_ESI + 0x32), (heap.u16((unaff_ESI + 0x32)) | 0x10) & 0xffff);
  heap.setU16((unaff_ESI + 0x15a), (0) & 0xffff);
  return in_EAX;
}
