// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e429d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005df431 } from "./5df431.js";
import { FUN_005e4355 } from "./5e4355.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_005e429d(heap) {
  let sVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CL = regs.ecx & 0xff;
  let in_EDX = regs.edx >>> 0;
  let sVar2 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let piVar3 = 0;
  piVar3 = ((0x009a1168) >>> 0);
  do {
    if (((heap.i32(piVar3)) << 16 >> 16) == 0) {
      heap.setI32((piVar3 + (1) * 4), (in_EAX) & 0xffffffff);
      heap.setU32(piVar3, (unaff_EBX) & 0xffffffff);
      if ((in_EDX >>> 0x1e & 1) == 0) {
        in_CL = ((0) & 0xff);
      }
      heap.setI32((piVar3 + (3) * 4), (unaff_EBX << (in_CL & 0x1f)) & 0xffffffff);
      heap.setU8((piVar3 + ((4) * 4)), (in_CL) & 0xff);
      heap.setI16((((piVar3) >>> 0) + 0x12), (0) & 0xffff);
      if (heap.u8(0x005f8d5c) == 1) {
        heap.setU16((((piVar3) >>> 0) + 0x12), (heap.u16((((piVar3) >>> 0) + 0x12)) | 0x100) & 0xffff);
      }
      heap.setU32((unaff_ESI + 8), (piVar3) & 0xffffffff);
      if ((in_EDX & 0x80000000) == 0) {
        sVar2 = ((((((in_EDX & 0xbfffffff) >>> 0x10)) << 16 >> 16)) & 0xffff);
        heap.setU16((unaff_ESI + 0x16e), (0xffff) & 0xffff);
      } else {
        heap.setI16((unaff_ESI + 0x16e), ((((in_EDX & 0xbfffffff)) << 16 >> 16)) & 0xffff);
        sVar2 = ((heap.u32((0x00743ba4) + ((in_EDX & 0xffff) * 0x80) * 4)) & 0xffff);
      }
      sVar1 = (((regs.eax = FUN_005e4355(heap))) & 0xffff);
      heap.setI16((unaff_ESI + 0x170), (sVar1) & 0xffff);
      heap.setI16((unaff_ESI + 0x172), (sVar2) & 0xffff);
      heap.setI16((piVar3 + ((2) * 4)), (sVar1) & 0xffff);
      heap.setI16((((piVar3) >>> 0) + 10), (sVar2) & 0xffff);
      return (regs.eax = FUN_005e6a83(heap));
    }
    piVar3 = ((piVar3 + ((5) * 4)) >>> 0);
  } while (piVar3 < 0x009a121c);
  return (regs.eax = FUN_005df431(heap));
}
