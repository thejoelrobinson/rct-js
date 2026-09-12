// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ddca.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040db5e } from "./40db5e.js";
import { FUN_0040dba3 } from "./40dba3.js";
import { FUN_0040de9c } from "./40de9c.js";
export function FUN_0040ddca(heap, param_1) {
  const __sp = heap.allocFrame(32);
  const __addr_local_c = __sp + 24;
  const __addr_local_20 = __sp + 4;
  const __addr_local_14 = __sp + 16;
  const __addr_local_1c = __sp + 8;
  const __addr_local_18 = __sp + 12;
  const __addr_local_10 = __sp + 20;
  const __addr_local_8 = __sp + 28;
  try {
  let iVar1 = 0;
  heap.setU32(__addr_local_1c, (0) >>> 0);
  heap.setU32(__addr_local_18, (0) >>> 0);
  heap.setU32(__addr_local_14, (0) >>> 0);
  heap.setU32(__addr_local_10, (0) >>> 0);
  heap.setU32(__addr_local_c, (0) >>> 0);
  heap.setU32(__addr_local_20, (0) >>> 0);
  if (heap.i32(param_1) != 0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.i32(param_1)) + 0x50)), heap.i32(param_1)));
    heap.setU32(__addr_local_8, ((regs.eax = FUN_0040de9c(heap, heap.i32(param_1 + (1) * 4)))) >>> 0);
    if (((heap.u32(__addr_local_8) != 0) && (iVar1 = (((regs.eax = FUN_0040db5e(heap, heap.u32(__addr_local_8), __addr_local_c, __addr_local_20, __addr_local_14))) >>> 0), iVar1 != 0)) && (iVar1 = (((regs.eax = FUN_0040dba3(heap, heap.i32(param_1), heap.u32(__addr_local_20), heap.i32(param_1 + (3) * 4)))) >>> 0), iVar1 != 0)) {
      return 1;
    }
  }
  return 0;
} finally {
    heap.freeFrame(32);
  }
}
