// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f8e7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0044f8e7(heap) {
  let cVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  uVar3 = ((0) >>> 0);
  uVar2 = ((0) & 0xffff);
  do {
    if ((heap.i16((unaff_ESI + uVar3 * 2 + 0x2a)) | 0) != -1) {
      uVar2 = ((uVar2 + 1) & 0xffff);
    }
    uVar3 = ((uVar3 + 1) >>> 0);
  } while (uVar3 < 4);
  cVar1 = ((heap.i8(unaff_ESI + (4))) & 0xff);
  if ((((cVar1 != 2) && (cVar1 != 3)) && (cVar1 != 23)) && (heap.i8(unaff_ESI) != 22)) {
    return uVar2;
  }
  if (1 < uVar2) {
    heap.setU32(0x00991efc, (0x44c) >>> 0);
    return uVar2;
  }
  return uVar2;
}
