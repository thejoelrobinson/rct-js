// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4531b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00407a41 } from "./407a41.js";
import { FUN_00407b91 } from "./407b91.js";
export function FUN_004531b0(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00632608 = __sp + 0;
  const __addr_DAT_0063268c = __sp + 4;
  try {
  let iVar1 = 0;
  if (heap.u32(0x006323f4) != -1) {
    psVar2 = __addr_DAT_00632608;
    do {
      if (heap.u32(psVar2) != -1) {
        iVar1 = FUN_00407b91(heap, psVar2 + 1);
        if (iVar1 != 1) {
          FUN_00407a41(heap, psVar2 + 1);
          heap.u32(psVar2) = -1;
        }
      }
      psVar2 = psVar2 + 0xb;
    } while (psVar2 < __addr_DAT_0063268c);
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
