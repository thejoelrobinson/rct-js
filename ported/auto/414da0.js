// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414da0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetCPInfo } from "../runtime/win32.js";
import { FUN_00416d00 } from "./416d00.js";
import { FUN_00417860 } from "./417860.js";
export function FUN_00414da0(heap) {
  const __sp = heap.allocFrame(968);
  const __addr_local_514 = __sp + 0;
  const __addr_DAT_005f0128 = __sp + 128;
  const __addr_DAT_005f0020 = __sp + 132;
  const __addr_local_500 = __sp + 136;
  const __addr_local_400 = __sp + 200;
  const __addr_local_300 = __sp + 456;
  const __addr_local_200 = __sp + 712;
  try {
  let BVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  BVar1 = GetCPInfo(heap, heap.u32(0x005f0228), __addr_local_514);
  if (BVar1 == 1) {
    uVar2 = 0;
    do {
      heap.u32((__addr_local_500 + uVar2)) = uVar2;
      uVar2 = uVar2 + 1;
    } while (uVar2 < 0x100);
    (heap.u32(__addr_local_500 + (0) * 4) & 0xff) = 0x20;
    if (heap.u32(heap.u8((__addr_local_514 + 4)) + (0) * 4) != 0) {
      pBVar5 = heap.u8((__addr_local_514 + 4)) + 1;
      do {
        uVar2 = heap.u32(heap.u8((__addr_local_514 + 4)) + (0) * 4);
        if (uVar2 <= heap.u32(pBVar5)) {
          uVar3 = (heap.u32(pBVar5) - uVar2) + 1;
          puVar7 = (__addr_local_500 + uVar2);
          for (uVar4 = uVar3 >>> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
            heap.u32(puVar7) = 0x20202020;
            puVar7 = puVar7 + 1;
          }
          for (uVar3 = uVar3 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
            heap.u32(puVar7) = 0x20;
            puVar7 = (puVar7 + 1);
          }
        }
        heap.u32(heap.u8((__addr_local_514 + 4)) + (0) * 4) = heap.u32(pBVar5 + (1) * 4);
        pBVar5 = pBVar5 + 2;
      } while (heap.u32(heap.u8((__addr_local_514 + 4)) + (0) * 4) != 0);
    }
    FUN_00417860(heap, 1, __addr_local_500, 0x100, __addr_local_200, heap.u32(0x005f0228), heap.u32(0x005f022c), 0);
    FUN_00416d00(heap, heap.u32(0x005f022c), 0x100, __addr_local_500, 0x100, __addr_local_400, 0x100, heap.u32(0x005f0228), 0);
    FUN_00416d00(heap, heap.u32(0x005f022c), 0x200, __addr_local_500, 0x100, __addr_local_300, 0x100, heap.u32(0x005f0228), 0);
    uVar2 = 0;
    puVar6 = __addr_local_200;
    do {
      if ((heap.u32(puVar6) & 1) == 0) {
        if ((heap.u32(puVar6) & 2) == 0) {
          heap.u32((__addr_DAT_005f0128) + (uVar2) * 4) = 0;
        } else {
          heap.u32((__addr_DAT_005f0020 + uVar2 + 1)) = heap.u32((__addr_DAT_005f0020 + uVar2 + 1)) | 0x20;
          heap.u32((__addr_DAT_005f0128) + (uVar2) * 4) = heap.u32(__addr_local_300 + (uVar2) * 4);
        }
      } else {
        heap.u32((__addr_DAT_005f0020 + uVar2 + 1)) = heap.u32((__addr_DAT_005f0020 + uVar2 + 1)) | 0x10;
        heap.u32((__addr_DAT_005f0128) + (uVar2) * 4) = heap.u32(__addr_local_400 + (uVar2) * 4);
      }
      uVar2 = uVar2 + 1;
      puVar6 = puVar6 + 1;
    } while (uVar2 < 0x100);
    return;
  }
  uVar2 = 0;
  do {
    if ((uVar2 < 0x41) || (0x5a < uVar2)) {
      if ((uVar2 < 0x61) || (0x7a < uVar2)) {
        heap.u32((__addr_DAT_005f0128) + (uVar2) * 4) = 0;
      } else {
        heap.u32((__addr_DAT_005f0020 + uVar2 + 1)) = heap.u32((__addr_DAT_005f0020 + uVar2 + 1)) | 0x20;
        heap.u32((__addr_DAT_005f0128) + (uVar2) * 4) = uVar2 + -0x20;
      }
    } else {
      heap.u32((__addr_DAT_005f0020 + uVar2 + 1)) = heap.u32((__addr_DAT_005f0020 + uVar2 + 1)) | 0x10;
      heap.u32((__addr_DAT_005f0128) + (uVar2) * 4) = uVar2 + ' ';
    }
    uVar2 = uVar2 + 1;
  } while (uVar2 < 0x100);
  return;
} finally {
    heap.freeFrame(968);
  }
}
