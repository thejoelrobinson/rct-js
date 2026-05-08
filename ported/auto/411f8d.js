// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411f8d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00411e74 } from "./411e74.js";
export function FUN_00411f8d(heap, param_1, param_2) {
  const __sp = heap.allocFrame(4);
  const __addr_local_c = __sp + 0;
  try {
  let local_8 = 0;
  heap.setU32(__addr_local_c, (FUN_00411e74(heap, param_1, param_2)) >>> 0);
  local_8 = heap.u32(__addr_local_c);
  (heap.u32(heap.u32((heap.u32(param_1) + 0x74))))(param_1, 8, __addr_local_c);
  return;
} finally {
    heap.freeFrame(4);
  }
}
