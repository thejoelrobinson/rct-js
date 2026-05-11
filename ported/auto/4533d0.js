// @manual — do not regenerate.
// Source: decompiled/c/4533d0.c
//
// FUN_004533d0 — per-tick window-message walker. The hot tick path's
// dispatcher into each window's WindowProc; for the title-screen viewport
// (window pool slot 0 at DAT_009a013c with wndProc=0x42b079), this is the
// function that drives the inner viewport paint chain that calls
// FUN_00431b6f / FUN_00436b2a / FUN_00433bae / FUN_00433e1c.
//
// The translator emitted two unsupported gotos that short-circuited the
// entire dispatch:
//
//   1. Line 35 of the C: `if (puVar14 < &DAT_009a013c) goto LAB_00453459;`
//      from inside the do-while pool walk, jumping to a label INSIDE the
//      `if (iVar17 != -1)` block. The translator's forward-goto lowering
//      recognizes labels at the function body's top level or simple
//      labeled-block patterns; this goto crosses into a deeper nesting,
//      so it fell through to `_gotoWarn ... return 0`. Hand-port wraps
//      the pool walk + pre-LAB setup in a `LAB_00453459_skip` labeled
//      block; the goto becomes `break LAB_00453459_skip`. The `iVar17
//      == -1` case (where the C does nothing and falls through to the
//      function's bottom return) is handled by an explicit `return`.
//      Same pattern as 4385d8.js's hand-port (commit 7d38f68).
//
//   2. Line 139 of the C: `if (DAT_005f8d5d <= bVar3) goto code_r0x004535f9;`
//      from inside the nested while loop. The label `code_r0x004535f9`
//      is at the END of the function and does
//        puVar19 = puVar19 + 5; goto LAB_00453535;
//      i.e. it's semantically `continue LAB_00453535` (advance the
//      outer for-loop's iterator and continue). Hand-port replaces with
//      `continue LAB_00453535`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3, uint3, undefined3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
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
  let in_ECX = regs.ecx >>> 0;
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
  let puVar14 = 0;
  let puVar16 = 0;
  let iVar17 = 0;
  let puVar18 = 0;
  let puVar19 = 0;
  let puVar15 = 0;
  if ((((heap.u32(0x006323f4) | 0) != -1) && (heap.u8(0x006326bc) == 0)) && ((heap.u8(0x006326bd) & 1) != 0)) {
    heap.setU32(0x006323fc, (-1) >>> 0);
    puVar15 = ((heap.u32(0x009a1164)) >>> 0);
    // C: do { ... if (...) goto LAB_00453459; ... } while (...);
    //    if (iVar17 != -1) { pre-LAB setup; LAB_00453459: body; }
    // JS-restructured: walk + pre-LAB are inside LAB_00453459_skip. The goto
    // breaks out of LAB_00453459_skip (skipping the iVar17 != -1 check and
    // pre-LAB setup) and lands at the LAB_00453459 body just below.
    LAB_00453459_skip: {
      do {
        puVar14 = ((puVar15 + -0x178) >>> 0);
        if (puVar14 < 0x009a013c) break LAB_00453459_skip;  // C: goto LAB_00453459
        iVar17 = ((heap.i32((puVar15 + -0x170))) >>> 0);
        puVar15 = ((puVar14) >>> 0);
      } while ((iVar17 == 0) || ((heap.u16((iVar17 + 0x12)) & 0x800) == 0));
      heap.setU32(0x006323fc, (iVar17) >>> 0);
      if ((iVar17 | 0) == -1) return;  // C: skip both pre-LAB setup AND LAB body, fall through to bottom return.
      heap.setU32(0x00632404, (0) >>> 0);
      heap.setU32(0x00632400, (puVar14) >>> 0);
      if ((heap.i8((iVar17 + 0x10)) != 0) && (heap.setU32(0x00632404, (0x23) >>> 0), heap.i8((iVar17 + 0x10)) != 1)) {
        heap.setU32(0x00632404, (0x46) >>> 0);
      }
    }
    // LAB_00453459 body — runs both on normal fall-through (iVar17 != -1)
    // AND on the goto from inside the do-while.
    LAB_004534d1: {
      heap.setU32(0x00632408, (0x0063240c) >>> 0);
      for (uVar9 = ((heap.u32(0x0087c396)) & 0xffff); uVar13 = ((heap.u32(0x0087c396)) & 0xffff), uVar9 != 0xffff; uVar9 = (((heap.u32((0x00743b98) + (((uVar9) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
        if (((heap.i16((0x00743bd2 + ((uVar9) >>> 0) * 0x100)) | 0) != -1) && ((regs.eax = FUN_004531f6(heap)), in_ECX = ((extraout_ECX) >>> 0), 0x632447 < heap.u32(0x00632408))) {
          break LAB_004534d1;
        }
      }
      while (uVar13 != 0xffff && (((heap.i16((0x00743bd2 + ((uVar13) >>> 0) * 0x100)) | 0) != -1 || ((regs.eax = FUN_004531f6(heap)), in_ECX = ((extraout_ECX_00) >>> 0), heap.u32(0x00632408) < 0x00632448)))) {
        uVar13 = ((heap.u32((0x00743b98) + (((uVar13) >>> 0) * 0x80) * 4)) & 0xffff);
      }
    }
    puVar19 = ((0x00632448) >>> 0);
    do {
      LAB_00453525: {
      if (heap.u16(puVar19) != 0xffff) {
        for (puVar16 = ((0x0063240c) >>> 0); puVar16 < heap.u32(0x00632408); puVar16 = (((puVar16 + ((5) * 2)) >>> 0)) >>> 0) {
          if (heap.u16(puVar19) == heap.u16(puVar16)) {
            break LAB_00453525;
          }
        }
        if (heap.u16(puVar19 + (0xc) * 2) != 0xffff) {
          (regs.eax = FUN_00407a41(heap, puVar19 + ((2) * 2)));
          in_ECX = ((extraout_ECX_01) >>> 0);
        }
        if (heap.u16(puVar19 + (0x1a) * 2) != 0xffff) {
          (regs.eax = FUN_00407a41(heap, puVar19 + ((0x10) * 2)));
          in_ECX = ((extraout_ECX_02) >>> 0);
        }
        heap.setU32(puVar19, (0xffff) & 0xffffffff);
      }
      }
      puVar19 = ((puVar19 + ((0x1e) * 2)) >>> 0);
    } while (puVar19 < 0x006325b0);
    puVar19 = ((0x0063240c) >>> 0);
    LAB_00453535: for (; puVar19 < heap.u32(0x00632408); puVar19 = (((puVar19 + ((5) * 2)) >>> 0)) >>> 0) {
      LAB_0045377a: {
      LAB_00453617: {
      uVar9 = ((heap.u16(puVar19 + (2) * 2)) & 0xffff);
      iVar17 = ((CONCAT22((((((in_ECX) >>> 0) >>> 0x10)) << 16 >> 16), 0xffff)) >>> 0);
      if (((uVar9) << 16 >> 16) < 0) {
        uVar9 = ((-uVar9) & 0xffff);
      }
      if (0xfff < uVar9) {
        uVar9 = ((0xfff) & 0xffff);
      }
      if (0x800 < uVar9) {
        uVar6 = (((regs.eax = callIndirect(heap, uint3, ((iVar17) >>> 0) >>> 8))) >>> 0);
        iVar17 = ((CONCAT31(uVar6, (((((-(uVar9 - 0xc00)) << 16 >> 16) >>> 2)) << 24 >> 24))) >>> 0);
        cVar11 = (((((((-(uVar9 - 0xc00)) << 16 >> 16) >>> 10)) << 24 >> 24)) & 0xff);
        if ((cVar11 != 0) && (iVar17 = ((CONCAT31(uVar6, 0xff)) >>> 0), cVar11 < 0)) {
          iVar17 = ((((uVar6) >>> 0) << 8) >>> 0);
        }
      }
      uVar9 = ((heap.u16(puVar19 + (1) * 2)) & 0xffff);
      iVar10 = ((((((uVar9) << 16 >> 16)) | 0)) >>> 0);
      if (((uVar9) << 16 >> 16) < 0) {
        uVar9 = ((-uVar9) & 0xffff);
      }
      if (0xfff < uVar9) {
        uVar9 = ((0xfff) & 0xffff);
      }
      if (0x800 < uVar9) {
        uVar8 = ((((((iVar17) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
        bVar3 = ((((iVar17) & 0xff)) & 0xff);
        iVar17 = ((CONCAT22(uVar8, CONCAT11((((((-(uVar9 - 0xc00)) << 16 >> 16) >>> 2)) << 24 >> 24), bVar3))) >>> 0);
        bVar2 = ((((((-(uVar9 - 0xc00)) << 16 >> 16) >>> 10) & 0xff)) & 0xff);
        if ((bVar2 != 0) && (iVar17 = ((CONCAT22(uVar8, CONCAT11(0xff, bVar3))) >>> 0), (((((bVar2) & 0xffff) << 8)) << 16 >> 16) < 0)) {
          iVar17 = ((CONCAT22(uVar8, ((bVar3) & 0xffff))) >>> 0);
        }
      }
      bVar2 = ((((((iVar17) >>> 0) >>> 8) & 0xff)) & 0xff);
      if (bVar2 <= ((iVar17) & 0xff)) {
        iVar17 = ((CONCAT31((regs.eax = callIndirect(heap, int3, ((iVar17) >>> 0) >>> 8)), bVar2)) >>> 0);
      }
      uVar7 = (((regs.eax = callIndirect(heap, undefined3, ((iVar17) >>> 0) >>> 8))) >>> 0);
      bVar2 = ((((iVar17) & 0xff) - heap.u32(0x00632404)) & 0xff);
      if (((iVar17) & 0xff) < heap.u32(0x00632404)) {
        bVar2 = ((0) & 0xff);
      }
      in_ECX = ((CONCAT31(uVar7, bVar2)) >>> 0);
      uVar9 = ((heap.u16(puVar19)) & 0xffff);
      uVar12 = ((((heap.u16(puVar19 + (3) * 2)) >>> 0)) >>> 0);
      puVar16 = ((0x00632448) >>> 0);
      do {
        if (uVar9 == heap.u16(puVar16)) {
          break LAB_00453617;
        }
        puVar16 = ((puVar16 + ((0x1e) * 2)) >>> 0);
      } while (puVar16 < 0x006325b0);
      puVar16 = ((0x00632448) >>> 0);
      bVar3 = ((0) & 0xff);
      while (heap.u16(puVar16) != 0xffff) {
        puVar16 = ((puVar16 + ((0x1e) * 2)) >>> 0);
        bVar3 = ((bVar3 + 1) & 0xff);
        if (heap.u8(0x005f8d5d) <= bVar3) {
          continue LAB_00453535;  // C: goto code_r0x004535f9 → puVar19 += 5; goto LAB_00453535
        }
      }
      heap.setU32(puVar16, (uVar9) & 0xffffffff);
      heap.setU16((puVar16 + (0xc) * 2), (0xffff) & 0xffff);
      heap.setU16((puVar16 + (0x1a) * 2), (0xffff) & 0xffff);
      heap.setU8((puVar16 + ((1) * 2)), (0x30) & 0xff);
      }
      bVar3 = ((((heap.u16(puVar16 + (1) * 2)) & 0xff)) & 0xff);
      if (bVar3 != ((heap.u16(puVar19 + (4) * 2)) & 0xff)) {
        if (bVar3 < ((heap.u16(puVar19 + (4) * 2)) & 0xff)) {
          bVar3 = ((bVar3 + 4) & 0xff);
        } else {
          bVar3 = ((bVar3 - 4) & 0xff);
        }
      }
      heap.setU8((puVar16 + ((1) * 2)), (bVar3) & 0xff);
      bVar4 = ((bVar2 - bVar3) & 0xff);
      if (bVar2 < bVar3) {
        bVar4 = ((0) & 0xff);
      }
      in_ECX = ((CONCAT31(uVar7, bVar4)) >>> 0);
      iVar17 = ((((uVar9) >>> 0) * 0x100) >>> 0);
      puVar18 = ((0x00743b94 + iVar17) >>> 0);
      uVar9 = (((((heap.u32(((0x00743c50) & 0xffff) + (iVar17) * 4) * ((bVar4) & 0xffff)) & 0xffff) >>> 3) + 0xe001) & 0xffff);
      if ((((uVar9) << 16 >> 16) | 0) < -10000) {
        uVar9 = ((0xd8f0) & 0xffff);
      }
      iVar5 = ((((((uVar9) << 16 >> 16)) | 0)) >>> 0);
      bVar2 = ((heap.u32((0x00743c4f) + (iVar17) * 4)) & 0xff);
      uVar1 = ((((bVar2) >>> 0)) >>> 0);
      if (bVar2 == 0xff) {
        if (heap.u16(puVar16 + (0xc) * 2) != 0xffff) {
          heap.setU16((puVar16 + (0xc) * 2), (0xffff) & 0xffff);
          (regs.eax = FUN_00407a41(heap, puVar16 + ((2) * 2)));
        }
      } else {
        if (heap.u16(puVar16 + (0xc) * 2) != 0xffff) {
          if (((bVar2) & 0xffff) == heap.u16(puVar16 + (0xc) * 2)) {
            if (uVar9 != heap.u16(puVar16 + (0xd) * 2)) {
              heap.setU16((puVar16 + (0xd) * 2), (uVar9) & 0xffff);
              (regs.eax = FUN_00407e33(heap, puVar16 + ((2) * 2), iVar5));
            }
            if ((((iVar10) & 0xffff) != heap.u16(puVar16 + (0xe) * 2)) && (heap.setU16((puVar16 + (0xe) * 2), (((iVar10) & 0xffff)) & 0xffff), heap.u8(0x005f8d59) != 0)) {
              (regs.eax = FUN_00407dd4(heap, puVar16 + ((2) * 2), iVar10));
            }
            if (((uVar12) & 0xffff) != heap.u16(puVar16 + (0xf) * 2)) {
              heap.setU16((puVar16 + (0xf) * 2), (((uVar12) & 0xffff)) & 0xffff);
              (regs.eax = FUN_00407d75(heap, puVar16 + ((2) * 2), uVar12));
            }
            break LAB_0045377a;
          }
          (regs.eax = FUN_00407a41(heap, puVar16 + ((2) * 2)));
        }
        heap.setU16((puVar16 + (0xc) * 2), (((uVar1) & 0xffff)) & 0xffff);
        (regs.eax = FUN_004077b3(heap, uVar1, puVar16 + ((2) * 2), 1, 1));
        heap.setU16((puVar16 + (0xe) * 2), (((iVar10) & 0xffff)) & 0xffff);
        heap.setU16((puVar16 + (0xd) * 2), (((iVar5) & 0xffff)) & 0xffff);
        heap.setU16((puVar16 + (0xf) * 2), (((uVar12) & 0xffff)) & 0xffff);
        iVar17 = ((iVar10) >>> 0);
        if (heap.u8(0x005f8d59) == 0) {
          iVar17 = ((0) >>> 0);
        }
        (regs.eax = FUN_00407c42(heap, puVar16 + ((2) * 2), heap.u32((0x0063268c) + (uVar1) * 4), iVar5, iVar17, uVar12));
      }
      }
      uVar9 = (((((((((heap.u8(puVar18 + (0xbe))) & 0xff)) & 0xffff) * ((((in_ECX) & 0xff)) & 0xffff)) & 0xffff) >>> 3) + 0xe001) & 0xffff);
      if ((((uVar9) << 16 >> 16) | 0) < -10000) {
        uVar9 = ((0xd8f0) & 0xffff);
      }
      iVar17 = ((((((uVar9) << 16 >> 16)) | 0)) >>> 0);
      bVar2 = ((heap.u8(puVar18 + (0xbd))) & 0xff);
      uVar1 = ((((bVar2) >>> 0)) >>> 0);
      if (bVar2 == 0xff) {
        if (heap.u16(puVar16 + (0x1a) * 2) != 0xffff) {
          heap.setU16((puVar16 + (0x1a) * 2), (0xffff) & 0xffff);
          (regs.eax = FUN_00407a41(heap, puVar16 + ((0x10) * 2), puVar18, puVar16, iVar10, uVar12, in_ECX));
        }
      } else {
        if (heap.u16(puVar16 + (0x1a) * 2) != 0xffff) {
          if (((bVar2) & 0xffff) == heap.u16(puVar16 + (0x1a) * 2)) {
            if (uVar9 != heap.u16(puVar16 + (0x1b) * 2)) {
              heap.setU16((puVar16 + (0x1b) * 2), (uVar9) & 0xffff);
              (regs.eax = FUN_00407e33(heap, puVar16 + ((0x10) * 2), iVar17, puVar18, puVar16, iVar10, uVar12));
            }
            if ((((iVar10) & 0xffff) != heap.u16(puVar16 + (0x1c) * 2)) && (heap.setU16((puVar16 + (0x1c) * 2), (((iVar10) & 0xffff)) & 0xffff), heap.u8(0x005f8d59) != 0)) {
              (regs.eax = FUN_00407dd4(heap, puVar16 + ((0x10) * 2), iVar10, puVar18, puVar16, iVar10, uVar12));
            }
            return;
          }
          (regs.eax = FUN_00407a41(heap, puVar16 + ((0x10) * 2), puVar18));
        }
        heap.setU16((puVar16 + (0x1a) * 2), (((uVar1) & 0xffff)) & 0xffff);
        (regs.eax = FUN_004077b3(heap, uVar1, puVar16 + ((0x10) * 2), 1, 1, puVar18));
        heap.setU16((puVar16 + (0x1c) * 2), (((iVar10) & 0xffff)) & 0xffff);
        heap.setU16((puVar16 + (0x1b) * 2), (((iVar17) & 0xffff)) & 0xffff);
        heap.setU16((puVar16 + (0x1d) * 2), (((uVar12) & 0xffff)) & 0xffff);
        iVar5 = ((iVar10) >>> 0);
        if (heap.u8(0x005f8d59) == 0) {
          iVar5 = ((0) >>> 0);
        }
        (regs.eax = FUN_00407c42(heap, puVar16 + ((0x10) * 2), heap.u32((0x0063268c) + (uVar1) * 4), iVar17, iVar5, 0, puVar18, puVar16, iVar10, uVar12));
      }
    }
  }
}
