// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1bfd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_009bb374 } from "./9bb374.js";
export function FUN_005e1bfd(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar6 = 0;
  while (true) {
    if (heap.u32(0x009a1164) <= unaff_EDI) {
      uVar5 = ((in_DX) & 0xffff);
      if (((in_DX) << 16 >> 16) < 0) {
        uVar5 = ((-in_DX) & 0xffff);
      }
      if (uVar5 < heap.u16(unaff_ESI)) {
        uVar5 = ((unaff_BP) & 0xffff);
        if (((unaff_BP) << 16 >> 16) < 0) {
          uVar5 = ((-unaff_BP) & 0xffff);
        }
        if (uVar5 < heap.u16(unaff_ESI + (1) * 2)) {
          (regs.eax = FUN_009bb374(heap));
          uVar5 = ((heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
          if (in_DX != 0) {
            if (((in_DX) << 16 >> 16) < 0) {
              (regs.eax = FUN_005e12eb(heap, unaff_ESI, in_DX));
            } else {
              (regs.eax = FUN_005e12eb(heap, unaff_ESI));
              uVar5 = ((uVar5 + in_DX) & 0xffff);
            }
          }
          if (unaff_BP != 0) {
            if (-1 < (((unaff_BP) << 16 >> 16) | 0)) {
              uVar5 = (((regs.eax = FUN_005e12eb(heap))) & 0xffff);
              return uVar5;
            }
            uVar5 = (((regs.eax = FUN_005e12eb(heap))) & 0xffff);
            return uVar5;
          }
          return uVar5;
        }
      }
      uVar5 = (((regs.eax = FUN_005e12eb(heap))) & 0xffff);
      return uVar5;
    }
    if ((((unaff_ESI != heap.u32((unaff_EDI + 8))) && (heap.i16((unaff_EDI + 0x20)) < (((heap.u16(unaff_ESI + (2) * 2) + heap.u16(unaff_ESI))) << 16 >> 16))) && (((heap.u16(unaff_ESI + (2) * 2)) << 16 >> 16) < (((heap.i16((unaff_EDI + 0x20)) + heap.i16((unaff_EDI + 0x24)))) << 16 >> 16))) && ((heap.i16((unaff_EDI + 0x22)) < (((heap.u16(unaff_ESI + (3) * 2) + heap.u16(unaff_ESI + (1) * 2))) << 16 >> 16) && (((heap.u16(unaff_ESI + (3) * 2)) << 16 >> 16) < (((heap.i16((unaff_EDI + 0x22)) + heap.i16((unaff_EDI + 0x26)))) << 16 >> 16))))) {
      break;
    }
    unaff_EDI = ((unaff_EDI + 0x178) >>> 0);
  }
  if (((heap.u16(unaff_ESI + (2) * 2)) << 16 >> 16) < heap.i16((unaff_EDI + 0x20))) {
    uVar5 = ((heap.u16(unaff_ESI + (6) * 2)) & 0xffff);
    uVar1 = ((heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
    uVar2 = ((heap.u16(unaff_ESI)) & 0xffff);
    uVar6 = ((heap.u16(unaff_ESI + (4) * 2)) & 0xffff);
    uVar3 = ((heap.i16((unaff_EDI + 0x20)) - heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
    heap.setU32(unaff_ESI, (uVar3) & 0xffffffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    (regs.eax = FUN_005e1bfd(heap));
    uVar3 = ((heap.u16(unaff_ESI)) & 0xffff);
    uVar4 = ((uVar2 - uVar3) & 0xffff);
    heap.setU32(unaff_ESI, (uVar4) & 0xffffffff);
    heap.setU16((unaff_ESI + (2) * 2), (heap.u16(unaff_ESI + (2) * 2) + uVar3) & 0xffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar4 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    heap.setU16((unaff_ESI + (4) * 2), (heap.u16(unaff_ESI + (4) * 2) + (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f))) & 0xffff);
    uVar3 = (((regs.eax = FUN_005e1bfd(heap))) & 0xffff);
    heap.setU16((unaff_ESI + (4) * 2), (uVar6) & 0xffff);
    heap.setU32(unaff_ESI, (uVar2) & 0xffffffff);
    heap.setU16((unaff_ESI + (2) * 2), (uVar1) & 0xffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar5) & 0xffff);
    return uVar3;
  }
  if ((((heap.i16((unaff_EDI + 0x20)) + heap.i16((unaff_EDI + 0x24)))) << 16 >> 16) < (((heap.u16(unaff_ESI + (2) * 2) + heap.u16(unaff_ESI))) << 16 >> 16)) {
    uVar5 = ((heap.u16(unaff_ESI + (6) * 2)) & 0xffff);
    uVar1 = ((heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
    uVar2 = ((heap.u16(unaff_ESI)) & 0xffff);
    uVar6 = ((heap.u16(unaff_ESI + (4) * 2)) & 0xffff);
    uVar3 = (((heap.i16((unaff_EDI + 0x20)) + heap.i16((unaff_EDI + 0x24))) - heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
    heap.setU32(unaff_ESI, (uVar3) & 0xffffffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    (regs.eax = FUN_005e1bfd(heap));
    uVar3 = ((heap.u16(unaff_ESI)) & 0xffff);
    uVar4 = ((uVar2 - uVar3) & 0xffff);
    heap.setU32(unaff_ESI, (uVar4) & 0xffffffff);
    heap.setU16((unaff_ESI + (2) * 2), (heap.u16(unaff_ESI + (2) * 2) + uVar3) & 0xffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar4 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    heap.setU16((unaff_ESI + (4) * 2), (heap.u16(unaff_ESI + (4) * 2) + (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f))) & 0xffff);
    uVar3 = (((regs.eax = FUN_005e1bfd(heap))) & 0xffff);
    heap.setU16((unaff_ESI + (4) * 2), (uVar6) & 0xffff);
    heap.setU32(unaff_ESI, (uVar2) & 0xffffffff);
    heap.setU16((unaff_ESI + (2) * 2), (uVar1) & 0xffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar5) & 0xffff);
    return uVar3;
  }
  if (((heap.u16(unaff_ESI + (3) * 2)) << 16 >> 16) < heap.i16((unaff_EDI + 0x22))) {
    uVar5 = ((heap.u16(unaff_ESI + (7) * 2)) & 0xffff);
    uVar1 = ((heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
    uVar2 = ((heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
    uVar6 = ((heap.u16(unaff_ESI + (5) * 2)) & 0xffff);
    uVar3 = ((heap.i16((unaff_EDI + 0x22)) - heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar3) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    (regs.eax = FUN_005e1bfd(heap));
    uVar3 = ((heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
    uVar4 = ((uVar2 - uVar3) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar4) & 0xffff);
    heap.setU16((unaff_ESI + (3) * 2), (heap.u16(unaff_ESI + (3) * 2) + uVar3) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar4 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    heap.setU16((unaff_ESI + (5) * 2), (heap.u16(unaff_ESI + (5) * 2) + (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f))) & 0xffff);
    uVar3 = (((regs.eax = FUN_005e1bfd(heap))) & 0xffff);
    heap.setU16((unaff_ESI + (5) * 2), (uVar6) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar2) & 0xffff);
    heap.setU16((unaff_ESI + (3) * 2), (uVar1) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar5) & 0xffff);
    return uVar3;
  }
  uVar5 = ((heap.u16(unaff_ESI + (3) * 2) + heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
  if ((((heap.i16((unaff_EDI + 0x22)) + heap.i16((unaff_EDI + 0x26)))) << 16 >> 16) < ((uVar5) << 16 >> 16)) {
    uVar1 = ((heap.u16(unaff_ESI + (7) * 2)) & 0xffff);
    uVar2 = ((heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
    uVar6 = ((heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
    uVar3 = ((heap.u16(unaff_ESI + (5) * 2)) & 0xffff);
    uVar5 = (((heap.i16((unaff_EDI + 0x22)) + heap.i16((unaff_EDI + 0x26))) - heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar5) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar5 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    (regs.eax = FUN_005e1bfd(heap));
    uVar5 = ((heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
    uVar4 = ((uVar6 - uVar5) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar4) & 0xffff);
    heap.setU16((unaff_ESI + (3) * 2), (heap.u16(unaff_ESI + (3) * 2) + uVar5) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar4 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    heap.setU16((unaff_ESI + (5) * 2), (heap.u16(unaff_ESI + (5) * 2) + (uVar5 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f))) & 0xffff);
    uVar5 = (((regs.eax = FUN_005e1bfd(heap))) & 0xffff);
    heap.setU16((unaff_ESI + (5) * 2), (uVar3) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar6) & 0xffff);
    heap.setU16((unaff_ESI + (3) * 2), (uVar2) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar1) & 0xffff);
  }
  return uVar5;
}
