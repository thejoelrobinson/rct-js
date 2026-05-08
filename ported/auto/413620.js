// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413620.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00415b30 } from "./415b30.js";
import { FUN_00415c60 } from "./415c60.js";
export function FUN_00413620(heap, param_1, param_2) {
  const __sp = heap.allocFrame(8);
  const __addr_local_20 = __sp + 0;
  const __addr_stack0x0000000c = __sp + 4;
  try {
  let uVar1 = 0;
  let local_1c = 0;
  let local_18 = 0;
  let local_14 = 0;
  local_18 = param_1;
  heap.setU32(__addr_local_20, (param_1) >>> 0);
  local_14 = 0x42;
  local_1c = 0x7fffffff;
  uVar1 = FUN_00415c60(heap, __addr_local_20, param_2, __addr_stack0x0000000c);
  local_1c = local_1c + -1;
  if (-1 < local_1c) {
    heap.setU32(heap.u32(__addr_local_20), (0) >>> 0);
    return uVar1;
  }
  FUN_00415b30(heap, 0, __addr_local_20);
  return uVar1;
} finally {
    heap.freeFrame(8);
  }
}
