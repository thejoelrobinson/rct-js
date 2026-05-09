// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1b3e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_005e1bfd } from "./5e1bfd.js";
import { FUN_009bb374 } from "./9bb374.js";
export function FUN_005e1b3e(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_BP = regs.ebp & 0xffff;
  let sVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar8 = 0;
  let uVar9 = 0;
  for (uVar8 = ((unaff_EDI) >>> 0); uVar8 < heap.u32(0x009a1164); uVar8 = (((uVar8 + 0x178) >>> 0)) >>> 0) {
    if (((((heap.u16((uVar8 + 0x32)) & 0x10) != 0) && (unaff_ESI != heap.u32((uVar8 + 8)))) && (heap.i16((uVar8 + 0x20)) < (((heap.u16(unaff_ESI + (2) * 2) + heap.u16(unaff_ESI))) << 16 >> 16))) && (((((heap.u16(unaff_ESI + (2) * 2)) << 16 >> 16) < (((heap.i16((uVar8 + 0x20)) + heap.i16((uVar8 + 0x24)))) << 16 >> 16) && (heap.i16((uVar8 + 0x22)) < (((heap.u16(unaff_ESI + (3) * 2) + heap.u16(unaff_ESI + (1) * 2))) << 16 >> 16))) && (((heap.u16(unaff_ESI + (3) * 2)) << 16 >> 16) < (((heap.i16((uVar8 + 0x22)) + heap.i16((uVar8 + 0x26)))) << 16 >> 16))))) {
      uVar4 = ((heap.u16((uVar8 + 0x20))) & 0xffff);
      uVar5 = ((heap.u16((uVar8 + 0x22))) & 0xffff);
      sVar6 = ((heap.i16((uVar8 + 0x24)) + uVar4) & 0xffff);
      sVar7 = ((heap.i16((uVar8 + 0x26)) + uVar5) & 0xffff);
      uVar1 = ((heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
      if (((uVar4) << 16 >> 16) < ((uVar1) << 16 >> 16)) {
        uVar4 = ((uVar1) & 0xffff);
      }
      if ((((uVar1 + heap.u16(unaff_ESI))) << 16 >> 16) < sVar6) {
        sVar6 = ((uVar1 + heap.u16(unaff_ESI)) & 0xffff);
      }
      uVar1 = ((heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
      if (((uVar5) << 16 >> 16) < ((uVar1) << 16 >> 16)) {
        uVar5 = ((uVar1) & 0xffff);
      }
      if ((((uVar1 + heap.u16(unaff_ESI + (1) * 2))) << 16 >> 16) < sVar7) {
        sVar7 = ((uVar1 + heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
      }
      if ((((uVar4) << 16 >> 16) < sVar6) && (((uVar5) << 16 >> 16) < sVar7)) {
        (regs.eax = FUN_005e12eb(heap));
      }
    }
  }
  while (true) {
    uVar4 = ((((in_EDX) & 0xffff)) & 0xffff);
    if (heap.u32(0x009a1164) <= unaff_EDI) {
      uVar5 = ((uVar4) & 0xffff);
      if (((uVar4) << 16 >> 16) < 0) {
        uVar5 = ((-uVar4) & 0xffff);
      }
      if (uVar5 < heap.u16(unaff_ESI)) {
        uVar5 = ((unaff_BP) & 0xffff);
        if (((unaff_BP) << 16 >> 16) < 0) {
          uVar5 = ((-unaff_BP) & 0xffff);
        }
        if (uVar5 < heap.u16(unaff_ESI + (1) * 2)) {
          (regs.eax = FUN_009bb374(heap));
          uVar5 = ((heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
          if (uVar4 != 0) {
            if (((uVar4) << 16 >> 16) < 0) {
              (regs.eax = FUN_005e12eb(heap, unaff_ESI, uVar4));
            } else {
              (regs.eax = FUN_005e12eb(heap, unaff_ESI));
              uVar5 = ((uVar5 + uVar4) & 0xffff);
            }
          }
          if (unaff_BP == 0) {
            return uVar5;
          }
          if (((unaff_BP) << 16 >> 16) < 0) {
            uVar4 = (((regs.eax = FUN_005e12eb(heap))) & 0xffff);
            return uVar4;
          }
          uVar4 = (((regs.eax = FUN_005e12eb(heap))) & 0xffff);
          return uVar4;
        }
      }
      uVar4 = (((regs.eax = FUN_005e12eb(heap))) & 0xffff);
      return uVar4;
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
    uVar9 = ((heap.u16(unaff_ESI + (4) * 2)) & 0xffff);
    uVar3 = ((heap.i16((unaff_EDI + 0x20)) - heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
    heap.setU32(unaff_ESI, (uVar3) & 0xffffffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    (regs.eax = FUN_005e1bfd(heap, unaff_ESI, unaff_EDI, CONCAT22(uVar4, unaff_BP)));
    uVar4 = ((heap.u16(unaff_ESI)) & 0xffff);
    uVar3 = ((uVar2 - uVar4) & 0xffff);
    heap.setU32(unaff_ESI, (uVar3) & 0xffffffff);
    heap.setU16((unaff_ESI + (2) * 2), (heap.u16(unaff_ESI + (2) * 2) + uVar4) & 0xffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    heap.setU16((unaff_ESI + (4) * 2), (heap.u16(unaff_ESI + (4) * 2) + (uVar4 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f))) & 0xffff);
    uVar4 = (((regs.eax = FUN_005e1bfd(heap))) & 0xffff);
    heap.setU16((unaff_ESI + (4) * 2), (uVar9) & 0xffff);
    heap.setU32(unaff_ESI, (uVar2) & 0xffffffff);
    heap.setU16((unaff_ESI + (2) * 2), (uVar1) & 0xffff);
    heap.setU16((unaff_ESI + (6) * 2), (uVar5) & 0xffff);
    return uVar4;
  }
  if ((((heap.u16(unaff_ESI + (2) * 2) + heap.u16(unaff_ESI))) << 16 >> 16) <= (((heap.i16((unaff_EDI + 0x20)) + heap.i16((unaff_EDI + 0x24)))) << 16 >> 16)) {
    if (heap.i16((unaff_EDI + 0x22)) <= ((heap.u16(unaff_ESI + (3) * 2)) << 16 >> 16)) {
      uVar5 = ((heap.u16(unaff_ESI + (3) * 2) + heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
      if ((((heap.i16((unaff_EDI + 0x22)) + heap.i16((unaff_EDI + 0x26)))) << 16 >> 16) < ((uVar5) << 16 >> 16)) {
        uVar1 = ((heap.u16(unaff_ESI + (7) * 2)) & 0xffff);
        uVar2 = ((heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
        uVar9 = ((heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
        uVar3 = ((heap.u16(unaff_ESI + (5) * 2)) & 0xffff);
        uVar5 = (((heap.i16((unaff_EDI + 0x22)) + heap.i16((unaff_EDI + 0x26))) - heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
        heap.setU16((unaff_ESI + (1) * 2), (uVar5) & 0xffff);
        heap.setU16((unaff_ESI + (7) * 2), (uVar5 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
        (regs.eax = FUN_005e1bfd(heap, unaff_ESI, unaff_EDI, CONCAT22(uVar4, unaff_BP)));
        uVar4 = ((heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
        uVar5 = ((uVar9 - uVar4) & 0xffff);
        heap.setU16((unaff_ESI + (1) * 2), (uVar5) & 0xffff);
        heap.setU16((unaff_ESI + (3) * 2), (heap.u16(unaff_ESI + (3) * 2) + uVar4) & 0xffff);
        heap.setU16((unaff_ESI + (7) * 2), (uVar5 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
        heap.setU16((unaff_ESI + (5) * 2), (heap.u16(unaff_ESI + (5) * 2) + (uVar4 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f))) & 0xffff);
        uVar5 = (((regs.eax = FUN_005e1bfd(heap))) & 0xffff);
        heap.setU16((unaff_ESI + (5) * 2), (uVar3) & 0xffff);
        heap.setU16((unaff_ESI + (1) * 2), (uVar9) & 0xffff);
        heap.setU16((unaff_ESI + (3) * 2), (uVar2) & 0xffff);
        heap.setU16((unaff_ESI + (7) * 2), (uVar1) & 0xffff);
      }
      return uVar5;
    }
    uVar5 = ((heap.u16(unaff_ESI + (7) * 2)) & 0xffff);
    uVar1 = ((heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
    uVar2 = ((heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
    uVar9 = ((heap.u16(unaff_ESI + (5) * 2)) & 0xffff);
    uVar3 = ((heap.i16((unaff_EDI + 0x22)) - heap.u16(unaff_ESI + (3) * 2)) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar3) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    (regs.eax = FUN_005e1bfd(heap, unaff_ESI, unaff_EDI, CONCAT22(uVar4, unaff_BP)));
    uVar4 = ((heap.u16(unaff_ESI + (1) * 2)) & 0xffff);
    uVar3 = ((uVar2 - uVar4) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar3) & 0xffff);
    heap.setU16((unaff_ESI + (3) * 2), (heap.u16(unaff_ESI + (3) * 2) + uVar4) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
    heap.setU16((unaff_ESI + (5) * 2), (heap.u16(unaff_ESI + (5) * 2) + (uVar4 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f))) & 0xffff);
    uVar4 = (((regs.eax = FUN_005e1bfd(heap))) & 0xffff);
    heap.setU16((unaff_ESI + (5) * 2), (uVar9) & 0xffff);
    heap.setU16((unaff_ESI + (1) * 2), (uVar2) & 0xffff);
    heap.setU16((unaff_ESI + (3) * 2), (uVar1) & 0xffff);
    heap.setU16((unaff_ESI + (7) * 2), (uVar5) & 0xffff);
    return uVar4;
  }
  uVar5 = ((heap.u16(unaff_ESI + (6) * 2)) & 0xffff);
  uVar1 = ((heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
  uVar2 = ((heap.u16(unaff_ESI)) & 0xffff);
  uVar9 = ((heap.u16(unaff_ESI + (4) * 2)) & 0xffff);
  uVar3 = (((heap.i16((unaff_EDI + 0x20)) + heap.i16((unaff_EDI + 0x24))) - heap.u16(unaff_ESI + (2) * 2)) & 0xffff);
  heap.setU32(unaff_ESI, (uVar3) & 0xffffffff);
  heap.setU16((unaff_ESI + (6) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
  (regs.eax = FUN_005e1bfd(heap, unaff_ESI, unaff_EDI, CONCAT22(uVar4, unaff_BP)));
  uVar4 = ((heap.u16(unaff_ESI)) & 0xffff);
  uVar3 = ((uVar2 - uVar4) & 0xffff);
  heap.setU32(unaff_ESI, (uVar3) & 0xffffffff);
  heap.setU16((unaff_ESI + (2) * 2), (heap.u16(unaff_ESI + (2) * 2) + uVar4) & 0xffff);
  heap.setU16((unaff_ESI + (6) * 2), (uVar3 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f)) & 0xffff);
  heap.setU16((unaff_ESI + (4) * 2), (heap.u16(unaff_ESI + (4) * 2) + (uVar4 << (((heap.u16(unaff_ESI + (8) * 2)) & 0xff) & 0x1f))) & 0xffff);
  uVar4 = (((regs.eax = FUN_005e1bfd(heap))) & 0xffff);
  heap.setU16((unaff_ESI + (4) * 2), (uVar9) & 0xffff);
  heap.setU32(unaff_ESI, (uVar2) & 0xffffffff);
  heap.setU16((unaff_ESI + (2) * 2), (uVar1) & 0xffff);
  heap.setU16((unaff_ESI + (6) * 2), (uVar5) & 0xffff);
  return uVar4;
}
