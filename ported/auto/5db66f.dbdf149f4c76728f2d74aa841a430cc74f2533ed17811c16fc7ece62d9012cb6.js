// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db66f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY2, CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005db615 } from "./5db615.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005db66f(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let extraout_ECX_02 = 0;
  let extraout_ECX_03 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let extraout_DX = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar9 = 0;
  let bVar10 = 0;
  let uVar11 = 0;
  iVar6 = ((heap.u32((unaff_ESI + 0x30)) * 0x260) >>> 0);
  sVar1 = ((CONCAT11((((((heap.i16((unaff_ESI + 0x10)) + heap.u32((0x0065247a) + ((heap.u32(((0x008874a1) & 0xff) + (iVar6) * 4) & 3) * 2) * 4)) & 0xffff) >>> 5)) << 24 >> 24), (((((heap.i16((unaff_ESI + 0xe)) + heap.u32((0x00652478) + ((heap.u32(((0x008874a1) & 0xff) + (iVar6) * 4) & 3) * 2) * 4)) & 0xffff) >>> 5)) << 24 >> 24))) & 0xffff);
  if (sVar1 == heap.i16((0x008874a2 + iVar6))) {
    heap.setU8((unaff_ESI + 0x51), (1) & 0xff);
    heap.setI16((unaff_ESI + 0x36), (sVar1) & 0xffff);
    return;
  }
  heap.setU8((unaff_ESI + 0x51), (0) & 0xff);
  uVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
  uVar8 = ((((uVar2) >>> 0)) >>> 0);
  if (((uVar2) << 16 >> 16) < 0) {
    uVar5 = (((((heap.u16((0x008874a2 + iVar6)) & 0xff) * 0x20 - heap.u32((0x00652478) + ((heap.u16((0x008874a1 + iVar6)) & 3) * 2) * 4)) + 0x10) - heap.i16((unaff_ESI + 0xe))) & 0xffff);
    uVar2 = ((uVar5) & 0xffff);
    if (((uVar5) << 16 >> 16) < 0) {
      uVar2 = ((-uVar5) & 0xffff);
    }
    uVar4 = (((((heap.u16((0x008874a2 + iVar6)) >>> 8) * 0x20 - heap.u32((0x0065247a) + ((heap.u16((0x008874a1 + iVar6)) & 3) * 2) * 4)) + 0x10) - heap.i16((unaff_ESI + 0x10))) & 0xffff);
    uVar9 = ((uVar4) & 0xffff);
    if (((uVar4) << 16 >> 16) < 0) {
      uVar9 = ((-uVar4) & 0xffff);
    }
    if (uVar9 < uVar2) {
      uVar8 = ((2) >>> 0);
      if (((uVar5) << 16 >> 16) < 0) {
        uVar8 = ((0) >>> 0);
      }
    } else {
      uVar8 = ((1) >>> 0);
      if (((uVar4) << 16 >> 16) < 0) {
        uVar8 = ((3) >>> 0);
      }
    }
  }
  uVar7 = ((uVar8 & 3) >>> 0);
  uVar3 = ((extraout_ECX) >>> 0);
  if (uVar7 != extraout_ECX) {
    uVar5 = ((heap.i16((unaff_ESI + 0x38)) + heap.u32((0x00652478) + (uVar7 * 2) * 4)) & 0xffff);
    bVar10 = ((CARRY2(heap.u16((unaff_ESI + 0x3a)), heap.u32((0x0065247a) + (uVar7 * 2) * 4))) & 0xff);
    uVar11 = (((regs.eax = 0xff, regs.edx = 0xffe0, regs.eax = FUN_005db615(heap))) >>> 0);
    uVar2 = ((((uVar11 >>> 0x20) & 0xffff)) & 0xffff);
    uVar8 = ((((uVar11) >>> 0)) >>> 0);
    uVar3 = ((extraout_ECX_00) >>> 0);
    if (!bVar10) {
      heap.setU16((unaff_ESI + 0x36), (CONCAT11((((uVar2 >>> 5)) << 24 >> 24), (((uVar5 >>> 5)) << 24 >> 24))) & 0xffff);
      return;
    }
  }
  uVar7 = ((uVar8 + 1 & 3) >>> 0);
  if (uVar7 != uVar3) {
    uVar5 = ((heap.i16((unaff_ESI + 0x38)) + heap.u32((0x00652478) + (uVar7 * 2) * 4)) & 0xffff);
    bVar10 = ((CARRY2(heap.u16((unaff_ESI + 0x3a)), heap.u32((0x0065247a) + (uVar7 * 2) * 4))) & 0xff);
    uVar11 = (((regs.eax = 0xff, regs.edx = 0xffe0, regs.eax = FUN_005db615(heap))) >>> 0);
    uVar2 = ((((uVar11 >>> 0x20) & 0xffff)) & 0xffff);
    uVar8 = ((((uVar11) >>> 0)) >>> 0);
    uVar3 = ((extraout_ECX_01) >>> 0);
    if (!bVar10) {
      heap.setU16((unaff_ESI + 0x36), (CONCAT11((((uVar2 >>> 5)) << 24 >> 24), (((uVar5 >>> 5)) << 24 >> 24))) & 0xffff);
      return;
    }
  }
  uVar7 = ((uVar8 - 1 & 3) >>> 0);
  if (uVar7 != uVar3) {
    uVar5 = ((heap.i16((unaff_ESI + 0x38)) + heap.u32((0x00652478) + (uVar7 * 2) * 4)) & 0xffff);
    bVar10 = ((CARRY2(heap.u16((unaff_ESI + 0x3a)), heap.u32((0x0065247a) + (uVar7 * 2) * 4))) & 0xff);
    uVar11 = (((regs.eax = 0xff, regs.edx = 0xffe0, regs.eax = FUN_005db615(heap))) >>> 0);
    uVar2 = ((((uVar11 >>> 0x20) & 0xffff)) & 0xffff);
    uVar8 = ((((uVar11) >>> 0)) >>> 0);
    uVar3 = ((extraout_ECX_02) >>> 0);
    if (!bVar10) {
      heap.setU16((unaff_ESI + 0x36), (CONCAT11((((uVar2 >>> 5)) << 24 >> 24), (((uVar5 >>> 5)) << 24 >> 24))) & 0xffff);
      return;
    }
  }
  uVar8 = ((uVar8 + 2 & 3) >>> 0);
  if (uVar8 != uVar3) {
    uVar5 = ((heap.i16((unaff_ESI + 0x38)) + heap.u32((0x00652478) + (uVar8 * 2) * 4)) & 0xffff);
    bVar10 = ((CARRY2(heap.u16((unaff_ESI + 0x3a)), heap.u32((0x0065247a) + (uVar8 * 2) * 4))) & 0xff);
    (regs.eax = 0xff, regs.edx = 0xffe0, regs.eax = FUN_005db615(heap));
    uVar3 = ((extraout_ECX_03) >>> 0);
    uVar2 = ((extraout_DX) & 0xffff);
    if (!bVar10) {
      heap.setU16((unaff_ESI + 0x36), (CONCAT11((((uVar2 >>> 5)) << 24 >> 24), (((uVar5 >>> 5)) << 24 >> 24))) & 0xffff);
      return;
    }
  }
  uVar5 = ((heap.i16((unaff_ESI + 0x38)) + heap.u32((0x00652478) + (uVar3 * 2) * 4)) & 0xffff);
  uVar2 = ((heap.i16((unaff_ESI + 0x3a)) + heap.u32((0x0065247a) + (uVar3 * 2) * 4)) & 0xffff);
  LAB_005db808: heap.setU16((unaff_ESI + 0x36), (CONCAT11((((uVar2 >>> 5)) << 24 >> 24), (((uVar5 >>> 5)) << 24 >> 24))) & 0xffff);
  return;
}
