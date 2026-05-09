// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41051e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DeleteDC, ReleaseDC, SelectObject, SelectPalette } from "../../runtime/win32.js";
export function FUN_0041051e(heap) {
  if (heap.u32(0x005ec0e4) != ((0x0) >>> 0)) {
    SelectObject(heap, heap.u32(0x005ec0e8), heap.u32(0x005f0324));
    SelectPalette(heap, heap.u32(0x005ec0e4), heap.u32(0x005f0328), 1);
    DeleteDC(heap, heap.u32(0x005ec0e8));
    ReleaseDC(heap, heap.u32(0x005e916c), heap.u32(0x005ec0e4));
    heap.setU32(0x005ec0e8, (((0x0) >>> 0)) >>> 0);
    heap.setU32(0x005ec0e4, (((0x0) >>> 0)) >>> 0);
  }
  return;
}
