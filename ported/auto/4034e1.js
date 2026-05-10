// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4034e1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetTimer } from "../../runtime/win32.js";
export function FUN_004034e1(heap) {
  if (heap.u32(0x005e91dc) == 0) {
    heap.setU32(0x005e91dc, (SetTimer(heap, heap.u32(0x005e916c), 1000, 500, ((0x0) | 0))) >>> 0);
  }
  return;
}
