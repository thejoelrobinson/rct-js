// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fd81.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fa5f } from "./42fa5f.js";
import { FUN_004447f6 } from "./4447f6.js";
export function FUN_0042fd81(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099aa88 = __sp + 0;
  try {
  let iVar1 = 0;
  let bVar2 = 0;
  heap.setU32(0x005f8d35, (1) >>> 0);
  iVar1 = FUN_004083b5(heap, __addr_DAT_0099aa88);
  bVar2 = iVar1 != -1;
  if (iVar1 != -1) {
    heap.setU32(0x005f88a4, (iVar1) >>> 0);
    FUN_0042fa5f(heap);
    if (!bVar2) {
      FUN_0042f96d(heap);
      FUN_0042f98e(heap);
      iVar1 = FUN_00408387(heap, heap.u32(0x005f88a4));
      heap.setU32(0x0099fe00, (0) >>> 0);
      if (heap.u32(0x0087d79c) == 0) {
        iVar1 = FUN_004447f6(heap);
      }
      return iVar1;
    }
    iVar1 = FUN_00408387(heap, heap.u32(0x005f88a4));
  }
  return iVar1;
} finally {
    heap.freeFrame(4);
  }
}
