// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ddca.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0040db5e } from "./40db5e.js";
import { FUN_0040dba3 } from "./40dba3.js";
import { FUN_0040de9c } from "./40de9c.js";
export function FUN_0040ddca(heap, param_1) {
  const __sp = heap.allocFrame(12);
  const __addr_local_c = __sp + 0;
  const __addr_local_20 = __sp + 4;
  const __addr_local_14 = __sp + 8;
  try {
  let iVar1 = 0;
  let local_1c = 0;
  let local_18 = 0;
  let local_10 = 0;
  let local_8 = 0;
  local_1c = 0;
  local_18 = 0;
  heap.setU32(__addr_local_14, (0) >>> 0);
  local_10 = 0;
  heap.setU32(__addr_local_c, (0) >>> 0);
  heap.setU32(__addr_local_20, (0) >>> 0);
  if (heap.u32(param_1) != 0) {
    (heap.u32(heap.u32((heap.u32(heap.u32(param_1)) + 0x50))))(heap.u32(param_1));
    local_8 = FUN_0040de9c(heap, heap.u32(param_1 + (1) * 4));
    if (((local_8 != 0) && (iVar1 = FUN_0040db5e(heap, local_8, __addr_local_c, __addr_local_20, __addr_local_14), iVar1 != 0)) && (iVar1 = FUN_0040dba3(heap, heap.u32(param_1), heap.u32(__addr_local_20), heap.u32(param_1 + (3) * 4)), iVar1 != 0)) {
      return 1;
    }
  }
  return 0;
} finally {
    heap.freeFrame(12);
  }
}
