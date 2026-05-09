// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dbeeb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004364c2 } from "./4364c2.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005d849e } from "./5d849e.js";
import { FUN_005d8623 } from "./5d8623.js";
import { FUN_005d870c } from "./5d870c.js";
import { FUN_005d9220 } from "./5d9220.js";
import { FUN_005dcd40 } from "./5dcd40.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005dbeeb(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000000 = __sp + 0;
  try {
  let puVar1 = 0;
  let puVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let extraout_var = 0;
  let uVar9 = 0;
  let bVar10 = 0;
  let uVar11 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let extraout_var_00 = 0;
  let extraout_var_01 = 0;
  let cVar13 = 0;
  let sVar14 = 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let extraout_EDX_01 = 0;
  let extraout_EDX_02 = 0;
  let iVar15 = 0;
  let iVar16 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let uVar17 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar18 = 0;
  let uVar19 = 0;
  let pbVar20 = 0;
  let psVar21 = 0;
  let bVar22 = 0;
  let uVar23 = 0;
  let uVar8 = 0;
  let puVar12 = 0;
  LAB_005dcd0c: {
  LAB_005dcbad: {
  LAB_005dca73: {
  LAB_005dca55: {
  LAB_005dbf4d: {
  bVar10 = ((heap.u8(unaff_ESI + (0x31))) & 0xff);
  heap.setU32(0x0065dc40, (0) >>> 0);
  heap.setU8(0x0065dc2c, (unaff_ESI) & 0xff);
  if (((heap.u16((0x005f7104 + ((bVar10) >>> 0) * 8)) & 0x800) != 0) && ((heap.u16((unaff_ESI + 0x36)) >>> 2 < 0x44 || (0x56 < heap.u16((unaff_ESI + 0x36)) >>> 2)))) {
    sVar3 = (((regs.eax = FUN_005d9220(heap))) & 0xffff);
    if (heap.i32((0x0065dc70 + ((((heap.u8(unaff_ESI + (0x1f))) & 0xff)) >>> 0) * 4)) < 0) {
      if (-0x23 < sVar3) {
        break LAB_005dbf4d;
      }
    } else {
      if (-0x46 < sVar3) {
      break LAB_005dbf4d;
    }
    }
    if (heap.u8(unaff_ESI + (0x1f)) != 8) {
      heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x40) >>> 0);
    }
  }
  }
  if ((heap.u16((0x005f7104 + ((bVar10) >>> 0) * 8)) & 0x1000) != 0) {
    unaff_EBP = (((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260)) >>> 0);
    iVar6 = ((heap.u32(((0x008874a0) >>> 0) + (((unaff_EBP) >>> 0)) * 4) << 0x10) >>> 0);
    if (heap.u8(0x0065e6b7) == 0) {
      iVar6 = ((0) >>> 0);
    }
    heap.setI32((unaff_ESI + 0x28), (iVar6) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x2c), (0) & 0xffffffff);
  }
  heap.setU32(0x0065dc30, (heap.i32((unaff_ESI + 0x2c)) + heap.i32((unaff_ESI + 0x28))) >>> 0);
  if ((heap.u16((unaff_ESI + 0x48)) & 0x80) != 0) {
    heap.setU32(0x0065dc30, (0) >>> 0);
  }
  if ((heap.u16((unaff_ESI + 0x48)) & 0x400) != 0) {
    heap.setU8((unaff_ESI + (0xd2)), (heap.u8(unaff_ESI + (0xd2)) + -1) & 0xff);
    if (heap.u8(unaff_ESI + (0xd2)) == -0x46) {
      heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) & 0xfbff) & 0xffff);
    }
    if (-1 < (((heap.u8(unaff_ESI + (0xd2))) << 24 >> 24) | 0)) {
      heap.setU32(0x0065dc30, (0) >>> 0);
      heap.setU32((unaff_ESI + 0x2c), (0) & 0xffffffff);
    }
  }
  heap.setI32((unaff_ESI + 0x28), (heap.u32(0x0065dc30)) & 0xffffffff);
  heap.setU32(0x0065dc34, ((heap.u32(0x0065dc30) >>> 10) * 0x2a) >>> 0);
  heap.setU32(0x0065dc28, (unaff_ESI) >>> 0);
  if (heap.u32(0x0065dc30) < 0) {
    for (; heap.setU32(0x0065dc28, (unaff_ESI) >>> 0), heap.u16((unaff_ESI + 0x3e)) != 0xffff; unaff_ESI = (((0x00743b94 + heap.u32((unaff_ESI + 0x3e)) * 0x100) >>> 0)) >>> 0) {
    
    }
  }
  LAB_005dbffb: uVar19 = ((((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0)) >>> 0);
  if ((heap.u16((0x005f7104 + uVar19 * 8)) & 2) != 0) {
    (regs.eax = FUN_005d870c(heap));
  }
  if ((heap.u16((0x005f7104 + uVar19 * 8)) & 4) != 0) {
    (regs.eax = FUN_005d8623(heap));
  }
  if ((heap.u16((0x005f7104 + uVar19 * 8)) & 0x180) != 0) {
    (regs.eax = FUN_005d849e(heap));
  }
  uVar19 = ((((((heap.u8(unaff_ESI + (0x1f))) & 0xff)) >>> 0)) >>> 0);
  heap.setU32(0x0065dc38, (1) >>> 0);
  heap.setU32((unaff_ESI + 0x2c), (heap.u32((0x0065dc70 + uVar19 * 4))) & 0xffffffff);
  iVar6 = ((heap.u32(0x0065dc34) + heap.i32((unaff_ESI + 0x24))) >>> 0);
  heap.setI32((unaff_ESI + 0x24), (iVar6) & 0xffffffff);
  if (iVar6 < 0) {
    heap.setU16((unaff_ESI + 0xb8), (heap.u16((unaff_ESI + 0xb8)) & 0xfffd) & 0xffff);
    heap.setU32(0x0065dc48, (heap.u32((unaff_ESI + 0xe))) >>> 0);
    heap.setU32(0x0065dc4c, (heap.i16((unaff_ESI + 0x12))) >>> 0);
    (regs.eax = FUN_005e53ca(heap));
    /* goto LAB_005dc62d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc62d"); return 0;
  }
  if (0x3689 < iVar6) {
    heap.setU16((unaff_ESI + 0xb8), (heap.u16((unaff_ESI + 0xb8)) & 0xfffd) & 0xffff);
    heap.setU32(0x0065dc48, (heap.u32((unaff_ESI + 0xe))) >>> 0);
    heap.setU32(0x0065dc4c, (heap.i16((unaff_ESI + 0x12))) >>> 0);
    uVar23 = (((regs.eax = FUN_005e53ca(heap))) >>> 0);
    do {
      uVar7 = ((((((uVar23) >>> 0) >>> 0x20) >>> 0)) >>> 0);
      iVar6 = ((((uVar23) >>> 0)) >>> 0);
      uVar11 = ((heap.u16((unaff_ESI + 0x36)) >>> 2) & 0xffff);
      if (((uVar11 == 99) && (((iVar6 = ((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260) >>> 0), (heap.u32((0x00887422) + (((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x130) * 4) & 0x80) == 0 || (heap.u32((0x0088755c) + (iVar6) * 4) != 6)) || (heap.u32((0x0088755d) + (iVar6) * 4) == 4)))) && (iVar6 = ((((((heap.u8(unaff_ESI + (0xcf))) & 0xff)) >>> 0) * 0x10000) >>> 0), iVar6 < heap.u32(0x0065dc30))) {
        iVar6 = ((heap.u32(0x0065dc30) * -0x10) >>> 0);
        heap.setI32((unaff_ESI + 0x2c), (iVar6) & 0xffffffff);
      }
      if (((uVar11 == 0) && (iVar6 = ((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260) >>> 0), heap.u32((0x00887420) + (iVar6) * 4) == 42)) || ((uVar11 == 100 && (iVar6 = ((((((heap.u8(unaff_ESI + (0xcf))) & 0xff)) >>> 0) * 0x10000) >>> 0), heap.u32(0x0065dc30) < iVar6)))) {
        iVar6 = ((heap.u32(((0x005f5b7f) >>> 0) + (heap.u32(((0x00887420) >>> 0) + (((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260) * 4) * 8) * 4) << 0x10) >>> 0);
        heap.setI32((unaff_ESI + 0x2c), (iVar6) & 0xffffffff);
      }
      if (((uVar11 == 0x84) && (heap.u8(unaff_ESI + (1)) == 0)) && (((heap.u16((unaff_ESI + 0x48)) & 0x400) == 0 && (7 < heap.u16((unaff_ESI + 0x34)))))) {
        iVar6 = ((heap.u32(0x0065dc30) * -0x10) >>> 0);
        heap.setI32((unaff_ESI + 0x2c), (iVar6) & 0xffffffff);
        if (0x17 < heap.u16((unaff_ESI + 0x34))) {
          heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) | 0x400) & 0xffff);
          heap.setU8((unaff_ESI + (0xd2)), (0x5a) & 0xff);
        }
      }
      uVar9 = ((CONCAT22((((((iVar6) >>> 0) >>> 0x10)) << 16 >> 16), heap.i16((unaff_ESI + 0x34)) + 1)) >>> 0);
      puVar12 = ((heap.u32((0x0067af10) + (((heap.u8(unaff_ESI + (0xcd))) & 0xff)) * 4)) >>> 0);
      pbVar20 = ((heap.u32((puVar12 + heap.u32((unaff_ESI + 0x36)) * 4))) >>> 0);
      if (((heap.i16((unaff_ESI + 0x34)) + 1) & 0xffff) < heap.u16((pbVar20 + -2))) {
        LAB_005dc3b6: heap.setI16((unaff_ESI + 0x34), (((uVar9) << 16 >> 16)) & 0xffff);
        if ((((heap.u8(unaff_ESI + (0x31)) == 44) || (heap.u8(unaff_ESI + (0x31)) == 45)) && (uVar8 = ((CONCAT22((((uVar19 >>> 0x10)) << 16 >> 16), heap.u16((unaff_ESI + 0x36)) >>> 2)) >>> 0), heap.u16((unaff_ESI + 0x36)) >>> 2 == 0xf)) && (((uVar9) << 16 >> 16) == 0xc)) {
          (regs.eax = FUN_00452fce(heap, uVar7, puVar12, uVar8, uVar9, pbVar20, unaff_ESI, unaff_EBP, __addr_stack0x00000000, uVar8, uVar7, puVar12));
        }
        if (((heap.u8(unaff_ESI + (1)) == 0) && (heap.u16((unaff_ESI + 0x36)) >>> 2 == 0x75)) && (((uVar9) << 16 >> 16) == 0x30)) {
          (regs.eax = FUN_00452fce(heap, uVar7, puVar12, 0x75, uVar9, pbVar20, unaff_ESI, unaff_EBP, __addr_stack0x00000000, 0x75, uVar7, puVar12, uVar9));
        }
        psVar21 = (((heap.u32((unaff_ESI + 0x34)) * 10 + heap.i32((heap.u32((0x0067af10) + (((heap.u8(unaff_ESI + (0xcd))) & 0xff)) * 4) + heap.u32((unaff_ESI + 0x36)) * 4)))) >>> 0);
        sVar3 = ((heap.i16(psVar21 + (1) * 2)) & 0xffff);
        sVar5 = ((heap.i16(psVar21) + heap.i16((unaff_ESI + 0x38))) & 0xffff);
        uVar8 = ((CONCAT22((((uVar9 >>> 0x10)) << 16 >> 16), sVar5)) >>> 0);
        sVar14 = ((heap.i16(psVar21 + (2) * 2) + heap.i16((unaff_ESI + 0x3c)) + ((((heap.u32((0x005f5d02) + (heap.u32(((0x00887420) >>> 0) + (((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260) * 4) * 8) * 4)) << 24 >> 24)) << 16 >> 16)) & 0xffff);
        uVar7 = ((CONCAT22((((((uVar7) >>> 0) >>> 0x10)) << 16 >> 16), sVar14)) >>> 0);
        uVar19 = ((((sVar5 != heap.u32(0x0065dc48)) >>> 0)) >>> 0);
        if ((((sVar3 + heap.i16((unaff_ESI + 0x3a)))) << 16 >> 16) != heap.u32(0x0065dc4a)) {
          uVar19 = ((uVar19 | 2) >>> 0);
        }
        if (sVar14 != heap.u32(0x0065dc4c)) {
          uVar19 = ((uVar19 | 4) >>> 0);
        }
        heap.setI32((unaff_ESI + 0x24), (heap.i32((unaff_ESI + 0x24)) - heap.i32((uVar19 * 4 + 0x65dc50))) & 0xffffffff);
        heap.setU32(0x0065dc48, (CONCAT22(sVar3 + heap.i16((unaff_ESI + 0x3a)), sVar5)) >>> 0);
        heap.setU32(0x0065dc4c, (sVar14) >>> 0);
        heap.setU8((unaff_ESI + (0x1e)), (((heap.i16(psVar21 + (3) * 2)) << 24 >> 24)) & 0xff);
        heap.setU8((unaff_ESI + (0x20)), (((heap.i16(psVar21 + (4) * 2)) << 24 >> 24)) & 0xff);
        bVar10 = ((heap.u8((((psVar21) >>> 0) + 7))) & 0xff);
        uVar19 = ((((bVar10) >>> 0)) >>> 0);
        heap.setU8((unaff_ESI + (0x1f)), (bVar10) & 0xff);
        unaff_EBP = ((((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0)) >>> 0);
        if (((heap.u16((0x005f7104 + ((unaff_EBP) >>> 0) * 8)) & 0x200) != 0) && (bVar10 != 0)) {
          heap.setU8((unaff_ESI + (0x4a)), (0) & 0xff);
          heap.setU16((unaff_ESI + 0x4c), (0) & 0xffff);
          heap.setU16((unaff_ESI + 0x4e), (0) & 0xffff);
        }
        uVar23 = ((CONCAT44(uVar7, uVar8)) >>> 0);
        if ((unaff_ESI == heap.u32(0x0065dc28)) && (bVar22 = ((false) & 0xff), uVar23 = ((CONCAT44(uVar7, uVar8)) >>> 0), -1 < (heap.u32(0x0065dc30) | 0))) {
          unaff_EBP = (((0) * (unaff_ESI + 0x40)) >>> 0);
          uVar23 = (((regs.eax = FUN_005dcd40(heap))) >>> 0);
          if (bVar22) {
            heap.setU32(0x0065dc34, (heap.u32(0x0065dc34) - (heap.i32((unaff_ESI + 0x24)) + 1)) >>> 0);
            heap.setI32((unaff_ESI + 0x24), (heap.i32((unaff_ESI + 0x24)) - (heap.i32((unaff_ESI + 0x24)) + 1)) & 0xffffffff);
            while (true) {
              iVar6 = ((((unaff_EBP) >>> 0) * 0x100) >>> 0);
              unaff_EBP = ((0x00743b94 + iVar6) >>> 0);
              if (heap.u32((0x00743b95) + (iVar6) * 4) == 0) {
                break;
              }
              unaff_EBP = (((0) * (0x00743bd4 + iVar6)) >>> 0);
            }
            uVar9 = ((heap.i32((unaff_ESI + 0x28)) - heap.i32((0x00743bbc + iVar6))) >>> 0);
            if (((uVar9) >>> 0) < 0) {
              uVar9 = ((-uVar9) >>> 0);
            }
            if ((0xe0000 < uVar9) && ((heap.u16((0x005f7104 + ((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 0x40) == 0)) {
              heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x80) >>> 0);
            }
            if ((heap.u16((0x005f7104 + ((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 0x4000) == 0) {
              iVar16 = ((heap.i32((unaff_ESI + 0x28))) >>> 0);
              heap.setI32((unaff_ESI + 0x28), (heap.i32((0x00743bbc + iVar6)) >>> 1) & 0xffffffff);
              heap.setI32((0x00743bbc + iVar6), (iVar16 >>> 1) & 0xffffffff);
              heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 2) >>> 0);
            } else {
              heap.setI32((unaff_ESI + 0x28), (heap.i32((unaff_ESI + 0x28)) - (heap.i32((unaff_ESI + 0x28)) >>> 2)) & 0xffffffff);
              heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 2) >>> 0);
            }
            /* goto LAB_005dc98a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc98a"); return 0;
          }
        }
      } else {
        uVar11 = ((heap.u16((unaff_ESI + 0x3a)) << 7 | heap.u16((unaff_ESI + 0x3a)) >>> 9 | heap.u16((unaff_ESI + 0x38))) & 0xffff);
        pbVar20 = ((heap.u32((0x00971ef4) + (((uVar11 >>> 5 | uVar11 << 0xb) & 0xffff)) * 4)) >>> 0);
        uVar11 = ((heap.u16((unaff_ESI + 0x36)) >>> 2) & 0xffff);
        uVar19 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar19 >>> 8)), heap.u32((0x006545b4) + (((uVar11) >>> 0) * 8) * 4))) >>> 0);
        heap.setU8(0x0065e6b9, (CONCAT11(heap.u32((0x006545b4) + (((uVar11) >>> 0) * 8) * 4), heap.u32((0x006545b2) + (((uVar11) >>> 0) * 8) * 4))) & 0xff);
        for (; (((uVar19 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar19 >>> 8)), heap.u8(pbVar20)) & 0xffffff3c) >>> 0), ((uVar19) << 24 >> 24) != 8 || (((heap.u16((unaff_ESI + 0x3c)) >>> 2) & 0xff) != heap.u8(pbVar20 + (2)))) || ((heap.u8(pbVar20 + (5)) & 0xf) != 0)) || (((uVar11) & 0xff) != heap.u8(pbVar20 + (4)))); pbVar20 = (((pbVar20 + 8) >>> 0)) >>> 0) {
        
        }
        bVar22 = ((true) & 0xff);
        if (((heap.u8(unaff_ESI + (0xcd))) & 0xff) < 2) {
          LAB_005dc259: uVar23 = (((regs.eax = FUN_005cfac7(heap))) >>> 0);
          if ((!bVar22) && (uVar11 = ((extraout_CX) & 0xffff), CONCAT11(heap.u32((0x006545b5) + (((heap.u8(pbVar20 + (4))) >>> 0) * 8) * 4), heap.u32((0x006545b3) + (((heap.u8(pbVar20 + (4))) >>> 0) * 8) * 4)) == heap.u8(0x0065e6b9))) {
            LAB_005dc28d: uVar7 = ((((uVar23) >>> 0)) >>> 0);
            heap.setI16((unaff_ESI + 0x38), (((uVar23) << 16 >> 16)) & 0xffff);
            heap.setU16((unaff_ESI + 0x3a), (uVar11) & 0xffff);
            heap.setI16((unaff_ESI + 0x3c), ((((((uVar23) >>> 0) >>> 0x20)) << 16 >> 16)) & 0xffff);
            unaff_EBP = ((((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0)) >>> 0);
            if ((((heap.u16((0x005f7104 + ((unaff_EBP) >>> 0) * 8)) & 0x4000) != 0) && (((heap.u8(unaff_ESI + (0xcd))) & 0xff) < 7)) && ((heap.u8(pbVar20 + (4)) == 0 || ((unaff_EBP = (((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260)) >>> 0), (heap.u32((0x00887422) + (((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x130) * 4) & 0x10) != 0 && (((heap.u8(pbVar20 + (4)) == 3 || (heap.u8(pbVar20 + (4)) == 2)) || (heap.u8(pbVar20 + (4)) == 1)))))))) {
              uVar17 = ((((((unaff_EBP) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
              unaff_EBP = ((CONCAT22(uVar17, 0x8000)) >>> 0);
              puVar1 = (((unaff_ESI + 0x48)) >>> 0);
              uVar11 = ((heap.u16(puVar1)) & 0xffff);
              heap.setU32(puVar1, (heap.u16(puVar1) & 0xffbf) & 0xffffffff);
              if ((uVar11 >>> 6 & 1) == 0) {
                unaff_EBP = ((CONCAT22(uVar17, 0xa3d)) >>> 0);
              }
              uVar4 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
              uVar23 = ((CONCAT44(extraout_EDX, uVar7)) >>> 0);
              uVar11 = ((extraout_CX_00) & 0xffff);
              if (uVar4 <= ((unaff_EBP) & 0xffff)) {
                heap.setU8((unaff_ESI + (0xcd)), (heap.u8(unaff_ESI + (0xcd)) + 2) & 0xff);
                uVar23 = ((CONCAT44(extraout_EDX, uVar7)) >>> 0);
              }
            }
            if ((heap.u8(unaff_ESI + (0xcd)) != 0) && (((heap.u8(unaff_ESI + (0xcd))) & 0xff) < 5)) {
              sVar3 = ((CONCAT11((((uVar11 >>> 5)) << 24 >> 24), (((((uVar23) & 0xffff) >>> 5)) << 24 >> 24))) & 0xffff);
              uVar7 = ((CONCAT22((((((uVar23) >>> 0) >>> 0x10)) << 16 >> 16), sVar3)) >>> 0);
              uVar11 = ((((((uVar23) >>> 0) >>> 0x20) & 0xffff) >>> 2) & 0xffff);
              uVar8 = ((CONCAT22((((((uVar23) >>> 0) >>> 0x30)) << 16 >> 16), uVar11)) >>> 0);
              unaff_EBP = (((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260)) >>> 0);
              cVar13 = ((((uVar11) << 24 >> 24)) & 0xff);
              if ((sVar3 == heap.i16((0x0088750c + ((unaff_EBP) >>> 0)))) && (cVar13 == heap.u32((0x0088750f) + (((unaff_EBP) >>> 0)) * 4))) {
                heap.setU8((unaff_ESI + (0xcd)), (3) & 0xff);
                uVar23 = ((CONCAT44(uVar8, uVar7)) >>> 0);
              } else {
                uVar23 = ((CONCAT44(uVar8, uVar7)) >>> 0);
                if ((sVar3 == heap.i16((0x0088750a + ((unaff_EBP) >>> 0)))) && (uVar23 = ((CONCAT44(uVar8, uVar7)) >>> 0), cVar13 == heap.u32((0x0088750e) + (((unaff_EBP) >>> 0)) * 4))) {
                  heap.setU8((unaff_ESI + (0xcd)), (4) & 0xff);
                  uVar23 = ((CONCAT44(uVar8, uVar7)) >>> 0);
                }
              }
            }
            uVar7 = ((((((uVar23) >>> 0) >>> 0x20) >>> 0)) >>> 0);
            heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) & 0xfffe) & 0xffff);
            if ((heap.u8(pbVar20) & 0x80) != 0) {
              heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) | 1) & 0xffff);
            }
            uVar19 = ((uVar19 & 0xffffff03) >>> 0);
            uVar9 = ((CONCAT31((regs.eax = callIndirect(heap, int3, CONCAT22((((((uVar23) >>> 0) >>> 0x10)) << 16 >> 16), ((heap.u8(pbVar20 + (4))) & 0xffff) << 2) >>> 8)), ((((heap.u8(pbVar20 + (4))) & 0xffff) << 2) & 0xff) | ((uVar19) & 0xff))) >>> 0);
            heap.setI16((unaff_ESI + 0x36), (((uVar9) << 16 >> 16)) & 0xffff);
            bVar10 = (((heap.u8(pbVar20 + (5)) >>> 4) << 1) & 0xff);
            puVar12 = ((((bVar10) >>> 0)) >>> 0);
            heap.setU8((unaff_ESI + (0xcf)), (bVar10) & 0xff);
            if (heap.u8(pbVar20 + (4)) == 0x72) {
              heap.setU8((pbVar20 + (5)), (heap.u8(pbVar20 + (5)) & 0xf) & 0xff);
              heap.setU8((pbVar20 + (5)), (heap.u8(pbVar20 + (5)) | 0x30) & 0xff);
              (regs.eax = FUN_004364c2(heap, uVar7, puVar12));
            }
            uVar9 = ((uVar9 & 0xffff0000) >>> 0);
            /* goto LAB_005dc3b6 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc3b6"); return 0;
          }
        } else {
          if (heap.u8(unaff_ESI + (0xcd)) == NaN) {
            heap.setU8((unaff_ESI + (0xcd)), (6) & 0xff);
            bVar22 = ((false) & 0xff);
            /* goto LAB_005dc259 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc259"); return 0;
          }
          if (heap.u8(unaff_ESI + (0xcd)) == 8) {
            heap.setU8((unaff_ESI + (0xcd)), (5) & 0xff);
            bVar22 = ((false) & 0xff);
            /* goto LAB_005dc259 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc259"); return 0;
          }
          bVar10 = ((heap.u8(unaff_ESI + (0xcd))) & 0xff);
          bVar22 = ((bVar10 < 4) & 0xff);
          if (4 < bVar10) {
            /* goto LAB_005dc259 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc259"); return 0;
          }
          if (bVar10 == 4) {
            heap.setU8((unaff_ESI + (0xcd)), (1) & 0xff);
            /* goto LAB_005dc259 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc259"); return 0;
          }
          heap.setU8((unaff_ESI + (0xcd)), (2) & 0xff);
          uVar23 = (((regs.eax = FUN_005cfc50(heap))) >>> 0);
          if (!bVar22) {
            uVar19 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar19 >>> 8)), (((uVar19 >>> 8)) << 24 >> 24))) >>> 0);
            uVar23 = ((CONCAT44((((((uVar23) >>> 0) >>> 0x20)) >>> 0), ((uVar23) >>> 0) >>> 0x10)) >>> 0);
            uVar11 = ((extraout_var_00) & 0xffff);
            /* goto LAB_005dc28d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc28d"); return 0;
          }
        }
        heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x20) >>> 0);
        heap.setU32(0x0065dc34, (heap.u32(0x0065dc34) - (heap.i32((unaff_ESI + 0x24)) + 1)) >>> 0);
        heap.setI32((unaff_ESI + 0x24), (heap.i32((unaff_ESI + 0x24)) - (heap.i32((unaff_ESI + 0x24)) + 1)) & 0xffffffff);
        uVar19 = ((((((heap.u8(unaff_ESI + (0x1f))) & 0xff)) >>> 0)) >>> 0);
        LAB_005dc98a: do {
          do {
            if (-1 < (heap.i32((unaff_ESI + 0x24)) | 0)) {
              break LAB_005dca55;
            }
            uVar19 = ((heap.u32((0x0065dc70 + uVar19 * 4))) >>> 0);
            heap.setU32((unaff_ESI + 0x2c), (heap.i32((unaff_ESI + 0x2c)) + uVar19) & 0xffffffff);
            heap.setU32(0x0065dc38, (heap.u32(0x0065dc38) + 1) >>> 0);
            LAB_005dc62d: if (((heap.u16((unaff_ESI + 0x36)) >>> 2 == 0) && (heap.u32((0x00887420) + (((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260) * 4) == 42)) && (heap.u32(0x0065dc30) < -0x7ffff)) {
              heap.setI32((unaff_ESI + 0x2c), (heap.u32(0x0065dc30) * -2) & 0xffffffff);
            }
            if ((heap.u16((unaff_ESI + 0x36)) >>> 2 == 99) && (-heap.u32(0x0065dc30) != ((((heap.u8(unaff_ESI + (0xcf))) & 0xff)) >>> 0) * 0x10000 && heap.u32(0x0065dc30) <= (((((((heap.u8(unaff_ESI + (0xcf))) & 0xff)) >>> 0) * -0x10000)) >>> 0))) {
              heap.setI32((unaff_ESI + 0x2c), (heap.u32(0x0065dc30) * -0x10) & 0xffffffff);
            }
            sVar3 = ((heap.i16((unaff_ESI + 0x34)) + -1) & 0xffff);
            if ((sVar3 | 0) == -1) {
              uVar11 = ((heap.u16((unaff_ESI + 0x3a)) << 7 | heap.u16((unaff_ESI + 0x3a)) >>> 9 | heap.u16((unaff_ESI + 0x38))) & 0xffff);
              pbVar20 = ((heap.u32((0x00971ef4) + (((uVar11 >>> 5 | uVar11 << 0xb) & 0xffff)) * 4)) >>> 0);
              uVar11 = ((heap.u16((unaff_ESI + 0x36)) >>> 2) & 0xffff);
              uVar19 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar19 >>> 8)), heap.u32((0x006545b5) + (((uVar11) >>> 0) * 8) * 4))) >>> 0);
              heap.setU8(0x0065e6b9, (CONCAT11(heap.u32((0x006545b5) + (((uVar11) >>> 0) * 8) * 4), heap.u32((0x006545b3) + (((uVar11) >>> 0) * 8) * 4))) & 0xff);
              for (; ((uVar19 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar19 >>> 8)), heap.u8(pbVar20)) & 0xffffff3c) >>> 0), ((uVar19) << 24 >> 24) != 8 || (((heap.u16((unaff_ESI + 0x3c)) >>> 2) & 0xff) != heap.u8(pbVar20 + (2)))) || (((heap.u8(pbVar20 + (5)) & 0xf) != 0 || (((uVar11) & 0xff) != heap.u8(pbVar20 + (4)))))); pbVar20 = (((pbVar20 + 8) >>> 0)) >>> 0) {
              
              }
              bVar22 = ((true) & 0xff);
              if (((heap.u8(unaff_ESI + (0xcd))) & 0xff) < 2) {
                LAB_005dc76d: (regs.eax = FUN_005cfc50(heap));
                uVar7 = ((extraout_EDX_01) >>> 0);
                if ((!bVar22) && (uVar11 = ((extraout_var) & 0xffff), uVar4 = ((extraout_var_01) & 0xffff), CONCAT11(heap.u32((0x006545b4) + (((heap.u8(pbVar20 + (4))) >>> 0) * 8) * 4), heap.u32((0x006545b2) + (((heap.u8(pbVar20 + (4))) >>> 0) * 8) * 4)) == heap.u8(0x0065e6b9))) {
                  LAB_005dc7a7: heap.setU16((unaff_ESI + 0x38), (uVar11) & 0xffff);
                  heap.setU16((unaff_ESI + 0x3a), (uVar4) & 0xffff);
                  heap.setU16((unaff_ESI + 0x3c), (((uVar7) & 0xffff)) & 0xffff);
                  if ((heap.u8(unaff_ESI + (0xcd)) != 0) && (((heap.u8(unaff_ESI + (0xcd))) & 0xff) < 5)) {
                    sVar3 = ((CONCAT11((((uVar4 >>> 5)) << 24 >> 24), (((uVar11 >>> 5)) << 24 >> 24))) & 0xffff);
                    iVar6 = ((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260) >>> 0);
                    cVar13 = (((((((uVar7) & 0xffff) >>> 2)) << 24 >> 24)) & 0xff);
                    if ((sVar3 == heap.i16((0x0088750c + iVar6))) && (cVar13 == heap.u32((0x0088750f) + (iVar6) * 4))) {
                      heap.setU8((unaff_ESI + (0xcd)), (3) & 0xff);
                    } else {
                      if ((sVar3 == heap.i16((0x0088750a + iVar6))) && (cVar13 == heap.u32((0x0088750e) + (iVar6) * 4))) {
                      heap.setU8((unaff_ESI + (0xcd)), (4) & 0xff);
                    }
                    }
                  }
                  if ((heap.u8(pbVar20) & 0x80) == 0) {
                    puVar1 = (((unaff_ESI + 0x48)) >>> 0);
                    uVar11 = ((heap.u16(puVar1)) & 0xffff);
                    heap.setU32(puVar1, (heap.u16(puVar1) & 0xfffe) & 0xffffffff);
                    if ((((uVar11 & 1) != 0) && ((heap.i16((unaff_ESI + 0x3e)) | 0) == -1)) && (heap.u32(0x0065dc30) < 0)) {
                      heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x100) >>> 0);
                    }
                  } else {
                    if (((heap.u32(0x0065dc30) < 0) && ((heap.i16((unaff_ESI + 0x3e)) | 0) == -1)) && ((heap.u16((0x00652309 + ((heap.u8(pbVar20 + (4))) >>> 0) * 2)) & 0x20) == 0)) {
                      heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x200) >>> 0);
                    }
                    heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) | 1) & 0xffff);
                  }
                  iVar6 = ((CONCAT31((regs.eax = callIndirect(heap, int3, (((heap.u8(pbVar20 + (4))) >>> 0) << 2) >>> 8)), ((((heap.u8(pbVar20 + (4))) >>> 0) << 2) & 0xff) | ((uVar19 >>> 8) & 0xff) & 3)) >>> 0);
                  heap.setI16((unaff_ESI + 0x36), (((iVar6) << 16 >> 16)) & 0xffff);
                  heap.setU8((unaff_ESI + (0xcf)), ((heap.u8(pbVar20 + (5)) >>> 4) << 1) & 0xff);
                  sVar3 = ((heap.i16((heap.i32((heap.u32((0x0067af10) + (((heap.u8(unaff_ESI + (0xcd))) & 0xff)) * 4) + iVar6 * 4)) + -2)) + -1) & 0xffff);
                  /* goto LAB_005dc89e — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc89e"); return 0;
                }
              } else {
                if (heap.u8(unaff_ESI + (0xcd)) == NaN) {
                  heap.setU8((unaff_ESI + (0xcd)), (5) & 0xff);
                  bVar22 = ((false) & 0xff);
                  /* goto LAB_005dc76d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc76d"); return 0;
                }
                if (heap.u8(unaff_ESI + (0xcd)) == 8) {
                  heap.setU8((unaff_ESI + (0xcd)), (6) & 0xff);
                  bVar22 = ((false) & 0xff);
                  /* goto LAB_005dc76d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc76d"); return 0;
                }
                bVar22 = ((((heap.u8(unaff_ESI + (0xcd))) & 0xff) < 5) & 0xff);
                if (!bVar22) {
                  /* goto LAB_005dc76d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc76d"); return 0;
                }
                bVar22 = ((((heap.u8(unaff_ESI + (0xcd))) & 0xff) < 3) & 0xff);
                if (heap.u8(unaff_ESI + (0xcd)) == 3) {
                  heap.setU8((unaff_ESI + (0xcd)), (1) & 0xff);
                  bVar22 = ((false) & 0xff);
                  /* goto LAB_005dc76d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc76d"); return 0;
                }
                heap.setU8((unaff_ESI + (0xcd)), (2) & 0xff);
                uVar11 = (((regs.eax = FUN_005cfac7(heap))) & 0xffff);
                uVar7 = ((extraout_EDX_00) >>> 0);
                uVar4 = ((extraout_CX_01) & 0xffff);
                if (!bVar22) {
                  /* goto LAB_005dc7a7 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc7a7"); return 0;
                }
              }
              heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x20) >>> 0);
              iVar6 = ((heap.i32((unaff_ESI + 0x24)) + -0x368a) >>> 0);
              uVar23 = ((CONCAT44(uVar7, iVar6)) >>> 0);
              heap.setU32(0x0065dc34, (heap.u32(0x0065dc34) - iVar6) >>> 0);
              heap.setI32((unaff_ESI + 0x24), (heap.i32((unaff_ESI + 0x24)) - iVar6) & 0xffffffff);
              uVar19 = ((((((heap.u8(unaff_ESI + (0x1f))) & 0xff)) >>> 0)) >>> 0);
              /* goto LAB_005dc538 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dc538"); return 0;
            }
            LAB_005dc89e: heap.setI16((unaff_ESI + 0x34), (sVar3) & 0xffff);
            psVar21 = (((heap.u32((unaff_ESI + 0x34)) * 10 + heap.i32((heap.u32((0x0067af10) + (((heap.u8(unaff_ESI + (0xcd))) & 0xff)) * 4) + heap.u32((unaff_ESI + 0x36)) * 4)))) >>> 0);
            sVar3 = ((heap.i16(psVar21)) & 0xffff);
            sVar5 = ((heap.i16(psVar21 + (1) * 2)) & 0xffff);
            sVar14 = ((heap.i16(psVar21 + (2) * 2) + heap.i16((unaff_ESI + 0x3c)) + ((((heap.u32((0x005f5d02) + (heap.u32(((0x00887420) >>> 0) + (((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260) * 4) * 8) * 4)) << 24 >> 24)) << 16 >> 16)) & 0xffff);
            uVar19 = (((((((sVar3 + heap.i16((unaff_ESI + 0x38)))) << 16 >> 16) != heap.u32(0x0065dc48)) >>> 0)) >>> 0);
            if ((((sVar5 + heap.i16((unaff_ESI + 0x3a)))) << 16 >> 16) != heap.u32(0x0065dc4a)) {
              uVar19 = ((uVar19 | 2) >>> 0);
            }
            if (sVar14 != heap.u32(0x0065dc4c)) {
              uVar19 = ((uVar19 | 4) >>> 0);
            }
            heap.setI32((unaff_ESI + 0x24), (heap.i32((unaff_ESI + 0x24)) + heap.i32((uVar19 * 4 + 0x65dc50))) & 0xffffffff);
            heap.setU32(0x0065dc48, (CONCAT22(sVar5 + heap.i16((unaff_ESI + 0x3a)), sVar3 + heap.i16((unaff_ESI + 0x38)))) >>> 0);
            heap.setU32(0x0065dc4c, (sVar14) >>> 0);
            heap.setU8((unaff_ESI + (0x1e)), (((heap.i16(psVar21 + (3) * 2)) << 24 >> 24)) & 0xff);
            heap.setU8((unaff_ESI + (0x20)), (((heap.i16(psVar21 + (4) * 2)) << 24 >> 24)) & 0xff);
            bVar10 = ((heap.u8((((psVar21) >>> 0) + 7))) & 0xff);
            uVar19 = ((((bVar10) >>> 0)) >>> 0);
            heap.setU8((unaff_ESI + (0x1f)), (bVar10) & 0xff);
            unaff_EBP = ((((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0)) >>> 0);
            if (((heap.u16((0x005f7104 + ((unaff_EBP) >>> 0) * 8)) & 0x200) != 0) && (bVar10 != 0)) {
              heap.setU8((unaff_ESI + (0x4a)), (0) & 0xff);
              heap.setU16((unaff_ESI + 0x4c), (0) & 0xffff);
              heap.setU16((unaff_ESI + 0x4e), (0) & 0xffff);
            }
          } while ((unaff_ESI != heap.u32(0x0065dc28)) || (bVar22 = ((false) & 0xff), -1 < (heap.u32(0x0065dc30) | 0)));
          unaff_EBP = (((0) * (unaff_ESI + 0x42)) >>> 0);
          (regs.eax = FUN_005dcd40(heap));
        } while (!bVar22);
        heap.setU32(0x0065dc34, (heap.u32(0x0065dc34) - (heap.i32((unaff_ESI + 0x24)) + -0x368a)) >>> 0);
        heap.setI32((unaff_ESI + 0x24), (heap.i32((unaff_ESI + 0x24)) - (heap.i32((unaff_ESI + 0x24)) + -0x368a)) & 0xffffffff);
        iVar6 = ((((unaff_EBP) >>> 0) * 0x100) >>> 0);
        unaff_EBP = ((0x00743b94 + iVar6) >>> 0);
        uVar9 = ((heap.i32((heap.u8(0x0065dc2c) + 0x28)) - heap.i32((0x00743bbc + iVar6))) >>> 0);
        if (((uVar9) >>> 0) < 0) {
          uVar9 = ((-uVar9) >>> 0);
        }
        uVar23 = ((CONCAT44(extraout_EDX_02, uVar9)) >>> 0);
        if ((0xe0000 < uVar9) && ((heap.u16((0x005f7104 + ((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 0x40) == 0)) {
          heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x80) >>> 0);
        }
        if ((heap.u16((0x005f7104 + ((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 0x4000) == 0) {
          iVar16 = ((heap.i32((heap.u8(0x0065dc2c) + 0x28))) >>> 0);
          uVar23 = ((CONCAT44(extraout_EDX_02, heap.i32((0x00743bbc + iVar6)) >>> 1)) >>> 0);
          heap.setI32((heap.u8(0x0065dc2c) + 0x28), (heap.i32((0x00743bbc + iVar6)) >>> 1) & 0xffffffff);
          heap.setI32((0x00743bbc + iVar6), (iVar16 >>> 1) & 0xffffffff);
          heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 4) >>> 0);
        } else {
          heap.setI32((unaff_ESI + 0x28), (heap.i32((unaff_ESI + 0x28)) - (heap.i32((unaff_ESI + 0x28)) >>> 2)) & 0xffffffff);
          heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 4) >>> 0);
        }
      }
      LAB_005dc538: if (heap.i32((unaff_ESI + 0x24)) < 0x368a) {
        break LAB_005dca55;
      }
      uVar19 = ((heap.u32((0x0065dc70 + uVar19 * 4))) >>> 0);
      heap.setU32((unaff_ESI + 0x2c), (heap.i32((unaff_ESI + 0x2c)) + uVar19) & 0xffffffff);
      heap.setU32(0x0065dc38, (heap.u32(0x0065dc38) + 1) >>> 0);
    } while (true);
  }
  break LAB_005dca73;
  }
  (regs.eax = FUN_00444927(heap));
  (regs.eax = FUN_005e53ca(heap));
  }
  heap.setI32((unaff_ESI + 0x2c), (heap.i32((unaff_ESI + 0x2c)) / heap.u32(0x0065dc38)) & 0xffffffff);
  uVar19 = ((heap.u32(0x0065dc40)) >>> 0);
  puVar2 = ((heap.u8(0x0065dc2c)) >>> 0);
  if ((((heap.u8(unaff_ESI + (0xcd)) != 2) && ((heap.u32((0x006559d8) + (((heap.u16((unaff_ESI + 0x36)) >>> 2) >>> 0) * 0x10) * 4) & 0x10) != 0)) && (heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 8) >>> 0), heap.u16((unaff_ESI + 0x36)) >>> 2 == 1)) && (unaff_ESI == heap.u8(0x0065dc2c))) {
    if (heap.u32(0x0065dc30) < 0) {
      if (heap.u16((unaff_ESI + 0x34)) < 0x17) {
        /* goto LAB_005dcb16 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dcb16"); return 0;
      }
    } else {
      uVar11 = ((0x11) & 0xffff);
      if ((heap.u16((0x005f7104 + ((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 0x1000) != 0) {
        uVar11 = ((6) & 0xffff);
      }
      if (((heap.u16((0x005f7104 + ((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 0x4000) != 0) && (uVar11 = ((0x14) & 0xffff), heap.u8(unaff_ESI + (0xcd)) == 6)) {
        uVar11 = ((0x12) & 0xffff);
      }
      if (uVar11 < heap.u16((unaff_ESI + 0x34))) {
        LAB_005dcb16: heap.setU32(0x0065dc40, (uVar19 | 9) >>> 0);
        heap.setU32(0x0065dc44, (-1) >>> 0);
        do {
          do {
            iVar6 = ((heap.u32(0x0065dc44)) >>> 0);
            heap.setU32(0x0065dc44, (iVar6 + 1) >>> 0);
          } while (CONCAT11((((heap.u16((unaff_ESI + 0x3a)) >>> 5)) << 24 >> 24), (((heap.u16((unaff_ESI + 0x38)) >>> 5)) << 24 >> 24)) != heap.u32((0x0088744a) + (((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x130 + heap.u32(0x0065dc44)) * 4));
        } while ((((heap.u16((unaff_ESI + 0x3c)) >>> 2)) << 24 >> 24) != heap.u32((0x00887453) + (((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260 + iVar6) * 4));
      }
    }
  }
  if ((heap.u16((unaff_ESI + 0x48)) & 1) != 0) {
    heap.setU32(0x0065dc40, (heap.u32(0x0065dc40) | 0x10) >>> 0);
  }
  if (heap.u32(0x0065dc30) < 0) {
    if (unaff_ESI == heap.u8(0x0065dc2c)) {
      break LAB_005dcbad;
    }
    unaff_ESI = ((0x00743b94 + heap.u32((unaff_ESI + 0x40)) * 0x100) >>> 0);
    /* goto LAB_005dbffb — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dbffb"); return 0;
  }
  if (heap.u16((unaff_ESI + 0x3e)) != 0xffff) {
    unaff_ESI = ((0x00743b94 + heap.u32((unaff_ESI + 0x3e)) * 0x100) >>> 0);
    /* goto LAB_005dbffb — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dbffb"); return 0;
  }
  }
  iVar6 = ((0) >>> 0);
  uVar19 = ((0) >>> 0);
  iVar16 = ((0) >>> 0);
  puVar18 = ((heap.u8(0x0065dc2c)) >>> 0);
  while (true) {
    iVar16 = ((iVar16 + 1) >>> 0);
    uVar19 = ((((((uVar19) << 16 >> 16) + heap.i16((puVar18 + 0x46))) >>> 0)) >>> 0);
    iVar6 = ((iVar6 + heap.i32((puVar18 + 0x2c))) >>> 0);
    if (heap.u16((puVar18 + 0x3e)) == 0xffff) {
      break;
    }
    puVar18 = ((0x00743b94 + heap.u32((puVar18 + 0x3e)) * 0x100) >>> 0);
  }
  iVar15 = ((heap.i32((heap.u8(0x0065dc2c) + 0x28)) >>> 8) >>> 0);
  iVar15 = ((iVar15 * iVar15) >>> 0);
  if (heap.i32((heap.u8(0x0065dc2c) + 0x28)) < 0) {
    iVar15 = ((-iVar15) >>> 0);
  }
  iVar6 = (((((iVar6 / iVar16) * 0x15 >>> 9) - (heap.i32((heap.u8(0x0065dc2c) + 0x28)) >>> 0xc)) - (((CONCAT44(iVar15 >>> 0x1f, iVar15 >>> 4) / ((((uVar19) >>> 0)) >>> 0))) >>> 0)) >>> 0);
  if ((heap.u16((0x005f7104 + ((((heap.u32(heap.u8(0x0065dc2c) + (0x31) * 4)) & 0xff)) >>> 0) * 8)) & 8) == 0) {
    break LAB_005dcd0c;
  }
  uVar9 = ((((((heap.u32(heap.u8(0x0065dc2c) + (0xc2) * 4)) & 0xff)) >>> 0)) >>> 0);
  if (heap.u16((heap.u8(0x0065dc2c) + 0x36)) >>> 2 == 0x32) {
    if (heap.u32(heap.u8(0x0065dc2c) + (0xcd) * 4) != 5) {
      /* goto LAB_005dcc4c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dcc4c"); return 0;
    }
    LAB_005dcc5e: uVar9 = ((((uVar9) >>> 0) >>> 1) >>> 0);
  } else {
    if (heap.u16((heap.u8(0x0065dc2c) + 0x36)) >>> 2 == 0x33) {
    if (heap.u32(heap.u8(0x0065dc2c) + (0xcd) * 4) == 6) {
      /* goto LAB_005dcc5e — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dcc5e"); return 0;
    }
    LAB_005dcc4c: uVar9 = ((uVar9 - (((uVar9) >>> 0) >>> 2)) >>> 0);
  }
  }
  iVar16 = ((uVar9 * 0x4000) >>> 0);
  if ((heap.u16((heap.u8(0x0065dc2c) + 0x48)) & 8) != 0) {
    iVar16 = ((uVar9 * -0x4000) >>> 0);
  }
  iVar16 = ((((((iVar16 - heap.i32((heap.u8(0x0065dc2c) + 0x28))) * ((((heap.u32(heap.u8(0x0065dc2c) + (0xc3) * 4)) & 0xff)) >>> 0) * 2)) >>> 0) / (((uVar9 * uVar19 >>> 2)) >>> 0)) >>> 0);
  uVar19 = ((((((heap.u32(heap.u8(0x0065dc2c) + (0x31) * 4)) & 0xff)) >>> 0)) >>> 0);
  if ((heap.u16((0x005f7104 + uVar19 * 8)) & 0x2000) == 0) {
    LAB_005dccf7: uVar19 = ((heap.u32((puVar2 + 0x28))) >>> 0);
    if (((uVar19) >>> 0) < 0) {
      uVar19 = ((-uVar19) >>> 0);
    }
    if (uVar19 < 0x10001) {
      iVar6 = ((0) >>> 0);
    }
  } else {
    if (iVar16 < 0) {
      iVar16 = ((iVar16 >>> 4) >>> 0);
    }
    if ((heap.u16((0x005f7104 + uVar19 * 8)) & 4) != 0) {
      sVar3 = ((heap.i16((heap.u8(0x0065dc2c) + 0xb6))) & 0xffff);
      if (0x200 < sVar3) {
        sVar3 = ((0x200) & 0xffff);
      }
      if (sVar3 < -0x200) {
        sVar3 = ((-0x200) & 0xffff);
      }
      heap.setI16((heap.u8(0x0065dc2c) + 0xb6), (sVar3) & 0xffff);
    }
    if (heap.u8(puVar2 + (0x1f)) == 0) {
      /* goto LAB_005dccf7 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbeeb/LAB_005dccf7"); return 0;
    }
    if (iVar16 < 0) {
      iVar16 = ((0) >>> 0);
    }
    if (((heap.u16((0x005f7104 + uVar19 * 8)) & 4) != 0) && (heap.u8(puVar2 + (0x1f)) == 2)) {
      heap.setU16((puVar2 + 0xb6), (0) & 0xffff);
    }
  }
  iVar6 = ((iVar6 + iVar16) >>> 0);
  }
  if (((heap.u16((puVar2 + 0x36)) >>> 2 == 0x75) && (0x2f < heap.u16((puVar2 + 0x34)))) && (heap.u16((puVar2 + 0x34)) < 0x81)) {
    iVar6 = ((iVar6 - (heap.i32((puVar2 + 0x28)) >>> 6)) >>> 0);
  }
  heap.setI32((puVar2 + 0x2c), (iVar6) & 0xffffffff);
  return heap.u32(0x0065dc40);
} finally {
    heap.freeFrame(4);
  }
}
