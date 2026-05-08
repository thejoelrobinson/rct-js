// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4064dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { TextOutA, _strlen } from "../../runtime/win32.js";
export function FUN_004064dd(heap, param_1, param_2, param_3) {
  let c = 0;
  if (heap.u32(0x005ebe44) != 0) {
    c = _strlen(heap, param_3);
    TextOutA(heap, heap.u32(0x005ebe48), param_1, param_2, param_3, c);
  }
  return;
}
