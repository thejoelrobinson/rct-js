// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f6df.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408342 } from "./408342.js";
export function FUN_0042f6df(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f88b0 = __sp + 0;
  try {
  let in_AL = 0;
  let iVar1 = 0;
  if (heap.u32(0x005f88ac) == 0x400) {
    iVar1 = FUN_00408342(heap, heap.u32(0x005f88a4), __addr_DAT_005f88b0, 0x400);
    if (iVar1 != 0x400) {
      heap.setU32(0x005f88af, (1) >>> 0);
    }
    heap.setU32(0x005f88a8, (__addr_DAT_005f88b0) >>> 0);
    heap.setU32(0x005f88ac, (0) >>> 0);
  }
  heap.u32(heap.u32(0x005f88a8)) = in_AL;
  heap.u8(0x5f8d36) = heap.u32(0x005f8d36) + in_AL;
  heap.setU32(0x005f8d36, (heap.u32(0x005f8d36) << 3 | ((((heap.u32(0x005f8d36)) >>> 8) & 0xffffffff) >>> 0x15)) >>> 0);
  heap.setU32(0x005f88a8, (heap.u32(0x005f88a8) + 1) >>> 0);
  heap.setU32(0x005f88ac, (heap.u32(0x005f88ac) + 1) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
