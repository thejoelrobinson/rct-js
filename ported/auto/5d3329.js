// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3329.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../runtime/win32.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005d3329(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_006545b2 = __sp + 4;
  const __addr_DAT_006545b4 = __sp + 8;
  const __addr_DAT_006545b3 = __sp + 12;
  const __addr_DAT_006545b5 = __sp + 16;
  try {
  let in_EAX = 0;
  let uVar1 = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let iVar2 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  let iVar3 = 0;
  let bVar4 = 0;
  bVar4 = heap.u32((__addr_DAT_00887420) + ((uint) * (unaff_ESI + 7) * 0x260) * 4) == '\x14';
  if (!bVar4) {
    uVar1 = FUN_005e3b2b(heap);
    if (((!bVar4) && (heap.u32(0x00652288) != '\0')) && (heap.u32(0x00652289) == heap.u32((unaff_ESI + 7)))) {
      FUN_005d21fa(heap);
    }
    iVar2 = -1;
    while (true) {
      iVar3 = iVar2;
      iVar2 = (uint) * (unaff_ESI + 4) * 8;
      bVar4 = false;
      heap.setU32(0x006522a7, (CONCAT11(heap, heap.u32((__addr_DAT_006545b2) + (iVar2) * 4), heap.u32((__addr_DAT_006545b4) + (iVar2) * 4))) >>> 0);
      in_EAX = uVar1;
      uVar1 = FUN_005cfac7(heap, unaff_ESI, in_ECX, uVar1, unaff_EDI);
      if ((bVar4) || (iVar2 = (uint) * (unaff_ESI + 4) * 8, in_EAX = uVar1, CONCAT11(heap, heap.u32((__addr_DAT_006545b3) + (iVar2) * 4), heap.u32((__addr_DAT_006545b5) + (iVar2) * 4)) != heap.u32(0x006522a7))) {
        break;
      }
      in_ECX = extraout_ECX;
      iVar2 = unaff_ESI;
      if ((iVar3 != -1) && (iVar2 = iVar3, unaff_ESI == iVar3)) {
        return CONCAT44(heap, in_EDX, uVar1);
      }
    }
  }
  return CONCAT44(heap, in_EDX, in_EAX);
} finally {
    heap.freeFrame(20);
  }
}
