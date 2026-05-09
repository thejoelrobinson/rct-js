// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4103a2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, RealizePalette, ReleaseDC, SelectPalette } from "../../runtime/win32.js";
export function FUN_004103a2(heap) {
  let hdc = 0;
  let hPal = 0;
  if ((heap.u32(0x005ec0d8) != 0x0) && (hdc = ((GetDC(heap, heap.u32(0x005e916c))) >>> 0), hdc != ((0x0) >>> 0))) {
    hPal = ((SelectPalette(heap, hdc, heap.u32(0x005ec0d8), 0)) >>> 0);
    RealizePalette(heap, hdc);
    SelectPalette(heap, hdc, hPal, 1);
    ReleaseDC(heap, heap.u32(0x005e916c), hdc);
  }
  return;
}
