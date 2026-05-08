// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40670b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DrawTextA } from "../../runtime/win32.js";
export function FUN_0040670b(heap, param_1, param_2) {
  let format = 0;
  let cchText = 0;
  if (heap.u32(0x005ebe44) != 0) {
    format = heap.u32(0x005ebe4c) | 0x810;
    cchText = _strlen(param_2);
    DrawTextA(heap, heap.u32(0x005ebe48), param_2, cchText, param_1, format);
  }
  return;
}
