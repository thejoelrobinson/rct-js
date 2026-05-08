// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405f2c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetStockObject, LoadCursorA, LoadIconA, RegisterClassA } from "../../runtime/win32.js";
import { FUN_00403d79 } from "./403d79.js";
export function FUN_00405f2c(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_30 = __sp + 0;
  try {
  let AVar1 = 0;
  let local_8 = 0;
  local_8 = LoadIconA(heap, heap.u32(0x005f1398), 0x005ebebc);
  if (local_8 == 0x0) {
    local_8 = LoadIconA(heap, 0x0, 0x7f00);
  }
  heap.u32((__addr_local_30 + 4)) = 0;
  heap.u32((__addr_local_30 + 8)) = FUN_00403d79;
  heap.u32((__addr_local_30 + 16)) = 0;
  heap.u32((__addr_local_30 + 12)) = 0;
  heap.u32((__addr_local_30 + 20)) = heap.u32(0x005f1398);
  heap.u32((__addr_local_30 + 32)) = LoadCursorA(heap, 0x0, 0x7f00);
  heap.u32((__addr_local_30 + 16)) = local_8;
  heap.u32((__addr_local_30 + 36)) = 0x005e9030;
  heap.u32((__addr_local_30 + 36)) = GetStockObject(heap, 4);
  heap.u32((__addr_local_30 + 40)) = 0x005e9030;
  AVar1 = RegisterClassA(heap, __addr_local_30);
  return AVar1 != 0;
} finally {
    heap.freeFrame(128);
  }
}
