// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4533d0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT31 } from "../runtime/win32.js";
import { FUN_004077b3 } from "./4077b3.js";
import { FUN_00407a41 } from "./407a41.js";
import { FUN_00407c42 } from "./407c42.js";
import { FUN_00407d75 } from "./407d75.js";
import { FUN_00407dd4 } from "./407dd4.js";
import { FUN_00407e33 } from "./407e33.js";
import { FUN_004531f6 } from "./4531f6.js";
export function FUN_004533d0(heap) {
  let uVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let extraout_ECX_02 = 0;
  let uVar6 = 0;
  let uVar8 = 0;
  let uVar7 = 0;
  let iVar5 = 0;
  let uVar9 = 0;
  let cVar11 = 0;
  let iVar10 = 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let iVar17 = 0;
  if (((heap.u32(0x006323f4) != -1) && (heap.u32(0x006326bc) == '\0')) && ((heap.u32(0x006326bd) & 1) != 0)) {
    heap.setU32(0x006323fc, (-1) >>> 0);
    puVar15 = heap.u32(0x009a1164);
    do {
      puVar14 = puVar15 + -0x178;
      if (puVar14 < 0x009a013c) {
        /* goto LAB_00453459 */ throw new Error("goto LAB_00453459 not supported");
      }
      iVar17 = heap.u32((puVar15 + -0x170));
      puVar15 = puVar14;
    } while ((iVar17 == 0) || ((heap.u32((iVar17 + 0x12)) & 0x800) == 0));
    heap.setU32(0x006323fc, (iVar17) >>> 0);
    if (iVar17 != -1) {
      heap.setU32(0x00632404, (0) >>> 0);
      heap.setU32(0x00632400, (puVar14) >>> 0);
      if ((heap.u32((iVar17 + 0x10)) != '\0') && (heap.setU32(0x00632404, (0x23) >>> 0), heap.u32((iVar17 + 0x10)) != '\x01')) {
        heap.setU32(0x00632404, (0x46) >>> 0);
      }
      LAB_00453459: heap.setU32(0x00632408, (0x0063240c) >>> 0);
      for (uVar9 = heap.u32(0x0087c396); uVar13 = heap.u32(0x0087c396), uVar9 != 0xffff; uVar9 = heap.u32((0x00743b98) + (uVar9 * 0x80) * 4)) {
        if ((heap.u32((0x00743bd2 + uVar9 * 0x100)) != -1) && (FUN_004531f6(heap), in_ECX = extraout_ECX, 0x632447 < heap.u32(0x00632408))) {
          /* goto LAB_004534d1 */ throw new Error("goto LAB_004534d1 not supported");
        }
      }
      while (uVar13 != 0xffff && ((heap.u32((0x00743bd2 + uVar13 * 0x100)) != -1 || (FUN_004531f6(heap), in_ECX = extraout_ECX_00, heap.u32(0x00632408) < 0x00632448)))) {
        uVar13 = heap.u32((0x00743b98) + (uVar13 * 0x80) * 4);
      }
      LAB_004534d1: puVar19 = 0x00632448;
      do {
        if (heap.u32(puVar19) != 0xffff) {
          for (puVar16 = 0x0063240c; puVar16 < heap.u32(0x00632408); puVar16 = puVar16 + 5) {
            if (heap.u32(puVar19) == heap.u32(puVar16)) {
              /* goto LAB_00453525 */ throw new Error("goto LAB_00453525 not supported");
            }
          }
          if (heap.u32(puVar19 + (0xc) * 4) != 0xffff) {
            FUN_00407a41(heap, puVar19 + 2);
            in_ECX = extraout_ECX_01;
          }
          if (heap.u32(puVar19 + (0x1a) * 4) != 0xffff) {
            FUN_00407a41(heap, puVar19 + 0x10);
            in_ECX = extraout_ECX_02;
          }
          heap.u32(puVar19) = 0xffff;
        }
        LAB_00453525: puVar19 = puVar19 + 0x1e;
      } while (puVar19 < 0x006325b0);
      puVar19 = 0x0063240c;
      LAB_00453535: for (; puVar19 < heap.u32(0x00632408); puVar19 = puVar19 + 5) {
        uVar9 = heap.u32(puVar19 + (2) * 4);
        iVar17 = CONCAT22(heap, (in_ECX >>> 0x10), 0xffff);
        if (uVar9 < 0) {
          uVar9 = -uVar9;
        }
        if (0xfff < uVar9) {
          uVar9 = 0xfff;
        }
        if (0x800 < uVar9) {
          uVar6 = (uint3)(iVar17 >>> 8);
          iVar17 = CONCAT31(heap, uVar6, (-(uVar9 - 0xc00) >>> 2));
          cVar11 = (-(uVar9 - 0xc00) >>> 10);
          if ((cVar11 != '\0') && (iVar17 = CONCAT31(heap, uVar6, 0xff), cVar11 < '\0')) {
            iVar17 = uVar6 << 8;
          }
        }
        uVar9 = heap.u32(puVar19 + (1) * 4);
        iVar10 = uVar9;
        if (uVar9 < 0) {
          uVar9 = -uVar9;
        }
        if (0xfff < uVar9) {
          uVar9 = 0xfff;
        }
        if (0x800 < uVar9) {
          uVar8 = (undefined2)(iVar17 >>> 0x10);
          bVar3 = iVar17;
          iVar17 = CONCAT22(heap, uVar8, CONCAT11(heap, (-(uVar9 - 0xc00) >>> 2), bVar3));
          bVar2 = (byte)(-(uVar9 - 0xc00) >>> 10);
          if ((bVar2 != 0) && (iVar17 = CONCAT22(heap, uVar8, CONCAT11(heap, 0xff, bVar3)), (bVar2 << 8) < 0)) {
            iVar17 = CONCAT22(heap, uVar8, bVar3);
          }
        }
        bVar2 = (byte)(iVar17 >>> 8);
        if (bVar2 <= iVar17) {
          iVar17 = CONCAT31(heap, (int3)(iVar17 >>> 8), bVar2);
        }
        uVar7 = (undefined3)(iVar17 >>> 8);
        bVar2 = iVar17 - heap.u32(0x00632404);
        if (iVar17 < heap.u32(0x00632404)) {
          bVar2 = 0;
        }
        in_ECX = CONCAT31(heap, uVar7, bVar2);
        uVar9 = heap.u32(puVar19);
        uVar12 = heap.u32(puVar19 + (3) * 4);
        puVar16 = 0x00632448;
        do {
          if (uVar9 == heap.u32(puVar16)) {
            /* goto LAB_00453617 */ throw new Error("goto LAB_00453617 not supported");
          }
          puVar16 = puVar16 + 0x1e;
        } while (puVar16 < 0x006325b0);
        puVar16 = 0x00632448;
        bVar3 = 0;
        while (heap.u32(puVar16) != 0xffff) {
          puVar16 = puVar16 + 0x1e;
          bVar3 = bVar3 + 1;
          if (heap.u32(0x005f8d5d) <= bVar3) {
            /* goto code_r0x004535f9 */ throw new Error("goto code_r0x004535f9 not supported");
          }
        }
        heap.u32(puVar16) = uVar9;
        heap.u32(puVar16 + (0xc) * 4) = 0xffff;
        heap.u32(puVar16 + (0x1a) * 4) = 0xffff;
        heap.u32((puVar16 + 1)) = 0x30;
        LAB_00453617: bVar3 = heap.u32(puVar16 + (1) * 4);
        if (bVar3 != heap.u32(puVar19 + (4) * 4)) {
          if (bVar3 < heap.u32(puVar19 + (4) * 4)) {
            bVar3 = bVar3 + 4;
          } else {
            bVar3 = bVar3 - 4;
          }
        }
        heap.u32((puVar16 + 1)) = bVar3;
        bVar4 = bVar2 - bVar3;
        if (bVar2 < bVar3) {
          bVar4 = 0;
        }
        in_ECX = CONCAT31(heap, uVar7, bVar4);
        iVar17 = uVar9 * 0x100;
        puVar18 = 0x00743b94 + iVar17;
        uVar9 = ((ushort)(heap.u32((ushort)(byte)(0x00743c50) + (iVar17) * 4) * bVar4) >>> 3) + 0xe001;
        if (uVar9 < -10000) {
          uVar9 = 0xd8f0;
        }
        iVar5 = uVar9;
        bVar2 = heap.u32((0x00743c4f) + (iVar17) * 4);
        uVar1 = bVar2;
        if (bVar2 == 0xff) {
          if (heap.u32(puVar16 + (0xc) * 4) != 0xffff) {
            heap.u32(puVar16 + (0xc) * 4) = 0xffff;
            FUN_00407a41(heap, puVar16 + 2);
          }
        } else {
          if (heap.u32(puVar16 + (0xc) * 4) != 0xffff) {
            if (bVar2 == heap.u32(puVar16 + (0xc) * 4)) {
              if (uVar9 != heap.u32(puVar16 + (0xd) * 4)) {
                heap.u32(puVar16 + (0xd) * 4) = uVar9;
                FUN_00407e33(heap, puVar16 + 2, iVar5);
              }
              if ((iVar10 != heap.u32(puVar16 + (0xe) * 4)) && (heap.u32(puVar16 + (0xe) * 4) = iVar10, heap.u32(0x005f8d59) != '\0')) {
                FUN_00407dd4(heap, puVar16 + 2, iVar10);
              }
              if (uVar12 != heap.u32(puVar16 + (0xf) * 4)) {
                heap.u32(puVar16 + (0xf) * 4) = uVar12;
                FUN_00407d75(heap, puVar16 + 2, uVar12);
              }
              /* goto LAB_0045377a */ throw new Error("goto LAB_0045377a not supported");
            }
            FUN_00407a41(heap, puVar16 + 2);
          }
          heap.u32(puVar16 + (0xc) * 4) = uVar1;
          FUN_004077b3(heap, uVar1, puVar16 + 2, 1, 1);
          heap.u32(puVar16 + (0xe) * 4) = iVar10;
          heap.u32(puVar16 + (0xd) * 4) = iVar5;
          heap.u32(puVar16 + (0xf) * 4) = uVar12;
          iVar17 = iVar10;
          if (heap.u32(0x005f8d59) == '\0') {
            iVar17 = 0;
          }
          FUN_00407c42(heap, puVar16 + 2, heap.u32((0x0063268c) + (uVar1) * 4), iVar5, iVar17, uVar12);
        }
        LAB_0045377a: uVar9 = ((ushort)(heap.u32(puVar18 + (0xbe) * 4) * in_ECX) >>> 3) + 0xe001;
        if (uVar9 < -10000) {
          uVar9 = 0xd8f0;
        }
        iVar17 = uVar9;
        bVar2 = heap.u32(puVar18 + (0xbd) * 4);
        uVar1 = bVar2;
        if (bVar2 == 0xff) {
          if (heap.u32(puVar16 + (0x1a) * 4) != 0xffff) {
            heap.u32(puVar16 + (0x1a) * 4) = 0xffff;
            FUN_00407a41(heap, puVar16 + 0x10, puVar18, puVar16, iVar10, uVar12, in_ECX);
          }
        } else {
          if (heap.u32(puVar16 + (0x1a) * 4) != 0xffff) {
            if (bVar2 == heap.u32(puVar16 + (0x1a) * 4)) {
              if (uVar9 != heap.u32(puVar16 + (0x1b) * 4)) {
                heap.u32(puVar16 + (0x1b) * 4) = uVar9;
                FUN_00407e33(heap, puVar16 + 0x10, iVar17, puVar18, puVar16, iVar10, uVar12);
              }
              if ((iVar10 != heap.u32(puVar16 + (0x1c) * 4)) && (heap.u32(puVar16 + (0x1c) * 4) = iVar10, heap.u32(0x005f8d59) != '\0')) {
                FUN_00407dd4(heap, puVar16 + 0x10, iVar10, puVar18, puVar16, iVar10, uVar12);
              }
              /* goto LAB_00453891 */ throw new Error("goto LAB_00453891 not supported");
            }
            FUN_00407a41(heap, puVar16 + 0x10, puVar18);
          }
          heap.u32(puVar16 + (0x1a) * 4) = uVar1;
          FUN_004077b3(heap, uVar1, puVar16 + 0x10, 1, 1, puVar18);
          heap.u32(puVar16 + (0x1c) * 4) = iVar10;
          heap.u32(puVar16 + (0x1b) * 4) = iVar17;
          heap.u32(puVar16 + (0x1d) * 4) = uVar12;
          iVar5 = iVar10;
          if (heap.u32(0x005f8d59) == '\0') {
            iVar5 = 0;
          }
          FUN_00407c42(heap, puVar16 + 0x10, heap.u32((0x0063268c) + (uVar1) * 4), iVar17, iVar5, 0, puVar18, puVar16, iVar10, uVar12);
        }
        LAB_00453891: 
      }
    }
  }
  return;
  code_r0x004535f9: puVar19 = puVar19 + 5;
  /* goto LAB_00453535 */ throw new Error("goto LAB_00453535 not supported");
}
