// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb7bb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00405cc0 } from "./405cc0.js";
export function FUN_009bb7bb(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_005f2000 = __sp + 0;
  const __addr_DAT_005f2398 = __sp + 4;
  const __addr_DAT_00628a3c = __sp + 8;
  const __addr_DAT_008dc0b4 = __sp + 12;
  try {
  let iVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  if (heap.u32(0x009b2300) == '\x01') {
    pcVar8 = __addr_DAT_005f2000 + heap.u32(0x008dff1c) * 4;
    uVar3 = heap.u32(0x008dff18);
    pcVar5 = heap.u32(0x008dff14);
    do {
      heap.u32(pcVar8) = -1 - ((byte)(-heap.u32(pcVar5) - 1U) >>> 1);
      heap.u32(pcVar8 + (1) * 4) = -1 - ((byte)(-heap.u32(pcVar5 + (1) * 4) - 1U) >>> 1);
      heap.u32(pcVar8 + (2) * 4) = -1 - ((byte)(-heap.u32(pcVar5 + (2) * 4) - 1U) >>> 1);
      pcVar5 = pcVar5 + 3;
      pcVar8 = pcVar8 + 4;
      uVar3 = uVar3 - 1;
    } while (uVar3 != 0);
    FUN_00405cc0(heap, __addr_DAT_005f2000, 10, 0xec);
    heap.setU32(0x009b2300, (heap.u32(0x009b2300) + '\x01') >>> 0);
  } else {
    if (heap.u32(0x009b2300) == '\x02') {
      puVar9 = (__addr_DAT_005f2000 + heap.u32(0x008dff1c) * 4);
      uVar3 = heap.u32(0x008dff18);
      pcVar5 = heap.u32(0x008dff14);
      do {
        heap.u32(puVar9) = heap.u32(pcVar5);
        heap.u32((puVar9 + 1)) = heap.u32(pcVar5 + (2) * 4);
        pcVar5 = pcVar5 + 3;
        puVar9 = puVar9 + 2;
        uVar3 = uVar3 - 1;
      } while (uVar3 != 0);
    }
    puVar9 = __addr_DAT_005f2398;
    iVar4 = 0;
    if ((heap.u32((__addr_DAT_00628a3c + heap.u32(0x008d7eb4) * 4)) != -1) && (iVar4 = 1, heap.u32((__addr_DAT_00628a3c + heap.u32(0x008d7eb4) * 4)) != 0x200002a)) {
      iVar4 = 2;
    }
    iVar1 = heap.u32((__addr_DAT_008dc0b4) + ((iVar4 + 999) * 4) * 4);
    sVar2 = 5;
    puVar7 = (((((-heap.u32(0x00999f94) >>> 1) << 7) * 0xf >>> 0x10) * 3) + iVar1);
    do {
      heap.u32(puVar9) = heap.u32(puVar7);
      heap.u32((puVar9 + 1)) = heap.u32((puVar7 + 1));
      puVar6 = (puVar7 + 9);
      if ((iVar1 + 0x2dU) <= puVar6) {
        puVar6 = puVar7 + -0x12;
      }
      puVar9 = puVar9 + 2;
      sVar2 = sVar2 + -1;
      puVar7 = puVar6;
    } while (sVar2 != 0);
    iVar1 = heap.u32((__addr_DAT_008dc0b4) + ((iVar4 + 0x3ea) * 4) * 4);
    sVar2 = 5;
    puVar7 = (((((-heap.u32(0x00999f94) >>> 1) << 7) * 0xf >>> 0x10) * 3) + iVar1);
    do {
      heap.u32(puVar9) = heap.u32(puVar7);
      heap.u32((puVar9 + 1)) = heap.u32((puVar7 + 1));
      puVar6 = (puVar7 + 9);
      if ((iVar1 + 0x2dU) <= puVar6) {
        puVar6 = puVar7 + -0x12;
      }
      puVar9 = puVar9 + 2;
      sVar2 = sVar2 + -1;
      puVar7 = puVar6;
    } while (sVar2 != 0);
    iVar4 = heap.u32((__addr_DAT_008dc0b4) + ((iVar4 + 0x3ed) * 4) * 4);
    sVar2 = 3;
    puVar7 = ((((heap.u32(0x00999f94) * -0x3c0 & 0xffffU) * 3 >>> 0x10) * 3) + iVar4);
    do {
      heap.u32(puVar9) = heap.u32(puVar7);
      heap.u32((puVar9 + 1)) = heap.u32((puVar7 + 1));
      puVar6 = (puVar7 + 3);
      if ((iVar4 + 9U) <= puVar6) {
        puVar6 = puVar7 + -3;
      }
      puVar9 = puVar9 + 2;
      sVar2 = sVar2 + -1;
      puVar7 = puVar6;
    } while (sVar2 != 0);
    FUN_00405cc0(heap, __addr_DAT_005f2000, 0xe6, 0xd);
    if (heap.u32(0x009b2300) == '\x02') {
      FUN_00405cc0(heap, __addr_DAT_005f2000, 10, 0xec);
      heap.setU32(0x009b2300, ('\0') >>> 0);
    }
  }
  if (((heap.u32(0x005e910c) == 2) || (heap.u32(0x005e910c) == 1)) && (heap.u32(0x005f15b0) != 8)) {
    heap.setU32(0x005e9154, (1) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(16);
  }
}
