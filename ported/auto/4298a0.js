// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4298a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00429aff } from "./429aff.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e429d } from "./5e429d.js";
export function FUN_004298a0(heap) {
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  heap.setU32(0x005f5118, (heap.u32(0x00971ed8) + -0x40) >>> 0);
  if ((heap.u32(0x0099a500) & 1) != 0) {
    heap.setU32(0x005f5118, (heap.u32(0x00971ed8)) >>> 0);
  }
  heap.setU32(0x005f5114, (heap.u32(0x00971ed6)) >>> 0);
  (regs.eax = 0x1e0000, regs.ecx = 0x100, regs.edx = 0x42b076, regs.ebx = 0xffc00000, regs.eax = FUN_005e3f31(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x005f5110) & 0xffffffff);
  (regs.ecx = 0x2000000, regs.edx = 0x7ff07ff, regs.eax = FUN_005e429d(heap));
  heap.setU16((unaff_EDI + 0x12), (heap.u16((unaff_EDI + 0x12)) | 0x800) & 0xffff);
  heap.setU8(0x00991f88, (0) & 0xff);
  heap.setU8(0x005f4948, (0) & 0xff);
  heap.setU8(0x0099fde0, (0) & 0xff);
  heap.setU8(0x006522aa, (0) & 0xff);
  heap.setU8(0x005f494a, (0) & 0xff);
  heap.setU8(0x005f494b, (0) & 0xff);
  heap.setU32(0x00630b28, (1) >>> 0);
  if ((heap.u32(0x0099a500) & 1) == 0) {
    (regs.eax = 0x1e0000, regs.ecx = 0x100, regs.edx = 0x42b076, regs.ebx = 0xffc00000, regs.eax = FUN_005e3f31(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x005f5124) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0xfffff) & 0xffffffff);
    (regs.edx = 0x42a830, regs.eax = FUN_005e412c(heap));
    (regs.eax = 0x1e0000, regs.ecx = 0x100, regs.edx = 0x42b076, regs.ebx = 0xffc00000, regs.eax = FUN_005e3f31(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x005f5268) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0x1fc) & 0xffffffff);
    heap.setU16((unaff_ESI + 0x168), (0) & 0xffff);
    (regs.edx = 0x42a830, regs.eax = FUN_005e412c(heap));
    return (regs.eax = 0xffde0000, regs.eax = FUN_00429aff(heap));
  }
  (regs.eax = 0x1e0000, regs.ecx = 0x100, regs.edx = 0x42b076, regs.ebx = 0xffc00000, regs.eax = FUN_005e3f31(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x005f531c) & 0xffffffff);
  heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0xf) & 0xffffffff);
  (regs.edx = 0x42a830, regs.eax = FUN_005e412c(heap));
  (regs.eax = 0x1e0000, regs.ecx = 0x100, regs.edx = 0x42b076, regs.ebx = 0xffc00000, regs.eax = FUN_005e3f31(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x005f5360) & 0xffffffff);
  (regs.edx = 0x42a830, regs.eax = FUN_005e412c(heap));
  heap.setU16((unaff_ESI + 0x32), (heap.u16((unaff_ESI + 0x32)) | 0x10) & 0xffff);
  return (regs.eax = 0xffde0000, regs.eax = FUN_00429aff(heap));
}
