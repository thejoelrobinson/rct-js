// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42ef8a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004039bc } from "./4039bc.js";
import { FUN_00405653 } from "./405653.js";
import { FUN_00405949 } from "./405949.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f199 } from "./42f199.js";
import { FUN_0042f1d3 } from "./42f1d3.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005df472 } from "./5df472.js";
export function FUN_0042ef8a(heap) {
  const __sp = heap.allocFrame(52);
  const __addr_DAT_005f8540 = __sp + 0;
  const __addr_DAT_005f8648 = __sp + 4;
  const __addr_DAT_005f8da3 = __sp + 8;
  const __addr_DAT_005f8ea4 = __sp + 12;
  const __addr_DAT_005f8fb3 = __sp + 16;
  const __addr_DAT_005f90c5 = __sp + 20;
  const __addr_DAT_005f851c = __sp + 24;
  const __addr_DAT_0063297d = __sp + 28;
  const __addr_DAT_00632980 = __sp + 32;
  const __addr_DAT_005f874c = __sp + 36;
  const __addr_DAT_0099aa88 = __sp + 40;
  const __addr_DAT_0099a888 = __sp + 44;
  const __addr_DAT_0099a988 = __sp + 48;
  try {
  let cVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  iVar2 = FUN_00405653(heap, __addr_DAT_005f8540, 0x005f8850);
  if (iVar2 == 0) {
    heap.setU32(0x005f8648, (0) >>> 0);
    heap.setU32(0x005f874c, (0) >>> 0);
    heap.setU32(0x005f8540, (0) >>> 0);
  } else {
    pcVar5 = __addr_DAT_005f8648;
    pcVar6 = __addr_DAT_005f8da3;
    do {
      pcVar7 = pcVar6;
      cVar1 = heap.u32(pcVar5);
      heap.u32(pcVar7) = cVar1;
      pcVar5 = pcVar5 + 1;
      pcVar6 = pcVar7 + 1;
    } while (cVar1 != '\0');
    heap.u32(pcVar7 + (0) * 4) = '\\';
    heap.u32(pcVar7 + (1) * 4) = '\0';
    pcVar5 = __addr_DAT_005f8648;
    pcVar6 = __addr_DAT_005f8ea4;
    do {
      pcVar7 = pcVar6;
      cVar1 = heap.u32(pcVar5);
      heap.u32(pcVar7) = cVar1;
      pcVar5 = pcVar5 + 1;
      pcVar6 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar6 = 0x005f8fa5;
    do {
      cVar1 = heap.u32(pcVar6);
      heap.u32(pcVar7) = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar5 = __addr_DAT_005f8648;
    pcVar6 = __addr_DAT_005f8fb3;
    do {
      pcVar7 = pcVar6;
      cVar1 = heap.u32(pcVar5);
      heap.u32(pcVar7) = cVar1;
      pcVar5 = pcVar5 + 1;
      pcVar6 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar6 = 0x005f90b4;
    do {
      cVar1 = heap.u32(pcVar6);
      heap.u32(pcVar7) = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar5 = __addr_DAT_005f8648;
    pcVar6 = __addr_DAT_005f90c5;
    do {
      pcVar7 = pcVar6;
      cVar1 = heap.u32(pcVar5);
      heap.u32(pcVar7) = cVar1;
      pcVar5 = pcVar5 + 1;
      pcVar6 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcVar6 = 0x005f91c6;
    do {
      cVar1 = heap.u32(pcVar6);
      heap.u32(pcVar7) = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
  }
  FUN_0042f199(heap);
  iVar2 = FUN_00405949(heap, 0x005f886b);
  if (iVar2 != 0) {
    FUN_005df472(heap);
    return;
  }
  do {
    uVar3 = 0;
    LAB_0042f06b: heap.u32((__addr_DAT_005f851c) + (uVar3) * 4) = 0;
    uVar4 = uVar3;
    FUN_0042f239(heap);
    iVar2 = FUN_004083b5(heap, uVar3);
    if (iVar2 != -1) {
      LAB_0042f134: FUN_00408387(heap, iVar2);
      LAB_0042f13f: uVar3 = uVar4 + 1;
      if (0x16 < uVar3) {
        heap.setU32(0x005f8d5f, (0) >>> 0);
        if ((0x1000000 < heap.u32(0x005f14fc)) && (heap.setU32(0x005f8d5f, (1) >>> 0), 0x2000000 < heap.u32(0x005f14fc))) {
          heap.setU32(0x005f8d5f, (2) >>> 0);
        }
        heap.setU32(0x005f8d5d, (heap.u32((__addr_DAT_0063297d) + (heap.u32(0x005f8d5f)) * 4)) >>> 0);
        heap.setU32(0x005f8d5e, (heap.u32((__addr_DAT_00632980) + (heap.u32(0x005f8d5f)) * 4)) >>> 0);
        FUN_0042f1d3(heap);
        return;
      }
      /* goto LAB_0042f06b */ throw new Error("goto LAB_0042f06b not supported");
    }
    if (uVar4 == 0x12) {
      /* goto LAB_0042f13f */ throw new Error("goto LAB_0042f13f not supported");
    }
    heap.u32((__addr_DAT_005f851c) + (uVar4) * 4) = 1;
    uVar3 = uVar4;
    FUN_0042f239(heap);
    iVar2 = FUN_004083b5(heap, uVar4);
    uVar4 = uVar3;
    if (iVar2 != -1) {
      /* goto LAB_0042f134 */ throw new Error("goto LAB_0042f134 not supported");
    }
    if (heap.u32(0x005f8533) != '\0') {
      FUN_005df472(heap);
      return;
    }
    heap.setU32(0x005f8533, ('\x01') >>> 0);
    FUN_00458bcf(heap);
    FUN_00458bcf(heap);
    pcVar6 = __addr_DAT_005f874c;
    pcVar5 = __addr_DAT_0099aa88;
    do {
      cVar1 = heap.u32(pcVar6);
      heap.u32(pcVar5) = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar5 = pcVar5 + 1;
    } while (cVar1 != '\0');
    FUN_004039bc(heap, __addr_DAT_0099a888, __addr_DAT_0099a988, __addr_DAT_0099aa88);
    pcVar6 = __addr_DAT_0099aa88;
    pcVar5 = __addr_DAT_005f874c;
    do {
      cVar1 = heap.u32(pcVar6);
      heap.u32(pcVar5) = cVar1;
      pcVar6 = pcVar6 + 1;
      pcVar5 = pcVar5 + 1;
    } while (cVar1 != '\0');
  } while (true);
} finally {
    heap.freeFrame(52);
  }
}
