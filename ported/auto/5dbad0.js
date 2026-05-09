// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dbad0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CARRY2, CONCAT11, CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005d849e } from "./5d849e.js";
import { FUN_005db615 } from "./5db615.js";
import { FUN_005db66f } from "./5db66f.js";
import { FUN_005dcd40 } from "./5dcd40.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005dbad0(heap) {
  let cVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let iVar8 = 0;
  let sVar9 = 0;
  let uVar10 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let extraout_CX_02 = 0;
  let bVar11 = 0;
  let extraout_DX = 0;
  let uVar12 = 0;
  let pbVar13 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar14 = 0;
  let bVar15 = 0;
  LAB_005dbe76: {
  heap.setU32(0x0065dc40, (0) >>> 0);
  heap.setU32(0x0065dc30, (heap.i32((unaff_ESI + 0x2c)) + heap.i32((unaff_ESI + 0x28))) >>> 0);
  heap.setI32((unaff_ESI + 0x28), (heap.u32(0x0065dc30)) & 0xffffffff);
  heap.setU32(0x0065dc34, ((heap.u32(0x0065dc30) >>> 10) * 0x2a) >>> 0);
  if ((heap.u16((0x005f7104 + heap.u32((unaff_ESI + 0x31)) * 8)) & 0x180) != 0) {
    (regs.eax = FUN_005d849e(heap));
  }
  heap.setU32(0x0065dc38, (1) >>> 0);
  heap.setU32((unaff_ESI + 0x2c), (0) & 0xffffffff);
  iVar7 = ((heap.u32(0x0065dc34) + heap.i32((unaff_ESI + 0x24))) >>> 0);
  heap.setI32((unaff_ESI + 0x24), (iVar7) & 0xffffffff);
  if (0x3689 < iVar7) {
    heap.setU16((unaff_ESI + 0xb8), (heap.u16((unaff_ESI + 0xb8)) & 0xfffd) & 0xffff);
    heap.setU32(0x0065dc48, (heap.u32((unaff_ESI + 0xe))) >>> 0);
    heap.setU32(0x0065dc4c, (heap.u16((unaff_ESI + 0x12))) >>> 0);
    (regs.eax = FUN_005e53ca(heap));
    LAB_005dbb4f: heap.setI8((unaff_ESI + 0x35), (heap.i8((unaff_ESI + 0x35)) + 1) & 0xff);
    sVar9 = (((heap.u16((unaff_ESI + 0x36)) >>> 8) * 0x20 + 0x10) & 0xffff);
    uVar3 = ((((heap.u16((unaff_ESI + 0x36)) & 0xff) * 0x20 + 0x10) - heap.i16((unaff_ESI + 0xe))) & 0xffff);
    if (((uVar3) << 16 >> 16) < 0) {
      uVar10 = ((sVar9 - heap.i16((unaff_ESI + 0x10))) & 0xffff);
      if (((uVar10) << 16 >> 16) < 0) {
        uVar4 = ((-uVar3) & 0xffff);
        uVar5 = ((-uVar10) & 0xffff);
        uVar12 = ((0x18) & 0xff);
        if ((uVar5 <= ((uVar3 * -4) & 0xffff)) && (uVar12 = ((0) & 0xff), uVar4 <= ((uVar10 * -4) & 0xffff))) {
          uVar12 = ((0x1c) & 0xff);
        }
      } else {
        uVar4 = ((-uVar3) & 0xffff);
        uVar12 = ((8) & 0xff);
        uVar5 = ((uVar10) & 0xffff);
        if ((uVar10 <= ((uVar3 * -4) & 0xffff)) && (uVar12 = ((0) & 0xff), uVar4 <= ((uVar10 * 4) & 0xffff))) {
          uVar12 = ((4) & 0xff);
        }
      }
    } else {
      uVar10 = ((sVar9 - heap.i16((unaff_ESI + 0x10))) & 0xffff);
      uVar4 = ((uVar3) & 0xffff);
      if (((uVar10) << 16 >> 16) < 0) {
        uVar5 = ((-uVar10) & 0xffff);
        uVar12 = ((0x18) & 0xff);
        if ((uVar5 <= ((uVar3 * 4) & 0xffff)) && (uVar12 = ((0x10) & 0xff), uVar3 <= ((uVar10 * -4) & 0xffff))) {
          uVar12 = ((0x14) & 0xff);
        }
      } else {
        uVar12 = ((8) & 0xff);
        uVar5 = ((uVar10) & 0xffff);
        if ((uVar10 <= ((uVar3 * 4) & 0xffff)) && (uVar12 = ((0x10) & 0xff), uVar3 <= ((uVar10 * 4) & 0xffff))) {
          uVar12 = ((0xc) & 0xff);
        }
      }
    }
    heap.setU8((unaff_ESI + 0x34), (uVar12) & 0xff);
    if (((uVar4 + uVar5) & 0xffff) < 0xd) {
      (regs.eax = FUN_005db66f(heap));
    }
    if ((heap.u8((unaff_ESI + 0x35)) & 1) == 0) {
      cVar1 = ((heap.i8((unaff_ESI + 0x1e))) & 0xff);
      if (cVar1 != heap.i8((unaff_ESI + 0x34))) {
        bVar11 = (((heap.i8((unaff_ESI + 0x34)) + 16) - cVar1 & 0x1e) & 0xff);
        if (bVar11 < 0x10) {
          bVar2 = ((cVar1 - 2) & 0xff);
          if (bVar11 < 8) {
            heap.setI8((unaff_ESI + 0x35), (heap.i8((unaff_ESI + 0x35)) + -1) & 0xff);
          }
        } else {
          bVar2 = ((cVar1 + 2) & 0xff);
          if (0x18 < bVar11) {
            heap.setI8((unaff_ESI + 0x35), (heap.i8((unaff_ESI + 0x35)) + -1) & 0xff);
          }
        }
        heap.setU8((unaff_ESI + 0x1e), (bVar2 & 0x1e) & 0xff);
      }
    }
    uVar14 = (((heap.u16((unaff_ESI + 0x1e)) | heap.u8((unaff_ESI + 0x35)) & 1) & 0x1f) >>> 0);
    bVar15 = ((CARRY2(heap.u16((unaff_ESI + 0x10)), heap.u16((0x0065e6be + uVar14 * 8)))) & 0xff);
    uVar3 = (((regs.eax = FUN_005dcd40(heap))) & 0xffff);
    if (bVar15) {
      heap.setU32((unaff_ESI + 0x24), (0) & 0xffffffff);
      if (heap.i8((unaff_ESI + 0x1e)) == heap.i8((unaff_ESI + 0x34))) {
        heap.setU8((unaff_ESI + 0x1e), (heap.u8((unaff_ESI + 0x1e)) ^ 0x10) & 0xff);
        (regs.eax = FUN_005db66f(heap));
        heap.setU8((unaff_ESI + 0x1e), (heap.u8((unaff_ESI + 0x1e)) ^ 0x10) & 0xff);
      }
      /* goto LAB_005dbe58 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbad0/LAB_005dbe58"); return 0;
    }
    uVar10 = ((uVar3 & 0xffe0) & 0xffff);
    bVar15 = ((uVar10 < heap.u16((unaff_ESI + 0x38))) & 0xff);
    if ((uVar10 != heap.u16((unaff_ESI + 0x38))) || (bVar15 = (((extraout_CX & 0xffe0) < heap.u16((unaff_ESI + 0x3a))) & 0xff), uVar5 = ((uVar3) & 0xffff), uVar4 = ((extraout_CX) & 0xffff), (extraout_CX & 0xffe0) != heap.u16((unaff_ESI + 0x3a)))) {
      uVar5 = (((regs.eax = FUN_005db615(heap))) & 0xffff);
      if (bVar15) {
        if ((heap.i8((unaff_ESI + 0x51)) == 1) && (iVar7 = ((heap.u32((unaff_ESI + 0x30)) * 0x260) >>> 0), CONCAT11((((extraout_DX >>> 5)) << 24 >> 24), (((uVar3 >>> 5)) << 24 >> 24)) == heap.i16((0x008874a2 + iVar7)))) {
          if ((heap.u32((0x008874a1) + (iVar7) * 4) & 1) == 0) {
            uVar5 = ((extraout_CX_00) & 0xffff);
          }
          bVar15 = (((uVar5 & 0x1f) < 0x10) & 0xff);
          if ((uVar5 & 0x1f) == 0x10) {
            heap.setU32((unaff_ESI + 0x24), (0) & 0xffffffff);
            uVar6 = (((regs.eax = FUN_005dcd40(heap))) & 0xffff);
            if (!bVar15) {
              heap.setU16((unaff_ESI + 0x38), (uVar10) & 0xffff);
              heap.setU16((unaff_ESI + 0x3a), (extraout_DX) & 0xffff);
              for (pbVar13 = ((heap.u32((0x00971ef4) + (((((extraout_DX << 7 | extraout_DX >>> 9 | uVar10) & 0xffff) >>> 5 | (extraout_DX >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0); ((heap.u8(pbVar13) & 0x3c) != 8 || (((heap.u16((unaff_ESI + 0x3c)) >>> 2) & 0xff) != heap.u8(pbVar13 + (2)))); pbVar13 = (((pbVar13 + 8) >>> 0)) >>> 0) {
              
              }
              heap.setI16((unaff_ESI + 0x36), (((CONCAT31((regs.eax = callIndirect(heap, int3, (((heap.u8(pbVar13 + (4))) >>> 0) << 2) >>> 8)), ((((heap.u8(pbVar13 + (4))) >>> 0) << 2) & 0xff) | heap.u32((0x008874a1) + (iVar7) * 4) & 3)) << 16 >> 16)) & 0xffff);
              heap.setU16((unaff_ESI + 0x34), (0) & 0xffff);
              heap.setU8((unaff_ESI + 0x50), (4) & 0xff);
              heap.setU32(0x0065dc48, (CONCAT22(extraout_CX_02, uVar6)) >>> 0);
            }
          } else {
            heap.setU32((unaff_ESI + 0x24), (0) & 0xffffffff);
            uVar6 = (((regs.eax = FUN_005dcd40(heap))) & 0xffff);
            if (!bVar15) {
              heap.setU32(0x0065dc48, (CONCAT22(extraout_CX_01, uVar6)) >>> 0);
            }
          }
        } else {
          heap.setU32((unaff_ESI + 0x24), (0) & 0xffffffff);
          if (heap.i8((unaff_ESI + 0x1e)) == heap.i8((unaff_ESI + 0x34))) {
            (regs.eax = FUN_005db66f(heap));
          }
        }
        LAB_005dbe58: (regs.eax = FUN_00444927(heap));
        (regs.eax = FUN_005e53ca(heap));
        break LAB_005dbe76;
      }
      heap.setU16((unaff_ESI + 0x38), (uVar10) & 0xffff);
      heap.setU16((unaff_ESI + 0x3a), (extraout_DX) & 0xffff);
      uVar4 = ((extraout_CX_00) & 0xffff);
    }
    heap.setI32((unaff_ESI + 0x24), (heap.i32((unaff_ESI + 0x24)) - heap.i32((0x0065e6c0 + uVar14 * 8))) & 0xffffffff);
    heap.setU32(0x0065dc48, (CONCAT22(uVar4, uVar5)) >>> 0);
    if (heap.i32((unaff_ESI + 0x24)) < 0x368a) {
      /* goto LAB_005dbe58 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbad0/LAB_005dbe58"); return 0;
    }
    heap.setU32(0x0065dc38, (heap.u32(0x0065dc38) + 1) >>> 0);
    /* goto LAB_005dbb4f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dbad0/LAB_005dbb4f"); return 0;
  }
  }
  iVar7 = ((heap.i32((unaff_ESI + 0x28)) >>> 8) >>> 0);
  iVar7 = ((iVar7 * iVar7) >>> 0);
  if (heap.i32((unaff_ESI + 0x28)) < 0) {
    iVar7 = ((-iVar7) >>> 0);
  }
  iVar7 = ((-(((heap.i32((unaff_ESI + 0x28)) >>> 1) + (iVar7 >>> 5)) / (((0)) >>> 0) * (unaff_ESI + 0x46))) >>> 0);
  if ((heap.u16((0x005f7104 + heap.u32((unaff_ESI + 0x31)) * 8)) & 8) != 0) {
    uVar14 = ((heap.u32((unaff_ESI + 0xc2))) >>> 0);
    iVar8 = ((uVar14 * 0x4000) >>> 0);
    if ((heap.u16((unaff_ESI + 0x48)) & 8) != 0) {
      iVar8 = ((uVar14 * -0x4000) >>> 0);
    }
    iVar7 = ((iVar7 + ((((iVar8 - heap.i32((unaff_ESI + 0x28))) * (0) * (unaff_ESI + 0xc3) * 2)) >>> 0) / (((uVar14 * heap.u16((unaff_ESI + 0x46)) >>> 2)) >>> 0)) >>> 0);
  }
  heap.setI32((unaff_ESI + 0x2c), (iVar7) & 0xffffffff);
  return heap.u32(0x0065dc40);
}
