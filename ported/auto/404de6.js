// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404de6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { Shell_NotifyIconA } from "../runtime/win32.js";
export function FUN_00404de6(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_5c = __sp + 0;
  try {
  if (heap.u32(0x005e93fc) != 0) {
    heap.u32(__addr_local_5c) = 0x58;
    heap.u32((__addr_local_5c + 4)) = heap.u32(0x005e916c);
    heap.u32((__addr_local_5c + 8)) = 1;
    heap.u32((__addr_local_5c + 12)) = 0;
    Shell_NotifyIconA(heap, 2, __addr_local_5c);
    heap.setU32(0x005e93fc, (0) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(128);
  }
}
