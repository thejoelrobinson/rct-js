// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f91e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00408276 } from "./408276.js";
export function FUN_0042f91e(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f88b0 = __sp + 0;
  try {
  let uVar1 = 0;
  if (heap.u32(0x005f88ac) == 0) {
    FUN_00408276(heap, heap.u32(0x005f88a4), __addr_DAT_005f88b0, 0x400);
    heap.setU32(0x005f88ac, (0x400) >>> 0);
    heap.setU32(0x005f88a8, (__addr_DAT_005f88b0) >>> 0);
  }
  uVar1 = heap.u32(heap.u32(0x005f88a8));
  heap.setU32(0x005f88ac, (heap.u32(0x005f88ac) + -1) >>> 0);
  heap.setU32(0x005f88a8, ((heap.u32(0x005f88a8) + 1)) >>> 0);
  return uVar1;
} finally {
    heap.freeFrame(4);
  }
}
