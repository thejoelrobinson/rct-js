// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/453bf8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408276 } from "./408276.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0040d432 } from "./40d432.js";
import { FUN_0040d4b8 } from "./40d4b8.js";
import { FUN_0040d575 } from "./40d575.js";
import { FUN_0040d69b } from "./40d69b.js";
import { FUN_0040d709 } from "./40d709.js";
import { FUN_0040d777 } from "./40d777.js";
import { FUN_0040d7e5 } from "./40d7e5.js";
import { FUN_0040d8ee } from "./40d8ee.js";
import { FUN_0042f239 } from "./42f239.js";
export function FUN_00453bf8(heap) {
  let uVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let sVar6 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar7 = 0;
  let pcVar8 = 0;
  let pcVar9 = 0;
  let unaff_EDI = regs.edi >>> 0;
  if (((((heap.u32(0x006323f8) & 1) != 0) && (heap.u8(0x006326bc) == 0)) && ((heap.u8(0x006326bd) & 1) != 0)) && ((heap.u8(0x005f8d5a) != 0 && ((heap.u32(0x0099a500) & 1) == 0)))) {
    while (true) {
      uVar4 = ((0) >>> 0);
      sVar6 = ((1) & 0xffff);
      for (pcVar9 = ((0x006325b4) >>> 0); pcVar9 < heap.u32(0x006325b0); pcVar9 = (((pcVar9 + 0xc) >>> 0)) >>> 0) {
        if ((((heap.i8(pcVar9) | 0) != -1) && (unaff_EBX = ((heap.u32(heap.u32(((0x006323b8) >>> 0) + (((heap.i8(pcVar9 + (1))) & 0xff)) * 4) + (8) * 4)) >>> 0), heap.u32((0x005f851c) + (unaff_EBX) * 4) != 0)) && (uVar4 = ((uVar4 + 1) >>> 0), heap.i16((pcVar9 + 6)) <= sVar6)) {
          sVar6 = ((heap.i16((pcVar9 + 6))) & 0xffff);
          unaff_EDI = ((pcVar9) >>> 0);
        }
      }
      if (uVar4 < 2) {
        break;
      }
      heap.setU32(unaff_EDI, (-1) & 0xffffffff);
    }
    while (true) {
      uVar4 = ((0) >>> 0);
      sVar6 = ((1) & 0xffff);
      for (pcVar9 = ((0x006325b4) >>> 0); pcVar9 < heap.u32(0x006325b0); pcVar9 = (((pcVar9 + 0xc) >>> 0)) >>> 0) {
        if (((heap.i8(pcVar9) | 0) != -1) && (uVar4 = ((uVar4 + 1) >>> 0), heap.i16((pcVar9 + 6)) <= sVar6)) {
          sVar6 = ((heap.i16((pcVar9 + 6))) & 0xffff);
          unaff_EDI = ((pcVar9) >>> 0);
        }
      }
      if (uVar4 < 3) {
        break;
      }
      heap.setU32(unaff_EDI, (-1) & 0xffffffff);
    }
    pcVar9 = ((0x006325f0) >>> 0);
    uVar4 = ((0) >>> 0);
    do {
      LAB_00453d0b: {
      if ((heap.i8(pcVar9) | 0) != -1) {
        uVar3 = ((heap.u16(pcVar9)) & 0xffff);
        unaff_EBX = ((CONCAT22((((unaff_EBX >>> 0x10)) << 16 >> 16), uVar3)) >>> 0);
        for (pcVar8 = ((0x006325b4) >>> 0); pcVar8 < heap.u32(0x006325b0); pcVar8 = (((pcVar8 + 0xc) >>> 0)) >>> 0) {
          if ((((uVar3) << 24 >> 24) == heap.i8(pcVar8)) && ((((((uVar3) & 0xffff) >>> 8)) << 24 >> 24) == heap.i8(pcVar8 + (1)))) {
            iVar5 = (((regs.eax = FUN_0040d8ee(heap, uVar4))) >>> 0);
            if (iVar5 != 0) {
              break LAB_00453d0b;
            }
            break;
          }
        }
        (regs.eax = FUN_0040d575(heap, uVar4));
        heap.setU32(pcVar9, (-1) & 0xffffffff);
      }
      }
      pcVar9 = ((pcVar9 + 8) >>> 0);
      uVar4 = ((uVar4 + 1) >>> 0);
    } while (uVar4 < 2);
    for (pcVar9 = ((0x006325b4) >>> 0); pcVar9 < heap.u32(0x006325b0); pcVar9 = (((pcVar9 + 0xc) >>> 0)) >>> 0) {
      LAB_00453ecf: {
      if ((heap.i8(pcVar9) | 0) != -1) {
        pcVar8 = ((0x006325f0) >>> 0);
        uVar4 = ((0) >>> 0);
        do {
          if ((heap.i8(pcVar9) == heap.i8(pcVar8)) && (heap.i8(pcVar9 + (1)) == heap.i8(pcVar8 + (1)))) {
            sVar6 = ((heap.i16((pcVar9 + 6))) & 0xffff);
            if (sVar6 != heap.i16((pcVar8 + 2))) {
              heap.setI16((pcVar8 + 2), (sVar6) & 0xffff);
              (regs.eax = FUN_0040d777(heap, uVar4, ((sVar6) | 0), pcVar9, pcVar8, uVar4));
            }
            sVar6 = ((heap.i16((pcVar9 + 8))) & 0xffff);
            if (sVar6 != heap.i16((pcVar8 + 4))) {
              heap.setI16((pcVar8 + 4), (sVar6) & 0xffff);
              (regs.eax = FUN_0040d709(heap, uVar4, ((sVar6) | 0), pcVar9, pcVar8, uVar4));
            }
            sVar6 = ((heap.i16((pcVar9 + 10))) & 0xffff);
            if (sVar6 != heap.i16((pcVar8 + 6))) {
              heap.setI16((pcVar8 + 6), (sVar6) & 0xffff);
              (regs.eax = FUN_0040d69b(heap, uVar4, ((sVar6) | 0), pcVar9, pcVar8, uVar4));
            }
          }
          return;
        } while (uVar4 < 2);
        pcVar8 = ((0x006325f0 + unaff_EBX * 8) >>> 0);
        uVar7 = ((heap.u32(heap.u32(((0x006323b8) >>> 0) + (((heap.i8(pcVar9 + (1))) & 0xff)) * 4) + (8) * 4)) >>> 0);
        (regs.eax = FUN_0042f239(heap));
        iVar5 = (((regs.eax = FUN_004083b5(heap, uVar7, pcVar9, pcVar8, unaff_EBX))) >>> 0);
        uVar4 = ((unaff_EBX) >>> 0);
        if ((iVar5 | 0) != -1) {
          (regs.eax = FUN_00408276(heap, iVar5, 0x00632602, 4, iVar5));
          uVar4 = ((unaff_EBX) >>> 0);
          unaff_EBX = ((uVar7) >>> 0);
          (regs.eax = FUN_00408387(heap, iVar5));
          uVar7 = ((unaff_EBX) >>> 0);
          if (heap.u32(0x00632602) == 0x78787878) {
            break LAB_00453ecf;
          }
        }
        unaff_EBX = ((uVar7) >>> 0);
        uVar7 = ((heap.i32((pcVar9 + 2)) - 10000) >>> 0);
        if (((uVar7) | 0) < 0) {
          uVar7 = ((0) >>> 0);
        }
        iVar5 = (((regs.eax = FUN_0040d432(heap, uVar4, unaff_EBX, uVar7 & 0xfffffff0, pcVar9, pcVar8, uVar4))) >>> 0);
        if (iVar5 == 0) {
          heap.setU8(0x005f8d5a, (0) & 0xff);
        } else {
          unaff_EBX = ((heap.u32((pcVar9 + 10))) >>> 0);
          iVar5 = (((regs.eax = FUN_0040d4b8(heap, uVar4, 0, ((heap.i16((pcVar9 + 6))) | 0), ((heap.i16((pcVar9 + 8))) | 0), unaff_EBX, pcVar9, pcVar8, uVar4, ((heap.i16((pcVar9 + 8))) | 0), ((heap.i16((pcVar9 + 6))) | 0)))) >>> 0);
          if (iVar5 != 0) {
            if (heap.i8(pcVar9 + (1)) == 13) {
              uVar1 = ((heap.u32(heap.u32((0x006323b8) + (((heap.i8(pcVar9 + (1))) & 0xff)) * 4) + (8) * 4)) & 0xff);
              (regs.eax = FUN_0042f239(heap));
              (regs.eax = FUN_0040d7e5(heap, uVar4, uVar1, 1, 0, pcVar9, pcVar8, uVar4));
            }
            uVar3 = ((heap.u16((pcVar9 + 8))) & 0xffff);
            heap.setU16((pcVar8 + 2), (heap.u16((pcVar9 + 6))) & 0xffff);
            heap.setU16((pcVar8 + 4), (uVar3) & 0xffff);
            heap.setU16((pcVar8 + 6), (heap.u16((pcVar9 + 10))) & 0xffff);
            bVar2 = ((heap.i8(pcVar9 + (1))) & 0xff);
            unaff_EBX = ((((bVar2) >>> 0)) >>> 0);
            heap.setU32(pcVar8, (heap.i8(pcVar9)) & 0xffffffff);
            heap.setI8((pcVar8 + (1)), (bVar2) & 0xff);
          }
        }
      }
      }
    }
  }
  return;
}
