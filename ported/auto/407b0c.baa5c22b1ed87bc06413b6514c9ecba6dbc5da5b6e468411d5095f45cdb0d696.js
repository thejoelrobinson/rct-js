// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407b0c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040ddca } from "./40ddca.js";
export function FUN_00407b0c(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_local_c = __sp + 0;
  const __addr_local_8 = __sp + 4;
  try {
  let iVar1 = 0;
  let local_10 = 0;
  local_10 = ((heap.u32(0x005ec054)) >>> 0);
  while (local_10 != 0x0) {
    if (local_10 == heap.u32(0x005ec058)) {
      heap.setU32(__addr_local_8, (0x0) >>> 0);
    } else {
      heap.setU32(__addr_local_8, (heap.u32(local_10 + (4) * 4)) >>> 0);
    }
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(local_10)) + 0x24)), heap.u32(local_10), __addr_local_c))) >>> 0);
    if ((iVar1 == 0) && ((heap.u32(__addr_local_c + (0) * 4) & 2) != 0)) {
      (regs.eax = FUN_0040ddca(heap, local_10));
    }
    local_10 = ((heap.u32(__addr_local_8)) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
