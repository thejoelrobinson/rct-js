// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4033af.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040330f } from "./40330f.js";
export function FUN_004033af(heap, param_1) {
  const __sp = heap.allocFrame(8);
  const __addr_local_c = __sp + 0;
  const __addr_local_8 = __sp + 4;
  try {
  (regs.eax = FUN_0040330f(heap, param_1, __addr_local_c, __addr_local_8));
  return (heap.u32(__addr_local_8 + (0) * 4) & heap.u32((0x005f1b60) + (heap.u32(__addr_local_c)) * 4)) != 0;
} finally {
    heap.freeFrame(8);
  }
}
