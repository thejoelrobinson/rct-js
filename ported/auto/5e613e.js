// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e613e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31, SCARRY2 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00431510 } from "./431510.js";
import { FUN_0043fdfb } from "./43fdfb.js";
import { FUN_00440143 } from "./440143.js";
import { FUN_0044c219 } from "./44c219.js";
import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_005e613e(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_ECX = 0;
  let uVar8 = 0;
  let sVar9 = 0;
  let pbVar10 = 0;
  let pbVar11 = 0;
  let extraout_EDX = 0;
  let cVar12 = 0;
  let sVar13 = 0;
  let uVar14 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar15 = 0;
  let iVar16 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar17 = 0;
  let iVar18 = 0;
  let uVar19 = 0;
  heap.setU32(0x0099fdf0, (((in_EAX) << 16 >> 16)) >>> 0);
  sVar13 = ((((unaff_EBX) << 16 >> 16)) & 0xffff);
  heap.setU32(0x0099fdf2, (sVar13) >>> 0);
  if ((heap.u32(0x0099a500) & 1) == 0) {
    uVar19 = (((regs.edx = 0xff79, regs.eax = FUN_00431510(heap))) >>> 0);
    pbVar11 = (((((uVar19) >>> 0) >>> 0x20)) >>> 0);
    uVar6 = ((((uVar19) >>> 0)) >>> 0);
    cVar12 = ((((unaff_EBX) << 24 >> 24)) & 0xff);
    if (cVar12 == 3) {
      uVar8 = ((((heap.u8(pbVar11 + (7))) >>> 0)) >>> 0);
      iVar16 = ((uVar8 * 0x260) >>> 0);
      if ((heap.u8(pbVar11) & 0x3c) == 0x10) {
        if (heap.u8(pbVar11 + (4)) != 0) {
          heap.setU32(0x005f54f0, (0x56d) >>> 0);
          if (1 < heap.u32(((0x00887497) & 0xff) + (iVar16) * 4)) {
            heap.setU32(0x005f54f0, (0x56e) >>> 0);
          }
          heap.setU32(0x005f54f2, (heap.u32((0x00887442) + (uVar8 * 0x130) * 4)) >>> 0);
          heap.setU32(0x005f54f4, (heap.u32(((0x00887444) & 0xffff) + (uVar8 * 0x98) * 4)) >>> 0);
          heap.setU32(0x005f54f6, (((heap.u32(((0x00887444) >>> 0) + (uVar8 * 0x98) * 4) >>> 0x10) & 0xffff)) >>> 0);
          uVar5 = (((heap.u8(pbVar11 + (5)) & 0x70) >>> 4) >>> 0);
          uVar15 = ((uVar5) >>> 0);
          do {
            if ((heap.u32((0x0088744a) + (uVar8 * 0x130 + uVar15) * 4) | 0) == -1) {
              uVar5 = ((uVar5 - 1) >>> 0);
            }
            uVar15 = ((uVar15 - 1) >>> 0);
          } while (-1 < (((uVar15) | 0) | 0));
          heap.setU32(0x005f54fa, (((uVar5) << 16 >> 16) + 1) >>> 0);
          return uVar6;
        }
        heap.setU32(0x005f54f2, (0x56b) >>> 0);
        if (1 < heap.u32(((0x00887497) & 0xff) + (iVar16) * 4)) {
          heap.setU32(0x005f54f2, (0x56c) >>> 0);
        }
        heap.setU32(0x005f54f4, (heap.u32((0x00887442) + (uVar8 * 0x130) * 4)) >>> 0);
        heap.setU32(0x005f54f6, (heap.u32(((0x00887444) & 0xffff) + (uVar8 * 0x98) * 4)) >>> 0);
        heap.setU32(0x005f54f8, ((((heap.u32(((0x00887444) >>> 0) + (uVar8 * 0x98) * 4) >>> 0x10)) << 16 >> 16)) >>> 0);
        uVar4 = (((heap.u8(pbVar11 + (5)) & 0x70) >>> 4) >>> 0);
        uVar15 = ((uVar4) >>> 0);
        uVar5 = ((uVar4) >>> 0);
        do {
          if ((heap.u32((0x0088744a) + (uVar8 * 0x130 + uVar5) * 4) | 0) == -1) {
            uVar15 = ((uVar15 - 1) >>> 0);
          }
          uVar5 = ((uVar5 - 1) >>> 0);
        } while (-1 < (((uVar5) | 0) | 0));
        heap.setU32(0x005f54fc, (((uVar15) << 16 >> 16) + 1) >>> 0);
        uVar17 = ((0) & 0xffff);
        if ((heap.u32((0x00887462) + (uVar8 * 0x130 + uVar4) * 4) | 0) != -1) {
          uVar17 = ((heap.u32(((0x0088747a) & 0xffff) + (iVar16 + uVar4) * 4)) & 0xffff);
        }
        heap.setU32(0x005f5500, (CONCAT22(heap.u16(0x005f5500), uVar17)) >>> 0);
        heap.setU32(0x005f54fe, (0x4f3) >>> 0);
        if ((uVar17 != 0) && (heap.setU32(0x005f54fe, (0x4f4) >>> 0), uVar17 != 1)) {
          heap.setU32(0x005f54fe, (0x4f5) >>> 0);
        }
        heap.setU32(0x005f54f0, (0x7ee) >>> 0);
        return uVar6;
      }
      bVar1 = ((heap.u8(pbVar11 + (4))) & 0xff);
      if (((bVar1 != 2) && (bVar1 != 3)) && (bVar1 != 1)) {
        heap.setU32(0x005f54f2, (heap.u32((0x00887442) + (uVar8 * 0x130) * 4)) >>> 0);
        heap.setU32(0x005f54f4, (heap.u32(((0x00887444) & 0xffff) + (uVar8 * 0x98) * 4)) >>> 0);
        heap.setU32(0x005f54f6, (((heap.u32(((0x00887444) >>> 0) + (uVar8 * 0x98) * 4) >>> 0x10) & 0xffff)) >>> 0);
        uVar3 = (((regs.eax = FUN_0044c219(heap, pbVar11, extraout_ECX))) >>> 0);
        heap.setU32(0x005f54f8, (sVar13) >>> 0);
        heap.setU32(0x005f54fa, (((uVar3) << 16 >> 16)) >>> 0);
        heap.setU32(0x005f54fc, ((((((uVar3) >>> 0) >>> 0x10)) << 16 >> 16)) >>> 0);
        heap.setU32(0x005f54f0, (0x7ee) >>> 0);
        return uVar6;
      }
      heap.setU32(0x005f54f2, (0x569) >>> 0);
      if (1 < heap.u32(((0x00887497) & 0xff) + (iVar16) * 4)) {
        heap.setU32(0x005f54f2, (0x56a) >>> 0);
      }
      heap.setU32(0x005f54f4, (heap.u32((0x00887442) + (uVar8 * 0x130) * 4)) >>> 0);
      heap.setU32(0x005f54f6, (heap.u32(((0x00887444) & 0xffff) + (uVar8 * 0x98) * 4)) >>> 0);
      heap.setU32(0x005f54f8, ((((heap.u32(((0x00887444) >>> 0) + (uVar8 * 0x98) * 4) >>> 0x10)) << 16 >> 16)) >>> 0);
      bVar1 = ((heap.u32((0x00887420) + (iVar16) * 4)) & 0xff);
      heap.setU32(0x005f54fa, (heap.i16((0x005f5806 + ((bVar1) >>> 0) * 8)) + 2) >>> 0);
      uVar5 = (((heap.u8(pbVar11 + (5)) & 0x70) >>> 4) >>> 0);
      uVar15 = ((uVar5) >>> 0);
      do {
        if ((heap.u32((0x0088744a) + (uVar8 * 0x130 + uVar15) * 4) | 0) == -1) {
          uVar5 = ((uVar5 - 1) >>> 0);
        }
        uVar15 = ((uVar15 - 1) >>> 0);
      } while (-1 < (((uVar15) | 0) | 0));
      heap.setU32(0x005f54fc, (((uVar5) << 16 >> 16) + 1) >>> 0);
      heap.setU32(0x005f5500, ((regs.eax = FUN_0044c219(heap, pbVar11, extraout_ECX))) >>> 0);
      heap.setU32(0x005f54fe, (((bVar1) & 0xffff)) >>> 0);
      heap.setU32(0x005f54f0, (0x7ee) >>> 0);
      return uVar6;
    }
    if (cVar12 == 2) {
      bVar1 = ((heap.u8(pbVar11)) & 0xff);
      if (bVar1 == 0) {
        uVar8 = ((((heap.u8(pbVar11 + (0x30))) >>> 0)) >>> 0);
        heap.setU32(0x005f54f2, (0x4c8) >>> 0);
        heap.setU32(0x005f54f4, (heap.u32((0x00887442) + (uVar8 * 0x130) * 4)) >>> 0);
        heap.setU32(0x005f54f6, (heap.u32(((0x00887444) & 0xffff) + (uVar8 * 0x98) * 4)) >>> 0);
        heap.setU32(0x005f54f8, ((((heap.u32(((0x00887444) >>> 0) + (uVar8 * 0x98) * 4) >>> 0x10)) << 16 >> 16)) >>> 0);
        heap.setU32(0x005f54fa, (heap.i16((0x005f5802 + heap.u32(((0x00887420) >>> 0) + (uVar8 * 0x260) * 4) * 8)) + 2) >>> 0);
        for (pbVar10 = ((pbVar11) >>> 0); heap.u8(pbVar10 + (1)) != 0; pbVar10 = (((0x00743b94 + heap.u32((pbVar10 + 0x40)) * 0x100) >>> 0)) >>> 0) {
        
        }
        iVar16 = ((-1) >>> 0);
        do {
          iVar18 = ((iVar16) >>> 0);
          iVar16 = ((iVar18 + 1) >>> 0);
        } while (heap.i16((pbVar10 + 10)) != heap.i16((0x0088747e + iVar16 * 2 + uVar8 * 0x260)));
        sVar13 = ((((iVar18) << 16 >> 16) + 2) & 0xffff);
        heap.setU32(0x005f54fc, (sVar13) >>> 0);
        heap.setU32(0x005f5500, ((regs.eax = FUN_0044c219(heap, pbVar10, pbVar11, 0))) >>> 0);
        heap.setU32(0x005f54fe, (sVar13) >>> 0);
        heap.setU32(0x005f54f0, (0x7ee) >>> 0);
        return uVar6;
      }
      if (bVar1 == 1) {
        /* goto LAB_005e6524 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e613e/LAB_005e6524"); return 0;
      }
      if ((bVar1 == 2) && (heap.u8(pbVar11 + (1)) == 8)) {
        return uVar6;
      }
    } else {
      if (cVar12 == 8) {
      heap.setU32(0x005f54f0, (heap.u32(0x0087c3ac)) >>> 0);
      heap.setU32(0x005f54f2, (heap.u16(0x0087c3b0)) >>> 0);
      heap.setU32(0x005f54f4, (((heap.u32(0x0087c3b0) >>> 0x10) & 0xffff)) >>> 0);
      return uVar6;
    }
    }
    iVar16 = ((unaff_ESI) >>> 0);
    in_EAX = (((regs.eax = FUN_005e3ace(heap))) >>> 0);
    if (((unaff_ESI != 0) && (pbVar11 = ((heap.u32((unaff_ESI + 8))) >>> 0), pbVar11 != 0x0)) && (heap.u8(pbVar11 + (0x10)) < 2)) {
      uVar2 = (((heap.u32(0x0099fdf0) - heap.i16((pbVar11 + 4)) << (heap.u8(pbVar11 + (0x10)) & 0x1f)) + heap.i16((pbVar11 + 8))) & 0xffff);
      in_EAX = ((((uVar2) >>> 0)) >>> 0);
      sVar13 = (((heap.u32(0x0099fdf2) - heap.i16((pbVar11 + 6)) << (heap.u8(pbVar11 + (0x10)) & 0x1f)) + heap.i16((pbVar11 + 10))) & 0xffff);
      unaff_EBP = ((CONCAT22((((((unaff_EBP) >>> 0) >>> 0x10)) << 16 >> 16), 0xffff)) >>> 0);
      for (uVar17 = ((heap.u32(0x0087c398)) & 0xffff); uVar17 != 0xffff; uVar17 = (((heap.u32((0x00743b98) + (((uVar17) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
        iVar18 = ((((uVar17) >>> 0) * 0x100) >>> 0);
        if (heap.i16((0x00743baa + iVar18)) != -0x8000) {
          sVar7 = ((((((heap.i16((0x00743baa + iVar18)) + heap.i16((0x00743bae + iVar18)))) << 16 >> 16) >>> 1) - uVar2) & 0xffff);
          if (sVar7 < 0) {
            sVar7 = ((-sVar7) & 0xffff);
          }
          sVar9 = ((((((heap.i16((0x00743bac + iVar18)) + heap.i16((0x00743bb0 + iVar18)))) << 16 >> 16) >>> 1) - sVar13) & 0xffff);
          if (sVar9 < 0) {
            sVar9 = ((-sVar9) & 0xffff);
          }
          if ((!SCARRY2(sVar7, sVar9)) && (((sVar7 + sVar9) & 0xffff) < ((unaff_EBP) & 0xffff))) {
            unaff_EBP = ((CONCAT22((((((unaff_EBP) >>> 0) >>> 0x10)) << 16 >> 16), sVar7 + sVar9)) >>> 0);
            pbVar11 = ((0x00743b94 + iVar18) >>> 0);
          }
        }
      }
      if (((unaff_EBP) & 0xffff) < 0x21) {
        unaff_EBX = ((CONCAT31((regs.eax = callIndirect(heap, int3, CONCAT22((((((unaff_EBX) >>> 0) >>> 0x10)) << 16 >> 16), sVar13) >>> 8)), 2)) >>> 0);
        unaff_ESI = ((iVar16) >>> 0);
        LAB_005e6524: uVar14 = ((((unaff_EBX) & 0xffff)) & 0xffff);
        if (heap.u8(pbVar11 + (0x2e)) != 0) {
          heap.setU32(0x005f54f0, (0x5ca) >>> 0);
          heap.setU32(0x005f54f2, (heap.u16((pbVar11 + 0x22))) >>> 0);
          heap.setU32(0x005f54f4, (heap.u16((pbVar11 + 0x9c))) >>> 0);
          heap.setU32(0x005f54f6, (((heap.u32((pbVar11 + 0x9c)) >>> 0x10) & 0xffff)) >>> 0);
          uVar19 = (((regs.eax = FUN_00440143(heap, pbVar11, unaff_EBX))) >>> 0);
          heap.setU32(0x005f54f8, (uVar14) >>> 0);
          heap.setU32(0x005f54fa, (extraout_CX_00) >>> 0);
          heap.setU32(0x005f54fc, ((((((uVar19) >>> 0) >>> 0x20)) << 16 >> 16)) >>> 0);
          heap.setU32(0x005f54fe, (((((uVar19) >>> 0) >>> 0x30) & 0xffff)) >>> 0);
          return ((uVar19) >>> 0);
        }
        heap.setU32(0x005f54f0, (0x5c8) >>> 0);
        if ((heap.u16((pbVar11 + 200)) & 8) != 0) {
          heap.setU32(0x005f54f0, (0x5c9) >>> 0);
        }
        heap.setU32(0x005f54f6, (heap.u16((pbVar11 + 0x22))) >>> 0);
        heap.setU32(0x005f54f8, (((heap.u32((pbVar11 + 0x9c))) << 16 >> 16)) >>> 0);
        heap.setU32(0x005f54fa, ((((heap.u32((pbVar11 + 0x9c)) >>> 0x10)) << 16 >> 16)) >>> 0);
        (regs.eax = FUN_00440143(heap, pbVar11, unaff_EBX));
        heap.setU32(0x005f54fc, (uVar14) >>> 0);
        heap.setU32(0x005f54fe, (extraout_CX) >>> 0);
        heap.setU32(0x005f5500, (extraout_EDX) >>> 0);
        uVar6 = (((regs.eax = FUN_0043fdfb(heap, unaff_ESI, unaff_EBX))) >>> 0);
        heap.setU32(0x005f54f2, (((unaff_EBP) & 0xffff)) >>> 0);
        heap.setU32(0x005f54f4, (((((unaff_EBP) >>> 0) >>> 0x10) & 0xffff)) >>> 0);
        return uVar6;
      }
    }
  }
  return in_EAX;
}
