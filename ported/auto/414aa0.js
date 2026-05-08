// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414aa0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCPInfo } from "../../runtime/win32.js";
import { FUN_00414cb0 } from "./414cb0.js";
import { FUN_00414d00 } from "./414d00.js";
import { FUN_00414d60 } from "./414d60.js";
import { FUN_00414da0 } from "./414da0.js";
export function FUN_00414aa0(heap, param_1) {
  const __sp = heap.allocFrame(144);
  const __addr_DAT_005ec370 = __sp + 0;
  const __addr_DAT_005f0020 = __sp + 4;
  const __addr_DAT_005ec368 = __sp + 8;
  const __addr_DAT_005ec460 = __sp + 12;
  const __addr_local_14 = __sp + 16;
  try {
  let bVar3 = 0;
  let bVar4 = 0;
  let CodePage = 0;
  let BVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let iVar10 = 0;
  CodePage = FUN_00414cb0(heap, param_1);
  if (CodePage == heap.u32(0x005f0228)) {
    return 0;
  }
  if (CodePage == 0) {
    FUN_00414d60(heap);
    FUN_00414da0(heap);
    return 0;
  }
  iVar10 = 0;
  pUVar5 = __addr_DAT_005ec370;
  do {
    if (heap.u32(pUVar5) == CodePage) {
      puVar14 = __addr_DAT_005f0020;
      for (iVar9 = 0x40; iVar9 != 0; iVar9 = iVar9 + -1) {
        heap.u32(puVar14) = 0;
        puVar14 = puVar14 + 1;
      }
      heap.u32(puVar14) = 0;
      uVar7 = 0;
      iVar10 = iVar10 * 0x30;
      pbVar12 = (iVar10 + 0x5ec380);
      do {
        bVar3 = heap.u32(pbVar12);
        for (pbVar13 = pbVar12; (bVar3 != 0 && (bVar3 = heap.u32(pbVar13 + (1) * 4), bVar3 != 0)); pbVar13 = pbVar13 + 2) {
          uVar8 = heap.u32(pbVar13);
          if (uVar8 <= bVar3) {
            bVar4 = heap.u32((__addr_DAT_005ec368) + (uVar7) * 4);
            do {
              pbVar2 = (__addr_DAT_005f0020 + uVar8 + 1);
              heap.u32(pbVar2) = heap.u32(pbVar2) | bVar4;
              uVar8 = uVar8 + 1;
            } while (uVar8 <= bVar3);
          }
          bVar3 = heap.u32(pbVar13 + (2) * 4);
        }
        uVar7 = uVar7 + 1;
        pbVar12 = pbVar12 + 8;
      } while (uVar7 < 4);
      heap.setU32(0x005f3f64, (1) >>> 0);
      heap.setU32(0x005f0228, (CodePage) >>> 0);
      heap.setU32(0x005f022c, (FUN_00414d00(heap, CodePage)) >>> 0);
      heap.setU32(0x005f0230, (heap.u32((iVar10 + 0x5ec374))) >>> 0);
      heap.setU32(0x005f0234, (heap.u32((iVar10 + 0x5ec378))) >>> 0);
      heap.setU32(0x005f0238, (heap.u32((iVar10 + 0x5ec37c))) >>> 0);
      FUN_00414da0(heap);
      return 0;
    }
    pUVar5 = pUVar5 + 0xc;
    iVar10 = iVar10 + 1;
  } while (pUVar5 < __addr_DAT_005ec460);
  BVar6 = GetCPInfo(heap, CodePage, __addr_local_14);
  if (BVar6 != 1) {
    if (heap.u32(0x005f023c) == 0) {
      return 0xffffffff;
    }
    FUN_00414d60(heap);
    FUN_00414da0(heap);
    return 0;
  }
  puVar14 = __addr_DAT_005f0020;
  for (iVar10 = 0x40; iVar10 != 0; iVar10 = iVar10 + -1) {
    heap.u32(puVar14) = 0;
    puVar14 = puVar14 + 1;
  }
  heap.u32(puVar14) = 0;
  heap.setU32(0x005f022c, (0) >>> 0);
  if (heap.u32(__addr_local_14) < 2) {
    heap.setU32(0x005f3f64, (0) >>> 0);
    heap.setU32(0x005f0228, (CodePage) >>> 0);
  } else {
    heap.setU32(0x005f0228, (CodePage) >>> 0);
    if (heap.u32(heap.u8((__addr_local_14 + 4)) + (0) * 4) != '\0') {
      pBVar11 = heap.u8((__addr_local_14 + 4)) + 1;
      do {
        bVar3 = heap.u32(pBVar11);
        if (bVar3 == 0) {
          break;
        }
        for (uVar7 = heap.u32(pBVar11 + (-1) * 4); uVar7 <= bVar3; uVar7 = uVar7 + 1) {
          heap.u32((__addr_DAT_005f0020 + uVar7 + 1)) = heap.u32((__addr_DAT_005f0020 + uVar7 + 1)) | 4;
        }
        pBVar1 = pBVar11 + 1;
        pBVar11 = pBVar11 + 2;
      } while (heap.u32(pBVar1) != 0);
    }
    uVar7 = 1;
    do {
      heap.u32((__addr_DAT_005f0020 + uVar7 + 1)) = heap.u32((__addr_DAT_005f0020 + uVar7 + 1)) | 8;
      uVar7 = uVar7 + 1;
    } while (uVar7 < 0xff);
    heap.setU32(0x005f022c, (FUN_00414d00(heap, CodePage)) >>> 0);
    heap.setU32(0x005f3f64, (1) >>> 0);
  }
  heap.setU32(0x005f0230, (0) >>> 0);
  heap.setU32(0x005f0234, (0) >>> 0);
  heap.setU32(0x005f0238, (0) >>> 0);
  FUN_00414da0(heap);
  return 0;
} finally {
    heap.freeFrame(144);
  }
}
