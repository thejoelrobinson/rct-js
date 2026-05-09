// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb374.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009bb355 } from "./9bb355.js";
export function FUN_009bb374(heap) {
  let in_AX = regs.eax & 0xffff;
  let iVar1 = 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_DX = regs.edx & 0xffff;
  let sVar4 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let iVar5 = 0;
  let uVar6 = 0;
  let unaff_SI = regs.esi & 0xffff;
  let puVar7 = 0;
  let puVar8 = 0;
  let puVar9 = 0;
  let puVar10 = 0;
  let puVar11 = 0;
  let unaff_DI = regs.edi & 0xffff;
  let puVar12 = 0;
  let puVar13 = 0;
  let puVar14 = 0;
  let puVar15 = 0;
  let puVar16 = 0;
  if (unaff_SI < 0) {
    LAB_009bb42e: (regs.eax = FUN_009bb355(heap));
    uVar6 = ((heap.u32(0x0099fb84) + heap.u32(0x0099fb88)) & 0xffff);
    iVar1 = ((((in_AX) >>> 0) + ((unaff_BX) >>> 0) * ((uVar6) >>> 0)) >>> 0);
    iVar5 = ((iVar1 - ((unaff_SI) >>> 0) * ((uVar6) >>> 0)) >>> 0);
    sVar4 = ((in_DX + unaff_SI) & 0xffff);
    if (unaff_DI < 0) {
      iVar5 = ((iVar5 - unaff_DI) >>> 0);
    } else {
      iVar1 = ((iVar1 + unaff_DI) >>> 0);
      unaff_DI = ((-unaff_DI) & 0xffff);
    }
    uVar2 = ((in_CX + unaff_DI) & 0xffff);
    puVar15 = (((iVar1 + heap.u32(0x0099fb7c))) >>> 0);
    puVar10 = (((iVar5 + heap.u32(0x0099fb7c))) >>> 0);
    do {
      puVar11 = ((puVar10) >>> 0);
      puVar16 = ((puVar15) >>> 0);
      if ((uVar2 & 1) != 0) {
        puVar16 = (((((puVar15) >>> 0) + 1)) >>> 0);
        puVar11 = (((((puVar10) >>> 0) + 1)) >>> 0);
        heap.setU8(puVar15, (heap.u8(puVar10)) & 0xff);
      }
      uVar3 = ((((uVar2 >>> 2) >>> 0)) >>> 0);
      if ((uVar2 >>> 1 & 1) != 0) {
        heap.setU16(puVar16, (heap.u16(puVar11)) & 0xffff);
        puVar11 = (((((puVar11) >>> 0) + 2)) >>> 0);
        puVar16 = (((((puVar16) >>> 0) + 2)) >>> 0);
      }
      for (; uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
        heap.setU32(puVar16, (heap.u32(puVar11)) & 0xffffffff);
        puVar11 = ((puVar11 + ((1) * 4)) >>> 0);
        puVar16 = ((puVar16 + ((1) * 4)) >>> 0);
      }
      puVar15 = (((((puVar16) >>> 0) + (((((uVar6 - uVar2)) << 16 >> 16)) >>> 0))) >>> 0);
      puVar10 = (((((puVar11) >>> 0) + (((((uVar6 - uVar2)) << 16 >> 16)) >>> 0))) >>> 0);
      sVar4 = ((sVar4 + -1) & 0xffff);
    } while (sVar4 != 0);
    return;
  }
  if (unaff_SI == 0) {
    if (unaff_DI < 0) {
      /* goto LAB_009bb42e — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bb374/LAB_009bb42e"); return 0;
    }
    if (unaff_DI == 0) {
      return;
    }
  }
  (regs.eax = FUN_009bb355(heap));
  uVar6 = ((heap.u32(0x0099fb84) + heap.u32(0x0099fb88)) & 0xffff);
  iVar1 = (((((((in_AX + in_CX + -1)) << 16 >> 16)) >>> 0) + (((((unaff_BX + in_DX + -1)) << 16 >> 16)) >>> 0) * ((uVar6) >>> 0)) >>> 0);
  iVar5 = ((iVar1 - ((unaff_SI) >>> 0) * ((uVar6) >>> 0)) >>> 0);
  sVar4 = ((in_DX - unaff_SI) & 0xffff);
  if (unaff_DI < 0) {
    iVar1 = ((iVar1 + unaff_DI) >>> 0);
  } else {
    iVar5 = ((iVar5 - unaff_DI) >>> 0);
    unaff_DI = ((-unaff_DI) & 0xffff);
  }
  uVar2 = ((in_CX + unaff_DI) & 0xffff);
  puVar12 = (((iVar1 + heap.u32(0x0099fb7c))) >>> 0);
  puVar7 = (((iVar5 + heap.u32(0x0099fb7c))) >>> 0);
  do {
    puVar8 = ((puVar7) >>> 0);
    puVar13 = ((puVar12) >>> 0);
    if ((uVar2 & 1) != 0) {
      puVar13 = ((puVar12 + -1) >>> 0);
      puVar8 = ((puVar7 + -1) >>> 0);
      heap.setU32(puVar12, (heap.u8(puVar7)) & 0xffffffff);
    }
    uVar3 = ((((uVar2 >>> 2) >>> 0)) >>> 0);
    puVar9 = (((puVar8 + -1)) >>> 0);
    puVar14 = (((puVar13 + -1)) >>> 0);
    if ((uVar2 >>> 1 & 1) != 0) {
      puVar14 = (((puVar13 + -3)) >>> 0);
      puVar9 = (((puVar8 + -3)) >>> 0);
      heap.setU16((puVar13 + -1), (heap.u16((puVar8 + -1))) & 0xffff);
    }
    puVar10 = (((puVar9 + ((-1) * 2))) >>> 0);
    puVar15 = (((puVar14 + ((-1) * 2))) >>> 0);
    for (; uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
      heap.setU32(puVar15, (heap.u32(puVar10)) & 0xffffffff);
      puVar10 = ((puVar10 + ((-1) * 4)) >>> 0);
      puVar15 = ((puVar15 + ((-1) * 4)) >>> 0);
    }
    puVar12 = (((((puVar15) >>> 0) + (3 - (((uVar6 - uVar2)) << 16 >> 16)))) >>> 0);
    puVar7 = (((((puVar10) >>> 0) + (3 - (((uVar6 - uVar2)) << 16 >> 16)))) >>> 0);
    sVar4 = ((sVar4 + -1) & 0xffff);
  } while (sVar4 != 0);
  return;
}
