// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4063fb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GdiFlush } from "../../runtime/win32.js";
export function FUN_004063fb(heap, param_1) {
  if (((heap.u32(0x005ebe44) != 0) && (heap.u32(0x005ebe48) != 0)) && (param_1 == heap.u32(0x005f12b0))) {
    (heap.u32(heap.u32(0x005ebe7c)))(param_1, heap.u32(0x005ebe48));
    heap.setU32(0x005ebe48, (0) >>> 0);
    heap.setU32(0x005f12b0, (0) >>> 0);
    heap.setU32(0x005ebe44, (0) >>> 0);
    GdiFlush(heap);
  }
  return;
}
