// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4046fc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetSystemTime } from "../runtime/win32.js";
export function FUN_004046fc(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_14 = __sp + 0;
  try {
  GetSystemTime(heap, __addr_local_14);
  heap.setU32(0x005f1ca4, (heap.u16((__addr_local_14 + 6))) >>> 0);
  heap.setU32(0x005f1394, (heap.u16((__addr_local_14 + 2))) >>> 0);
  heap.setU32(0x005f1cbc, (heap.u16(__addr_local_14)) >>> 0);
  heap.setU32(0x005f14c0, (heap.u16((__addr_local_14 + 4))) >>> 0);
  return;
} finally {
    heap.freeFrame(128);
  }
}
