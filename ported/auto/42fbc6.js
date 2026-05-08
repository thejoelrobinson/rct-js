// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fbc6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00408387 } from "./408387.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_0042f6a8 } from "./42f6a8.js";
import { FUN_0042f6b3 } from "./42f6b3.js";
import { FUN_0042f74a } from "./42f74a.js";
import { FUN_0042fa3a } from "./42fa3a.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005e6028 } from "./5e6028.js";
export function FUN_0042fbc6(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099aa88 = __sp + 0;
  try {
  let iVar1 = 0;
  FUN_005d3b30(heap);
  heap.setU32(0x005f8d35, (1) >>> 0);
  iVar1 = FUN_004083e1(heap, __addr_DAT_0099aa88);
  if (iVar1 != -1) {
    heap.setU32(0x005f88a4, (iVar1) >>> 0);
    FUN_0042f6b3(heap);
    FUN_0042f6a8(heap);
    FUN_0042f74a(heap);
    FUN_0042fa3a(heap);
    iVar1 = FUN_00408387(heap, heap.u32(0x005f88a4));
    if ((iVar1 != 0) && (heap.u32(0x005f88af) == '\0')) {
      FUN_005e6028(heap);
      return;
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
