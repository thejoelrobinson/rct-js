// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dde9c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005dde9c(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_PTR_DAT_006e2758 = __sp + 0;
  const __addr_PTR_DAT_006e2788 = __sp + 4;
  const __addr_DAT_006e1d80 = __sp + 8;
  try {
  let uVar1 = 0;
  let sVar3 = 0;
  let uVar7 = 0;
  uVar7 = 0;
  do {
    puVar5 = heap.u32((__addr_PTR_DAT_006e2758) + (uVar7) * 4);
    puVar4 = heap.u32((__addr_PTR_DAT_006e2788) + (uVar7) * 4);
    while (true) {
      uVar1 = heap.u32(puVar5);
      if (uVar1 == 0xffff) {
        break;
      }
      if ((heap.u32(((uVar1 >>> 5) * 4 + 0x87cba8 + ((uVar1 & 0x1f) >>> 3))) >>> (uVar1 & 7) & 1) != 0) {
        heap.u32(puVar4) = uVar1;
        puVar4 = puVar4 + 1;
      }
      puVar5 = puVar5 + 1;
    }
    heap.u32(puVar4) = 0xffff;
    uVar7 = uVar7 + 1;
  } while (uVar7 < 0xc);
  uVar7 = 0;
  puVar6 = __addr_DAT_006e1d80;
  sVar3 = 4;
  do {
    psVar2 = heap.u32((__addr_PTR_DAT_006e2788) + (uVar7) * 4);
    heap.u32(puVar6) = 0;
    if (heap.u32(psVar2) != -1) {
      heap.u32(puVar6) = 5;
      heap.u32((puVar6 + 2)) = sVar3;
      heap.u32((puVar6 + 4)) = sVar3 + 0x22;
      sVar3 = sVar3 + 0x23;
    }
    uVar7 = uVar7 + 1;
    puVar6 = puVar6 + 0x10;
  } while (uVar7 < 0xc);
  FUN_005e5301(heap);
  return;
} finally {
    heap.freeFrame(12);
  }
}
