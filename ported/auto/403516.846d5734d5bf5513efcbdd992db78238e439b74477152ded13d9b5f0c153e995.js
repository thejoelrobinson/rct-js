// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403516.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FlashWindow, KillTimer } from "../../runtime/win32.js";
export function FUN_00403516(heap) {
  if (heap.u32(0x005e91dc) != 0) {
    KillTimer(heap, heap.u32(0x005e916c), 1000);
    FlashWindow(heap, heap.u32(0x005e916c), 0);
    heap.setU32(0x005e91dc, (0) >>> 0);
  }
  return;
}
