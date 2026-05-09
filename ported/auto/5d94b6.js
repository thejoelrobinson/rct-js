// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d94b6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005d8c79 } from "./5d8c79.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005d94b6(heap) {
  let bVar1 = 0;
  let cVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let bVar8 = 0;
  let uVar5 = 0;
  let extraout_var = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let bVar9 = 0;
  let cVar11 = 0;
  let extraout_CH = 0;
  let uVar10 = 0;
  let extraout_DL = 0;
  let extraout_DL_00 = 0;
  let extraout_DH = 0;
  let unaff_BL = regs.ebx & 0xff;
  let uVar12 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar13 = 0;
  LAB_005d96a2: {
  LAB_005d963a: {
  LAB_005d977a: {
  LAB_005d96ef: {
  bVar9 = ((heap.u8(unaff_ESI + (0x30))) & 0xff);
  if ((heap.u16((unaff_ESI + 0x48)) & 0x20) != 0) {
    (regs.eax = FUN_005d8c79(heap));
  }
  heap.setU8(0x0065e6b7, (-1) & 0xff);
  if ((heap.u32((0x00887422) + (((bVar9) >>> 0) * 0x130) * 4) & 0xc0) != 0) {
    heap.setU8(0x0065e6b7, (heap.u32((0x0088755c) + (((bVar9) >>> 0) * 0x260) * 4)) & 0xff);
    if ((((heap.u16((0x005f7104 + ((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 8) != 0) && (heap.u8(0x0065e6b7) == 0)) && (((heap.u16((0x005f7104 + ((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 0x2000) == 0 || ((heap.u8(unaff_ESI + (0x1f)) == 2 && (heap.i32((unaff_ESI + 0x28)) < 0x20001)))))) {
      heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) | 0x80) & 0xffff);
    }
  }
  (regs.eax = callIndirect(heap, heap.u32((0x005d97b4) + (((heap.u8(unaff_ESI + (0x50))) & 0xff)) * 4)));
  uVar6 = ((CONCAT22(extraout_var, heap.u16((unaff_ESI + 0xb8)))) >>> 0);
  uVar12 = ((((((heap.u8(unaff_ESI + (0x31))) & 0xff)) >>> 0)) >>> 0);
  cVar3 = ((-1) & 0xff);
  uVar10 = ((heap.u32((unaff_ESI + 0x28))) >>> 0);
  if (((uVar10) >>> 0) < 0) {
    uVar10 = ((-uVar10) >>> 0);
  }
  if (0xffff < uVar10) {
    cVar3 = ((heap.u32((0x005f72ec) + (uVar12 * 4) * 4)) & 0xff);
    bVar9 = ((((uVar10 - 0x10000 >>> 0xf) & 0xff)) & 0xff);
    unaff_BL = ((bVar9 - 0x30) & 0xff);
    if (0x2f < bVar9) {
      unaff_BL = ((0xff) & 0xff);
    }
  }
  if (heap.u32((0x005f72ee) + (uVar12 * 4) * 4) == 3) {
    cVar11 = ((heap.u8(unaff_ESI + (0xcc))) & 0xff);
    if ((heap.u32(0x0088741c) & 0x7f) == 0) {
      if ((heap.i32((unaff_ESI + 0x28)) < 0x40000) || ((heap.u8(unaff_ESI + (0xcc)) | 0) != -1)) {
        break LAB_005d96ef;
      }
      uVar4 = (((regs.eax = FUN_005df40c(heap, uVar6))) & 0xffff);
      cVar3 = ((extraout_DL) & 0xff);
      cVar11 = ((extraout_DH) & 0xff);
      if (uVar4 < 0x5556) {
        cVar11 = ((18) & 0xff);
        /* goto LAB_005d969b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d94b6/LAB_005d969b"); return 0;
      }
    }
    break LAB_005d96a2;
  }
  if ((heap.u16((0x005f7104 + uVar12 * 8)) & 0x10) != 0) {
    cVar11 = ((0) & 0xff);
    puVar13 = ((unaff_ESI) >>> 0);
    while (true) {
      cVar11 = ((cVar11 + heap.u8(puVar13 + (0xb3))) & 0xff);
      if (heap.u16((puVar13 + 0x3e)) == 0xffff) {
        break;
      }
      puVar13 = ((0x00743b94 + heap.u32((puVar13 + 0x3e)) * 0x100) >>> 0);
    }
    if (cVar11 != 0) {
      if (heap.i32((unaff_ESI + 0x28)) < 0) {
        if (heap.i32((unaff_ESI + 0x28)) < -0x2bfff) {
          uVar4 = ((heap.u16((unaff_ESI + 10))) & 0xffff);
          do {
            bVar9 = ((heap.u32((0x00743bb3) + (((uVar4) >>> 0) * 0x100) * 4)) & 0xff);
            if ((bVar9 != 0) && ((bVar9 < 5 || ((8 < bVar9 && (bVar9 < 0x10)))))) {
              break LAB_005d963a;
            }
            uVar4 = ((heap.u16((0x00743bd2 + ((uVar4) >>> 0) * 0x100))) & 0xffff);
          } while (uVar4 != 0xffff);
        }
      } else {
        if (0x2bfff < heap.i32((unaff_ESI + 0x28))) {
        uVar4 = ((heap.u16((unaff_ESI + 10))) & 0xffff);
        do {
          bVar9 = ((heap.u32((0x00743bb3) + (((uVar4) >>> 0) * 0x100) * 4)) & 0xff);
          if ((4 < bVar9) && ((bVar9 < 9 || ((0x10 < bVar9 && (bVar9 < 0x18)))))) {
            break LAB_005d963a;
          }
          uVar4 = ((heap.u16((0x00743bd2 + ((uVar4) >>> 0) * 0x100))) & 0xffff);
        } while (uVar4 != 0xffff);
      }
      }
    }
  }
  }
  heap.setU8((unaff_ESI + (0xcc)), (0xff) & 0xff);
  cVar11 = ((heap.u32((0x005f72ed) + (uVar12 * 4) * 4)) & 0xff);
  bVar9 = ((0xf3) & 0xff);
  if ((heap.u16((unaff_ESI + 0xb8)) & 2) == 0) {
    cVar11 = ((-1) & 0xff);
    bVar9 = ((0xf3) & 0xff);
  }
  LAB_005d9707: cVar2 = ((((heap.u16((unaff_ESI + 0xbb))) << 24 >> 24)) & 0xff);
  if ((cVar2 | 0) == -1) {
    LAB_005d972f: uVar5 = ((CONCAT11(unaff_BL >>> 2, cVar3)) & 0xffff);
    if (unaff_BL == 0xff) {
      uVar5 = ((CONCAT11(0xff, cVar3)) & 0xffff);
    }
  } else {
    bVar8 = ((((heap.u16((unaff_ESI + 0xbb)) >>> 8) & 0xff)) & 0xff);
    if (cVar2 == cVar3) {
      bVar1 = ((bVar8 + 0xf) & 0xff);
      if (0xf0 < bVar8) {
        bVar1 = ((unaff_BL) & 0xff);
      }
      uVar5 = ((CONCAT11(bVar1, cVar2)) & 0xffff);
      if (unaff_BL < bVar1) {
        uVar5 = ((CONCAT11(unaff_BL, cVar2)) & 0xffff);
      }
    } else {
      uVar5 = ((CONCAT11(bVar8 - 9, cVar2)) & 0xffff);
      if ((bVar8 < 9) || (((bVar8 - 9) & 0xff) < 0x50)) {
        /* goto LAB_005d972f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d94b6/LAB_005d972f"); return 0;
      }
    }
  }
  heap.setU16((unaff_ESI + 0xbb), (uVar5) & 0xffff);
  cVar3 = ((((heap.u16((unaff_ESI + 0xbd))) << 24 >> 24)) & 0xff);
  if ((cVar3 | 0) != -1) {
    bVar8 = ((((heap.u16((unaff_ESI + 0xbd)) >>> 8) & 0xff)) & 0xff);
    if (cVar3 == cVar11) {
      bVar1 = ((bVar8 + 0xf) & 0xff);
      if (0xf0 < bVar8) {
        bVar1 = ((bVar9) & 0xff);
      }
      uVar5 = ((CONCAT11(bVar1, cVar3)) & 0xffff);
      if (bVar9 < bVar1) {
        uVar5 = ((CONCAT11(bVar9, cVar3)) & 0xffff);
      }
      heap.setU16((unaff_ESI + 0xbd), (uVar5) & 0xffff);
      iVar7 = (((heap.i32((unaff_ESI + 0x28)) >>> 0xe) * ((heap.i16((0x0065e674 + ((((heap.u8(unaff_ESI + (0x1e))) & 0xff)) >>> 0) * 2))) >>> 0) >>> 0xe) >>> 0);
      if (((iVar7) << 16 >> 16) < -0x7f) {
        iVar7 = ((0xff81) >>> 0);
      }
      if (0x7f < ((iVar7) << 16 >> 16)) {
        iVar7 = ((0x7f) >>> 0);
      }
      heap.setU8((unaff_ESI + (0xbf)), (((iVar7) << 24 >> 24)) & 0xff);
      return;
    }
    uVar5 = ((CONCAT11(bVar8 - 9, cVar3)) & 0xffff);
    if ((8 < bVar8) && (0x4f < ((bVar8 - 9) & 0xff))) {
      break LAB_005d977a;
    }
  }
  uVar5 = ((CONCAT11(bVar9 >>> 2, cVar11)) & 0xffff);
  if (bVar9 == 0xff) {
    uVar5 = ((CONCAT11(0xff, cVar11)) & 0xffff);
  }
  }
  heap.setU16((unaff_ESI + 0xbd), (uVar5) & 0xffff);
  iVar7 = (((heap.i32((unaff_ESI + 0x28)) >>> 0xe) * ((heap.i16((0x0065e674 + ((((heap.u8(unaff_ESI + (0x1e))) & 0xff)) >>> 0) * 2))) >>> 0) >>> 0xe) >>> 0);
  if (((iVar7) << 16 >> 16) < -0x7f) {
    iVar7 = ((0xff81) >>> 0);
  }
  if (0x7f < ((iVar7) << 16 >> 16)) {
    iVar7 = ((0x7f) >>> 0);
  }
  heap.setU8((unaff_ESI + (0xbf)), (((iVar7) << 24 >> 24)) & 0xff);
  return;
  }
  cVar11 = ((heap.u8(unaff_ESI + (0xcc))) & 0xff);
  if ((cVar11 | 0) == -1) {
    uVar4 = (((regs.eax = FUN_005df40c(heap, uVar6))) & 0xffff);
    cVar3 = ((extraout_DL_00) & 0xff);
    if (extraout_CH < (((uVar4 >>> 8) & 0xff) & 0xf)) {
      LAB_005d9668: cVar11 = ((-2) & 0xff);
    } else {
      cVar11 = ((heap.u32((0x005f72ee) + (uVar12 * 4) * 4)) & 0xff);
      if (cVar11 == 0) {
        cVar11 = ((heap.u32((0x0065e9d8) + ((((uVar4 & 0xff) * 4) & 0xffff) >>> 8) * 4)) & 0xff);
      } else {
        if (cVar11 == 1) {
        cVar11 = ((heap.u32((0x0065e9e1) + ((((uVar4 & 0xff) * 5) & 0xffff) >>> 8) * 4)) & 0xff);
      } else {
        if (cVar11 != 2) {
          /* goto LAB_005d9668 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d94b6/LAB_005d9668"); return 0;
        }
        cVar11 = ((heap.u32((0x0065e9dc) + ((((uVar4 & 0xff) * 5) & 0xffff) >>> 8) * 4)) & 0xff);
      }
      }
    }
    LAB_005d969b: heap.setU8((unaff_ESI + (0xcc)), (cVar11) & 0xff);
  }
  }
  if ((cVar11 | 0) == -2) {
    cVar11 = ((-1) & 0xff);
  }
  bVar9 = ((0xff) & 0xff);
  /* goto LAB_005d9707 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d94b6/LAB_005d9707"); return 0;
}
