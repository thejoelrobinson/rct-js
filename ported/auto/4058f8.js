// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4058f8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetCursorPos } from "../runtime/win32.js";
export function FUN_004058f8(heap, param_1, param_2) {
  const __sp = heap.allocFrame(128);
  const __addr_local_10 = __sp + 0;
  try {
  let BVar1 = 0;
  BVar1 = GetCursorPos(heap, __addr_local_10);
  heap.u32(param_1) = heap.u32(__addr_local_10);
  heap.u32(param_2) = heap.u32((__addr_local_10 + 4));
  return BVar1;
} finally {
    heap.freeFrame(128);
  }
}
