// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40dba3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004138d0 } from "./4138d0.js";
export function FUN_0040dba3(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(24);
  const __addr_local_10 = __sp + 12;
  const __addr_local_8 = __sp + 20;
  const __addr_local_14 = __sp + 8;
  const __addr_local_c = __sp + 16;
  try {
  let iVar1 = 0;
  if ((((param_1 != 0x0) && (param_2 != 0)) && (param_3 != 0)) && (iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(param_1) + 0x2c)), param_1, 0, param_3, __addr_local_10, __addr_local_8, __addr_local_14, __addr_local_c, 0))) >>> 0), -1 < (iVar1 | 0))) {
    _memset(heap, heap.u32(__addr_local_10), 0, heap.u32(__addr_local_8));
    (regs.eax = FUN_004138d0(heap, heap.u32(__addr_local_10), param_2, heap.u32(__addr_local_8)));
    if (heap.u32(__addr_local_c) != 0) {
      (regs.eax = FUN_004138d0(heap, heap.u32(__addr_local_14), heap.u32(__addr_local_8) + param_2, heap.u32(__addr_local_c)));
    }
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(param_1) + 0x4c)), param_1, heap.u32(__addr_local_10), heap.u32(__addr_local_8), heap.u32(__addr_local_14), heap.u32(__addr_local_c)));
    return 1;
  }
  return 0;
} finally {
    heap.freeFrame(24);
  }
}
