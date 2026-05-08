// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40fe8d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DeleteDC, ReleaseDC, SelectObject, SelectPalette, SetBkColor, SetBkMode, SetTextColor } from "../runtime/win32.js";
export function FUN_0040fe8d(heap, param_1, param_2) {
  if (heap.u32((param_1 + 0xc)) != 0) {
    heap.u32((param_1 + 0xc)) = 0;
    SetTextColor(heap, param_2, heap.u32((param_1 + 0x98)));
    SetBkColor(heap, param_2, heap.u32((param_1 + 0x9c)));
    SetBkMode(heap, param_2, heap.u32((param_1 + 0xa4)));
    if (heap.u32((param_1 + 0x90)) == 0) {
      SelectObject(heap, param_2, heap.u32((param_1 + 0x94)));
      if (heap.u32((param_1 + 0xa0)) != 0) {
        SelectObject(heap, param_2, heap.u32((param_1 + 0xa0)));
      }
      DeleteDC(heap, param_2);
    } else {
      SelectPalette(heap, param_2, heap.u32((param_1 + 0x94)), 1);
      ReleaseDC(heap, heap.u32(0x005e916c), param_2);
    }
  }
  return;
}
