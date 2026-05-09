// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfe66.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005cfe66(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_switchD_005cff4c = __sp + 0;
  try {
  let puVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar5 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_CX = regs.ecx & 0xffff;
  let extraout_CX = 0;
  let uVar6 = 0;
  let extraout_DL = 0;
  let sVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar8 = 0;
  let uVar11 = 0;
  let uVar10 = 0;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_BH = (regs.ebx >>> 8) & 0xff;
  let unaff_BP = regs.ebp & 0xffff;
  let uVar12 = 0;
  let iVar13 = 0;
  let puVar14 = 0;
  let uVar15 = 0;
  let pbVar16 = 0;
  let puVar17 = 0;
  let uVar9 = 0;
  LAB_005cfec3: {
  heap.setU32(0x006522f0, (unaff_BP) >>> 0);
  uVar2 = ((((in_EAX) & 0xffff)) & 0xffff);
  uVar12 = ((in_CX << 7 | in_CX >>> 9 | uVar2) & 0xffff);
  uVar8 = ((CONCAT22((((((in_EDX) >>> 0) >>> 0x10)) << 16 >> 16), ((in_EDX) & 0xffff) >>> 2)) >>> 0);
  puVar17 = ((0x0) >>> 0);
  puVar14 = ((heap.u32((0x00971ef4) + (((uVar12 >>> 5 | uVar12 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((((((uVar8) << 24 >> 24) == ((heap.u16(puVar14 + (1) * 2)) << 24 >> 24)) && (uVar8 = ((CONCAT22((((uVar8 >>> 0x10)) << 16 >> 16), CONCAT11(((heap.u16(puVar14)) << 24 >> 24), ((uVar8) << 24 >> 24))) & 0xffff3cff) >>> 0), (((uVar8 >>> 8)) << 24 >> 24) == 8)) && (uVar8 = ((CONCAT22((((uVar8 >>> 0x10)) << 16 >> 16), CONCAT11(((heap.u16(puVar14)) << 24 >> 24), ((uVar8) << 24 >> 24))) & 0xffff03ff) >>> 0), ((uVar8 >>> 8) & 0xff) == unaff_BH)) && ((unaff_BL == ((heap.u16(puVar14 + (2) * 2)) & 0xff) && (puVar17 = ((puVar14) >>> 0), (heap.u8((((puVar14) >>> 0) + 5)) & 0xf) == 0)))) {
      break LAB_005cfec3;
    }
    uVar12 = ((heap.u16(puVar14)) & 0xffff);
    puVar14 = ((puVar14 + ((4) * 2)) >>> 0);
  } while ((uVar12 & 0x8000) == 0);
  puVar14 = ((puVar17) >>> 0);
  if (puVar17 == 0x0) {
    return CONCAT44(uVar8, in_EAX);
  }
  }
  uVar11 = ((((uVar8 >>> 0x10) & 0xffff)) & 0xffff);
  puVar1 = ((heap.u32((0x00652498) + (unaff_BL) * 4)) >>> 0);
  iVar13 = (((heap.u16((((puVar14) >>> 0) + 5)) & 0xf) * 10) >>> 0);
  uVar15 = ((heap.u16(puVar14) & 3) >>> 0);
  uVar5 = ((((((in_EAX) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  switch (uVar15) {
    case 0:
      uVar3 = ((CONCAT22(uVar5, uVar2 - heap.i16((puVar1 + iVar13 + 1)))) >>> 0);
      uVar6 = ((((in_CX - heap.i16((puVar1 + iVar13 + 3))) >>> 0)) >>> 0);
      break;
    case 1:
      uVar3 = ((CONCAT22(uVar5, uVar2 - heap.i16((puVar1 + iVar13 + 3)))) >>> 0);
      uVar6 = ((((in_CX + heap.i16((puVar1 + iVar13 + 1))) >>> 0)) >>> 0);
      break;
    case 2:
      uVar3 = ((CONCAT22(uVar5, uVar2 + heap.i16((puVar1 + iVar13 + 1)))) >>> 0);
      uVar6 = ((((in_CX + heap.i16((puVar1 + iVar13 + 3))) >>> 0)) >>> 0);
      break;
    case 3:
      uVar3 = ((CONCAT22(uVar5, uVar2 + heap.i16((puVar1 + iVar13 + 3)))) >>> 0);
      uVar6 = ((((in_CX - heap.i16((puVar1 + iVar13 + 1))) >>> 0)) >>> 0);
  }
  sVar7 = (((((((uVar8) & 0xff)) & 0xffff) * 4 - heap.i16((puVar1 + iVar13 + 5))) + heap.i16((puVar1 + 5))) & 0xffff);
  uVar9 = ((CONCAT22(uVar11, sVar7)) >>> 0);
  uVar10 = ((CONCAT22(uVar11, sVar7 - heap.i16((puVar1 + 5)))) >>> 0);
  uVar4 = ((uVar3) >>> 0);
  uVar8 = ((uVar6) >>> 0);
  for (iVar13 = ((0) >>> 0); (heap.u8(puVar1 + (iVar13)) | 0) != -1; iVar13 = (((iVar13 + 10) >>> 0)) >>> 0) {
    switch (heap.u32(((function(){ throw new Error("ghidra-decompile ERROR at FUN_005cfe66"); })()) + (uVar15) * 4)) {
      case 0x5cff64:
        break;
      case 0x5cff70:
        break;
      case 0x5cff7c:
        break;
      case 0x5cff88:
    }
    uVar2 = (((regs.eax = FUN_005e5562(heap, uVar15, uVar10, uVar6, uVar4, uVar9, uVar8))) & 0xffff);
    uVar2 = ((extraout_CX << 7 | extraout_CX >>> 9 | uVar2) & 0xffff);
    for (pbVar16 = ((heap.u32((0x00971ef4) + (((uVar2 >>> 5 | uVar2 << 0xb) & 0xffff)) * 4)) >>> 0); ((extraout_DL != heap.u8(pbVar16 + (2)) || ((heap.u8(pbVar16) & 0x3c) != 8)) || (((heap.u8(pbVar16) & 3) != unaff_BH || (((heap.u8(pbVar16 + (5)) & 0xf) != heap.u8(puVar1 + (iVar13)) || (unaff_BL != heap.u8(pbVar16 + (4)))))))); pbVar16 = (((pbVar16 + 8) >>> 0)) >>> 0) {
    
    }
    if (iVar13 == 0) {
      heap.setU32(0x006522f2, (pbVar16) >>> 0);
    }
    if ((heap.u32(0x006522f0) & 1) != 0) {
      heap.setU32(pbVar16, (heap.u8(pbVar16) & 0xbf) & 0xffffffff);
    }
    if ((heap.u32(0x006522f0) & 2) != 0) {
      heap.setU32(pbVar16, (heap.u8(pbVar16) | 0x40) & 0xffffffff);
    }
  }
  return CONCAT44(uVar9, uVar3);
} finally {
    heap.freeFrame(4);
  }
}
