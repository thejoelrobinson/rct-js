// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4066a9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DrawTextA, _strlen } from "../../runtime/win32.js";
export function FUN_004066a9(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(128);
  const __addr_local_14 = __sp + 0;
  try {
  let format = 0;
  let cchText = 0;
  let lprc = 0;
  if (heap.u32(0x005ebe44) != 0) {
    heap.setU32(__addr_local_14, (param_1) >>> 0);
    heap.setU32((__addr_local_14 + 4), (param_2) >>> 0);
    heap.setU32((__addr_local_14 + 12), (param_2) >>> 0);
    heap.setU32((__addr_local_14 + 8), (param_4 + param_1) >>> 0);
    format = heap.u32(0x005ebe4c) | 0x920;
    lprc = __addr_local_14;
    cchText = _strlen(heap, param_3);
    DrawTextA(heap, heap.u32(0x005ebe48), param_3, cchText, lprc, format);
  }
  return;
} finally {
    heap.freeFrame(128);
  }
}
