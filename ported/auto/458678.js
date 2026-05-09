// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458678.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, SUB42 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0045897e } from "./45897e.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_009ba943 } from "./9ba943.js";
export function FUN_00458678(heap) {
  let bVar1 = 0;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_BP = regs.ebp & 0xffff;
  let pbVar2 = 0;
  let pbVar3 = 0;
  let sVar4 = 0;
  let uVar5 = 0;
  let uStack_8 = 0;
  heap.setU32(0x00971e84, (0xe0) >>> 0);
  (regs.eax = FUN_009ba943(heap));
  (regs.eax = FUN_00458bcf(heap));
  heap.setU32(0x00971e84, (0xe0) >>> 0);
  (regs.eax = FUN_0045897e(heap, 0xa888));
  heap.setU32(0x006432d4, (10) >>> 0);
  if ((0xe0 < unaff_BX) && (heap.setU32(0x006432d4, (6) >>> 0), unaff_BX != 0x1c0)) {
    heap.setU32(0x006432d4, (0x12) >>> 0);
  }
  sVar4 = ((unaff_BP * (heap.u32(0x006432d4) >>> 1)) & 0xffff);
  heap.setU8(0x00971ef2, (2) & 0xff);
  in_DX = ((in_DX - sVar4) & 0xffff);
  pbVar2 = ((0x0099a888) >>> 0);
  do {
    uVar5 = ((SUB42(pbVar2, 0)) & 0xffff);
    uStack_8 = ((((((pbVar2) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
    (regs.eax = FUN_00458a7c(heap, uVar5, in_CX, uVar5, in_DX));
    (regs.eax = FUN_009ba943(heap));
    pbVar2 = ((CONCAT22(uStack_8, uVar5)) >>> 0);
    while (true) {
      pbVar3 = ((pbVar2) >>> 0);
      bVar1 = ((heap.u8(pbVar3)) & 0xff);
      pbVar2 = ((pbVar3 + 1) >>> 0);
      if (bVar1 == 0) {
        break;
      }
      if (bVar1 < 0x20) {
        if (bVar1 < 5) {
          pbVar2 = ((pbVar3 + 2) >>> 0);
        } else {
          if ((0x10 < bVar1) && (pbVar2 = ((pbVar3 + 3) >>> 0), 0x16 < bVar1)) {
          pbVar2 = ((pbVar3 + 5) >>> 0);
        }
        }
      }
    }
    in_DX = ((in_DX + heap.u32(0x006432d4)) & 0xffff);
    sVar4 = ((sVar4 - (heap.u32(0x006432d4) >>> 1)) & 0xffff);
  } while (-1 < (sVar4 | 0));
  return;
}
