// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40674f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DrawTextA } from "../runtime/win32.js";
export function FUN_0040674f(heap, param_1, param_2) {
  let cchText = 0;
  let format = 0;
  if (heap.u32(0x005ebe44) != 0) {
    heap.u32(param_1) = 0;
    heap.u32((param_1 + 8)) = 0;
    heap.u32((param_1 + 4)) = 0;
    heap.u32((param_1 + 12)) = 0;
    format = 0xc20;
    cchText = _strlen(param_2);
    DrawTextA(heap, heap.u32(0x005ebe48), param_2, cchText, param_1, format);
  }
  return;
}
