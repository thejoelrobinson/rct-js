// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4185f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00418590 } from "./418590.js";
import { FUN_004190f0 } from "./4190f0.js";
export function FUN_004185f0(heap, param_1, param_2) {
  const __sp = heap.allocFrame(16);
  const __addr_param_2 = __sp + 0;
  const __addr_local_c = __sp + 4;
  heap.setU32(__addr_param_2, (param_2) >>> 0);
  try {
  FUN_004190f0(heap, __addr_local_c, __addr_param_2, heap.u32(__addr_param_2), 0, 0, 0, 0);
  FUN_00418590(heap, __addr_local_c, param_1);
  return;
} finally {
    heap.freeFrame(16);
  }
}
