// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/451885.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00451885(heap) {
  let uVar1 = 0;
  let in_AX = regs.eax & 0xffff;
  let iVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = ((in_EDX & 0xff) >>> 0);
  iVar4 = ((uVar3 * 0x260) >>> 0);
  heap.setU32(((0x00887422) + (uVar3 * 0x130) * 4), (heap.u32((0x00887422) + (uVar3 * 0x130) * 4) & 0xfe3f) & 0xffffffff);
  heap.setU32(((0x0088751d) + (iVar4) * 4), (heap.u32((0x0088751d) + (iVar4) * 4) | 0x1c) & 0xffffffff);
  if ((heap.u32((0x00887422) + (uVar3 * 0x130) * 4) & 1) != 0) {
    iVar2 = ((0) >>> 0);
    do {
      uVar1 = ((heap.u16((0x0088747e + iVar2 * 2 + iVar4))) & 0xffff);
      do {
        heap.setU16((0x00743bdc + ((uVar1) >>> 0) * 0x100), (heap.u16((0x00743bdc + ((uVar1) >>> 0) * 0x100)) & 0xfc7f) & 0xffff);
        uVar1 = ((heap.u16((0x00743bd2 + ((uVar1) >>> 0) * 0x100))) & 0xffff);
      } while (uVar1 != 0xffff);
      iVar2 = ((iVar2 + 1) >>> 0);
    } while (((iVar2) & 0xff) < heap.u32(((0x00887498) & 0xff) + (iVar4) * 4));
  }
  heap.setU16((0x00887566 + iVar4), (heap.i16((0x00887566 + iVar4)) + (in_AX & 0xff) * ((((100 - (((heap.u16((0x00887566 + iVar4)) >>> 8)) << 24 >> 24)) & 0xff) >>> 1) & 0xffff)) & 0xffff);
  return;
}
