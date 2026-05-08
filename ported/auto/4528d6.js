// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4528d6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00407a41 } from "./407a41.js";
export function FUN_004528d6(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00632448 = __sp + 0;
  try {
  let sVar1 = 0;
  if (heap.u32(0x006323f4) != -1) {
    psVar2 = __addr_DAT_00632448;
    sVar1 = 6;
    do {
      if (heap.u32(psVar2) != -1) {
        if (heap.u32(psVar2 + (0xc) * 4) != -1) {
          FUN_00407a41(heap, psVar2 + 2);
        }
        if (heap.u32(psVar2 + (0x1a) * 4) != -1) {
          FUN_00407a41(heap, psVar2 + 0x10);
        }
        heap.u32(psVar2) = -1;
      }
      psVar2 = psVar2 + 0x1e;
      sVar1 = sVar1 + -1;
    } while (sVar1 != 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
