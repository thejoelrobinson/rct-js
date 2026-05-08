// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fc2c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fb22 } from "./42fb22.js";
export function FUN_0042fc2c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099aa88 = __sp + 0;
  try {
  let uVar1 = 0;
  let bVar2 = 0;
  heap.setU32(0x005f8d35, (1) >>> 0);
  uVar1 = FUN_004083b5(heap, __addr_DAT_0099aa88);
  bVar2 = uVar1 != 0xffffffff;
  if (uVar1 != 0xffffffff) {
    heap.setU32(0x005f88a4, (uVar1) >>> 0);
    FUN_0042fb22(heap);
    if (bVar2) {
      uVar1 = FUN_00408387(heap, heap.u32(0x005f88a4));
    } else {
      FUN_0042f96d(heap);
      FUN_0042f98e(heap);
      FUN_00408387(heap, heap.u32(0x005f88a4));
      uVar1 = (heap.u32(0x00656b3b) >>> 2);
      if (heap.u32(0x00656b3b) >>> 2 == 0) {
        return 0;
      }
    }
  }
  return uVar1;
} finally {
    heap.freeFrame(4);
  }
}
