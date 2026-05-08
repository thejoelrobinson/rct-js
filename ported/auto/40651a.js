// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40651a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DrawTextA } from "../runtime/win32.js";
export function FUN_0040651a(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(128);
  const __addr_local_14 = __sp + 0;
  try {
  let format = 0;
  let cchText = 0;
  if (heap.u32(0x005ebe44) != 0) {
    heap.u32(__addr_local_14) = param_1;
    heap.u32((__addr_local_14 + 4)) = param_2;
    heap.u32((__addr_local_14 + 12)) = param_2;
    heap.u32((__addr_local_14 + 8)) = param_1 + param_4;
    format = heap.u32(0x005ebe4c) | 0x910;
    lprc = __addr_local_14;
    cchText = _strlen(param_3);
    DrawTextA(heap, heap.u32(0x005ebe48), param_3, cchText, lprc, format);
  }
  return;
} finally {
    heap.freeFrame(128);
  }
}
