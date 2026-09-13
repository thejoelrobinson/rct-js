// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407e92.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00407e92(heap, param_1) {
  const __sp = heap.allocFrame(20);
  const __addr_local_18 = __sp + 0;
  const __addr_local_14 = __sp + 4;
  const __addr_local_10 = __sp + 8;
  const __addr_local_c = __sp + 12;
  const __addr_local_8 = __sp + 16;
  try {
  let iVar1 = 0;
  heap.setU32(__addr_local_14, (0) >>> 0);
  heap.setU32(__addr_local_10, (0) >>> 0);
  heap.setU32(__addr_local_c, (0) >>> 0);
  heap.setU32(__addr_local_8, (0) >>> 0);
  heap.setU32(__addr_local_18, (0x14) >>> 0);
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(param_1)) + 0xc)), heap.u32(param_1), __addr_local_18))) >>> 0);
  if (iVar1 != 0) {
    heap.setU32(__addr_local_8, (0) >>> 0);
  }
  return heap.u32(__addr_local_8);
} finally {
    heap.freeFrame(20);
  }
}
