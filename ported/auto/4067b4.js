// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4067b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DrawTextA } from "../runtime/win32.js";
export function FUN_004067b4(heap, param_1, param_2, param_3) {
  let format = 0;
  let cchText = 0;
  if (heap.u32(0x005ebe44) != 0) {
    heap.u32(param_1) = 0;
    heap.u32((param_1 + 8)) = param_3;
    heap.u32((param_1 + 4)) = 0;
    heap.u32((param_1 + 12)) = 0;
    format = heap.u32(0x005ebe4c) | 0xc10;
    cchText = _strlen(param_2);
    DrawTextA(heap, heap.u32(0x005ebe48), param_2, cchText, param_1, format);
  }
  return;
}
