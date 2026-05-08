// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fdf4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetNextWindow } from "../runtime/win32.js";
import { CARRY4 } from "../runtime/ghidra-builtins.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fa5f } from "./42fa5f.js";
import { FUN_0042fd81 } from "./42fd81.js";
import { FUN_00430081 } from "./430081.js";
import { FUN_004300b7 } from "./4300b7.js";
import { FUN_004300ea } from "./4300ea.js";
import { FUN_00430113 } from "./430113.js";
import { FUN_004301a9 } from "./4301a9.js";
export function FUN_0042fdf4(heap) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_005f8fb3 = __sp + 0;
  const __addr_DAT_0099aa88 = __sp + 4;
  const __addr_DAT_005f92e0 = __sp + 8;
  const __addr_stack0xfffffffc = __sp + 12;
  const __addr_DAT_005f92e7 = __sp + 16;
  const __addr_DAT_0099e96c = __sp + 20;
  const __addr_DAT_0099eb6c = __sp + 24;
  const __addr_DAT_0099c16c = __sp + 28;
  const __addr_DAT_005f9313 = __sp + 32;
  const __addr_DAT_0099c96c = __sp + 36;
  const __addr_DAT_008dbe94 = __sp + 40;
  try {
  let cVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let uVar9 = 0;
  let bVar12 = 0;
  let uVar13 = 0;
  pcVar7 = __addr_DAT_005f8fb3;
  pcVar8 = __addr_DAT_0099aa88;
  do {
    pcVar11 = pcVar8;
    cVar1 = heap.u32(pcVar7);
    heap.u32(pcVar11) = cVar1;
    pcVar7 = pcVar7 + 1;
    pcVar8 = pcVar11 + 1;
  } while (cVar1 != '*');
  pcVar8 = __addr_DAT_005f92e0;
  do {
    cVar1 = heap.u32(pcVar8);
    heap.u32(pcVar11) = cVar1;
    pcVar8 = pcVar8 + 1;
    pcVar11 = pcVar11 + 1;
  } while (cVar1 != '\0');
  iVar4 = FUN_004083b5(heap);
  bVar12 = iVar4 != -1;
  if (iVar4 != -1) {
    heap.setU32(0x005f8d35, (0) >>> 0);
    heap.setU32(0x005f88a4, (iVar4) >>> 0);
    FUN_0042fa5f(heap);
    if (!bVar12) {
      FUN_0042f96d(heap);
      FUN_0042f98e(heap);
      FUN_00408387(heap);
      uVar13 = 0xfffffffb < __addr_stack0xfffffffc;
      FUN_004301a9(heap);
      FUN_004300ea(heap);
      if ((!uVar13) && (sVar2 = FUN_00430081(heap), sVar2 != heap.u32(0x0099fb6e))) {
        sVar2 = FUN_004300b7(heap);
        uVar3 = sVar2 - heap.u32(0x0099fb6e);
        if (uVar3 < 0) {
          uVar3 = -uVar3;
        }
        if (0x78 < uVar3) {
          heap.setU32(0x0099fb6e, (FUN_004300b7(heap)) >>> 0);
          heap.setU32(0x0099fb78, (0xffffffe0) >>> 0);
          /* goto LAB_0042ff47 */ throw new Error("goto LAB_0042ff47 not supported");
        }
      }
      heap.setU32(0x0099fb6e, (FUN_004300b7(heap)) >>> 0);
      uVar9 = 0;
      iVar4 = 0;
      pHVar5 = FUN_0040844b(heap, __addr_DAT_005f8fb3, __addr_DAT_005f92e7);
      if (pHVar5 != 0xffffffff) {
        do {
          heap.setU32(0x005f9427, (pHVar5) >>> 0);
          bVar12 = CARRY4(uVar9, heap.u32(0x005f9307));
          uVar9 = uVar9 + heap.u32(0x005f9307);
          iVar4 = iVar4 + heap.u32(0x005f9303) + bVar12;
          pHVar6 = GetNextWindow(heap, heap.u32(0x005f9427), 0x5f92e7);
          pHVar5 = heap.u32(0x005f9427);
        } while (pHVar6 == 0x1);
        FUN_00408490(heap, heap.u32(0x005f9427));
      }
      if ((uVar9 == heap.u32(0x0099fb70)) && (iVar4 == heap.u32(0x0099fb74))) {
        return;
      }
      /* goto LAB_0042ff6e */ throw new Error("goto LAB_0042ff6e not supported");
    }
    FUN_00408387(heap);
    heap.setU32(0x0099fb6e, (FUN_004300b7(heap)) >>> 0);
  }
  LAB_0042ff47: uVar9 = 0;
  do {
    heap.u32((__addr_DAT_0099e96c) + (uVar9) * 4) = 0x80000000;
    uVar9 = uVar9 + 1;
  } while (uVar9 < 0x80);
  puVar10 = __addr_DAT_0099eb6c;
  iVar4 = 0x1000;
  do {
    heap.u32(puVar10) = 0;
    puVar10 = puVar10 + 1;
    iVar4 = iVar4 + -1;
  } while (iVar4 != 0);
  LAB_0042ff6e: puVar10 = __addr_DAT_0099c16c;
  iVar4 = 0x800;
  do {
    heap.u32(puVar10) = 0;
    puVar10 = puVar10 + 1;
    iVar4 = iVar4 + -1;
  } while (iVar4 != 0);
  heap.setU32(0x0099fb70, (0) >>> 0);
  heap.setU32(0x0099fb74, (0) >>> 0);
  heap.setU32(0x0099fb6c, ('\0') >>> 0);
  pHVar5 = FUN_0040844b(heap, __addr_DAT_005f8fb3);
  if (pHVar5 != 0xffffffff) {
    do {
      heap.setU32(0x005f9427, (pHVar5) >>> 0);
      bVar12 = CARRY4(heap.u32(0x0099fb70), heap.u32(0x005f9307));
      heap.setU32(0x0099fb70, (heap.u32(0x0099fb70) + heap.u32(0x005f9307)) >>> 0);
      heap.setU32(0x0099fb74, (heap.u32(0x0099fb74) + heap.u32(0x005f9303) + bVar12) >>> 0);
      pcVar7 = __addr_DAT_005f8fb3;
      pcVar8 = __addr_DAT_0099aa88;
      do {
        pcVar11 = pcVar8;
        cVar1 = heap.u32(pcVar7);
        heap.u32(pcVar11) = cVar1;
        pcVar7 = pcVar7 + 1;
        pcVar8 = pcVar11 + 1;
      } while (cVar1 != '*');
      pcVar8 = __addr_DAT_005f9313;
      do {
        cVar1 = heap.u32(pcVar8);
        heap.u32(pcVar11) = cVar1;
        pcVar8 = pcVar8 + 1;
        pcVar11 = pcVar11 + 1;
        bVar12 = false;
      } while (cVar1 != '\0');
      FUN_0042fd81(heap);
      if ((!bVar12) && ((heap.u32(0x008dbed2) < 0x28 || (99 < heap.u32(0x008dbed2))))) {
        uVar9 = heap.u32(0x008dbed2);
        pcVar7 = __addr_DAT_0099c96c + uVar9 * 0x40;
        pcVar8 = __addr_DAT_008dbe94;
        do {
          cVar1 = heap.u32(pcVar8);
          heap.u32(pcVar7) = cVar1;
          pcVar8 = pcVar8 + 1;
          pcVar7 = pcVar7 + 1;
        } while (cVar1 != '\0');
        pcVar7 = __addr_DAT_0099c16c + uVar9 * 0x10;
        pcVar8 = __addr_DAT_005f9313;
        do {
          cVar1 = heap.u32(pcVar8);
          heap.u32(pcVar7) = cVar1;
          pcVar8 = pcVar8 + 1;
          pcVar7 = pcVar7 + 1;
        } while (cVar1 != '\0');
        heap.setU32(0x0099fb6c, (heap.u32(0x0099fb6c) + '\x01') >>> 0);
      }
      pHVar6 = GetNextWindow(heap, heap.u32(0x005f9427), 0x5f92e7);
      pHVar5 = heap.u32(0x005f9427);
    } while (pHVar6 == 0x1);
    FUN_00408490(heap);
  }
  FUN_00430113(heap);
  return;
} finally {
    heap.freeFrame(44);
  }
}
