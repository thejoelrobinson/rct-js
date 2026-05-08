// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d4b8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040d69b } from "./40d69b.js";
import { FUN_0040d709 } from "./40d709.js";
import { FUN_0040d777 } from "./40d777.js";
export function FUN_0040d4b8(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005f0504 = __sp + 0;
  const __addr_DAT_005ebfe8 = __sp + 4;
  const __addr_DAT_005f03a0 = __sp + 8;
  try {
  heap.setU32((__addr_DAT_005f0504 + param_1 * 0x16c), (param_2) >>> 0);
  FUN_0040d709(heap, param_1, param_4);
  FUN_0040d777(heap, param_1, param_3);
  FUN_0040d69b(heap, param_1, param_5);
  (heap.u32(heap.u32((heap.u32(heap.u32((__addr_DAT_005ebfe8 + param_1 * 4))) + 0x34))))(heap.u32((__addr_DAT_005ebfe8 + param_1 * 4)), 0);
  (heap.u32(heap.u32((heap.u32(heap.u32((__addr_DAT_005ebfe8 + param_1 * 4))) + 0x30))))(heap.u32((__addr_DAT_005ebfe8 + param_1 * 4)), 0, 0, 1);
  heap.setU32((__addr_DAT_005f03a0 + param_1 * 0x16c), (1) >>> 0);
  return 1;
} finally {
    heap.freeFrame(12);
  }
}
