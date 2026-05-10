// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3329.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005d3329(heap) {
  let in_EAX = regs.eax >>> 0;
  let uVar1 = 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let iVar3 = 0;
  let bVar4 = 0;
  bVar4 = ((heap.u32((0x00887420) + (heap.u32((unaff_ESI + 7)) * 0x260) * 4) == 20) & 0xff);
  if (!bVar4) {
    uVar1 = (((regs.ecx = 0x8d, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0xd, regs.eax)) >>> 0);
    if (((!bVar4) && (heap.u8(0x00652288) != 0)) && (heap.u8(0x00652289) == heap.i8((unaff_ESI + 7)))) {
      (regs.eax = FUN_005d21fa(heap));
    }
    iVar2 = ((-1) >>> 0);
    while (true) {
      iVar3 = ((iVar2) >>> 0);
      iVar2 = ((heap.u32((unaff_ESI + 4)) * 8) >>> 0);
      bVar4 = ((false) & 0xff);
      heap.setU8(0x006522a7, (CONCAT11(heap.u32((0x006545b2) + (iVar2) * 4), heap.u32((0x006545b4) + (iVar2) * 4))) & 0xff);
      in_EAX = ((uVar1) >>> 0);
      uVar1 = (((regs.eax = FUN_005cfac7(heap, unaff_ESI, in_ECX, uVar1, unaff_EDI))) >>> 0);
      if ((bVar4) || (iVar2 = ((heap.u32((unaff_ESI + 4)) * 8) >>> 0), in_EAX = ((uVar1) >>> 0), CONCAT11(heap.u32((0x006545b3) + (iVar2) * 4), heap.u32((0x006545b5) + (iVar2) * 4)) != heap.u8(0x006522a7))) {
        break;
      }
      in_ECX = ((extraout_ECX) >>> 0);
      iVar2 = ((unaff_ESI) >>> 0);
      if (((iVar3 | 0) != -1) && (iVar2 = ((iVar3) >>> 0), unaff_ESI == iVar3)) {
        return CONCAT44(in_EDX, uVar1);
      }
    }
  }
  return 1;
}
