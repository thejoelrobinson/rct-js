// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43909f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00426f56 } from "./426f56.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0043909f(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_008ad1c0 = __sp + 4;
  try {
  let uVar1 = 0;
  uVar1 = FUN_005df40c(heap);
  if (uVar1 < 0x42) {
    pcVar2 = __addr_DAT_00887420;
    do {
      if (heap.u32(pcVar2) != -1) {
        FUN_00426f56(heap);
        return;
      }
      pcVar2 = pcVar2 + 0x260;
    } while (pcVar2 < __addr_DAT_008ad1c0);
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
