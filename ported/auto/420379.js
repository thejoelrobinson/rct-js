// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/420379.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00420379(heap) {
  let in_ECX = regs.ecx >>> 0;
  let iVar1 = 0;
  let iVar2 = 0;
  let unaff_EDI = regs.edi >>> 0;
  iVar2 = ((heap.u32(unaff_EDI) * 0x12) >>> 0);
  iVar1 = ((in_ECX + heap.u32((0x005f679c + iVar2)) + heap.u32((0x005f679e + iVar2)) * ((heap.u8(unaff_EDI + (0xc5)) >>> 6) >>> 0) + ((((heap.i32((unaff_EDI + 0x94)) + heap.i32((unaff_EDI + 0x98)) + heap.i32((unaff_EDI + 0x9c)) + heap.i32((unaff_EDI + 0xa0))) >>> 0) >>> 0x10) * (0) * (0x005f67a0 + iVar2) >>> 10)) >>> 0);
  if ((heap.u16((unaff_EDI + 2)) & 0x20) != 0) {
    iVar1 = ((iVar1 + heap.u32((0x005f67a2 + iVar2))) >>> 0);
  }
  heap.setI16((unaff_EDI + 0x132), (((((iVar1 + heap.u32((0x005f67a4 + iVar2)) * ((heap.u32(0x008ae984)) >>> 0) + heap.u32((0x005f67a6 + iVar2)) * ((heap.u32(0x008ae982)) >>> 0) + heap.u32((0x005f67a8 + iVar2)) * ((heap.u8(unaff_EDI + (0x78))) >>> 0) + heap.u32((0x005f67aa + iVar2)) * ((heap.u8(unaff_EDI + (0x79))) >>> 0) + heap.u32((0x005f67ac + iVar2)) * ((heap.u8(unaff_EDI + (0x77))) >>> 0)) * 10 >>> 4)) << 16 >> 16)) & 0xffff);
  heap.setU8((unaff_EDI + (0xfd)), (heap.u8(unaff_EDI + (0xfd)) | 2) & 0xff);
  return;
}
