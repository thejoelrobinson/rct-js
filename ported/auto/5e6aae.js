// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6aae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e6aae(heap) {
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let uVar1 = 0;
  let sVar2 = 0;
  let unaff_EDI = regs.edi >>> 0;
  heap.setU32(0x009a012c, (heap.i32(unaff_EDI)) >>> 0);
  heap.setU32(0x009a013a, (0) >>> 0);
  heap.setU32(0x009a0138, (((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a0130, (((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a0132, (heap.i16((((unaff_EDI) | 0) + 6))) >>> 0);
  heap.setU32(0x009a0134, (((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a0136, (heap.i16((((unaff_EDI) | 0) + 10))) >>> 0);
  if (heap.u32(0x009a0130) < in_AX) {
    uVar1 = ((in_AX - heap.u32(0x009a0130)) & 0xffff);
    heap.setU32(0x009a0134, (heap.u32(0x009a0134) - uVar1) >>> 0);
    heap.setU32(0x009a0138, (heap.u32(0x009a0138) + uVar1) >>> 0);
    heap.setU32(0x009a012c, (heap.u32(0x009a012c) + ((uVar1) >>> 0)) >>> 0);
    heap.setU32(0x009a0130, (in_AX) >>> 0);
  }
  sVar2 = (((heap.u32(0x009a0130) + heap.u32(0x009a0134)) - (unaff_BX + in_AX)) & 0xffff);
  if (sVar2 != 0 && (((unaff_BX + in_AX)) << 16 >> 16) <= (((heap.u32(0x009a0130) + heap.u32(0x009a0134))) << 16 >> 16)) {
    heap.setU32(0x009a0134, (heap.u32(0x009a0134) - sVar2) >>> 0);
    heap.setU32(0x009a0138, (heap.u32(0x009a0138) + sVar2) >>> 0);
  }
  if (heap.u32(0x009a0132) < in_CX) {
    heap.setU32(0x009a0136, (heap.u32(0x009a0136) - (in_CX - heap.u32(0x009a0132))) >>> 0);
    heap.setU32(0x009a012c, (heap.u32(0x009a012c) + ((heap.u32(0x009a0138) + heap.u32(0x009a0134)) >>> 0) * ((in_CX - heap.u32(0x009a0132)) >>> 0)) >>> 0);
    heap.setU32(0x009a0132, (in_CX) >>> 0);
  }
  sVar2 = (((heap.u32(0x009a0132) + heap.u32(0x009a0136)) - (in_DX + in_CX)) & 0xffff);
  if (sVar2 != 0 && (((in_DX + in_CX)) << 16 >> 16) <= (((heap.u32(0x009a0132) + heap.u32(0x009a0136))) << 16 >> 16)) {
    heap.setU32(0x009a0136, (heap.u32(0x009a0136) - sVar2) >>> 0);
  }
  if ((0 < heap.u32(0x009a0134)) && (0 < heap.u32(0x009a0136))) {
    heap.setU32(0x009a0130, (heap.u32(0x009a0130) - in_AX) >>> 0);
    heap.setU32(0x009a0132, (heap.u32(0x009a0132) - in_CX) >>> 0);
    return;
  }
  return;
}
