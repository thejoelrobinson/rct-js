// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e13d2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e13d2 } from "./5e13d2.js";
export function FUN_005e13d2(heap) {
  let iVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let in_AX = 0;
  let sVar8 = 0;
  let sVar9 = 0;
  let in_DX = 0;
  let unaff_BX = 0;
  let unaff_BP = 0;
  puVar10 = unaff_ESI;
  while (puVar11 = puVar10, sVar7 = heap.u32(0x0099fb98), sVar6 = heap.u32(0x0099fb96), sVar5 = heap.u32(0x0099fb94), sVar4 = heap.u32(0x0099fb92), sVar3 = heap.u32(0x0099fb90), iVar2 = heap.u32(0x0099fb8c), puVar10 = puVar11 + 0x5e, puVar10 < heap.u32(0x009a1164)) {
    if ((((heap.u32((puVar11 + 0x66)) < in_DX) && (heap.u32((puVar11 + 0x19a)) < unaff_BP)) && (in_AX < (heap.u32((puVar11 + 0x66)) + heap.u32((puVar11 + 0x67))))) && ((unaff_BX < (heap.u32((puVar11 + 0x19a)) + heap.u32((puVar11 + 0x19e))) && ((heap.u32((puVar11 + 0x1aa)) & 0x10) == 0)))) {
      if (in_AX < heap.u32((puVar11 + 0x66))) {
        FUN_005e13d2(heap);
        in_AX = heap.u32((puVar11 + 0x66));
        puVar10 = unaff_ESI;
      } else {
        if ((heap.u32((puVar11 + 0x66)) + heap.u32((puVar11 + 0x67))) < in_DX) {
        FUN_005e13d2(heap);
        in_AX = heap.u32((puVar11 + 0x66)) + heap.u32((puVar11 + 0x67));
        puVar10 = unaff_ESI;
      } else {
        if (unaff_BX < heap.u32((puVar11 + 0x19a))) {
        FUN_005e13d2(heap);
        unaff_BX = heap.u32((puVar11 + 0x19a));
        puVar10 = unaff_ESI;
      } else {
        if (unaff_BP <= (heap.u32((puVar11 + 0x19a)) + heap.u32((puVar11 + 0x19e)))) {
          return;
        }
        FUN_005e13d2(heap);
        unaff_BX = heap.u32((puVar11 + 0x19a)) + heap.u32((puVar11 + 0x19e));
        puVar10 = unaff_ESI;
      }
      }
      }
    }
  }
  sVar9 = heap.u32((unaff_ESI + 8));
  if (in_AX < sVar9) {
    in_AX = sVar9;
  }
  if ((sVar9 + heap.u32((unaff_ESI + 9))) < in_DX) {
    in_DX = sVar9 + heap.u32((unaff_ESI + 9));
  }
  sVar9 = heap.u32((unaff_ESI + 0x22));
  if (unaff_BX < sVar9) {
    unaff_BX = sVar9;
  }
  sVar9 = sVar9 + heap.u32((unaff_ESI + 0x26));
  if (sVar9 < unaff_BP) {
    unaff_BP = sVar9;
  }
  if ((in_DX <= in_AX) || (unaff_BP <= unaff_BX)) {
    return;
  }
  do {
    sVar9 = in_AX - sVar3;
    heap.setU32(0x0099fb8c, (iVar2) >>> 0);
    heap.setU32(0x0099fb90, (sVar3) >>> 0);
    heap.setU32(0x0099fb94, (sVar5) >>> 0);
    heap.setU32(0x0099fb98, (sVar7) >>> 0);
    if (sVar9 == 0 || in_AX < sVar3) {
      LAB_005e1566: sVar9 = heap.u32(0x0099fb94);
      sVar8 = (heap.u32(0x0099fb90) + heap.u32(0x0099fb94)) - in_DX;
      if (sVar8 != 0 && in_DX <= (heap.u32(0x0099fb90) + heap.u32(0x0099fb94))) {
        heap.setU32(0x0099fb94, (heap.u32(0x0099fb94) - sVar8) >>> 0);
        if (heap.u32(0x0099fb94) == 0 || sVar9 < sVar8) {
          /* goto LAB_005e1637 */ throw new Error("goto LAB_005e1637 not supported");
        }
        heap.setU32(0x0099fb98, (heap.u32(0x0099fb98) + sVar8) >>> 0);
      }
      sVar9 = unaff_BX - sVar4;
      heap.setU32(0x0099fb92, (sVar4) >>> 0);
      heap.setU32(0x0099fb96, (sVar6) >>> 0);
      if (sVar9 != 0 && sVar4 <= unaff_BX) {
        heap.setU32(0x0099fb92, (sVar4 + sVar9) >>> 0);
        heap.setU32(0x0099fb96, (sVar6 - sVar9) >>> 0);
        if (heap.u32(0x0099fb96) == 0 || sVar6 < sVar9) {
          /* goto LAB_005e1637 */ throw new Error("goto LAB_005e1637 not supported");
        }
        heap.setU32(0x0099fb8c, (heap.u32(0x0099fb8c) + (heap.u32(0x0099fb94) + heap.u32(0x0099fb98)) * sVar9) >>> 0);
      }
      sVar9 = heap.u32(0x0099fb96);
      sVar8 = (heap.u32(0x0099fb92) + heap.u32(0x0099fb96)) - unaff_BP;
      if ((sVar8 == 0 || (heap.u32(0x0099fb92) + heap.u32(0x0099fb96)) < unaff_BP) || (heap.setU32(0x0099fb96, (heap.u32(0x0099fb96) - sVar8) >>> 0), heap.u32(0x0099fb96) != 0 && sVar8 <= sVar9)) {
        heap.setU32(0x009a0129, (heap.u32((0x009a1517 + (heap.u32((heap.u32(unaff_ESI + (7) * 4) + 1)) & 0x7f) * 2))) >>> 0);
        (heap.u32(heap.u32(unaff_ESI)))();
        (heap.u32(heap.u32(unaff_ESI)))();
      }
    } else {
      heap.setU32(0x0099fb90, (sVar3 + sVar9) >>> 0);
      heap.setU32(0x0099fb94, (sVar5 - sVar9) >>> 0);
      if (heap.u32(0x0099fb94) != 0 && sVar9 <= sVar5) {
        heap.setU32(0x0099fb98, (sVar7 + sVar9) >>> 0);
        heap.setU32(0x0099fb8c, (iVar2 + sVar9) >>> 0);
        /* goto LAB_005e1566 */ throw new Error("goto LAB_005e1566 not supported");
      }
    }
    LAB_005e1637: do {
      puVar10 = unaff_ESI + 0x5e;
      if (heap.u32(0x009a1164) <= puVar10) {
        heap.setU32(0x0099fb8c, (iVar2) >>> 0);
        heap.setU32(0x0099fb90, (sVar3) >>> 0);
        heap.setU32(0x0099fb92, (sVar4) >>> 0);
        heap.setU32(0x0099fb94, (sVar5) >>> 0);
        heap.setU32(0x0099fb96, (sVar6) >>> 0);
        heap.setU32(0x0099fb98, (sVar7) >>> 0);
        return;
      }
      puVar1 = (unaff_ESI + 0x1aa);
      unaff_ESI = puVar10;
    } while ((heap.u32(puVar1) & 0x10) == 0);
  } while (true);
}
