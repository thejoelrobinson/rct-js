// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411f8d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00411e74 } from "./411e74.js";
export function FUN_00411f8d(heap, param_1, param_2) {
  const __sp = heap.allocFrame(8);
  const __addr_local_c = __sp + 0;
  const __addr_local_8 = __sp + 4;
  try {
  heap.setU32(__addr_local_c, ((regs.eax = FUN_00411e74(heap, param_1, param_2))) >>> 0);
  heap.setU32(__addr_local_8, (heap.u32(__addr_local_c)) >>> 0);
  return (regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x74)), param_1, 8, __addr_local_c));
} finally {
    heap.freeFrame(8);
  }
}
