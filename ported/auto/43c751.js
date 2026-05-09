// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c751.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22, CONCAT31, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00425432 } from "./425432.js";
import { FUN_0042547b } from "./42547b.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_0043c49e } from "./43c49e.js";
import { FUN_0043d38b } from "./43d38b.js";
import { FUN_0043e304 } from "./43e304.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_004405f3 } from "./4405f3.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0043c751(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_stack0xffffffec = __sp + 0;
  const __addr_uStack_8 = __sp + 4;
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let bVar4 = 0;
  let uVar3 = 0;
  let extraout_CL = 0;
  let extraout_CL_00 = 0;
  let extraout_CL_01 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let extraout_CX_02 = 0;
  let extraout_CX_03 = 0;
  let extraout_CX_04 = 0;
  let uVar6 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let extraout_ECX_02 = 0;
  let extraout_ECX_03 = 0;
  let bVar7 = 0;
  let extraout_DL = 0;
  let extraout_DL_00 = 0;
  let uVar8 = 0;
  let extraout_DX = 0;
  let extraout_DX_00 = 0;
  let extraout_DX_01 = 0;
  let extraout_DX_02 = 0;
  let bVar10 = 0;
  let extraout_var = 0;
  let extraout_var_00 = 0;
  let extraout_EDX = 0;
  let uVar9 = 0;
  let cVar11 = 0;
  let uVar12 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar13 = 0;
  let pbVar14 = 0;
  let uVar15 = 0;
  let iVar16 = 0;
  let bVar17 = 0;
  let uVar18 = 0;
  let uVar19 = 0;
  let pbVar20 = 0;
  let uStack_4 = 0;
  LAB_0043ccb4: {
  LAB_0043cc63: {
  LAB_0043c875: {
  heap.setU32(0x0062d3f4, (0) >>> 0);
  heap.setU8(0x006293d9, (heap.i8((unaff_ESI + 0x71))) & 0xff);
  if ((heap.u8(0x006293d9) | 0) == -2) {
    heap.setU8((unaff_ESI + 0x71), (0xff) & 0xff);
  }
  bVar17 = ((heap.u8((unaff_ESI + 0x2b)) < 6) & 0xff);
  if (heap.u8((unaff_ESI + 0x2b)) == 6) {
    heap.setI16((unaff_ESI + 0x7a), (heap.i16((unaff_ESI + 0x7a)) + 1) & 0xffff);
    uVar2 = ((heap.u16((unaff_ESI + 0x74))) & 0xffff);
    bVar17 = ((uVar2 != 0xffff) & 0xff);
    if (uVar2 != 0xffff) {
      uVar13 = ((((uVar2) >>> 0)) >>> 0);
      uVar2 = ((heap.u32((0x00743ba2) + (uVar13 * 0x80) * 4) - heap.i16((unaff_ESI + 0xe))) & 0xffff);
      if (((uVar2) << 16 >> 16) < 0) {
        uVar2 = ((-uVar2) & 0xffff);
      }
      uVar5 = ((heap.u32((0x00743ba4) + (uVar13 * 0x80) * 4) - heap.i16((unaff_ESI + 0x10))) & 0xffff);
      if (((uVar5) << 16 >> 16) < 0) {
        uVar5 = ((-uVar5) & 0xffff);
      }
      uVar8 = ((heap.u32((0x00743ba6) + (uVar13 * 0x80) * 4) - heap.i16((unaff_ESI + 0x12))) & 0xffff);
      if (((uVar8) << 16 >> 16) < 0) {
        uVar8 = ((-uVar8) & 0xffff);
      }
      bVar17 = ((uVar8 < 10) & 0xff);
      if (uVar8 < 0xb) {
        uVar8 = ((uVar5) & 0xffff);
        if (uVar2 < uVar5) {
          uVar8 = ((uVar2) & 0xffff);
          uVar2 = ((uVar5) & 0xffff);
        }
        uVar2 = ((uVar2 + (uVar8 >>> 1)) & 0xffff);
        uVar3 = ((((uVar2) >>> 0)) >>> 0);
        if (uVar2 < 8) {
          /* goto LAB_0043c84c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c84c"); return 0;
        }
        if (0xc < uVar2) {
          unaff_EBX = ((heap.u32((unaff_ESI + 0xe)) & 0xffe0ffe0) >>> 0);
          bVar17 = (((heap.u32((0x00743ba2 + uVar13 * 0x80)) & 0xffe0ffe0) < unaff_EBX) & 0xff);
          if ((heap.u32((0x00743ba2 + uVar13 * 0x80)) & 0xffe0ffe0) != unaff_EBX) {
            break LAB_0043c875;
          }
        }
        bVar10 = ((heap.u32((0x00743bb2) + (uVar13 * 0x100) * 4)) & 0xff);
        bVar17 = ((bVar10 < heap.u8((unaff_ESI + 0x1e))) & 0xff);
        if (bVar10 == heap.u8((unaff_ESI + 0x1e))) {
          switch (bVar10 >>> 3 & 3) {
            case 0:
              uVar2 = ((heap.u16((unaff_ESI + 0xe))) & 0xffff);
              uVar3 = ((((uVar2) >>> 0)) >>> 0);
              bVar17 = ((uVar2 < heap.u32(((0x00743ba2) & 0xffff) + (uVar13 * 0x80) * 4)) & 0xff);
              if (((uVar2) << 16 >> 16) < ((heap.u32((0x00743ba2) + (uVar13 * 0x80) * 4)) << 16 >> 16)) {
                LAB_0043c84c: if (heap.u8((unaff_ESI + 0x71)) < 0xfe) {
                  uStack_4 = ((0x43c857) >>> 0);
                  uVar3 = (((regs.eax = FUN_0043c49e(heap))) >>> 0);
                }
                if ((heap.i8((unaff_ESI + 0x71)) | 0) == -1) {
                  heap.setU8((unaff_ESI + 0x71), (0xfe) & 0xff);
                  heap.setU8((unaff_ESI + 0x6f), (2) & 0xff);
                  if ((heap.u8(0x006293d9) | 0) != -2) {
                    uStack_4 = ((0x43c873) >>> 0);
                    uVar3 = (((regs.eax = FUN_005e53ca(heap))) >>> 0);
                  }
                }
                return uVar3;
              }
              break;
            case 1:
              uVar2 = ((heap.u16((unaff_ESI + 0x10))) & 0xffff);
              uVar3 = ((((uVar2) >>> 0)) >>> 0);
              bVar17 = ((uVar2 < heap.u32(((0x00743ba4) & 0xffff) + (uVar13 * 0x80) * 4)) & 0xff);
              if (((heap.u32((0x00743ba4) + (uVar13 * 0x80) * 4)) << 16 >> 16) < ((uVar2) << 16 >> 16)) {
                /* goto LAB_0043c84c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c84c"); return 0;
              }
              break;
            case 2:
              uVar2 = ((heap.u16((unaff_ESI + 0xe))) & 0xffff);
              uVar3 = ((((uVar2) >>> 0)) >>> 0);
              bVar17 = ((uVar2 < heap.u32(((0x00743ba2) & 0xffff) + (uVar13 * 0x80) * 4)) & 0xff);
              if (((heap.u32((0x00743ba2) + (uVar13 * 0x80) * 4)) << 16 >> 16) < ((uVar2) << 16 >> 16)) {
                /* goto LAB_0043c84c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c84c"); return 0;
              }
              break;
            case 3:
              uVar2 = ((heap.u16((unaff_ESI + 0x10))) & 0xffff);
              uVar3 = ((((uVar2) >>> 0)) >>> 0);
              bVar17 = ((uVar2 < heap.u32(((0x00743ba4) & 0xffff) + (uVar13 * 0x80) * 4)) & 0xff);
              if (((uVar2) << 16 >> 16) < ((heap.u32((0x00743ba4) + (uVar13 * 0x80) * 4)) << 16 >> 16)) {
                /* goto LAB_0043c84c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c84c"); return 0;
              }
          }
        }
      }
    }
  }
  }
  uStack_4 = ((0x43c87a) >>> 0);
  uVar13 = (((regs.eax = FUN_0043c49e(heap))) >>> 0);
  heap.setU32(__addr_uStack_8, (extraout_ECX) >>> 0);
  uVar6 = ((extraout_var) & 0xffff);
  if (!bVar17) {
    bVar17 = ((false) & 0xff);
    heap.setU32(0x0062d3f4, (heap.u32(0x0062d3f4) | 1) >>> 0);
    unaff_EBX = ((heap.u32((unaff_ESI + 0x2e))) >>> 0);
    uStack_4 = ((0x43c88f) >>> 0);
    uVar13 = (((regs.eax = callIndirect(heap, heap.u32((0x0062d3fc + unaff_EBX * 4))))) >>> 0);
    if (bVar17) {
      return uVar13;
    }
    uStack_4 = ((0x43c896) >>> 0);
    uVar13 = (((regs.eax = FUN_0043c49e(heap))) >>> 0);
    heap.setU32(__addr_uStack_8, (extraout_ECX_00) >>> 0);
    uVar6 = ((extraout_var_00) & 0xffff);
    if (!bVar17) {
      return uVar13;
    }
  }
  uVar2 = ((((uVar13) & 0xffff)) & 0xffff);
  uVar5 = ((((heap.u32(__addr_uStack_8)) & 0xffff)) & 0xffff);
  uVar15 = ((CONCAT22((((unaff_EBX >>> 0x10)) << 16 >> 16), uVar2) & 0xffffffe0) >>> 0);
  uVar3 = ((CONCAT22(uVar6, uVar5) & 0xffffffe0) >>> 0);
  uVar12 = ((((uVar15) & 0xffff)) & 0xffff);
  uVar8 = ((((uVar3) & 0xffff)) & 0xffff);
  if ((uVar12 == heap.u16((unaff_ESI + 0x24))) && (uVar8 == heap.u16((unaff_ESI + 0x26)))) {
    LAB_0043c8b4: uStack_4 = ((0x43c8b9) >>> 0);
    (regs.eax = FUN_0043d38b(heap));
    uStack_4 = ((0x43c8be) >>> 0);
    (regs.eax = FUN_005e53ca(heap));
    uStack_4 = ((0x43c8c3) >>> 0);
    (regs.eax = FUN_00444927(heap));
    uStack_4 = ((0x43c8c8) >>> 0);
    uVar13 = (((regs.eax = FUN_005e53ca(heap))) >>> 0);
    return uVar13;
  }
  if ((((uVar2) << 16 >> 16) < 0x20) || (((((uVar5) << 16 >> 16) < 0x20 || (0xfdf < uVar2)) || (0xfdf < uVar5)))) {
    if (heap.i8((unaff_ESI + 0x2a)) == 1) {
      heap.setU32(0x0062d3f4, (heap.u32(0x0062d3f4) | 2) >>> 0);
    }
  } else {
    bVar10 = ((((heap.u16((unaff_ESI + 0x12)) >>> 2) & 0xff)) & 0xff);
    bVar7 = ((bVar10 - 5) & 0xff);
    if (bVar10 < 5) {
      bVar7 = ((0) & 0xff);
    }
    bVar10 = ((bVar10 + 1) & 0xff);
    pbVar14 = ((heap.u32((0x00971ef4) + (((((uVar8 << 7 | uVar8 >>> 9 | uVar12) & 0xffff) >>> 5 | (uVar8 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      uVar15 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar15 >>> 8)), heap.u8(pbVar14)) & 0xffffff3c) >>> 0);
      cVar11 = ((((uVar15) << 24 >> 24)) & 0xff);
      uStack_4 = ((uVar13) >>> 0);
      if (cVar11 == 4) {
        if ((bVar7 <= heap.u8(pbVar14 + (2))) && (heap.u8(pbVar14 + (2)) <= bVar10)) {
          heap.setU8(0x006293c9, ((heap.u32((0x00630cb7) + (heap.u8(pbVar14 + (5)) & 0xf) * 4) & 0x20) != 0) & 0xff);
          bVar17 = ((false) & 0xff);
          uVar13 = (((regs.eax = FUN_0042547b(heap))) >>> 0);
          if (bVar17) {
            if (heap.i8((unaff_ESI + 0x2a)) == 0) {
              /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
            }
          } else {
            if (heap.i8((unaff_ESI + 0x2a)) == 1) {
            /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
          }
          }
          uVar2 = ((extraout_CX_01) & 0xffff);
          if ((heap.i8((unaff_ESI + 0x2e)) == 0) && ((heap.u8(pbVar14 + (4)) & 0xf0) == 0)) {
            if (heap.u8(pbVar14 + (7)) == 0xff) {
              heap.setU8((unaff_ESI + 0x79), (0xff) & 0xff);
            } else {
              if (heap.i8((unaff_ESI + 0x2b)) == 6) {
              if (heap.u8(pbVar14 + (7)) != heap.u8((unaff_ESI + 0x68))) {
                /* goto LAB_0043d02c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043d02c"); return 0;
              }
            } else {
              if (heap.u8(pbVar14 + (7)) != heap.u8((unaff_ESI + 0x79))) {
              heap.setU8((unaff_ESI + 0xf4), (0) & 0xff);
              bVar17 = ((false) & 0xff);
              uVar19 = (((regs.eax = FUN_0043e304(heap))) >>> 0);
              uVar13 = ((((uVar19) >>> 0)) >>> 0);
              bVar10 = ((((uVar19 >>> 0x20) & 0xff)) & 0xff);
              if (!bVar17) {
                heap.setU8((unaff_ESI + 0x79), (bVar10) & 0xff);
                /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
              }
              heap.setU8((unaff_ESI + 0x79), (bVar10) & 0xff);
              iVar16 = ((((bVar10) >>> 0) * 0x260) >>> 0);
              bVar10 = ((((uVar19 >>> 0x28) & 0xff)) & 0xff);
              uVar15 = ((((bVar10) >>> 0)) >>> 0);
              LOCK();
              uVar6 = ((heap.u16((0x00887472 + uVar15 * 2 + iVar16))) & 0xffff);
              heap.setU16((0x00887472 + uVar15 * 2 + iVar16), (heap.u16((unaff_ESI + 10))) & 0xffff);
              UNLOCK();
              heap.setU32(((0x0088747a) + (iVar16 + uVar15) * 4), (heap.u32((0x0088747a) + (iVar16 + uVar15) * 4) + 1) & 0xffffffff);
              heap.setU16((unaff_ESI + 0x74), (uVar6) & 0xffff);
              (regs.eax = FUN_0044142c(heap));
              heap.setU8((unaff_ESI + 0x68), (extraout_DL_00) & 0xff);
              heap.setU8((unaff_ESI + 0x69), (bVar10) & 0xff);
              heap.setU8((unaff_ESI + 0x2b), (6) & 0xff);
              heap.setU8((unaff_ESI + 0xf5), (0) & 0xff);
              uVar18 = (((regs.eax = FUN_00441452(heap))) >>> 0);
              uVar3 = ((((((uVar18) >>> 0) >>> 0x20) >>> 0)) >>> 0);
              heap.setU8((unaff_ESI + 0x2c), (10) & 0xff);
              heap.setU8((unaff_ESI + 0x36), (2) & 0xff);
              heap.setU16((unaff_ESI + 0x7a), (0) & 0xffff);
              uVar2 = ((extraout_CX_03) & 0xffff);
              if ((heap.u16((unaff_ESI + 200)) & 8) != 0) {
                heap.setU16((0x00971e86 + 0), (heap.u16((unaff_ESI + 0x22))) & 0xffff);
                unique0x00017200 = ((heap.u32((unaff_ESI + 0x9c))) >>> 0);
                uVar9 = ((uVar3 & 0xff) >>> 0);
                heap.setU16((0x00971e8a + 2), (heap.u32((0x00887442) + (uVar9 * 0x130) * 4)) & 0xffff);
                heap.setU32(0x00971e8e, (heap.u32((0x00887444) + (uVar9 * 0x98) * 4)) >>> 0);
                (regs.eax = FUN_0042c711(heap, iVar16, unaff_ESI, 1, __addr_stack0xffffffec, uVar15, uVar3, extraout_ECX_01, ((uVar18) >>> 0)));
              }
            }
            }
            }
          } else {
            heap.setU8((unaff_ESI + 0x79), (0xff) & 0xff);
            if (heap.i8((unaff_ESI + 0x2b)) == 6) {
              LAB_0043d02c: (regs.eax = FUN_0043e792(heap));
              (regs.eax = FUN_0044142c(heap));
              heap.setU8((unaff_ESI + 0x2b), (1) & 0xff);
              uVar13 = (((regs.eax = FUN_00441452(heap))) >>> 0);
              uVar2 = ((extraout_CX_02) & 0xffff);
            }
          }
          bVar10 = ((heap.u8(pbVar14 + (2))) & 0xff);
          uVar5 = ((((bVar10) & 0xffff)) & 0xffff);
          bVar7 = ((heap.u8(pbVar14 + (4))) & 0xff);
          heap.setI16((unaff_ESI + 0x24), (((uVar13) << 16 >> 16)) & 0xffff);
          heap.setU16((unaff_ESI + 0x26), (uVar2) & 0xffff);
          heap.setU8((unaff_ESI + 0x28), (bVar10) & 0xff);
          heap.setU8((unaff_ESI + 0x29), (bVar7 & 7) & 0xff);
          if (heap.i8((unaff_ESI + 0x2e)) == 0) {
            bVar10 = ((heap.u8((unaff_ESI + 0xef))) & 0xff);
            heap.setU8((unaff_ESI + 0xef), (heap.u8((unaff_ESI + 0xef)) & 0xc0) & 0xff);
            heap.setU8((unaff_ESI + 0xef), (heap.u8((unaff_ESI + 0xef)) | (bVar10 & 0x1f) << 1) & 0xff);
            if (((heap.u8(0x006293c9) != 0) && (heap.setU8((unaff_ESI + 0xef), (heap.u8((unaff_ESI + 0xef)) | 1) & 0xff), (heap.u8((unaff_ESI + 0xef)) & 0x3e) != 0)) && ((heap.u8((unaff_ESI + 0xef)) & 0xc0) == 0)) {
              uVar8 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
              uVar5 = ((extraout_DX_00) & 0xffff);
              if (uVar8 < 0x2aab) {
                (regs.eax = FUN_00440fe3(heap));
                pbVar14 = (((unaff_ESI + 0x3b)) >>> 0);
                bVar10 = ((heap.u8(pbVar14)) & 0xff);
                heap.setU32(pbVar14, (heap.u8(pbVar14) - 0x11) & 0xffffffff);
                uVar5 = ((extraout_DX_01) & 0xffff);
                if (bVar10 < 0x11) {
                  heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
                }
              }
              heap.setU8((unaff_ESI + 0xef), (heap.u8((unaff_ESI + 0xef)) | 0xc0) & 0xff);
            }
            if (((heap.u8((unaff_ESI + 0xef)) & 0xc0) != 0) && (uVar8 = (((regs.eax = FUN_005df40c(heap))) & 0xffff), uVar5 = ((extraout_DX_02) & 0xffff), uVar2 = ((extraout_CX_04) & 0xffff), uVar8 < 0x1112)) {
              heap.setI8((unaff_ESI + 0xef), (heap.i8((unaff_ESI + 0xef)) + -0x40) & 0xff);
            }
            uVar2 = ((heap.u32((0x00991f8e) + ((((((uVar13 & 0xfe0) << 2) & 0xffff) | uVar2 >>> 5) & 0xffff)) * 4)) & 0xffff);
            uVar13 = ((0) >>> 0);
            while (uVar2 != 0xffff) {
              uVar15 = ((((uVar2) >>> 0)) >>> 0);
              iVar16 = ((uVar15 * 0x100) >>> 0);
              uVar3 = ((uVar13) >>> 0);
              if (heap.u32((0x00743b94) + (iVar16) * 4) == 1) {
                if (heap.u32((0x00743bbf) + (iVar16) * 4) == 5) {
                  uVar2 = ((heap.u32((0x00743ba6) + (uVar15 * 0x80) * 4) + uVar5 * -4) & 0xffff);
                  if (((uVar2) << 16 >> 16) < 0) {
                    uVar2 = ((-uVar2) & 0xffff);
                  }
                  if (uVar2 < 0x11) {
                    uVar3 = ((uVar13 + 0x10000) >>> 0);
                  }
                }
              } else {
                if (heap.u32((0x00743b94) + (iVar16) * 4) == 3) {
                uVar2 = ((heap.u32((0x00743ba6) + (uVar15 * 0x80) * 4) + uVar5 * -4) & 0xffff);
                if (((uVar2) << 16 >> 16) < 0) {
                  uVar2 = ((-uVar2) & 0xffff);
                }
                if (uVar2 < 0x11) {
                  uVar3 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), ((uVar13) << 24 >> 24) + 1)) >>> 0);
                  if (heap.u32(((0x00743b95) & 0xff) + (iVar16) * 4) < 2) {
                    uVar3 = ((CONCAT22((((uVar13 >>> 0x10)) << 16 >> 16), CONCAT11((((uVar13 >>> 8)) << 24 >> 24) + 1, ((uVar13) << 24 >> 24)))) >>> 0);
                  }
                }
              }
              }
              uVar13 = ((uVar3) >>> 0);
              uVar2 = ((heap.u32((0x00743b96) + (uVar15 * 0x80) * 4)) & 0xffff);
            }
            if (((0x9ffff < uVar13) && (heap.i8((unaff_ESI + 0x2b)) == 5)) && (uVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xffff), uVar13 = ((extraout_ECX_02) >>> 0), uVar2 < 0x5556)) {
              (regs.eax = FUN_00440fe3(heap));
              pbVar14 = (((unaff_ESI + 0x3b)) >>> 0);
              bVar10 = ((heap.u8(pbVar14)) & 0xff);
              heap.setU32(pbVar14, (heap.u8(pbVar14) - 0xe) & 0xffffffff);
              uVar13 = ((extraout_ECX_03) >>> 0);
              if (bVar10 < 0xe) {
                heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
              }
            }
            uVar6 = ((((uVar13) & 0xffff)) & 0xffff);
            if (2 < ((uVar13) & 0xff)) {
              uVar6 = ((((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), 3)) & 0xffff)) & 0xffff);
            }
            if (2 < ((((uVar6) & 0xffff) >>> 8) & 0xff)) {
              uVar6 = ((CONCAT11(3, ((uVar6) << 24 >> 24))) & 0xffff);
            }
            uVar13 = ((CONCAT11(heap.u8((unaff_ESI + 0xe3)), heap.u8((unaff_ESI + 0xe3))) & 0xffffff0f) >>> 0);
            uVar2 = ((CONCAT11((((uVar13 >>> 8)) << 24 >> 24), ((uVar13) << 24 >> 24) << 2 | ((((uVar6) & 0xffff) >>> 8) & 0xff)) & 0xc0ff) & 0xffff);
            bVar7 = ((((uVar2) & 0xff)) & 0xff);
            bVar4 = ((((uVar2 >>> 8) & 0xff)) & 0xff);
            bVar10 = ((bVar7 | bVar4) & 0xff);
            heap.setU8((unaff_ESI + 0xe3), (bVar10) & 0xff);
            if (bVar4 == 0) {
              uVar13 = ((CONCAT11(bVar10, bVar10) & 0xffffff03) >>> 0);
              uVar2 = ((CONCAT11(((uVar13 >>> 8) & 0xff) >>> 2, ((uVar13) << 24 >> 24)) & 0x3ff) & 0xffff);
              bVar10 = ((((uVar6) & 0xff)) & 0xff);
              if ((2 < ((((uVar2) << 24 >> 24) + (((uVar2 >>> 8)) << 24 >> 24) + ((bVar7 & 0x30) >>> 4)) & 0xff)) && (uVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xffff), bVar10 = ((extraout_CL_00) & 0xff), uVar2 < 0x2aab)) {
                (regs.eax = FUN_00440fe3(heap));
                pbVar14 = (((unaff_ESI + 0x3b)) >>> 0);
                bVar10 = ((heap.u8(pbVar14)) & 0xff);
                heap.setU32(pbVar14, (heap.u8(pbVar14) - 0x11) & 0xffffffff);
                if (bVar10 < 0x11) {
                  heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
                }
                heap.setU8((unaff_ESI + 0xe3), (heap.u8((unaff_ESI + 0xe3)) | 0xc0) & 0xff);
                bVar10 = ((extraout_CL_01) & 0xff);
              }
            } else {
              uVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
              bVar10 = ((extraout_CL) & 0xff);
              if (uVar2 < 0x1112) {
                heap.setI8((unaff_ESI + 0xe3), (heap.i8((unaff_ESI + 0xe3)) + -0x40) & 0xff);
              }
            }
            uVar13 = ((CONCAT11(heap.u8((unaff_ESI + 0xe1)), heap.u8((unaff_ESI + 0xe1))) & 0xffffff0f) >>> 0);
            uVar2 = ((CONCAT11((((uVar13 >>> 8)) << 24 >> 24), ((uVar13) << 24 >> 24) << 2 | bVar10) & 0xc0ff) & 0xffff);
            bVar7 = ((((uVar2) & 0xff)) & 0xff);
            bVar4 = ((((uVar2 >>> 8) & 0xff)) & 0xff);
            bVar10 = ((bVar7 | bVar4) & 0xff);
            heap.setU8((unaff_ESI + 0xe1), (bVar10) & 0xff);
            if (bVar4 == 0) {
              uVar13 = ((CONCAT11(bVar10, bVar10) & 0xffffff03) >>> 0);
              uVar2 = ((CONCAT11(((uVar13 >>> 8) & 0xff) >>> 2, ((uVar13) << 24 >> 24)) & 0x3ff) & 0xffff);
              if ((2 < ((((uVar2) << 24 >> 24) + (((uVar2 >>> 8)) << 24 >> 24) + ((bVar7 & 0x30) >>> 4)) & 0xff)) && (uVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xffff), uVar2 < 0x2aab)) {
                (regs.eax = FUN_00440fe3(heap));
                pbVar14 = (((unaff_ESI + 0x3b)) >>> 0);
                bVar10 = ((heap.u8(pbVar14)) & 0xff);
                heap.setU32(pbVar14, (heap.u8(pbVar14) - 0x11) & 0xffffffff);
                if (bVar10 < 0x11) {
                  heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
                }
                heap.setU8((unaff_ESI + 0xe1), (heap.u8((unaff_ESI + 0xe1)) | 0xc0) & 0xff);
              }
            } else {
              uVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
              if (uVar2 < 0x1112) {
                heap.setI8((unaff_ESI + 0xe1), (heap.i8((unaff_ESI + 0xe1)) + -0x40) & 0xff);
              }
            }
          }
          /* goto LAB_0043c8b4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c8b4"); return 0;
        }
      } else {
        if (((cVar11 == 8) && (bVar7 <= heap.u8(pbVar14 + (2)))) && ((heap.u8(pbVar14 + (2)) <= bVar10 && (iVar16 = ((((heap.u8(pbVar14 + (7))) >>> 0) * 0x260) >>> 0), (heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (iVar16) * 4) * 8)) & 0x20000) != 0)))) {
          if (((heap.i8((unaff_ESI + 0x2e)) == 0) && (heap.setU8((unaff_ESI + 0xf4), (0) & 0xff), heap.u32((0x00887441) + (iVar16) * 4) == 1)) && (heap.u8(pbVar14 + (7)) != heap.u8((unaff_ESI + 0x79)))) {
            if ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (iVar16) * 4) * 8)) & 0x200000) == 0) {
              if (heap.u8(pbVar14 + (7)) == heap.u8((unaff_ESI + 0xc5))) {
                heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
              }
              heap.setU8((unaff_ESI + 0x70), (heap.u8(0x006293d8)) & 0xff);
              (regs.eax = FUN_0044142c(heap));
              heap.setU8((unaff_ESI + 0x68), (heap.u8(pbVar14 + (7))) & 0xff);
              heap.setU8((unaff_ESI + 0x2b), (0x11) & 0xff);
              heap.setU8((unaff_ESI + 0x2c), (0) & 0xff);
              (regs.eax = FUN_00441452(heap));
              return uStack_4;
            }
            heap.setU8((unaff_ESI + 0xf4), (0) & 0xff);
            bVar17 = ((false) & 0xff);
            pbVar20 = ((pbVar14) >>> 0);
            (regs.eax = FUN_0043e304(heap, iVar16, CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), CONCAT11(bVar10, bVar7))));
            if (bVar17) {
              uVar13 = ((((heap.u8(pbVar14 + (7))) >>> 0)) >>> 0);
              if (((heap.u32((0x00887508) + (uVar13 * 0x130) * 4)) << 16 >> 16) != 0) {
                heap.setU32(((0x00887524) + (uVar13 * 0x98) * 4), (heap.u32((0x00887524) + (uVar13 * 0x98) * 4) + ((((heap.u32((0x00887508) + (uVar13 * 0x130) * 4)) << 16 >> 16)) >>> 0)) & 0xffffffff);
                heap.setU32(((0x0088751d) + (uVar13 * 0x260) * 4), (heap.u32((0x0088751d) + (uVar13 * 0x260) * 4) | 2) & 0xffffffff);
                heap.setU8(0x0099c167, (0x14) & 0xff);
                heap.setU32(0x006293b0, (0xe6) >>> 0);
                (regs.eax = FUN_004405f3(heap));
              }
              heap.setU16((unaff_ESI + 0x32), (uVar12 + 0x10) & 0xffff);
              heap.setU16((unaff_ESI + 0x34), (uVar8 + 0x10) & 0xffff);
              heap.setU8((unaff_ESI + 0x36), (3) & 0xff);
              (regs.eax = FUN_0044142c(heap));
              heap.setU8((unaff_ESI + 0x68), (heap.u8(pbVar20 + (7))) & 0xff);
              heap.setU8((unaff_ESI + 0x2b), (7) & 0xff);
              heap.setU8((unaff_ESI + 0x2c), (0x13) & 0xff);
              (regs.eax = FUN_00441452(heap));
              heap.setU8((unaff_ESI + 0xe2), (0) & 0xff);
              heap.setI16((0x008874f0 + extraout_EDX * 0x260), (heap.i16((0x008874f0 + extraout_EDX * 0x260)) + 1) & 0xffff);
              if ((heap.u16((unaff_ESI + 200)) & 8) != 0) {
                heap.setU16((0x00971e86 + 0), (heap.u16((unaff_ESI + 0x22))) & 0xffff);
                unique0x00017200 = ((heap.u32((unaff_ESI + 0x9c))) >>> 0);
                heap.setU16((0x00971e8a + 2), (heap.u32((0x00887442) + (heap.u32((unaff_ESI + 0x68)) * 0x130) * 4)) & 0xffff);
                heap.setU32(0x00971e8e, (heap.u32((0x00887444) + (heap.u32((unaff_ESI + 0x68)) * 0x98) * 4)) >>> 0);
                (regs.eax = FUN_0042c711(heap, pbVar20, unaff_ESI, unaff_EBP, __addr_uStack_8, uVar15));
              }
              return uStack_4;
            }
          }
          /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
        }
        if (((cVar11 == 16) && (bVar7 <= heap.u8(pbVar14 + (2)))) && (heap.u8(pbVar14 + (2)) <= bVar10)) {
          if (heap.u8(pbVar14 + (4)) == 1) {
            heap.setU32(0x0062d3f4, (heap.u32(0x0062d3f4) | 4) >>> 0);
            heap.setU32(0x0062d3f6, (pbVar14) >>> 0);
          }
          if (heap.u8(pbVar14 + (4)) == 0) {
            if (heap.i8((unaff_ESI + 0x2e)) == 0) {
              if (heap.i8((unaff_ESI + 0x2b)) == 6) {
                heap.setU8((unaff_ESI + 0x2c), (0xb) & 0xff);
                heap.setU8((unaff_ESI + 0x70), (heap.u8(0x006293d8)) & 0xff);
                return uVar13;
              }
              if (heap.u8(pbVar14 + (7)) != heap.u8((unaff_ESI + 0x79))) {
                heap.setU8((unaff_ESI + 0xf4), (0) & 0xff);
                bVar17 = ((false) & 0xff);
                uStack_4 = ((0x43ce95) >>> 0);
                (regs.eax = FUN_0043e304(heap));
                bVar10 = ((((extraout_DX) & 0xff)) & 0xff);
                if (bVar17) {
                  heap.setU8((unaff_ESI + 0x70), (heap.u8(0x006293d8)) & 0xff);
                  heap.setU8((unaff_ESI + 0x79), (bVar10) & 0xff);
                  iVar16 = ((((bVar10) >>> 0) * 0x260) >>> 0);
                  bVar10 = ((((((extraout_DX) & 0xffff) >>> 8) & 0xff)) & 0xff);
                  LOCK();
                  uVar6 = ((heap.u16((0x00887472 + ((bVar10) >>> 0) * 2 + iVar16))) & 0xffff);
                  heap.setU16((0x00887472 + ((bVar10) >>> 0) * 2 + iVar16), (heap.u16((unaff_ESI + 10))) & 0xffff);
                  UNLOCK();
                  heap.setU32(((0x0088747a) + (iVar16 + ((bVar10) >>> 0)) * 4), (heap.u32((0x0088747a) + (iVar16 + ((bVar10) >>> 0)) * 4) + 1) & 0xffffffff);
                  heap.setU16((unaff_ESI + 0x74), (uVar6) & 0xffff);
                  uStack_4 = ((0x43ced3) >>> 0);
                  (regs.eax = FUN_0044142c(heap));
                  heap.setU8((unaff_ESI + 0x68), (extraout_DL) & 0xff);
                  heap.setU8((unaff_ESI + 0x69), (bVar10) & 0xff);
                  heap.setU8((unaff_ESI + 0x2b), (6) & 0xff);
                  heap.setU8((unaff_ESI + 0xf5), (0) & 0xff);
                  uStack_4 = ((0x43cee9) >>> 0);
                  uVar18 = (((regs.eax = FUN_00441452(heap))) >>> 0);
                  uStack_4 = ((((uVar18) >>> 0)) >>> 0);
                  heap.setU8((unaff_ESI + 0x2c), (0xb) & 0xff);
                  heap.setU16((unaff_ESI + 0x7a), (0) & 0xffff);
                  if ((heap.u16((unaff_ESI + 200)) & 8) != 0) {
                    heap.setU16((0x00971e86 + 0), (heap.u16((unaff_ESI + 0x22))) & 0xffff);
                    unique0x00017200 = ((heap.u32((unaff_ESI + 0x9c))) >>> 0);
                    uVar13 = ((((((uVar18) >>> 0) >>> 0x20) >>> 0) & 0xff) >>> 0);
                    heap.setU16((0x00971e8a + 2), (heap.u32((0x00887442) + (uVar13 * 0x130) * 4)) & 0xffff);
                    heap.setU32(0x00971e8e, (heap.u32((0x00887444) + (uVar13 * 0x98) * 4)) >>> 0);
                    (regs.eax = FUN_0042c711(heap, iVar16, unaff_ESI, unaff_EBP & 0xffff0000));
                  }
                  return uStack_4;
                }
                heap.setU8((unaff_ESI + 0x79), (bVar10) & 0xff);
              }
              /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
            }
          } else {
            if (heap.u8(pbVar14 + (4)) == 2) {
            if ((heap.i8((unaff_ESI + 0x2e)) != 0) || ((heap.u8(pbVar14 + (5)) & 0xf) != 0)) {
              /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
            }
            if ((heap.u8(pbVar14) & 3) != heap.u8((unaff_ESI + 0x78))) {
              if ((((heap.u8(pbVar14) & 3 ^ 2) == heap.u8((unaff_ESI + 0x78))) && (heap.i8((unaff_ESI + 0x2b)) == 5)) && (((heap.u16((unaff_ESI + 200)) & 1) != 0 || ((heap.u32(0x0087c3bc) & 1) == 0)))) {
                sVar1 = ((heap.u32((0x0065247a) + (heap.u32((unaff_ESI + 0x78)) * 2) * 4)) & 0xffff);
                heap.setI16((unaff_ESI + 0x32), (heap.i16((unaff_ESI + 0x32)) + heap.u32((0x00652478) + (heap.u32((unaff_ESI + 0x78)) * 2) * 4)) & 0xffff);
                heap.setI16((unaff_ESI + 0x34), (heap.i16((unaff_ESI + 0x34)) + sVar1) & 0xffff);
                heap.setU8((unaff_ESI + 0x36), (9) & 0xff);
                uStack_4 = ((0x43ce01) >>> 0);
                (regs.eax = FUN_005e53ca(heap));
                uStack_4 = ((0x43ce06) >>> 0);
                (regs.eax = FUN_00444927(heap));
                uStack_4 = ((0x43ce0b) >>> 0);
                (regs.eax = FUN_005e53ca(heap));
                uStack_4 = ((0x43ce10) >>> 0);
                (regs.eax = FUN_0044142c(heap));
                heap.setU8((unaff_ESI + 0x2b), (0xe) & 0xff);
                uStack_4 = ((0x43ce19) >>> 0);
                uStack_4 = (((regs.eax = FUN_00441452(heap))) >>> 0);
                heap.setU8((unaff_ESI + 0x37), (0) & 0xff);
                if ((heap.u16((unaff_ESI + 200)) & 8) != 0) {
                  heap.setU16((0x00971e86 + 0), (heap.u16((unaff_ESI + 0x22))) & 0xffff);
                  unique0x00017200 = ((heap.u32((unaff_ESI + 0x9c))) >>> 0);
                  (regs.eax = FUN_0042c711(heap, pbVar14, unaff_ESI, unaff_EBP));
                }
                return uStack_4;
              }
              /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
            }
            if (heap.i8((unaff_ESI + 0x2b)) != 13) {
              /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
            }
            if ((heap.u32(0x0087c3bc) & 1) == 0) {
              break LAB_0043ccb4;
            }
            uVar2 = (((heap.u32(0x0087c3c4) + heap.u32((0x0065247a) + (((heap.u32(0x0087c3c8)) >>> 0) * 2) * 4)) * 0x80 | ((heap.u32(0x0087c3c4) + heap.u32((0x0065247a) + (((heap.u32(0x0087c3c8)) >>> 0) * 2) * 4)) & 0xffff) >>> 9 | heap.u32(0x0087c3c2) + heap.u32((0x00652478) + (((heap.u32(0x0087c3c8)) >>> 0) * 2) * 4)) & 0xffff);
            pbVar14 = ((heap.u32((0x00971ef4) + (((uVar2 >>> 5 | uVar2 << 0xb) & 0xffff)) * 4)) >>> 0);
            break LAB_0043cc63;
          }
          }
          heap.setU8((unaff_ESI + 0x79), (0xff) & 0xff);
          /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
        }
      }
      pbVar20 = ((pbVar14 + 1) >>> 0);
      pbVar14 = ((pbVar14 + 8) >>> 0);
    } while ((heap.u8(pbVar20) & 0x80) == 0);
    uStack_4 = ((0x43c96f) >>> 0);
    uVar19 = (((regs.eax = FUN_00423677(heap))) >>> 0);
    uStack_4 = ((((uVar19) >>> 0)) >>> 0);
    uVar2 = (((((uVar19 >>> 0x20)) << 16 >> 16) - heap.i16((unaff_ESI + 0x12))) & 0xffff);
    if (((uVar2) << 16 >> 16) < 0) {
      uVar2 = ((-uVar2) & 0xffff);
    }
    if ((uVar2 < 4) || ((heap.i8((unaff_ESI + 0x2e)) == 1 && (uVar2 < 0x21)))) {
      heap.setU8((unaff_ESI + 0x79), (0xff) & 0xff);
      heap.setU16((__addr_uStack_8 + 0), (extraout_CX) & 0xffff);
      if (heap.i8((unaff_ESI + 0x2b)) == 6) {
        uStack_4 = ((0x43cf5a) >>> 0);
        (regs.eax = FUN_0043e792(heap));
        uStack_4 = ((0x43cf5f) >>> 0);
        (regs.eax = FUN_0044142c(heap));
        heap.setU8((unaff_ESI + 0x2b), (1) & 0xff);
        uStack_4 = ((0x43cf68) >>> 0);
        uStack_4 = (((regs.eax = FUN_00441452(heap))) >>> 0);
        heap.setU16((__addr_uStack_8 + 0), (extraout_CX_00) & 0xffff);
      }
      bVar17 = ((false) & 0xff);
      (regs.eax = FUN_00425432(heap));
      if (!bVar17) {
        uVar2 = ((((uStack_4) & 0xffff) & 0xffe0) & 0xffff);
        pbVar14 = ((heap.u32((0x00971ef4) + ((((((((heap.u32(__addr_uStack_8)) & 0xffff) & 0xffe0) << 7 | ((heap.u32(__addr_uStack_8)) & 0xffff) >>> 9 | uVar2) & 0xffff) >>> 5 | (((heap.u32(__addr_uStack_8)) & 0xffff) >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
        bVar10 = ((heap.u8(pbVar14)) & 0xff);
        while ((bVar10 & 0x3c) != 0) {
          pbVar14 = ((pbVar14 + 8) >>> 0);
          bVar10 = ((heap.u8(pbVar14)) & 0xff);
        }
        if ((heap.u8(pbVar14 + (5)) & 0x1f) == 0) {
          heap.setU16((unaff_ESI + 0x24), (uVar2) & 0xffff);
          heap.setU16((unaff_ESI + 0x26), (((heap.u32(__addr_uStack_8)) & 0xffff) & 0xffe0) & 0xffff);
          bVar10 = ((heap.u8(pbVar14 + (2))) & 0xff);
          heap.setU8((unaff_ESI + 0x29), (8) & 0xff);
          heap.setU8((unaff_ESI + 0x28), (bVar10) & 0xff);
          /* goto LAB_0043c8b4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c8b4"); return 0;
        }
      }
    }
  }
  LAB_0043c992: heap.setU8((unaff_ESI + 0x78), (heap.u8((unaff_ESI + 0x78)) ^ 2) & 0xff);
  uVar2 = (((heap.u16((unaff_ESI + 0xe)) & 0xffe0) + 0x10) & 0xffff);
  heap.setU16((unaff_ESI + 0x32), (uVar2) & 0xffff);
  heap.setU16((unaff_ESI + 0x34), ((heap.u16((unaff_ESI + 0x10)) & 0xffe0) + 0x10) & 0xffff);
  heap.setU8((unaff_ESI + 0x36), (5) & 0xff);
  return ((uVar2) >>> 0);
  }
  do {
    if (((heap.u8(pbVar14) & 0x3c) == 4) && (heap.u8(pbVar14 + (4)) >>> 4 != 0)) {
      if ((heap.u8(pbVar14 + (4)) & 4) == 0) {
        bVar10 = ((heap.u8(pbVar14 + (2))) & 0xff);
      } else {
        if ((heap.u8(pbVar14 + (4)) & 3) == heap.u32(0x0087c3c8)) {
        bVar10 = ((heap.u8(pbVar14 + (2))) & 0xff);
      } else {
        if ((heap.u8(pbVar14 + (4)) & 3 ^ 2) != heap.u32(0x0087c3c8)) {
          /* goto LAB_0043cca7 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043cca7"); return 0;
        }
        bVar10 = ((heap.u8(pbVar14 + (2)) + 4) & 0xff);
      }
      }
      if (((heap.u32(0x0087c3c6) >>> 2) & 0xff) == bVar10) {
        uStack_4 = ((uVar15) >>> 0);
        if (heap.u32(0x0087c3c0) != 0) {
          uVar13 = ((((heap.u32(0x0087c3c0)) >>> 0)) >>> 0);
          if ((heap.u16((unaff_ESI + 0xca)) & 0x4000) != 0) {
            if (heap.i8((unaff_ESI + 0xf0)) == 2) {
              uVar13 = ((((heap.u32(0x0087c3c0) >>> 1) >>> 0)) >>> 0);
              heap.setU16((unaff_ESI + 0xca), (heap.u16((unaff_ESI + 0xca)) & 0xbfff) & 0xffff);
              heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 8) & 0xff);
            }
            if (heap.i8((unaff_ESI + 0xf0)) == 0) {
              uVar13 = ((0) >>> 0);
              heap.setU16((unaff_ESI + 0xca), (heap.u16((unaff_ESI + 0xca)) & 0xbfff) & 0xffff);
              heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 8) & 0xff);
            }
          }
          if (heap.u32((unaff_ESI + 0xa0)) < uVar13) {
            /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
          }
          heap.setU32(0x0087d720, (heap.u32(0x0087d720) + uVar13) >>> 0);
          heap.setU8(0x0099c167, (0x10) & 0xff);
          heap.setU32(0x006293b0, (0xe4) >>> 0);
          heap.setU32(__addr_uStack_8, (0x43cd44) >>> 0);
          uVar13 = (((regs.eax = FUN_004405f3(heap))) >>> 0);
          heap.setU16((unaff_ESI + 200), (heap.u16((unaff_ESI + 200)) | 0x20) & 0xffff);
        }
        heap.setU32(0x0087d71c, (heap.u32(0x0087d71c) + 1) >>> 0);
        heap.setU32(__addr_uStack_8, (uStack_4) >>> 0);
        uStack_4 = ((uVar13) >>> 0);
        (regs.eax = FUN_005e5301(heap));
        heap.setU8((unaff_ESI + 0x37), (1) & 0xff);
        sVar1 = ((heap.u32((0x0065247a) + (heap.u32((unaff_ESI + 0x78)) * 2) * 4)) & 0xffff);
        heap.setI16((unaff_ESI + 0x32), (heap.i16((unaff_ESI + 0x32)) + heap.u32((0x00652478) + (heap.u32((unaff_ESI + 0x78)) * 2) * 4)) & 0xffff);
        heap.setI16((unaff_ESI + 0x34), (heap.i16((unaff_ESI + 0x34)) + sVar1) & 0xffff);
        heap.setU8((unaff_ESI + 0x36), (7) & 0xff);
        uStack_4 = ((0x43cd9b) >>> 0);
        (regs.eax = FUN_005e53ca(heap));
        uStack_4 = ((0x43cda0) >>> 0);
        (regs.eax = FUN_00444927(heap));
        uStack_4 = ((0x43cda5) >>> 0);
        uVar13 = (((regs.eax = FUN_005e53ca(heap))) >>> 0);
        return uVar13;
      }
    }
    LAB_0043cca7: pbVar20 = ((pbVar14 + 1) >>> 0);
    pbVar14 = ((pbVar14 + 8) >>> 0);
    heap.setU32(__addr_uStack_8, (uVar15) >>> 0);
  } while ((heap.u8(pbVar20) & 0x80) == 0);
  }
  heap.setU8((unaff_ESI + 0x2b), (0xe) & 0xff);
  heap.setU8((unaff_ESI + 0x37), (1) & 0xff);
  heap.setU32(0x0087c81e, (heap.u32(0x0087c81e) + -1) >>> 0);
  uStack_4 = ((0x43ccc8) >>> 0);
  (regs.eax = FUN_00441452(heap));
  /* goto LAB_0043c992 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043c751/LAB_0043c992"); return 0;
} finally {
    heap.freeFrame(8);
  }
}
