// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418590.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004183a0 } from "./4183a0.js";
export function FUN_00418590(heap, param_1, param_2) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005ee9f8 = __sp + 0;
  try {
  FUN_004183a0(heap, param_1, param_2, __addr_DAT_005ee9f8);
  return;
} finally {
    heap.freeFrame(4);
  }
}
