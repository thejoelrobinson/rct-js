// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/452fce.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004077b3 } from "./4077b3.js";
import { FUN_00407c42 } from "./407c42.js";
export function FUN_00452fce(heap) {
  let in_AX = regs.eax & 0xffff;
  let bVar1 = 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar2 = 0;
  let in_DX = regs.edx & 0xffff;
  let pbVar3 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar4 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let psVar5 = 0;
  if ((heap.u8(0x006326bd) & 1) != 0) {
    heap.setU32(0x00632405, (0) >>> 0);
    if (unaff_EBX == 0x8001) {
      pbVar3 = ((heap.u32((0x00971ef4) + ((((((in_DX & 0xffe0) << 7 | in_DX >>> 9 | in_CX & 0xffe0) & 0xffff) >>> 5 | (in_DX >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
      bVar1 = ((heap.u8(pbVar3)) & 0xff);
      while ((bVar1 & 0x3c) != 0) {
        pbVar3 = ((pbVar3 + 8) >>> 0);
        bVar1 = ((heap.u8(pbVar3)) & 0xff);
      }
      if (unaff_BP < (((((heap.u8(pbVar3 + (2))) & 0xffff) * 4 + -5)) << 16 >> 16)) {
        heap.setU32(0x00632405, (10) >>> 0);
      }
      return (regs.eax = callIndirect(heap, heap.u32((0x0045304c) + (heap.u8(0x00991f88)) * 4)));
    }
    psVar5 = ((0x00632608) >>> 0);
    bVar1 = ((0) & 0xff);
    do {
      if ((heap.i16(psVar5) | 0) == -1) {
        heap.setU32(psVar5, (in_AX) & 0xffffffff);
        psVar5 = ((psVar5 + ((1) * 2)) >>> 0);
        if (unaff_EBX == 0x8000) {
          iVar4 = ((0) >>> 0);
        } else {
          uVar2 = ((((heap.u32(0x00971ed6)) >>> 0)) >>> 0);
          if (uVar2 < 0x40) {
            uVar2 = ((0x40) >>> 0);
          }
          iVar4 = (((unaff_EBX << 0x10) / ((uVar2) >>> 0) + -0x8000 >>> 4) >>> 0);
        }
        if (heap.u8(0x005f8d59) == 0) {
          iVar4 = ((0) >>> 0);
        }
        (regs.eax = FUN_004077b3(heap));
        return (regs.eax = FUN_00407c42(heap, psVar5, 0, 0, iVar4, 0));
      }
      psVar5 = ((psVar5 + ((0xb) * 2)) >>> 0);
      bVar1 = ((bVar1 + 1) & 0xff);
    } while (bVar1 < heap.u8(0x005f8d5e));
  }
  return;
}
