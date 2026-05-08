// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb374.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_009bb355 } from "./9bb355.js";
export function FUN_009bb374(heap) {
  let in_AX = 0;
  let iVar1 = 0;
  let in_CX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_DX = 0;
  let sVar4 = 0;
  let unaff_BX = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let unaff_SI = 0;
  let unaff_DI = 0;
  if (unaff_SI < 0) {
    LAB_009bb42e: FUN_009bb355(heap);
    uVar6 = heap.u32(0x0099fb84) + heap.u32(0x0099fb88);
    iVar1 = in_AX + unaff_BX * uVar6;
    iVar5 = iVar1 - unaff_SI * uVar6;
    sVar4 = in_DX + unaff_SI;
    if (unaff_DI < 0) {
      iVar5 = iVar5 - unaff_DI;
    } else {
      iVar1 = iVar1 + unaff_DI;
      unaff_DI = -unaff_DI;
    }
    uVar2 = in_CX + unaff_DI;
    puVar15 = (iVar1 + heap.u32(0x0099fb7c));
    puVar10 = (iVar5 + heap.u32(0x0099fb7c));
    do {
      puVar11 = puVar10;
      puVar16 = puVar15;
      if ((uVar2 & 1) != 0) {
        puVar16 = (puVar15 + 1);
        puVar11 = (puVar10 + 1);
        heap.u32(puVar15) = heap.u32(puVar10);
      }
      uVar3 = (uVar2 >>> 2);
      if ((uVar2 >>> 1 & 1) != 0) {
        heap.u32(puVar16) = heap.u32(puVar11);
        puVar11 = (puVar11 + 2);
        puVar16 = (puVar16 + 2);
      }
      for (; uVar3 != 0; uVar3 = uVar3 - 1) {
        heap.u32(puVar16) = heap.u32(puVar11);
        puVar11 = puVar11 + 1;
        puVar16 = puVar16 + 1;
      }
      puVar15 = (puVar16 + (uVar6 - uVar2));
      puVar10 = (puVar11 + (uVar6 - uVar2));
      sVar4 = sVar4 + -1;
    } while (sVar4 != 0);
    return;
  }
  if (unaff_SI == 0) {
    if (unaff_DI < 0) {
      /* goto LAB_009bb42e */ throw new Error("goto LAB_009bb42e not supported");
    }
    if (unaff_DI == 0) {
      return;
    }
  }
  FUN_009bb355(heap);
  uVar6 = heap.u32(0x0099fb84) + heap.u32(0x0099fb88);
  iVar1 = (in_AX + in_CX + -1) + (unaff_BX + in_DX + -1) * uVar6;
  iVar5 = iVar1 - unaff_SI * uVar6;
  sVar4 = in_DX - unaff_SI;
  if (unaff_DI < 0) {
    iVar1 = iVar1 + unaff_DI;
  } else {
    iVar5 = iVar5 - unaff_DI;
    unaff_DI = -unaff_DI;
  }
  uVar2 = in_CX + unaff_DI;
  puVar12 = (iVar1 + heap.u32(0x0099fb7c));
  puVar7 = (iVar5 + heap.u32(0x0099fb7c));
  do {
    puVar8 = puVar7;
    puVar13 = puVar12;
    if ((uVar2 & 1) != 0) {
      puVar13 = puVar12 + -1;
      puVar8 = puVar7 + -1;
      heap.u32(puVar12) = heap.u32(puVar7);
    }
    uVar3 = (uVar2 >>> 2);
    puVar9 = (puVar8 + -1);
    puVar14 = (puVar13 + -1);
    if ((uVar2 >>> 1 & 1) != 0) {
      puVar14 = (puVar13 + -3);
      puVar9 = (puVar8 + -3);
      heap.u32((puVar13 + -1)) = heap.u32((puVar8 + -1));
    }
    puVar10 = (puVar9 + -1);
    puVar15 = (puVar14 + -1);
    for (; uVar3 != 0; uVar3 = uVar3 - 1) {
      heap.u32(puVar15) = heap.u32(puVar10);
      puVar10 = puVar10 + -1;
      puVar15 = puVar15 + -1;
    }
    puVar12 = (puVar15 + (3 - (uVar6 - uVar2)));
    puVar7 = (puVar10 + (3 - (uVar6 - uVar2)));
    sVar4 = sVar4 + -1;
  } while (sVar4 != 0);
  return;
}
