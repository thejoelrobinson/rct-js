// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1b3e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../runtime/win32.js";
import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_005e1bfd } from "./5e1bfd.js";
import { FUN_009bb374 } from "./9bb374.js";
export function FUN_005e1b3e(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let in_EDX = 0;
  let unaff_BP = 0;
  let sVar7 = 0;
  let unaff_EDI = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  for (uVar8 = unaff_EDI; uVar8 < heap.u32(0x009a1164); uVar8 = uVar8 + 0x178) {
    if (((((heap.u32((uVar8 + 0x32)) & 0x10) != 0) && (unaff_ESI != heap.u32((uVar8 + 8)))) && (heap.u32((uVar8 + 0x20)) < (heap.u32(unaff_ESI + (2) * 4) + heap.u32(unaff_ESI)))) && (((heap.u32(unaff_ESI + (2) * 4) < (heap.u32((uVar8 + 0x20)) + heap.u32((uVar8 + 0x24))) && (heap.u32((uVar8 + 0x22)) < (heap.u32(unaff_ESI + (3) * 4) + heap.u32(unaff_ESI + (1) * 4)))) && (heap.u32(unaff_ESI + (3) * 4) < (heap.u32((uVar8 + 0x22)) + heap.u32((uVar8 + 0x26))))))) {
      uVar4 = heap.u32((uVar8 + 0x20));
      uVar5 = heap.u32((uVar8 + 0x22));
      sVar6 = heap.u32((uVar8 + 0x24)) + uVar4;
      sVar7 = heap.u32((uVar8 + 0x26)) + uVar5;
      uVar1 = heap.u32(unaff_ESI + (2) * 4);
      if (uVar4 < uVar1) {
        uVar4 = uVar1;
      }
      if ((uVar1 + heap.u32(unaff_ESI)) < sVar6) {
        sVar6 = uVar1 + heap.u32(unaff_ESI);
      }
      uVar1 = heap.u32(unaff_ESI + (3) * 4);
      if (uVar5 < uVar1) {
        uVar5 = uVar1;
      }
      if ((uVar1 + heap.u32(unaff_ESI + (1) * 4)) < sVar7) {
        sVar7 = uVar1 + heap.u32(unaff_ESI + (1) * 4);
      }
      if ((uVar4 < sVar6) && (uVar5 < sVar7)) {
        FUN_005e12eb(heap);
      }
    }
  }
  while (true) {
    uVar4 = in_EDX;
    if (heap.u32(0x009a1164) <= unaff_EDI) {
      uVar5 = uVar4;
      if (uVar4 < 0) {
        uVar5 = -uVar4;
      }
      if (uVar5 < heap.u32(unaff_ESI)) {
        uVar5 = unaff_BP;
        if (unaff_BP < 0) {
          uVar5 = -unaff_BP;
        }
        if (uVar5 < heap.u32(unaff_ESI + (1) * 4)) {
          FUN_009bb374(heap);
          uVar5 = heap.u32(unaff_ESI + (2) * 4);
          if (uVar4 != 0) {
            if (uVar4 < 0) {
              FUN_005e12eb(heap, unaff_ESI, uVar4);
            } else {
              FUN_005e12eb(heap, unaff_ESI);
              uVar5 = uVar5 + uVar4;
            }
          }
          if (unaff_BP == 0) {
            return uVar5;
          }
          if (unaff_BP < 0) {
            uVar4 = FUN_005e12eb(heap);
            return uVar4;
          }
          uVar4 = FUN_005e12eb(heap);
          return uVar4;
        }
      }
      uVar4 = FUN_005e12eb(heap);
      return uVar4;
    }
    if ((((unaff_ESI != heap.u32((unaff_EDI + 8))) && (heap.u32((unaff_EDI + 0x20)) < (heap.u32(unaff_ESI + (2) * 4) + heap.u32(unaff_ESI)))) && (heap.u32(unaff_ESI + (2) * 4) < (heap.u32((unaff_EDI + 0x20)) + heap.u32((unaff_EDI + 0x24))))) && ((heap.u32((unaff_EDI + 0x22)) < (heap.u32(unaff_ESI + (3) * 4) + heap.u32(unaff_ESI + (1) * 4)) && (heap.u32(unaff_ESI + (3) * 4) < (heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26))))))) {
      break;
    }
    unaff_EDI = unaff_EDI + 0x178;
  }
  if (heap.u32(unaff_ESI + (2) * 4) < heap.u32((unaff_EDI + 0x20))) {
    uVar5 = heap.u32(unaff_ESI + (6) * 4);
    uVar1 = heap.u32(unaff_ESI + (2) * 4);
    uVar2 = heap.u32(unaff_ESI);
    uVar9 = heap.u32(unaff_ESI + (4) * 4);
    uVar3 = heap.u32((unaff_EDI + 0x20)) - heap.u32(unaff_ESI + (2) * 4);
    heap.u32(unaff_ESI) = uVar3;
    heap.u32(unaff_ESI + (6) * 4) = uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f);
    FUN_005e1bfd(heap, unaff_ESI, unaff_EDI, CONCAT22(heap, uVar4, unaff_BP));
    uVar4 = heap.u32(unaff_ESI);
    uVar3 = uVar2 - uVar4;
    heap.u32(unaff_ESI) = uVar3;
    heap.u32(unaff_ESI + (2) * 4) = heap.u32(unaff_ESI + (2) * 4) + uVar4;
    heap.u32(unaff_ESI + (6) * 4) = uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f);
    heap.u32(unaff_ESI + (4) * 4) = heap.u32(unaff_ESI + (4) * 4) + (uVar4 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f));
    uVar4 = FUN_005e1bfd(heap);
    heap.u32(unaff_ESI + (4) * 4) = uVar9;
    heap.u32(unaff_ESI) = uVar2;
    heap.u32(unaff_ESI + (2) * 4) = uVar1;
    heap.u32(unaff_ESI + (6) * 4) = uVar5;
    return uVar4;
  }
  if ((heap.u32(unaff_ESI + (2) * 4) + heap.u32(unaff_ESI)) <= (heap.u32((unaff_EDI + 0x20)) + heap.u32((unaff_EDI + 0x24)))) {
    if (heap.u32((unaff_EDI + 0x22)) <= heap.u32(unaff_ESI + (3) * 4)) {
      uVar5 = heap.u32(unaff_ESI + (3) * 4) + heap.u32(unaff_ESI + (1) * 4);
      if ((heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26))) < uVar5) {
        uVar1 = heap.u32(unaff_ESI + (7) * 4);
        uVar2 = heap.u32(unaff_ESI + (3) * 4);
        uVar9 = heap.u32(unaff_ESI + (1) * 4);
        uVar3 = heap.u32(unaff_ESI + (5) * 4);
        uVar5 = (heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26))) - heap.u32(unaff_ESI + (3) * 4);
        heap.u32(unaff_ESI + (1) * 4) = uVar5;
        heap.u32(unaff_ESI + (7) * 4) = uVar5 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f);
        FUN_005e1bfd(heap, unaff_ESI, unaff_EDI, CONCAT22(heap, uVar4, unaff_BP));
        uVar4 = heap.u32(unaff_ESI + (1) * 4);
        uVar5 = uVar9 - uVar4;
        heap.u32(unaff_ESI + (1) * 4) = uVar5;
        heap.u32(unaff_ESI + (3) * 4) = heap.u32(unaff_ESI + (3) * 4) + uVar4;
        heap.u32(unaff_ESI + (7) * 4) = uVar5 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f);
        heap.u32(unaff_ESI + (5) * 4) = heap.u32(unaff_ESI + (5) * 4) + (uVar4 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f));
        uVar5 = FUN_005e1bfd(heap);
        heap.u32(unaff_ESI + (5) * 4) = uVar3;
        heap.u32(unaff_ESI + (1) * 4) = uVar9;
        heap.u32(unaff_ESI + (3) * 4) = uVar2;
        heap.u32(unaff_ESI + (7) * 4) = uVar1;
      }
      return uVar5;
    }
    uVar5 = heap.u32(unaff_ESI + (7) * 4);
    uVar1 = heap.u32(unaff_ESI + (3) * 4);
    uVar2 = heap.u32(unaff_ESI + (1) * 4);
    uVar9 = heap.u32(unaff_ESI + (5) * 4);
    uVar3 = heap.u32((unaff_EDI + 0x22)) - heap.u32(unaff_ESI + (3) * 4);
    heap.u32(unaff_ESI + (1) * 4) = uVar3;
    heap.u32(unaff_ESI + (7) * 4) = uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f);
    FUN_005e1bfd(heap, unaff_ESI, unaff_EDI, CONCAT22(heap, uVar4, unaff_BP));
    uVar4 = heap.u32(unaff_ESI + (1) * 4);
    uVar3 = uVar2 - uVar4;
    heap.u32(unaff_ESI + (1) * 4) = uVar3;
    heap.u32(unaff_ESI + (3) * 4) = heap.u32(unaff_ESI + (3) * 4) + uVar4;
    heap.u32(unaff_ESI + (7) * 4) = uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f);
    heap.u32(unaff_ESI + (5) * 4) = heap.u32(unaff_ESI + (5) * 4) + (uVar4 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f));
    uVar4 = FUN_005e1bfd(heap);
    heap.u32(unaff_ESI + (5) * 4) = uVar9;
    heap.u32(unaff_ESI + (1) * 4) = uVar2;
    heap.u32(unaff_ESI + (3) * 4) = uVar1;
    heap.u32(unaff_ESI + (7) * 4) = uVar5;
    return uVar4;
  }
  uVar5 = heap.u32(unaff_ESI + (6) * 4);
  uVar1 = heap.u32(unaff_ESI + (2) * 4);
  uVar2 = heap.u32(unaff_ESI);
  uVar9 = heap.u32(unaff_ESI + (4) * 4);
  uVar3 = (heap.u32((unaff_EDI + 0x20)) + heap.u32((unaff_EDI + 0x24))) - heap.u32(unaff_ESI + (2) * 4);
  heap.u32(unaff_ESI) = uVar3;
  heap.u32(unaff_ESI + (6) * 4) = uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f);
  FUN_005e1bfd(heap, unaff_ESI, unaff_EDI, CONCAT22(heap, uVar4, unaff_BP));
  uVar4 = heap.u32(unaff_ESI);
  uVar3 = uVar2 - uVar4;
  heap.u32(unaff_ESI) = uVar3;
  heap.u32(unaff_ESI + (2) * 4) = heap.u32(unaff_ESI + (2) * 4) + uVar4;
  heap.u32(unaff_ESI + (6) * 4) = uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f);
  heap.u32(unaff_ESI + (4) * 4) = heap.u32(unaff_ESI + (4) * 4) + (uVar4 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f));
  uVar4 = FUN_005e1bfd(heap);
  heap.u32(unaff_ESI + (4) * 4) = uVar9;
  heap.u32(unaff_ESI) = uVar2;
  heap.u32(unaff_ESI + (2) * 4) = uVar1;
  heap.u32(unaff_ESI + (6) * 4) = uVar5;
  return uVar4;
}
