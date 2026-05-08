// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1bfd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e12eb } from "./5e12eb.js";
import { FUN_009bb374 } from "./9bb374.js";
export function FUN_005e1bfd(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let in_DX = 0;
  let unaff_BP = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  let uVar6 = 0;
  while (true) {
    if (heap.u32(0x009a1164) <= unaff_EDI) {
      uVar5 = in_DX;
      if (in_DX < 0) {
        uVar5 = -in_DX;
      }
      if (uVar5 < heap.u32(unaff_ESI)) {
        uVar5 = unaff_BP;
        if (unaff_BP < 0) {
          uVar5 = -unaff_BP;
        }
        if (uVar5 < heap.u32(unaff_ESI + (1) * 4)) {
          FUN_009bb374(heap);
          uVar5 = heap.u32(unaff_ESI + (2) * 4);
          if (in_DX != 0) {
            if (in_DX < 0) {
              FUN_005e12eb(heap, unaff_ESI, in_DX);
            } else {
              FUN_005e12eb(heap, unaff_ESI);
              uVar5 = uVar5 + in_DX;
            }
          }
          if (unaff_BP != 0) {
            if (-1 < unaff_BP) {
              uVar5 = FUN_005e12eb(heap);
              return uVar5;
            }
            uVar5 = FUN_005e12eb(heap);
            return uVar5;
          }
          return uVar5;
        }
      }
      uVar5 = FUN_005e12eb(heap);
      return uVar5;
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
    uVar6 = heap.u32(unaff_ESI + (4) * 4);
    uVar3 = heap.u32((unaff_EDI + 0x20)) - heap.u32(unaff_ESI + (2) * 4);
    heap.setU32(unaff_ESI, (uVar3) >>> 0);
    heap.setU32((unaff_ESI + (6) * 4), (uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f)) >>> 0);
    FUN_005e1bfd(heap);
    uVar3 = heap.u32(unaff_ESI);
    uVar4 = uVar2 - uVar3;
    heap.setU32(unaff_ESI, (uVar4) >>> 0);
    heap.setU32((unaff_ESI + (2) * 4), (heap.u32(unaff_ESI + (2) * 4) + uVar3) >>> 0);
    heap.setU32((unaff_ESI + (6) * 4), (uVar4 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f)) >>> 0);
    heap.setU32((unaff_ESI + (4) * 4), (heap.u32(unaff_ESI + (4) * 4) + (uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f))) >>> 0);
    uVar3 = FUN_005e1bfd(heap);
    heap.setU32((unaff_ESI + (4) * 4), (uVar6) >>> 0);
    heap.setU32(unaff_ESI, (uVar2) >>> 0);
    heap.setU32((unaff_ESI + (2) * 4), (uVar1) >>> 0);
    heap.setU32((unaff_ESI + (6) * 4), (uVar5) >>> 0);
    return uVar3;
  }
  if ((heap.u32((unaff_EDI + 0x20)) + heap.u32((unaff_EDI + 0x24))) < (heap.u32(unaff_ESI + (2) * 4) + heap.u32(unaff_ESI))) {
    uVar5 = heap.u32(unaff_ESI + (6) * 4);
    uVar1 = heap.u32(unaff_ESI + (2) * 4);
    uVar2 = heap.u32(unaff_ESI);
    uVar6 = heap.u32(unaff_ESI + (4) * 4);
    uVar3 = (heap.u32((unaff_EDI + 0x20)) + heap.u32((unaff_EDI + 0x24))) - heap.u32(unaff_ESI + (2) * 4);
    heap.setU32(unaff_ESI, (uVar3) >>> 0);
    heap.setU32((unaff_ESI + (6) * 4), (uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f)) >>> 0);
    FUN_005e1bfd(heap);
    uVar3 = heap.u32(unaff_ESI);
    uVar4 = uVar2 - uVar3;
    heap.setU32(unaff_ESI, (uVar4) >>> 0);
    heap.setU32((unaff_ESI + (2) * 4), (heap.u32(unaff_ESI + (2) * 4) + uVar3) >>> 0);
    heap.setU32((unaff_ESI + (6) * 4), (uVar4 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f)) >>> 0);
    heap.setU32((unaff_ESI + (4) * 4), (heap.u32(unaff_ESI + (4) * 4) + (uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f))) >>> 0);
    uVar3 = FUN_005e1bfd(heap);
    heap.setU32((unaff_ESI + (4) * 4), (uVar6) >>> 0);
    heap.setU32(unaff_ESI, (uVar2) >>> 0);
    heap.setU32((unaff_ESI + (2) * 4), (uVar1) >>> 0);
    heap.setU32((unaff_ESI + (6) * 4), (uVar5) >>> 0);
    return uVar3;
  }
  if (heap.u32(unaff_ESI + (3) * 4) < heap.u32((unaff_EDI + 0x22))) {
    uVar5 = heap.u32(unaff_ESI + (7) * 4);
    uVar1 = heap.u32(unaff_ESI + (3) * 4);
    uVar2 = heap.u32(unaff_ESI + (1) * 4);
    uVar6 = heap.u32(unaff_ESI + (5) * 4);
    uVar3 = heap.u32((unaff_EDI + 0x22)) - heap.u32(unaff_ESI + (3) * 4);
    heap.setU32((unaff_ESI + (1) * 4), (uVar3) >>> 0);
    heap.setU32((unaff_ESI + (7) * 4), (uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f)) >>> 0);
    FUN_005e1bfd(heap);
    uVar3 = heap.u32(unaff_ESI + (1) * 4);
    uVar4 = uVar2 - uVar3;
    heap.setU32((unaff_ESI + (1) * 4), (uVar4) >>> 0);
    heap.setU32((unaff_ESI + (3) * 4), (heap.u32(unaff_ESI + (3) * 4) + uVar3) >>> 0);
    heap.setU32((unaff_ESI + (7) * 4), (uVar4 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f)) >>> 0);
    heap.setU32((unaff_ESI + (5) * 4), (heap.u32(unaff_ESI + (5) * 4) + (uVar3 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f))) >>> 0);
    uVar3 = FUN_005e1bfd(heap);
    heap.setU32((unaff_ESI + (5) * 4), (uVar6) >>> 0);
    heap.setU32((unaff_ESI + (1) * 4), (uVar2) >>> 0);
    heap.setU32((unaff_ESI + (3) * 4), (uVar1) >>> 0);
    heap.setU32((unaff_ESI + (7) * 4), (uVar5) >>> 0);
    return uVar3;
  }
  uVar5 = heap.u32(unaff_ESI + (3) * 4) + heap.u32(unaff_ESI + (1) * 4);
  if ((heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26))) < uVar5) {
    uVar1 = heap.u32(unaff_ESI + (7) * 4);
    uVar2 = heap.u32(unaff_ESI + (3) * 4);
    uVar6 = heap.u32(unaff_ESI + (1) * 4);
    uVar3 = heap.u32(unaff_ESI + (5) * 4);
    uVar5 = (heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26))) - heap.u32(unaff_ESI + (3) * 4);
    heap.setU32((unaff_ESI + (1) * 4), (uVar5) >>> 0);
    heap.setU32((unaff_ESI + (7) * 4), (uVar5 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f)) >>> 0);
    FUN_005e1bfd(heap);
    uVar5 = heap.u32(unaff_ESI + (1) * 4);
    uVar4 = uVar6 - uVar5;
    heap.setU32((unaff_ESI + (1) * 4), (uVar4) >>> 0);
    heap.setU32((unaff_ESI + (3) * 4), (heap.u32(unaff_ESI + (3) * 4) + uVar5) >>> 0);
    heap.setU32((unaff_ESI + (7) * 4), (uVar4 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f)) >>> 0);
    heap.setU32((unaff_ESI + (5) * 4), (heap.u32(unaff_ESI + (5) * 4) + (uVar5 << (heap.u32(unaff_ESI + (8) * 4) & 0x1f))) >>> 0);
    uVar5 = FUN_005e1bfd(heap);
    heap.setU32((unaff_ESI + (5) * 4), (uVar3) >>> 0);
    heap.setU32((unaff_ESI + (1) * 4), (uVar6) >>> 0);
    heap.setU32((unaff_ESI + (3) * 4), (uVar2) >>> 0);
    heap.setU32((unaff_ESI + (7) * 4), (uVar1) >>> 0);
  }
  return uVar5;
}
