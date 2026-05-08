// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4046bc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetSystemTime } from "../runtime/win32.js";
export function FUN_004046bc(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_14 = __sp + 0;
  try {
  GetSystemTime(heap, __addr_local_14);
  heap.setU32(0x005f1fd0, (heap.u16((__addr_local_14 + 8))) >>> 0);
  heap.setU32(0x005f1b2c, (heap.u16((__addr_local_14 + 10))) >>> 0);
  heap.setU32(0x005f1fd8, (heap.u16((__addr_local_14 + 12))) >>> 0);
  heap.setU32(0x005f1b84, (heap.u16((__addr_local_14 + 14))) >>> 0);
  return;
} finally {
    heap.freeFrame(128);
  }
}
