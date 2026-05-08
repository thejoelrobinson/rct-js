// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40648d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SetBkColor } from "../../runtime/win32.js";
export function FUN_0040648d(heap, param_1) {
  if (heap.u32(0x005ebe44) != 0) {
    SetBkColor(heap, heap.u32(0x005ebe48), param_1);
  }
  return;
}
