// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db817.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY2, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005dcfee } from "./5dcfee.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005db817(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let iVar5 = 0;
  let extraout_CX = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_DL_00 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar8 = 0;
  LAB_005db8c7: {
  heap.setU32(0x0065dc40, (0) >>> 0);
  heap.setU32(0x0065dc30, (heap.i32((unaff_ESI + 0x2c)) + heap.i32((unaff_ESI + 0x28))) >>> 0);
  uVar6 = ((heap.u32((unaff_ESI + 0x30))) >>> 0);
  uVar7 = ((uVar6 * 0x260) >>> 0);
  if (((heap.u32((0x00887422) + (uVar6 * 0x130) * 4) & 0xc0) != 0) && (heap.u32((0x0088755c) + (uVar7) * 4) == 0)) {
    heap.setU32(0x0065dc30, (0) >>> 0);
  }
  heap.setI32((unaff_ESI + 0x28), (heap.u32(0x0065dc30)) & 0xffffffff);
  heap.setU32(0x0065dc34, ((heap.u32(0x0065dc30) >>> 10) * 0x2a) >>> 0);
  heap.setU32(0x0065dc38, (1) >>> 0);
  heap.setU32((unaff_ESI + 0x2c), (0) & 0xffffffff);
  if (((heap.u32((0x00887422) + (uVar6 * 0x130) * 4) & 0xc0) == 0) || (heap.u32((0x0088755c) + (uVar7) * 4) != 0)) {
    if (((heap.u32(0x0088741c) & 1) == 0) || (heap.i8((unaff_ESI + 0x34)) == 0)) {
      uVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
      if (0xb21 < uVar2) {
        break LAB_005db8c7;
      }
      heap.setI8((unaff_ESI + 0x1e), (heap.i8((unaff_ESI + 0x1e)) + 2) & 0xff);
      if ((heap.u8((unaff_ESI + 0x35)) & 0x40) != 0) {
        heap.setI8((unaff_ESI + 0x1e), (heap.i8((unaff_ESI + 0x1e)) + -4) & 0xff);
      }
    } else {
      if (heap.i8((unaff_ESI + 0x34)) < 0) {
      heap.setI8((unaff_ESI + 0x34), (heap.i8((unaff_ESI + 0x34)) + 1) & 0xff);
      heap.setI8((unaff_ESI + 0x1e), (heap.i8((unaff_ESI + 0x1e)) + -2) & 0xff);
    } else {
      heap.setI8((unaff_ESI + 0x34), (heap.i8((unaff_ESI + 0x34)) + -1) & 0xff);
      heap.setI8((unaff_ESI + 0x1e), (heap.i8((unaff_ESI + 0x1e)) + 2) & 0xff);
    }
    }
    heap.setU8((unaff_ESI + 0x1e), (heap.u8((unaff_ESI + 0x1e)) & 0x1e) & 0xff);
    (regs.eax = FUN_005e53ca(heap));
  }
  }
  if (heap.i8((unaff_ESI + 0xc4)) != 0) {
    bVar1 = ((heap.u8((unaff_ESI + 0xc4))) & 0xff);
    heap.setU8((unaff_ESI + 0xc4), (0) & 0xff);
    uVar6 = ((bVar1 & 0x1e) >>> 0);
    bVar8 = ((CARRY2(heap.i16((unaff_ESI + 0x10)) + heap.i16((0x0065e6be + uVar6 * 8)), heap.u16((0x0065e6c6 + uVar6 * 8)))) & 0xff);
    (regs.eax = FUN_005dcfee(heap));
    if (!bVar8) {
      (regs.eax = FUN_005e53ca(heap));
      (regs.eax = FUN_00444927(heap));
      (regs.eax = FUN_005e53ca(heap));
    }
  }
  iVar4 = ((heap.u32(0x0065dc34) + heap.i32((unaff_ESI + 0x24))) >>> 0);
  heap.setI32((unaff_ESI + 0x24), (iVar4) & 0xffffffff);
  if (0x3689 < iVar4) {
    LAB_005dba3d: {
    heap.setU16((unaff_ESI + 0xb8), (heap.u16((unaff_ESI + 0xb8)) & 0xfffd) & 0xffff);
    heap.setU32(0x0065dc48, (heap.u32((unaff_ESI + 0xe))) >>> 0);
    heap.setU32(0x0065dc4c, (heap.u16((unaff_ESI + 0x12))) >>> 0);
    (regs.eax = FUN_005e53ca(heap));
    while (true) {
      heap.setI8((unaff_ESI + 0x35), (heap.i8((unaff_ESI + 0x35)) + 1) & 0xff);
      uVar6 = ((((heap.u16((unaff_ESI + 0x1e)) | heap.u8((unaff_ESI + 0x35)) & 1) & 0xffff) & 0x1f) >>> 0);
      bVar8 = ((CARRY2(heap.u32(0x0065dc4a), heap.u16((0x0065e6be + uVar6 * 8)))) & 0xff);
      uVar3 = (((regs.eax = FUN_005dcfee(heap))) & 0xffff);
      if (bVar8) {
        break;
      }
      heap.setI32((unaff_ESI + 0x24), (heap.i32((unaff_ESI + 0x24)) - heap.i32((0x0065e6c0 + uVar6 * 8))) & 0xffffffff);
      heap.setU32(0x0065dc48, (CONCAT22(extraout_CX, uVar3)) >>> 0);
      if (heap.i32((unaff_ESI + 0x24)) < 0x368a) {
        break LAB_005dba3d;
      }
      heap.setU32(0x0065dc38, (heap.u32(0x0065dc38) + 1) >>> 0);
    }
    heap.setU32((unaff_ESI + 0x24), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x28), (0) & 0xffffffff);
    if ((((uVar7) << 16 >> 16) | 0) == -1) {
      heap.setU8((unaff_ESI + 0x34), (6) & 0xff);
      uVar6 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
      if ((uVar6 & 0x20000000) != 0) {
        heap.setU8((unaff_ESI + 0x34), (0xfa) & 0xff);
      }
      if (0x1ffff < extraout_ECX_00) {
        heap.setU8((unaff_ESI + 0xc4), (extraout_DL_00 ^ 0x10) & 0xff);
      }
    } else {
      heap.setU8((unaff_ESI + 0x34), (1) & 0xff);
      uVar6 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
      if ((uVar6 & 0x400000) != 0) {
        heap.setU8((unaff_ESI + 0x34), (0xff) & 0xff);
      }
      if (0x1ffff < extraout_ECX) {
        heap.setU32(((0x00743c58) + ((uVar7 & 0xffff) * 0x100) * 4), ((regs.edx & 0xff)) & 0xffffffff);
        heap.setU8((unaff_ESI + 0xc4), ((regs.edx & 0xff) ^ 0x10) & 0xff);
      }
    }
    }
    (regs.eax = FUN_00444927(heap));
    (regs.eax = FUN_005e53ca(heap));
  }
  iVar4 = ((heap.i32((unaff_ESI + 0x28)) >>> 8) >>> 0);
  iVar4 = ((iVar4 * iVar4) >>> 0);
  if (heap.i32((unaff_ESI + 0x28)) < 0) {
    iVar4 = ((-iVar4) >>> 0);
  }
  iVar4 = ((-(((heap.i32((unaff_ESI + 0x28)) >>> 1) + (iVar4 >>> 5)) / (((0)) | 0) * (unaff_ESI + 0x46))) >>> 0);
  if ((heap.u16((0x005f7104 + heap.u32((unaff_ESI + 0x31)) * 8)) & 8) != 0) {
    uVar6 = ((heap.u32((unaff_ESI + 0xc2))) >>> 0);
    iVar5 = ((uVar6 * 0x4000) >>> 0);
    if ((heap.u16((unaff_ESI + 0x48)) & 8) != 0) {
      iVar5 = ((uVar6 * -0x4000) >>> 0);
    }
    iVar4 = ((iVar4 + ((((iVar5 - heap.i32((unaff_ESI + 0x28))) * (0) * (unaff_ESI + 0xc3) * 2)) | 0) / (((uVar6 * heap.u16((unaff_ESI + 0x46)) >>> 2)) | 0)) >>> 0);
  }
  heap.setI32((unaff_ESI + 0x2c), (iVar4) & 0xffffffff);
  return heap.u32(0x0065dc40);
}
