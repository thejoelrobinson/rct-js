// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f339.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408276 } from "./408276.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f239 } from "./42f239.js";
export function FUN_0042f339(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_008dc08c = __sp + 0;
  const __addr_DAT_005f8d48 = __sp + 4;
  try {
  let iVar1 = 0;
  FUN_0042f239(heap);
  iVar1 = FUN_004083b5(heap, 0x12);
  if (iVar1 != -1) {
    heap.setU32(0x005f88a4, (iVar1) >>> 0);
    FUN_00408276(heap, iVar1, __addr_DAT_008dc08c, 4);
    if (heap.u32(0x008dc08c) == 0x1a668) {
      FUN_00408276(heap, heap.u32(0x005f88a4), __addr_DAT_005f8d48, 0x5b);
      heap.setU32(0x005f8da1, (heap.u32(0x005f8da1) | 0x80) >>> 0);
    }
    FUN_00408387(heap, heap.u32(0x005f88a4));
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
