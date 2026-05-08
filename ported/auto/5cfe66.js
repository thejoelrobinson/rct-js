// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5cfe66.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005cfe66(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_PTR_DAT_00652498 = __sp + 4;
  const __addr_switchD_005cff4c = __sp + 8;
  try {
  let puVar1 = 0;
  let uVar2 = 0;
  let in_EAX = 0;
  let uVar5 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_CX = 0;
  let extraout_CX = 0;
  let uVar6 = 0;
  let extraout_DL = 0;
  let sVar7 = 0;
  let in_EDX = 0;
  let uVar8 = 0;
  let uVar11 = 0;
  let uVar10 = 0;
  let unaff_BL = 0;
  let unaff_BH = 0;
  let unaff_BP = 0;
  let uVar12 = 0;
  let iVar13 = 0;
  let puVar14 = 0;
  let uVar15 = 0;
  let pbVar16 = 0;
  let puVar17 = 0;
  let uVar9 = 0;
  heap.setU32(0x006522f0, (unaff_BP) >>> 0);
  uVar2 = in_EAX;
  uVar12 = in_CX << 7 | in_CX >>> 9 | uVar2;
  uVar8 = CONCAT22((in_EDX >>> 0x10), in_EDX >>> 2);
  puVar17 = 0x0;
  puVar14 = heap.u32((__addr_DAT_00971ef4) + ((uVar12 >>> 5 | uVar12 << 0xb)) * 4);
  do {
    if ((((uVar8 == heap.u32(puVar14 + (1) * 4)) && (uVar8 = CONCAT22((uVar8 >>> 0x10), CONCAT11(heap.u32(puVar14), uVar8)) & 0xffff3cff, (uVar8 >>> 8) == '\b')) && (uVar8 = CONCAT22((uVar8 >>> 0x10), CONCAT11(heap.u32(puVar14), uVar8)) & 0xffff03ff, (uVar8 >>> 8) == unaff_BH)) && ((unaff_BL == heap.u32(puVar14 + (2) * 4) && (puVar17 = puVar14, (heap.u32((puVar14 + 5)) & 0xf) == 0)))) {
      /* goto LAB_005cfec3 */ throw new Error("goto LAB_005cfec3 not supported");
    }
    uVar12 = heap.u32(puVar14);
    puVar14 = puVar14 + 4;
  } while ((uVar12 & 0x8000) == 0);
  puVar14 = puVar17;
  if (puVar17 == 0x0) {
    return CONCAT44(uVar8, in_EAX);
  }
  LAB_005cfec3: uVar11 = (uVar8 >>> 0x10);
  puVar1 = heap.u32((__addr_PTR_DAT_00652498) + (unaff_BL) * 4);
  iVar13 = (heap.u32((puVar14 + 5)) & 0xf) * 10;
  uVar15 = heap.u32(puVar14) & 3;
  uVar5 = (in_EAX >>> 0x10);
  switch (uVar15) {
    case 0:
      uVar3 = CONCAT22(uVar5, uVar2 - heap.u32((puVar1 + iVar13 + 1)));
      uVar6 = (in_CX - heap.u32((puVar1 + iVar13 + 3)));
      break;
    case 1:
      uVar3 = CONCAT22(uVar5, uVar2 - heap.u32((puVar1 + iVar13 + 3)));
      uVar6 = (in_CX + heap.u32((puVar1 + iVar13 + 1)));
      break;
    case 2:
      uVar3 = CONCAT22(uVar5, uVar2 + heap.u32((puVar1 + iVar13 + 1)));
      uVar6 = (in_CX + heap.u32((puVar1 + iVar13 + 3)));
      break;
    case 3:
      uVar3 = CONCAT22(uVar5, uVar2 + heap.u32((puVar1 + iVar13 + 3)));
      uVar6 = (in_CX - heap.u32((puVar1 + iVar13 + 1)));
  }
  sVar7 = (uVar8 * 4 - heap.u32((puVar1 + iVar13 + 5))) + heap.u32((puVar1 + 5));
  uVar9 = CONCAT22(uVar11, sVar7);
  uVar10 = CONCAT22(uVar11, sVar7 - heap.u32((puVar1 + 5)));
  uVar4 = uVar3;
  uVar8 = uVar6;
  for (iVar13 = 0; heap.u32(puVar1 + (iVar13) * 4) != -1; iVar13 = iVar13 + 10) {
    switch (heap.u32(((function(){ throw new Error("ghidra-decompile ERROR at FUN_005cfe66"); })()) + (uVar15) * 4)) {
      case 0x5cff64:
        break;
      case 0x5cff70:
        break;
      case 0x5cff7c:
        break;
      case 0x5cff88:
    }
    uVar2 = FUN_005e5562(heap, uVar15, uVar10, uVar6, uVar4, uVar9, uVar8);
    uVar2 = extraout_CX << 7 | extraout_CX >>> 9 | uVar2;
    for (pbVar16 = heap.u32((__addr_DAT_00971ef4) + ((uVar2 >>> 5 | uVar2 << 0xb)) * 4); ((extraout_DL != heap.u32(pbVar16 + (2) * 4) || ((heap.u32(pbVar16) & 0x3c) != 8)) || (((heap.u32(pbVar16) & 3) != unaff_BH || (((heap.u32(pbVar16 + (5) * 4) & 0xf) != heap.u32(puVar1 + (iVar13) * 4) || (unaff_BL != heap.u32(pbVar16 + (4) * 4))))))); pbVar16 = pbVar16 + 8) {
    
    }
    if (iVar13 == 0) {
      heap.setU32(0x006522f2, (pbVar16) >>> 0);
    }
    if ((heap.u32(0x006522f0) & 1) != 0) {
      heap.setU32(pbVar16, (heap.u32(pbVar16) & 0xbf) >>> 0);
    }
    if ((heap.u32(0x006522f0) & 2) != 0) {
      heap.setU32(pbVar16, (heap.u32(pbVar16) | 0x40) >>> 0);
    }
  }
  return CONCAT44(uVar9, uVar3);
} finally {
    heap.freeFrame(12);
  }
}
