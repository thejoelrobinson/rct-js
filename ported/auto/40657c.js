// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40657c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CreateFontIndirectA } from "../../runtime/win32.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_0040657c(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(128);
  const __addr_local_40 = __sp + 0;
  try {
  _memset(__addr_local_40, 0, 0x3c);
  heap.u32(__addr_local_40) = param_2;
  heap.u32((__addr_local_40 + 16)) = param_3;
  heap.u8((__addr_local_40 + 23)) = 0x81;
  heap.u8((__addr_local_40 + 21)) = param_4;
  heap.u8((__addr_local_40 + 22)) = param_5;
  FUN_00413170(heap, heap.u8((__addr_local_40 + 28)), param_1);
  CreateFontIndirectA(heap, __addr_local_40);
  return;
} finally {
    heap.freeFrame(128);
  }
}
