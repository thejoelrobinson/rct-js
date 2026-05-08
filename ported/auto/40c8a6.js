// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40c8a6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { InterlockedExchange } from "../../runtime/win32.js";
import { FUN_0040bc20 } from "./40bc20.js";
export function FUN_0040c8a6(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005ebfe4 = __sp + 0;
  const __addr_DAT_005f03a0 = __sp + 4;
  try {
  let LVar1 = 0;
  let local_8 = 0;
  LVar1 = InterlockedExchange(heap, __addr_DAT_005ebfe4, 1);
  if (LVar1 == 0) {
    for (local_8 = 0; local_8 < 4; local_8 = local_8 + 1) {
      if (heap.u32((__addr_DAT_005f03a0 + local_8 * 0x16c)) != 0) {
        FUN_0040bc20(heap, param_1, param_2, param_3, param_4, param_5, local_8);
      }
    }
    InterlockedExchange(heap, __addr_DAT_005ebfe4, 0);
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
