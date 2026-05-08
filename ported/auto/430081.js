// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/430081.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
import { FUN_0042f239 } from "./42f239.js";
export function FUN_00430081(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f92e7 = __sp + 0;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  FUN_0042f239(heap);
  iVar1 = FUN_0040844b(heap, 2, __addr_DAT_005f92e7);
  if (iVar1 != -1) {
    uVar2 = heap.u32(0x005f92eb) >>> 0x10;
    FUN_00408490(heap, iVar1);
    return uVar2;
  }
  return 0xffff0000;
} finally {
    heap.freeFrame(4);
  }
}
