// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429249.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00429249(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  sVar2 = 0;
  uVar3 = 0;
  do {
    uVar4 = 0;
    do {
      pbVar5 = heap.u32((__addr_DAT_00971ef4) + (((uVar4 << 7 | uVar4 >>> 9 | uVar3) >>> 5 | (uVar4 >>> 9) << 0xb)) * 4);
      bVar1 = heap.u32(pbVar5);
      while ((bVar1 & 0x3c) != 0) {
        pbVar5 = pbVar5 + 8;
        bVar1 = heap.u32(pbVar5);
      }
      if ((heap.u32(pbVar5 + (7) * 4) & 0x30) != 0) {
        sVar2 = sVar2 + 1;
      }
      uVar4 = uVar4 + 0x20;
    } while (uVar4 < 0x1000);
    uVar3 = uVar3 + 0x20;
  } while (uVar3 < 0x1000);
  if (sVar2 != heap.u32(0x0087d0c2)) {
    heap.setU32(0x0087d0c2, (sVar2) >>> 0);
    FUN_005e5301(heap);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
