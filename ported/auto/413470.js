// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413470.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { HeapFree } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004156b0 } from "./4156b0.js";
import { FUN_00415710 } from "./415710.js";
export function FUN_00413470(heap, param_1) {
  const __sp = heap.allocFrame(8);
  const __addr_local_4 = __sp + 0;
  const __addr_param_1 = __sp + 4;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let lpMem = 0;
  let iVar1 = 0;
  lpMem = ((heap.u32(__addr_param_1)) >>> 0);
  if (heap.u32(__addr_param_1) != ((0x0) | 0)) {
    iVar1 = (((regs.eax = FUN_004156b0(heap, heap.u32(__addr_param_1), __addr_local_4, __addr_param_1))) >>> 0);
    if (iVar1 != 0) {
      return (regs.eax = FUN_00415710(heap, heap.u32(__addr_local_4), heap.u32(__addr_param_1), iVar1));
    }
    HeapFree(heap, heap.u32(0x005f3e44), 0, lpMem);
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
