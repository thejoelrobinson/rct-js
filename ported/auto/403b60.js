// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403b60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetWindowRect, SetCursorPos } from "../runtime/win32.js";
export function FUN_00403b60(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_18 = __sp + 0;
  try {
  let local_8 = 0;
  if ((heap.u32(0x005e91c0) != 0) && (heap.u32(0x005f1140) == 0)) {
    GetWindowRect(heap, heap.u32(0x005e916c), __addr_local_18);
    local_8 = (heap.u32((__addr_local_18 + 12)) - heap.u32((__addr_local_18 + 4)) >>> 1) + heap.u32((__addr_local_18 + 4));
    heap.setU32(0x005f14c4, (0) >>> 0);
    heap.setU32(0x005f1b20, (0) >>> 0);
    SetCursorPos(heap, (heap.u32((__addr_local_18 + 8)) - heap.u32(__addr_local_18) >>> 1) + heap.u32(__addr_local_18), local_8);
  }
  return;
} finally {
    heap.freeFrame(128);
  }
}
