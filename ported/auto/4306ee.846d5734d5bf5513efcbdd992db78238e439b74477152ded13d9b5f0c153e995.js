// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4306ee.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004306ee(heap) {
  if ((heap.u32(0x0099a500) & 1) != 0) {
    if (heap.u32(0x005f9430) == 0) {
      return (regs.eax = callIndirect(heap, heap.u32((0x0043071c) + (heap.u32(heap.u32(0x005f942c))) * 4)));
    }
    heap.setU32(0x005f9430, (heap.u32(0x005f9430) + -1) >>> 0);
  }
  return;
}
