// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4065ea.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SelectObject } from "../../runtime/win32.js";
export function FUN_004065ea(heap, param_1) {
  let pvVar1 = 0;
  if (heap.u32(0x005ebe44) != 0) {
    if (heap.u32((heap.u32(0x005f12b0) + 0xa0)) == 0) {
      pvVar1 = SelectObject(heap, heap.u32(0x005ebe48), param_1);
      heap.u32((heap.u32(0x005f12b0) + 0xa0)) = pvVar1;
    } else {
      SelectObject(heap, heap.u32(0x005ebe48), param_1);
    }
  }
  return;
}
