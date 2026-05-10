// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414aa0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCPInfo } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00414cb0 } from "./414cb0.js";
import { FUN_00414d00 } from "./414d00.js";
import { FUN_00414d60 } from "./414d60.js";
import { FUN_00414da0 } from "./414da0.js";
export function FUN_00414aa0(heap, param_1) {
  const __sp = heap.allocFrame(128);
  const __addr_local_14 = __sp + 0;
  try {
  let pBVar1 = 0;
  let pbVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let CodePage = 0;
  let pUVar5 = 0;
  let BVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let iVar10 = 0;
  let pBVar11 = 0;
  let pbVar12 = 0;
  let pbVar13 = 0;
  let puVar14 = 0;
  CodePage = (((regs.eax = FUN_00414cb0(heap, param_1))) >>> 0);
  if (CodePage == heap.u32(0x005f0228)) {
    return 0;
  }
  if (CodePage == 0) {
    (regs.eax = FUN_00414d60(heap));
    (regs.eax = FUN_00414da0(heap));
    return 0;
  }
  iVar10 = ((0) >>> 0);
  pUVar5 = ((0x005ec370) >>> 0);
  do {
    if (heap.i32(pUVar5) == CodePage) {
      puVar14 = ((0x005f0020) >>> 0);
      for (iVar9 = ((0x40) >>> 0); iVar9 != 0; iVar9 = (((iVar9 + -1) >>> 0)) >>> 0) {
        heap.setU32(puVar14, (0) & 0xffffffff);
        puVar14 = ((puVar14 + ((1) * 4)) >>> 0);
      }
      heap.setU8(puVar14, (0) & 0xff);
      uVar7 = ((0) >>> 0);
      iVar10 = ((iVar10 * 0x30) >>> 0);
      pbVar12 = (((iVar10 + 0x5ec380)) >>> 0);
      do {
        bVar3 = ((heap.u8(pbVar12)) & 0xff);
        for (pbVar13 = ((pbVar12) >>> 0); (bVar3 != 0 && (bVar3 = ((heap.u8(pbVar13 + (1))) & 0xff), bVar3 != 0)); pbVar13 = (((pbVar13 + 2) >>> 0)) >>> 0) {
          uVar8 = ((heap.u32(pbVar13)) >>> 0);
          if (uVar8 <= bVar3) {
            bVar4 = ((heap.u32((0x005ec368) + (uVar7) * 4)) & 0xff);
            do {
              pbVar2 = (((((0x005f0020) | 0) + uVar8 + 1)) >>> 0);
              heap.setU32(pbVar2, (heap.u8(pbVar2) | bVar4) & 0xffffffff);
              uVar8 = ((uVar8 + 1) >>> 0);
            } while (uVar8 <= bVar3);
          }
          bVar3 = ((heap.u8(pbVar13 + (2))) & 0xff);
        }
        uVar7 = ((uVar7 + 1) >>> 0);
        pbVar12 = ((pbVar12 + 8) >>> 0);
      } while (uVar7 < 4);
      heap.setU32(0x005f3f64, (1) >>> 0);
      heap.setU32(0x005f0228, (CodePage) >>> 0);
      heap.setU32(0x005f022c, ((regs.eax = FUN_00414d00(heap, CodePage))) >>> 0);
      heap.setU32(0x005f0230, (heap.u32((iVar10 + 0x5ec374))) >>> 0);
      heap.setU32(0x005f0234, (heap.u32((iVar10 + 0x5ec378))) >>> 0);
      heap.setU32(0x005f0238, (heap.u32((iVar10 + 0x5ec37c))) >>> 0);
      (regs.eax = FUN_00414da0(heap));
      return 0;
    }
    pUVar5 = ((pUVar5 + ((0xc) * 4)) >>> 0);
    iVar10 = ((iVar10 + 1) >>> 0);
  } while (pUVar5 < 0x005ec460);
  BVar6 = ((GetCPInfo(heap, CodePage, __addr_local_14)) >>> 0);
  if (BVar6 != 1) {
    if (heap.u32(0x005f023c) == 0) {
      return 0xffffffff;
    }
    (regs.eax = FUN_00414d60(heap));
    (regs.eax = FUN_00414da0(heap));
    return 0;
  }
  puVar14 = ((0x005f0020) >>> 0);
  for (iVar10 = ((0x40) >>> 0); iVar10 != 0; iVar10 = (((iVar10 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar14, (0) & 0xffffffff);
    puVar14 = ((puVar14 + ((1) * 4)) >>> 0);
  }
  heap.setU8(puVar14, (0) & 0xff);
  heap.setU32(0x005f022c, (0) >>> 0);
  if (heap.u32(__addr_local_14) < 2) {
    heap.setU32(0x005f3f64, (0) >>> 0);
    heap.setU32(0x005f0228, (CodePage) >>> 0);
  } else {
    heap.setU32(0x005f0228, (CodePage) >>> 0);
    if (heap.u32(heap.u8((__addr_local_14 + 4)) + (0) * 4) != 0) {
      pBVar11 = ((heap.u8((__addr_local_14 + 4)) + 1) >>> 0);
      do {
        bVar3 = ((heap.i32(pBVar11)) & 0xff);
        if (bVar3 == 0) {
          break;
        }
        for (uVar7 = ((((heap.i32(pBVar11 + (-1) * 4)) >>> 0)) >>> 0); uVar7 <= bVar3; uVar7 = (((uVar7 + 1) >>> 0)) >>> 0) {
          heap.setU8((((0x005f0020) | 0) + uVar7 + 1), (heap.u8((((0x005f0020) | 0) + uVar7 + 1)) | 4) & 0xff);
        }
        pBVar1 = ((pBVar11 + ((1) * 4)) >>> 0);
        pBVar11 = ((pBVar11 + ((2) * 4)) >>> 0);
      } while (heap.i32(pBVar1) != 0);
    }
    uVar7 = ((1) >>> 0);
    do {
      heap.setU8((((0x005f0020) | 0) + uVar7 + 1), (heap.u8((((0x005f0020) | 0) + uVar7 + 1)) | 8) & 0xff);
      uVar7 = ((uVar7 + 1) >>> 0);
    } while (uVar7 < 0xff);
    heap.setU32(0x005f022c, ((regs.eax = FUN_00414d00(heap, CodePage))) >>> 0);
    heap.setU32(0x005f3f64, (1) >>> 0);
  }
  heap.setU32(0x005f0230, (0) >>> 0);
  heap.setU32(0x005f0234, (0) >>> 0);
  heap.setU32(0x005f0238, (0) >>> 0);
  (regs.eax = FUN_00414da0(heap));
  return 0;
} finally {
    heap.freeFrame(128);
  }
}
