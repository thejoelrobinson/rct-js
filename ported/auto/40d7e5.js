// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d7e5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004138d0 } from "./4138d0.js";
export function FUN_0040d7e5(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_005f03a4 = __sp + 0;
  const __addr_DAT_005f04ac = __sp + 4;
  const __addr_DAT_005f04b0 = __sp + 8;
  const __addr_DAT_005f04b4 = __sp + 12;
  const __addr_DAT_005f0504 = __sp + 16;
  try {
  heap.u32((__addr_DAT_005f03a4 + param_1 * 0x16c)) = 1;
  FUN_004138d0(heap, param_1 * 0x16c + 0x5f03a8, param_2, 0x104);
  heap.u32((__addr_DAT_005f04ac + param_1 * 0x16c)) = 0;
  heap.u32((__addr_DAT_005f04b0 + param_1 * 0x16c)) = param_4;
  heap.u32((__addr_DAT_005f04b4 + param_1 * 0x16c)) = param_3;
  heap.u32((__addr_DAT_005f0504 + param_1 * 0x16c)) = 1;
  return 1;
} finally {
    heap.freeFrame(20);
  }
}
