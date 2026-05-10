// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4484cb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3, uint3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT14, CONCAT21, CONCAT22, CONCAT31, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0044149a } from "./44149a.js";
import { FUN_00448c64 } from "./448c64.js";
import { FUN_00448d15 } from "./448d15.js";
import { FUN_005e0650 } from "./5e0650.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_004484cb(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let uVar11 = 0;
  let bVar12 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar13 = 0;
  let uVar16 = 0;
  let iVar14 = 0;
  let uVar15 = 0;
  let extraout_EDX = 0;
  let bVar17 = 0;
  let uVar18 = 0;
  let uVar19 = 0;
  let uVar20 = 0;
  let puVar21 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar22 = 0;
  let pbVar23 = 0;
  let pbVar24 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar25 = 0;
  let uVar26 = 0;
  LAB_00448a39: {
  LAB_00448807: {
  code_r0x0044879c: {
  LAB_00448793: {
  uVar25 = (((regs.eax = FUN_00448c64(heap))) >>> 0);
  heap.setU8(0x00630b3c, (0) & 0xff);
  heap.setU32(0x00630b30, (0x00630b34) >>> 0);
  uVar19 = ((0) >>> 0);
  uVar11 = ((extraout_ECX) >>> 0);
  LAB_004484e4: pbVar22 = ((heap.u32(0x00630b30)) >>> 0);
  uVar6 = ((((uVar25) >>> 0)) >>> 0);
  uVar20 = ((CONCAT21((((uVar25 >>> 0x30)) << 16 >> 16), heap.u8(unaff_ESI)) & 0xffff3c) >>> 0);
  uVar13 = ((uVar20 << 8) >>> 0);
  bVar17 = ((((uVar19) & 0xff)) & 0xff);
  if (((uVar20) << 24 >> 24) == 16) {
    unaff_EDI = ((((((heap.u8(unaff_ESI + (4))) & 0xffff) << 4 | heap.u8(unaff_ESI + (5)) & 0xf) >>> 0)) >>> 0);
    uVar13 = ((((bVar17 - heap.u8(unaff_ESI)) & 0xff) & 3) >>> 0);
    uVar26 = ((((CONCAT14(bVar17 - heap.u8(unaff_ESI), uVar6)) >>> 0) & 0x3ffffffff) >>> 0);
    if ((heap.u8(unaff_EDI + (0x5f4970)) >>> ((uVar13) << 16 >> 16) & 1) != 0) {
      /* goto LAB_00448516 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_00448516"); return 0;
    }
  } else {
    LAB_00448516: uVar20 = ((CONCAT21((((uVar13 >>> 0x10)) << 16 >> 16), heap.u8(unaff_ESI)) & 0xffff3c) >>> 0);
    uVar13 = ((uVar20 << 8) >>> 0);
    if (((uVar20) << 24 >> 24) == 8) {
      unaff_EDI = (((((heap.u8(unaff_ESI + (4))) >>> 0) << 4 | heap.u8(unaff_ESI + (5)) & 0xf)) >>> 0);
      uVar26 = ((((CONCAT14(heap.u8(unaff_ESI + (5)), uVar6)) >>> 0) & 0xfffffffff) >>> 0);
      if ((heap.u8(unaff_EDI + (0x6559d8)) & 0x20) != 0) {
        uVar13 = ((((bVar17 - heap.u8(unaff_ESI)) & 0xff) & 3) >>> 0);
        uVar26 = ((((CONCAT14(bVar17 - heap.u8(unaff_ESI), uVar6)) >>> 0) & 0x3ffffffff) >>> 0);
        if ((heap.u8(unaff_EDI + (0x6559d8)) >>> ((uVar13) << 16 >> 16) & 1) != 0) {
          /* goto LAB_00448553 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_00448553"); return 0;
        }
      }
    } else {
      LAB_00448553: uVar16 = ((CONCAT21((((uVar13 >>> 0x10)) << 16 >> 16), heap.u8(unaff_ESI))) >>> 0);
      uVar3 = ((uVar16 & 0xffff3c) >>> 0);
      iVar14 = ((((uVar3) >>> 0) << 8) >>> 0);
      if ((((uVar3) << 24 >> 24) == 4) && ((heap.u8(unaff_ESI + (4)) & 4) != 0)) {
        uVar20 = ((CONCAT31(uVar16, heap.u8(unaff_ESI + (4))) & 0xffff3c03) >>> 0);
        uVar16 = (((regs.eax = callIndirect(heap, uint3, uVar20 >>> 8))) >>> 0);
        bVar12 = ((((uVar20) << 24 >> 24) - bVar17) & 0xff);
        uVar26 = ((CONCAT44(CONCAT31(uVar16, bVar12), uVar6)) >>> 0);
        if ((bVar12 & 1) != 0) {
          break LAB_00448793;
        }
        iVar14 = ((((uVar16) >>> 0) << 8) >>> 0);
        if ((heap.u8(unaff_ESI + (4)) & 3) == bVar17) {
          iVar14 = ((CONCAT31(uVar16, 4)) >>> 0);
        }
      }
      bVar12 = ((((iVar14) << 24 >> 24) + heap.u8(unaff_ESI + (2))) & 0xff);
      uVar15 = ((CONCAT22((((((iVar14) >>> 0) >>> 0x10)) << 16 >> 16), CONCAT11(bVar12 - 4, bVar12))) >>> 0);
      uVar5 = ((((uVar25) << 16 >> 16) + heap.u32((0x00652478) + (uVar19 * 2) * 4)) & 0xffff);
      uVar7 = ((((uVar11) << 16 >> 16) + heap.u32((0x0065247a) + (uVar19 * 2) * 4)) & 0xffff);
      uVar8 = ((uVar7 * 0x80 | uVar7 >>> 9 | uVar5) & 0xffff);
      pbVar23 = ((heap.u32((0x00971ef4) + (((uVar8 >>> 5 | uVar8 << 0xb) & 0xffff)) * 4)) >>> 0);
      do {
        LAB_004485e1: {
        LAB_004485cb: {
        bVar4 = ((heap.u8(pbVar23) & 0x3c) & 0xff);
        uVar8 = ((((uVar19) & 0xffff)) & 0xffff);
        if (bVar12 == heap.u8(pbVar23 + (2))) {
          if (bVar4 == 0x10) {
            uVar26 = ((CONCAT44(uVar15, uVar6)) >>> 0);
            if ((heap.u32(((0x005f4970) & 0xff) + (CONCAT31((regs.eax = callIndirect(heap, int3, (((heap.u8(pbVar23 + (4))) >>> 0) << 4) >>> 8)), ((((heap.u8(pbVar23 + (4))) >>> 0) << 4) & 0xff) | heap.u8(pbVar23 + (5)) & 0xf)) * 4) >>> ((bVar17 - heap.u8(pbVar23) & 3 ^ 2) & 0xffff) & 1) == 0) {
              break;
            }
            if (heap.u8(0x00630b3c) == 0) {
              heap.setU32(heap.u32(0x00630b30), (8) & 0xffffffff);
              heap.setU8((pbVar22 + (1)), (bVar17) & 0xff);
              heap.setU32(0x00630b30, (heap.u32(0x00630b30) + 2) >>> 0);
            }
            if (heap.u8(0x00630b3c) == 1) {
              (regs.eax = FUN_00448d15(heap, uVar15, uVar7, uVar5));
            }
          } else {
            if (bVar4 != 8) {
              break LAB_004485cb;
            }
            uVar20 = ((((heap.u8(pbVar23 + (4))) >>> 0) << 4 | heap.u8(pbVar23 + (5)) & 0xf) >>> 0);
            uVar26 = ((CONCAT44(uVar15, uVar6)) >>> 0);
            if (((heap.u32((0x006559d8) + (uVar20) * 4) & 0x20) == 0) || (uVar26 = ((CONCAT44(uVar15, uVar6)) >>> 0), (heap.u32(((0x006559d8) & 0xff) + (uVar20) * 4) >>> ((bVar17 - heap.u8(pbVar23) & 3 ^ 2) & 0xffff) & 1) == 0)) {
              break;
            }
            if (heap.u8(0x00630b3c) == 0) {
              heap.setU32(heap.u32(0x00630b30), (1) & 0xffffffff);
              heap.setU8((pbVar22 + (1)), (bVar17) & 0xff);
              heap.setU32(0x00630b30, (heap.u32(0x00630b30) + 2) >>> 0);
            }
          }
          LAB_0044875d: uVar20 = ((CONCAT21((((((uVar15) >>> 0) >>> 0x10)) << 16 >> 16), heap.u8(unaff_ESI)) & 0xffff3c) >>> 0);
          iVar14 = ((uVar20 << 8) >>> 0);
          uVar26 = ((CONCAT44(iVar14, uVar6)) >>> 0);
          if ((((uVar20) << 24 >> 24) == 4) && (uVar26 = ((CONCAT44(iVar14, uVar6)) >>> 0), heap.u8(0x00630b3c) == 1)) {
            heap.setU8((unaff_ESI + ((((((uVar8) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(unaff_ESI + ((((((uVar8) << 16 >> 16)) >>> 0) >>> 3) + 6)) | 1 << (uVar8 & 7)) & 0xff);
            uVar26 = (((regs.eax = FUN_005e56d3(heap, unaff_ESI, unaff_EDI))) >>> 0);
            uVar11 = ((extraout_ECX_00) >>> 0);
          }
          break;
        }
        }
        if (bVar4 == 4) {
          LAB_00448708: {
          if (bVar12 == heap.u8(pbVar23 + (2))) {
            if ((heap.u8(pbVar23 + (4)) & 4) != 0) {
              bVar12 = ((heap.u8(pbVar23 + (4)) & 3) & 0xff);
              /* goto joined_r0x004486ae — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/joined_r0x004486ae"); return 0;
            }
          } else {
            if (((bVar12 - 4) & 0xff) != heap.u8(pbVar23 + (2))) {
              break LAB_004485e1;
            }
            uVar26 = ((CONCAT44(uVar15, uVar6)) >>> 0);
            if ((heap.u8(pbVar23 + (4)) & 4) == 0) {
              break;
            }
            bVar12 = ((heap.u8(pbVar23 + (4)) & 3 ^ 2) & 0xff);
            joined_r0x004486ae: uVar26 = ((CONCAT44(uVar15, uVar6)) >>> 0);
            if (bVar12 != bVar17) {
              break;
            }
          }
          if (heap.u8(0x00630b3c) == 0) {
            bVar12 = ((2) & 0xff);
            if (heap.u8(pbVar23 + (4)) >>> 4 == 0) {
              if (1 < heap.u32(((0x00630b00) & 0xff) + (heap.u8(pbVar23 + (6)) & 0xf) * 4)) {
                break LAB_00448708;
              }
              bVar12 = ((3) & 0xff);
            }
            heap.setU32(heap.u32(0x00630b30), (bVar12) & 0xffffffff);
            heap.setU8((pbVar22 + (1)), (bVar17) & 0xff);
            heap.setU32(0x00630b30, (heap.u32(0x00630b30) + 2) >>> 0);
          }
          }
          if ((heap.u8(0x00630b3c) == 1) && (heap.setU8((pbVar23 + (((((((uVar8 ^ 2)) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(pbVar23 + (((((((uVar8 ^ 2)) << 16 >> 16)) >>> 0) >>> 3) + 6)) | 1 << ((uVar8 ^ 2) & 7)) & 0xff), (heap.u8(pbVar23 + (4)) & 0xf0) == 0)) {
            (regs.eax = FUN_00448d15(heap, uVar15, uVar7, uVar5));
          }
          (regs.eax = FUN_0044149a(heap, uVar15));
          (regs.eax = FUN_005e0650(heap));
          (regs.eax = FUN_005e56d3(heap, pbVar23, unaff_EDI));
          uVar15 = ((extraout_EDX) >>> 0);
          /* goto LAB_0044875d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_0044875d"); return 0;
        }
        }
        pbVar24 = ((pbVar23 + 1) >>> 0);
        pbVar23 = ((pbVar23 + 8) >>> 0);
        uVar26 = ((CONCAT44(uVar15, uVar6)) >>> 0);
      } while ((heap.u8(pbVar24) & 0x80) == 0);
    }
  }
  }
  uVar25 = ((uVar26) >>> 0);
  uVar20 = ((((uVar25 >>> 0x20) >>> 0)) >>> 0);
  uVar6 = ((((uVar25) >>> 0)) >>> 0);
  if (heap.u8(0x00630b3c) == 0) {
    break code_r0x0044879c;
  }
  break LAB_00448807;
  }
  uVar19 = ((uVar19 + 1) >>> 0);
  if (uVar19 < 4) {
    /* goto LAB_004484e4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_004484e4"); return 0;
  }
  heap.setU8(0x00630b3c, (1) & 0xff);
  for (puVar21 = ((0x00630b34) >>> 0); unaff_EDI = (((puVar21 + ((1) * 2))) >>> 0), unaff_EDI < heap.u32(0x00630b30); puVar21 = (((puVar21 + ((1) * 2)) >>> 0)) >>> 0) {
    do {
      if (heap.u8(puVar21) < heap.u8(unaff_EDI)) {
        LOCK();
        uVar2 = ((heap.u16(unaff_EDI)) & 0xffff);
        heap.setU16(unaff_EDI, (heap.u16(puVar21)) & 0xffff);
        UNLOCK();
        heap.setU32(puVar21, (uVar2) & 0xffffffff);
      }
      uVar20 = ((uVar20 & 0xffff0000) >>> 0);
      unaff_EDI = ((unaff_EDI + 2) >>> 0);
    } while (unaff_EDI < heap.u32(0x00630b30));
  }
  uVar20 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar20 >>> 8)), heap.u8(unaff_ESI)) & 0xffffff3c) >>> 0);
  if (((((uVar20) << 24 >> 24) == 4) && (uVar20 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar20 >>> 8)), heap.u8(unaff_ESI + (4)) >>> 4)) >>> 0), heap.u8(unaff_ESI + (4)) >>> 4 == 0)) && (0x00630b38 < heap.u32(0x00630b30))) {
    heap.setU32(0x00630b30, (0x00630b38) >>> 0);
  }
  }
  uVar25 = ((CONCAT44(uVar20, uVar6)) >>> 0);
  if (0x00630b34 < heap.u32(0x00630b30)) {
    uVar19 = ((((heap.u8(0x00630b35)) >>> 0)) >>> 0);
    heap.setU8(0x00630b34, (heap.u8(0x00630b36)) & 0xff);
    heap.setU8(0x00630b35, (((heap.u16(0x00630b36) >>> 8) & 0xff)) & 0xff);
    heap.setU8(0x00630b36, (heap.u8(0x00630b38)) & 0xff);
    heap.setU8(0x00630b38, (heap.u8(0x00630b3a)) & 0xff);
    heap.setU32(0x00630b30, (heap.u32(0x00630b30) + -2) >>> 0);
    /* goto LAB_004484e4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_004484e4"); return 0;
  }
  if ((((heap.u8(unaff_ESI) & 0x3c) != 4) || (heap.u8(unaff_ESI + (4)) >>> 4 == 0)) || ((heap.u8(unaff_ESI + (4)) & 4) != 0)) {
    LAB_00448a43: return 1;
  }
  uVar19 = ((0) >>> 0);
  LAB_00448869: bVar17 = ((heap.u8(unaff_ESI + (2))) & 0xff);
  uVar5 = ((((uVar6) << 16 >> 16) + heap.u32((0x00652478) + (uVar19 * 2) * 4)) & 0xffff);
  uVar7 = ((((uVar11) << 16 >> 16) + heap.u32((0x0065247a) + (uVar19 * 2) * 4)) & 0xffff);
  uVar8 = ((uVar7 * 0x80 | uVar7 >>> 9 | uVar5) & 0xffff);
  pbVar22 = ((heap.u32((0x00971ef4) + (((uVar8 >>> 5 | uVar8 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((((heap.u8(pbVar22) & 0x3c) == 4) && ((heap.u8(pbVar22 + (4)) & 4) == 0)) && ((heap.u8(pbVar22 + (4)) >>> 4 != 0 && (bVar17 == heap.u8(pbVar22 + (2)))))) {
      uVar20 = ((uVar19 + 1 & 3) >>> 0);
      uVar8 = ((uVar5 + heap.u32((0x00652478) + (uVar20 * 2) * 4)) & 0xffff);
      uVar9 = ((uVar7 + heap.u32((0x0065247a) + (uVar20 * 2) * 4)) & 0xffff);
      uVar10 = ((uVar9 * 0x80 | uVar9 >>> 9 | uVar8) & 0xffff);
      pbVar23 = ((heap.u32((0x00971ef4) + (((uVar10 >>> 5 | uVar10 << 0xb) & 0xffff)) * 4)) >>> 0);
      /* goto LAB_004488f4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_004488f4"); return 0;
    }
    pbVar23 = ((pbVar22 + 1) >>> 0);
    pbVar22 = ((pbVar22 + 8) >>> 0);
  } while ((heap.u8(pbVar23) & 0x80) == 0);
  break LAB_00448a39;
  while (pbVar24 = ((pbVar23 + 1) >>> 0), pbVar23 = ((pbVar23 + 8) >>> 0), (heap.u8(pbVar24) & 0x80) == 0) {
    LAB_004488f4: if (((((heap.u8(pbVar23) & 0x3c) == 4) && ((heap.u8(pbVar23 + (4)) & 4) == 0)) && (heap.u8(pbVar23 + (4)) >>> 4 != 0)) && (bVar17 == heap.u8(pbVar23 + (2)))) {
      uVar20 = ((uVar20 + 1 & 3) >>> 0);
      uVar10 = (((uVar9 + heap.u32((0x0065247a) + (uVar20 * 2) * 4)) * 0x80 | ((uVar9 + heap.u32((0x0065247a) + (uVar20 * 2) * 4)) & 0xffff) >>> 9 | uVar8 + heap.u32((0x00652478) + (uVar20 * 2) * 4)) & 0xffff);
      pbVar24 = ((heap.u32((0x00971ef4) + (((uVar10 >>> 5 | uVar10 << 0xb) & 0xffff)) * 4)) >>> 0);
      /* goto LAB_00448951 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_00448951"); return 0;
    }
  }
  break LAB_00448a39;
  while (pbVar1 = ((pbVar24 + 1) >>> 0), pbVar24 = ((pbVar24 + 8) >>> 0), (heap.u8(pbVar1) & 0x80) == 0) {
    LAB_00448951: if ((((heap.u8(pbVar24) & 0x3c) == 4) && ((heap.u8(pbVar24 + (4)) & 4) == 0)) && ((heap.u8(pbVar24 + (4)) >>> 4 != 0 && (bVar17 == heap.u8(pbVar24 + (2)))))) {
      uVar10 = ((((uVar20) << 16 >> 16) + 1 & 3) & 0xffff);
      uVar18 = ((uVar10 + 4) & 0xffff);
      heap.setU8((pbVar24 + ((((((uVar18) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(pbVar24 + ((((((uVar18) << 16 >> 16)) >>> 0) >>> 3) + 6)) | 1 << (uVar18 & 7)) & 0xff);
      (regs.eax = FUN_005e56d3(heap, pbVar24, unaff_EDI, pbVar23, uVar9, uVar8, pbVar22, uVar7, uVar5));
      uVar5 = ((uVar10 - 1 & 3) & 0xffff);
      uVar7 = ((uVar5 + 4) & 0xffff);
      heap.setU8((pbVar23 + ((((((uVar7) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(pbVar23 + ((((((uVar7) << 16 >> 16)) >>> 0) >>> 3) + 6)) | 1 << (uVar7 & 7)) & 0xff);
      (regs.eax = FUN_005e56d3(heap, pbVar23));
      uVar5 = (((uVar5 - 1 & 3) + 4) & 0xffff);
      heap.setU8((pbVar22 + ((((((uVar5) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(pbVar22 + ((((((uVar5) << 16 >> 16)) >>> 0) >>> 3) + 6)) | 1 << (uVar5 & 7)) & 0xff);
      (regs.eax = FUN_005e56d3(heap, pbVar22));
      uVar5 = (((((uVar19) & 0xffff) & 3) + 4) & 0xffff);
      heap.setU8((unaff_ESI + ((((((uVar5) << 16 >> 16)) >>> 0) >>> 3) + 6)), (heap.u8(unaff_ESI + ((((((uVar5) << 16 >> 16)) >>> 0) >>> 3) + 6)) | 1 << (uVar5 & 7)) & 0xff);
      uVar6 = (((regs.eax = FUN_005e56d3(heap))) >>> 0);
      uVar11 = ((extraout_ECX_01) >>> 0);
      break;
    }
  }
  }
  uVar19 = ((uVar19 + 1) >>> 0);
  if (3 < uVar19) {
    /* goto LAB_00448a43 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_00448a43"); return 0;
  }
  /* goto LAB_00448869 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004484cb/LAB_00448869"); return 0;
}
