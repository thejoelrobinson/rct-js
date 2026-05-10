// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b30f1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT21, CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_009b30f1(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let uVar8 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_BX = regs.ebx & 0xffff;
  let sVar9 = 0;
  let uVar10 = 0;
  let iVar11 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let puVar14 = 0;
  let puVar15 = 0;
  let pbVar16 = 0;
  let puVar17 = 0;
  let iVar18 = 0;
  let iVar19 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let local_1a = 0;
  sVar9 = ((((in_EAX) << 16 >> 16)) & 0xffff);
  if (((((sVar9 <= unaff_BX) && (sVar7 = ((((in_EDX) << 16 >> 16)) & 0xffff), in_CX <= sVar7)) && (((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16) <= unaff_BX)) && ((sVar9 < (((((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16) + ((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16))) << 16 >> 16) && (heap.i16((((unaff_EDI) | 0) + 6)) <= sVar7)))) && (in_CX < (((heap.i16((((unaff_EDI) | 0) + 6)) + heap.i16((((unaff_EDI) | 0) + 10)))) << 16 >> 16))) {
    uVar1 = ((((unaff_EBP) & 0xff)) & 0xff);
    if ((unaff_EBP & 0x1000000) != 0) {
      uVar10 = ((sVar9 - ((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16)) & 0xffff);
      uVar3 = ((uVar10) & 0xffff);
      local_1a = ((0) & 0xffff);
      if (((uVar10) << 16 >> 16) < 0) {
        uVar3 = ((0) & 0xffff);
        local_1a = ((uVar10) & 0xffff);
      }
      sVar9 = (((unaff_BX - ((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16)) + 1) & 0xffff);
      if (((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16) < sVar9) {
        sVar9 = ((((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16)) & 0xffff);
      }
      uVar10 = ((in_CX - heap.i16((((unaff_EDI) | 0) + 6))) & 0xffff);
      if (((uVar10) << 16 >> 16) < 0) {
        local_1a = ((local_1a ^ uVar10) & 0xffff);
        uVar10 = ((0) & 0xffff);
      }
      sVar7 = (((sVar7 - heap.i16((((unaff_EDI) | 0) + 6))) + 1) & 0xffff);
      if (heap.i16((((unaff_EDI) | 0) + 10)) < sVar7) {
        sVar7 = ((heap.i16((((unaff_EDI) | 0) + 10))) & 0xffff);
      }
      sVar7 = ((sVar7 - uVar10) & 0xffff);
      uVar6 = ((((((uVar10) << 16 >> 16)) >>> 0)) >>> 0);
      puVar15 = (((((((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16) + ((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16)) & 0xffff) * uVar6 + ((uVar3) >>> 0) + heap.i32(unaff_EDI))) >>> 0);
      iVar11 = ((heap.i32(unaff_EDI + (3) * 4)) >>> 0);
      iVar19 = ((heap.i32(unaff_EDI + (2) * 4)) >>> 0);
      do {
        uVar6 = ((CONCAT22(((uVar6 >>> 0x11) & 0xffff) | ((((((local_1a & 1) != 0) >>> 0) << 0x1f) >>> 0x10) & 0xffff), sVar9 - uVar3)) >>> 0);
        do {
          if ((((uVar6 ^ 0x80000000)) | 0) < 0) {
            heap.setU32(puVar15, (uVar1) & 0xffffffff);
          }
          puVar15 = ((puVar15 + 1) >>> 0);
          sVar5 = ((((uVar6) << 16 >> 16) + -1) & 0xffff);
          uVar6 = ((CONCAT22(((((uVar6 ^ 0x80000000) >>> 0x10)) << 16 >> 16), sVar5)) >>> 0);
        } while (sVar5 != 0);
        local_1a = ((local_1a ^ 1) & 0xffff);
        puVar15 = ((puVar15 + (((((iVar11) << 16 >> 16) + ((iVar19) << 16 >> 16)) - (sVar9 - uVar3)) & 0xffff)) >>> 0);
        sVar7 = ((sVar7 + -1) & 0xffff);
      } while (sVar7 != 0);
      return 1;
    }
    if ((unaff_EBP & 0x4000000) != 0) {
      heap.setU32(0x009aa034, (0) >>> 0);
      uVar3 = ((sVar9 - ((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16)) & 0xffff);
      if (((uVar3) << 16 >> 16) < 0) {
        heap.setU32(0x009aa034, ((0) - uVar3 & 0x3f) >>> 0);
        uVar3 = ((0) & 0xffff);
      }
      sVar9 = (((unaff_BX - ((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16)) + 1) & 0xffff);
      if (((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16) < sVar9) {
        sVar9 = ((((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16)) & 0xffff);
      }
      heap.setU32(0x009aa038, (0) >>> 0);
      sVar5 = ((in_CX - heap.i16((((unaff_EDI) | 0) + 6))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009aa038, ((0) - sVar5 & 0x3f) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar7 = (((sVar7 - heap.i16((((unaff_EDI) | 0) + 6))) + 1) & 0xffff);
      if (heap.i16((((unaff_EDI) | 0) + 10)) < sVar7) {
        sVar7 = ((heap.i16((((unaff_EDI) | 0) + 10))) & 0xffff);
      }
      puVar17 = (((((((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16) + ((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16)) >>> 0) * ((sVar5) | 0) + ((uVar3) >>> 0) + heap.i32(unaff_EDI))) >>> 0);
      heap.setU32(0x009aa03c, (((sVar9 - uVar3) >>> 0)) >>> 0);
      heap.setU32(0x009aa040, (((sVar7 - sVar5) >>> 0)) >>> 0);
      heap.setU32(0x009aa044, (((((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16) + ((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16)) & 0xffff) - heap.u32(0x009aa03c)) >>> 0);
      uVar6 = ((unaff_EBP & 0x7f) >>> 0);
      if ((uVar6 != 0) && ((unaff_EBP & 0x18000000) == 0)) {
        iVar11 = ((heap.u32(0x009aa038) * 0x40 + heap.u32((0x008dc0b4) + (heap.u32((0x009aa244 + uVar6 * 2)) * 4) * 4)) >>> 0);
        do {
          uVar6 = ((heap.u32(0x009aa03c) >>> 1) >>> 0);
          uVar12 = ((heap.u32(0x009aa034)) >>> 0);
          if ((heap.u32(0x009aa03c) & 1) != 0) {
            uVar12 = ((heap.u32(0x009aa034) + 1) >>> 0);
            heap.setU8(puVar17, (heap.u8((heap.u32(0x009aa034) + iVar11))) & 0xff);
            uVar12 = ((uVar12 & 0x3f) >>> 0);
            puVar17 = (((((puVar17) | 0) + 1)) >>> 0);
          }
          for (; uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
            uVar13 = ((uVar12 + 1 & 0x3f) >>> 0);
            heap.setU32(puVar17, (CONCAT11(heap.u8((uVar13 + iVar11)), heap.u8((uVar12 + iVar11)))) & 0xffffffff);
            puVar17 = ((puVar17 + ((1) * 2)) >>> 0);
            uVar12 = ((uVar13 + 1 & 0x3f) >>> 0);
          }
          heap.setU32(0x009aa038, (heap.u32(0x009aa038) + 1) >>> 0);
          iVar19 = ((iVar11 + 0x40) >>> 0);
          if (0x3f < heap.u32(0x009aa038)) {
            heap.setU32(0x009aa038, (0) >>> 0);
            iVar19 = ((iVar11 + -0xfc0) >>> 0);
          }
          puVar17 = (((((puVar17) | 0) + heap.u32(0x009aa044))) >>> 0);
          heap.setU32(0x009aa040, (heap.u32(0x009aa040) - 1) >>> 0);
          iVar11 = ((iVar19) >>> 0);
        } while (heap.u32(0x009aa040) != 0);
        return 1;
      }
      iVar11 = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + uVar6 * 4)) * 4) * 4)) >>> 0);
      if ((unaff_EBP & 0x8000000) != 0) {
        iVar11 = ((iVar11 + 1) >>> 0);
      }
      if ((unaff_EBP & 0x10000000) != 0) {
        iVar11 = ((iVar11 + -1) >>> 0);
      }
      iVar19 = ((heap.u32(0x009aa038) * 0x40) >>> 0);
      do {
        uVar6 = ((heap.u32(0x009aa03c) >>> 1) >>> 0);
        uVar12 = ((heap.u32(0x009aa034)) >>> 0);
        if ((heap.u32(0x009aa03c) & 1) != 0) {
          uVar12 = ((heap.u32(0x009aa034) + 1) >>> 0);
          heap.setU8(puVar17, (heap.u8((heap.u32((heap.u32(0x009aa034) + iVar19)) + iVar11))) & 0xff);
          uVar12 = ((uVar12 & 0x3f) >>> 0);
          puVar17 = (((((puVar17) | 0) + 1)) >>> 0);
        }
        for (; uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
          heap.setU8(puVar17, (heap.u8((heap.u32((uVar12 + iVar19)) + iVar11))) & 0xff);
          uVar12 = ((uVar12 + 1 & 0x3f) >>> 0);
          heap.setU8((((puVar17) | 0) + 1), (heap.u8((heap.u32((uVar12 + iVar19)) + iVar11))) & 0xff);
          puVar17 = ((puVar17 + ((1) * 2)) >>> 0);
          uVar12 = ((uVar12 + 1 & 0x3f) >>> 0);
        }
        heap.setU32(0x009aa038, (heap.u32(0x009aa038) + 1) >>> 0);
        iVar18 = ((iVar19 + 0x40) >>> 0);
        if (0x3f < heap.u32(0x009aa038)) {
          heap.setU32(0x009aa038, (0) >>> 0);
          iVar18 = ((iVar19 + -0xfc0) >>> 0);
        }
        puVar17 = (((((puVar17) | 0) + heap.u32(0x009aa044))) >>> 0);
        heap.setU32(0x009aa040, (heap.u32(0x009aa040) - 1) >>> 0);
        iVar19 = ((iVar18) >>> 0);
      } while (heap.u32(0x009aa040) != 0);
      return 1;
    }
    uVar3 = ((sVar9 - ((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16)) & 0xffff);
    if (((uVar3) << 16 >> 16) < 0) {
      uVar3 = ((0) & 0xffff);
    }
    sVar9 = (((unaff_BX - ((heap.i32(unaff_EDI + (1) * 4)) << 16 >> 16)) + 1) & 0xffff);
    if (((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16) < sVar9) {
      sVar9 = ((((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16)) & 0xffff);
    }
    uVar10 = ((sVar9 - uVar3) & 0xffff);
    sVar9 = ((in_CX - heap.i16((((unaff_EDI) | 0) + 6))) & 0xffff);
    if (sVar9 < 0) {
      sVar9 = ((0) & 0xffff);
    }
    sVar7 = (((sVar7 - heap.i16((((unaff_EDI) | 0) + 6))) + 1) & 0xffff);
    if (heap.i16((((unaff_EDI) | 0) + 10)) < sVar7) {
      sVar7 = ((heap.i16((((unaff_EDI) | 0) + 10))) & 0xffff);
    }
    uVar8 = ((sVar7 - sVar9) & 0xffff);
    if ((unaff_EBP & 0x2000000) != 0) {
      if (heap.u16((((unaff_EDI) | 0) + 0xe)) == 1) {
        uVar10 = ((uVar10 >>> 1) & 0xffff);
        uVar8 = ((uVar8 >>> 1) & 0xffff);
        pbVar16 = ((((((heap.u16((unaff_EDI + ((2) * 4))) >>> 1) + ((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16)) >>> 0) * ((sVar9) | 0) + ((uVar3) >>> 0) + heap.i32(unaff_EDI))) >>> 0);
        iVar11 = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + (unaff_EBP & 0x7f) * 4)) * 4) * 4)) >>> 0);
        uVar3 = ((heap.u16((unaff_EDI + ((2) * 4)))) & 0xffff);
        iVar19 = ((heap.i32(unaff_EDI + (3) * 4)) >>> 0);
        uVar4 = ((uVar10) & 0xffff);
        do {
          do {
            heap.setU32(pbVar16, (heap.u8((heap.u32(pbVar16) + iVar11))) & 0xffffffff);
            pbVar16 = ((pbVar16 + 1) >>> 0);
            uVar4 = ((uVar4 - 1) & 0xffff);
          } while (uVar4 != 0);
          pbVar16 = ((pbVar16 + (((((uVar3 >>> 1) + ((iVar19) << 16 >> 16)) - uVar10)) << 16 >> 16)) >>> 0);
          uVar8 = ((uVar8 - 1) & 0xffff);
          uVar4 = ((uVar10) & 0xffff);
        } while (uVar8 != 0);
        return 1;
      }
      if (heap.u16((((unaff_EDI) | 0) + 0xe)) < 2) {
        pbVar16 = (((((((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16) + ((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16)) >>> 0) * ((sVar9) | 0) + ((uVar3) >>> 0) + heap.i32(unaff_EDI))) >>> 0);
        iVar11 = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + (unaff_EBP & 0x7f) * 4)) * 4) * 4)) >>> 0);
        iVar19 = ((heap.i32(unaff_EDI + (2) * 4)) >>> 0);
        iVar18 = ((heap.i32(unaff_EDI + (3) * 4)) >>> 0);
        uVar3 = ((uVar10) & 0xffff);
        do {
          do {
            heap.setU32(pbVar16, (heap.u8((heap.u32(pbVar16) + iVar11))) & 0xffffffff);
            pbVar16 = ((pbVar16 + 1) >>> 0);
            uVar3 = ((uVar3 - 1) & 0xffff);
          } while (uVar3 != 0);
          pbVar16 = ((pbVar16 + ((((((iVar19) << 16 >> 16) + ((iVar18) << 16 >> 16)) - uVar10)) << 16 >> 16)) >>> 0);
          uVar8 = ((uVar8 - 1) & 0xffff);
          uVar3 = ((uVar10) & 0xffff);
        } while (uVar8 != 0);
        return 1;
      }
      uVar10 = ((uVar10 >>> 2) & 0xffff);
      uVar8 = ((uVar8 >>> 2) & 0xffff);
      pbVar16 = ((((((heap.u16((unaff_EDI + ((2) * 4))) >>> 2) + ((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16)) >>> 0) * ((sVar9) | 0) + ((uVar3) >>> 0) + heap.i32(unaff_EDI))) >>> 0);
      iVar11 = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + (unaff_EBP & 0x7f) * 4)) * 4) * 4)) >>> 0);
      uVar3 = ((heap.u16((unaff_EDI + ((2) * 4)))) & 0xffff);
      iVar19 = ((heap.i32(unaff_EDI + (3) * 4)) >>> 0);
      uVar4 = ((uVar10) & 0xffff);
      do {
        do {
          heap.setU32(pbVar16, (heap.u8((heap.u32(pbVar16) + iVar11))) & 0xffffffff);
          pbVar16 = ((pbVar16 + 1) >>> 0);
          uVar4 = ((uVar4 - 1) & 0xffff);
        } while (uVar4 != 0);
        pbVar16 = ((pbVar16 + (((((uVar3 >>> 2) + ((iVar19) << 16 >> 16)) - uVar10)) << 16 >> 16)) >>> 0);
        uVar8 = ((uVar8 - 1) & 0xffff);
        uVar4 = ((uVar10) & 0xffff);
      } while (uVar8 != 0);
      return 1;
    }
    puVar14 = (((((((heap.i32(unaff_EDI + (2) * 4)) << 16 >> 16) + ((heap.i32(unaff_EDI + (3) * 4)) << 16 >> 16)) >>> 0) * ((sVar9) | 0) + ((uVar3) >>> 0) + heap.i32(unaff_EDI))) >>> 0);
    uVar2 = ((CONCAT31(CONCAT21(CONCAT11(uVar1, uVar1), uVar1), uVar1)) >>> 0);
    iVar11 = ((heap.i32(unaff_EDI + (2) * 4)) >>> 0);
    iVar19 = ((heap.i32(unaff_EDI + (3) * 4)) >>> 0);
    do {
      if ((uVar10 & 1) != 0) {
        heap.setU8(puVar14, (uVar1) & 0xff);
        puVar14 = (((((puVar14) | 0) + 1)) >>> 0);
      }
      uVar6 = ((((uVar10 >>> 2) >>> 0)) >>> 0);
      if ((uVar10 >>> 1 & 1) != 0) {
        heap.setI16(puVar14, (((uVar2) << 16 >> 16)) & 0xffff);
        puVar14 = (((((puVar14) | 0) + 2)) >>> 0);
      }
      for (; uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(puVar14, (uVar2) & 0xffffffff);
        puVar14 = ((puVar14 + ((1) * 4)) >>> 0);
      }
      puVar14 = (((((puVar14) | 0) + (((((iVar11) << 16 >> 16) + ((iVar19) << 16 >> 16)) >>> 0) - ((uVar10) >>> 0)))) >>> 0);
      uVar8 = ((uVar8 - 1) & 0xffff);
    } while (uVar8 != 0);
  }
  return 1;
}
