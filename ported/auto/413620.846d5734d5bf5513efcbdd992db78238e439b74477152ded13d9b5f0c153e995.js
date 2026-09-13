// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413620.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00415b30 } from "./415b30.js";
import { FUN_00415c60 } from "./415c60.js";
export function FUN_00413620(heap, param_1, param_2) {
  const __sp = heap.allocFrame(16);
  const __addr_local_20 = __sp + 0;
  const __addr_stack0x0000000c = __sp + 4;
  const __addr_local_1c = __sp + 4;
  const __addr_local_18 = __sp + 8;
  const __addr_local_14 = __sp + 12;
  try {
  let uVar1 = 0;
  heap.setU32(__addr_local_18, (param_1) >>> 0);
  heap.setU32(__addr_local_20, (param_1) >>> 0);
  heap.setU32(__addr_local_14, (0x42) >>> 0);
  heap.setU32(__addr_local_1c, (0x7fffffff) >>> 0);
  uVar1 = (((regs.eax = FUN_00415c60(heap, __addr_local_20, param_2, __addr_stack0x0000000c))) >>> 0);
  heap.setU32(__addr_local_1c, (heap.u32(__addr_local_1c) + -1) >>> 0);
  if (-1 < (heap.u32(__addr_local_1c) | 0)) {
    heap.setU32(heap.u32(__addr_local_20), (0) & 0xffffffff);
    return uVar1;
  }
  (regs.eax = FUN_00415b30(heap, 0, __addr_local_20));
  return uVar1;
} finally {
    heap.freeFrame(16);
  }
}
