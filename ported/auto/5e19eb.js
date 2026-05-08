// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e19eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_005e1b3e } from "./5e1b3e.js";
export function FUN_005e19eb(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_AX = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let unaff_BX = 0;
  let sVar9 = 0;
  let sVar10 = 0;
  let unaff_ESI = 0;
  sVar6 = heap.u32(unaff_EDI + (4) * 4);
  sVar9 = heap.u32(unaff_EDI + (5) * 4);
  heap.u32(unaff_EDI + (4) * 4) = in_AX;
  heap.u32(unaff_EDI + (5) * 4) = unaff_BX;
  bVar1 = heap.u32((unaff_EDI + 8));
  if ((sVar9 >>> (bVar1 & 0x1f) == unaff_BX >>> (bVar1 & 0x1f)) && (sVar6 >>> (bVar1 & 0x1f) == in_AX >>> (bVar1 & 0x1f))) {
    return;
  }
  if ((heap.u32((unaff_ESI + 0x32)) & 0x40) == 0) {
    sVar6 = heap.u32(unaff_EDI + (2) * 4);
    sVar9 = heap.u32(unaff_EDI);
    sVar8 = heap.u32(unaff_EDI + (4) * 4);
    sVar10 = heap.u32(unaff_EDI + (3) * 4);
    sVar2 = heap.u32(unaff_EDI + (1) * 4);
    sVar3 = heap.u32(unaff_EDI + (5) * 4);
    sVar4 = heap.u32(unaff_EDI + (6) * 4);
    sVar5 = heap.u32(unaff_EDI + (7) * 4);
    bVar1 = heap.u32((unaff_EDI + 8));
    sVar7 = heap.u32(unaff_EDI + (2) * 4);
    if (sVar7 < 0) {
      heap.u32(unaff_EDI) = heap.u32(unaff_EDI) + sVar7;
      heap.u32(unaff_EDI + (2) * 4) = 0;
      sVar7 = sVar7 << (bVar1 & 0x1f);
      heap.u32(unaff_EDI + (6) * 4) = heap.u32(unaff_EDI + (6) * 4) + sVar7;
      heap.u32(unaff_EDI + (4) * 4) = heap.u32(unaff_EDI + (4) * 4) - sVar7;
    }
    sVar7 = (heap.u32(unaff_EDI + (2) * 4) + heap.u32(unaff_EDI)) - heap.u32(0x00971ed6);
    if (sVar7 != 0 && heap.u32(0x00971ed6) <= (heap.u32(unaff_EDI + (2) * 4) + heap.u32(unaff_EDI))) {
      heap.u32(unaff_EDI) = heap.u32(unaff_EDI) - sVar7;
      heap.u32(unaff_EDI + (6) * 4) = heap.u32(unaff_EDI + (6) * 4) - (sVar7 << (bVar1 & 0x1f));
    }
    if (0 < heap.u32(unaff_EDI)) {
      sVar7 = heap.u32(unaff_EDI + (3) * 4);
      if (sVar7 < 0) {
        heap.u32(unaff_EDI + (1) * 4) = heap.u32(unaff_EDI + (1) * 4) + sVar7;
        heap.u32(unaff_EDI + (3) * 4) = 0;
        sVar7 = sVar7 << (bVar1 & 0x1f);
        heap.u32(unaff_EDI + (7) * 4) = heap.u32(unaff_EDI + (7) * 4) + sVar7;
        heap.u32(unaff_EDI + (5) * 4) = heap.u32(unaff_EDI + (5) * 4) - sVar7;
      }
      sVar7 = (heap.u32(unaff_EDI + (3) * 4) + heap.u32(unaff_EDI + (1) * 4)) - heap.u32(0x00971ed8);
      if (sVar7 != 0 && heap.u32(0x00971ed8) <= (heap.u32(unaff_EDI + (3) * 4) + heap.u32(unaff_EDI + (1) * 4))) {
        heap.u32(unaff_EDI + (1) * 4) = heap.u32(unaff_EDI + (1) * 4) - sVar7;
        heap.u32(unaff_EDI + (7) * 4) = heap.u32(unaff_EDI + (7) * 4) - (sVar7 << (bVar1 & 0x1f));
      }
      if (0 < heap.u32(unaff_EDI + (1) * 4)) {
        FUN_005e1b3e(heap);
      }
    }
    heap.u32(unaff_EDI + (7) * 4) = sVar5;
    heap.u32(unaff_EDI + (6) * 4) = sVar4;
    heap.u32(unaff_EDI + (5) * 4) = sVar3;
    heap.u32(unaff_EDI + (1) * 4) = sVar2;
    heap.u32(unaff_EDI + (3) * 4) = sVar10;
    heap.u32(unaff_EDI + (4) * 4) = sVar8;
    heap.u32(unaff_EDI) = sVar9;
    heap.u32(unaff_EDI + (2) * 4) = sVar6;
    return;
  }
  sVar6 = heap.u32(unaff_EDI + (2) * 4);
  sVar9 = heap.u32(unaff_EDI + (3) * 4);
  sVar8 = heap.u32(unaff_EDI) + sVar6;
  sVar10 = heap.u32(unaff_EDI + (1) * 4) + sVar9;
  if (sVar6 < 0) {
    sVar6 = 0;
  }
  if (sVar9 < 0) {
    sVar9 = 0;
  }
  if (heap.u32(0x00971ed6) < sVar8) {
    sVar8 = heap.u32(0x00971ed6);
  }
  if (heap.u32(0x00971ed8) < sVar10) {
    sVar10 = heap.u32(0x00971ed8);
  }
  if ((sVar6 < sVar8) && (sVar9 < sVar10)) {
    FUN_005e12eb(heap);
    return;
  }
  return;
}
