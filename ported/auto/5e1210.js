// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1210.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e12eb } from "./5e12eb.js";
export function FUN_005e1210(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099ad63 = __sp + 0;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  uVar1 = 0;
  uVar5 = 0;
  uVar3 = 0;
  do {
    uVar2 = uVar5;
    uVar6 = uVar3;
    if (heap.u32((__addr_DAT_0099ad63) + (uVar1 + uVar3) * 4) != '\0') {
      do {
        uVar6 = uVar6 + heap.u32(0x00971ee6);
        if (heap.u32(0x00971eea) <= uVar2 + 1) {
          break;
        }
        uVar2 = uVar2 + 1;
      } while (heap.u32((__addr_DAT_0099ad63) + (uVar1 + uVar6) * 4) != '\0');
      uVar6 = uVar6 - heap.u32(0x00971ee6);
      uVar2 = uVar1;
      uVar4 = uVar3;
      do {
        do {
          heap.u32((__addr_DAT_0099ad63) + (uVar2 + uVar4) * 4) = 0;
          uVar2 = uVar2 + 1;
        } while (uVar2 <= uVar1);
        uVar4 = uVar4 + heap.u32(0x00971ee6);
        uVar2 = uVar1;
      } while (uVar4 <= uVar6);
      if (((ushort)(uVar1 * heap.u32(0x00971ee2)) < heap.u32(0x00971eda)) && ((ushort)(uVar5 * heap.u32(0x00971ee4)) < heap.u32(0x00971edc))) {
        FUN_005e12eb(heap);
      }
    }
    uVar5 = uVar5 + 1;
    uVar3 = uVar3 + heap.u32(0x00971ee6);
    if (heap.u32(0x00971eea) <= uVar5) {
      uVar5 = 0;
      uVar3 = 0;
      uVar1 = uVar1 + 1;
      if (heap.u32(0x00971ee6) <= uVar1) {
        return;
      }
    }
  } while (true);
} finally {
    heap.freeFrame(4);
  }
}
