// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405f2c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetStockObject, LoadCursorA, LoadIconA, RegisterClassA } from "../../runtime/win32.js";
export function FUN_00405f2c(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_30 = __sp + 0;
  const __addr_local_8 = __sp + 40;
  try {
  let AVar1 = 0;
  heap.setU32(__addr_local_8, (LoadIconA(heap, heap.u32(0x005f1398), 0x005ebebc)) >>> 0);
  if (heap.u32(__addr_local_8) == ((0x0) >>> 0)) {
    heap.setU32(__addr_local_8, (LoadIconA(heap, ((0x0) >>> 0), ((0x7f00) >>> 0))) >>> 0);
  }
  heap.setU32(__addr_local_30, (0) >>> 0);
  heap.setU32((__addr_local_30 + 4), (0x00403d79) >>> 0);
  heap.setU32((__addr_local_30 + 12), (0) >>> 0);
  heap.setU32((__addr_local_30 + 8), (0) >>> 0);
  heap.setU32((__addr_local_30 + 16), (heap.u32(0x005f1398)) >>> 0);
  heap.setU32((__addr_local_30 + 24), (LoadCursorA(heap, ((0x0) >>> 0), ((0x7f00) >>> 0))) >>> 0);
  heap.setU32((__addr_local_30 + 16), (heap.u32(__addr_local_8)) >>> 0);
  heap.setU32((__addr_local_30 + 32), (0x005e9030) >>> 0);
  heap.setU32((__addr_local_30 + 28), (GetStockObject(heap, 4)) >>> 0);
  heap.setU32((__addr_local_30 + 36), (0x005e9030) >>> 0);
  AVar1 = ((RegisterClassA(heap, __addr_local_30)) >>> 0);
  return AVar1 != 0;
} finally {
    heap.freeFrame(128);
  }
}
