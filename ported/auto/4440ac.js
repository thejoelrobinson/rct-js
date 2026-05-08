// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4440ac.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042c711 } from "./42c711.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_004440ac(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_0087d0da = __sp + 0;
  const __addr_DAT_0087d0ee = __sp + 4;
  const __addr_DAT_00887442 = __sp + 8;
  const __addr_DAT_00887444 = __sp + 12;
  try {
  let uVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  uVar5 = 0;
  do {
    if (heap.u32((__addr_DAT_0087d0da) + (uVar5) * 4) != '\0') {
      FUN_005e5301(heap);
      puVar1 = (__addr_DAT_0087d0da + uVar5);
      uVar3 = heap.u32(puVar1);
      heap.u32(puVar1) = heap.u32(puVar1) & 0xff7f;
      if ((uVar3 >>> 7 & 1) == 0) {
        pcVar2 = __addr_DAT_0087d0da + uVar5;
        heap.u32(pcVar2) = heap.u32(pcVar2) + -1;
        if (heap.u32(pcVar2) == '\0') {
          bVar4 = heap.u32((__addr_DAT_0087d0ee) + (uVar5) * 4);
          switch (uVar5) {
            default:
              break;
            case 1:
            case 5:
              heap.u16(0x971e86) = heap.u32((__addr_DAT_00887442) + (bVar4 * 0x130) * 4);
              unique0x00017200 = heap.u32((__addr_DAT_00887444) + (bVar4 * 0x98) * 4);
              break;
            case 3:
              heap.u16(0x971e86) = bVar4 + 0x709;
          }
          FUN_0042c711(heap);
        }
      }
    }
    uVar5 = uVar5 + 1;
  } while (uVar5 < 6);
  return;
} finally {
    heap.freeFrame(16);
  }
}
