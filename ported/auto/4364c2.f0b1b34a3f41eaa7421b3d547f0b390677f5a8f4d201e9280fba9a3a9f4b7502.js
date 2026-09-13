// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4364c2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_004364c2(heap) {
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let uVar1 = 0;
  let psVar2 = 0;
  uVar1 = ((heap.u32(0x008ae938)) >>> 0);
  psVar2 = ((0x008ad1c8) >>> 0);
  if (uVar1 != 0) {
    if (999 < uVar1) {
      return;
    }
    do {
      if (((in_AX == heap.i16(psVar2 + (1) * 2)) && (in_CX == heap.i16(psVar2 + (2) * 2))) && (in_DX == heap.i16(psVar2))) {
        return;
      }
      psVar2 = ((psVar2 + ((3) * 2)) >>> 0);
      uVar1 = ((uVar1 - 1) >>> 0);
    } while (uVar1 != 0);
  }
  heap.setU32(0x008ae938, (heap.u32(0x008ae938) + 1) >>> 0);
  heap.setI16((psVar2 + (1) * 2), (in_AX) & 0xffff);
  heap.setI16((psVar2 + (2) * 2), (in_CX) & 0xffff);
  heap.setU32(psVar2, (in_DX) & 0xffffffff);
  return;
}
