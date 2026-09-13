// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411324.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00411324(heap, param_1, param_2, param_3) {
  let local_8 = 0;
  if (((heap.u32(0x005ec160) != 0) && (heap.u32(0x005ec15c) != 0)) && (heap.u32(0x005ec158) != 0x0)) {
    if (param_1 == 0x0) {
      local_8 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x5c)), heap.u32(0x005ec158), heap.u32(0x005ec170), 0, heap.u32(0x005ec168), param_2, param_3))) >>> 0);
    } else {
      local_8 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x5c)), heap.u32(0x005ec158), heap.u32(0x005ec170), heap.u32(param_1), heap.u32(0x005ec168), param_2, param_3))) >>> 0);
    }
    if (local_8 == 0) {
      return 1;
    }
  }
  return 0;
}
