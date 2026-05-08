// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40fbdd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { AnimatePalette, GetDC, ReleaseDC, SelectPalette } from "../runtime/win32.js";
export function FUN_0040fbdd(heap, param_1, param_2, param_3) {
  let hdc = 0;
  let hPal = 0;
  let local_10 = 0;
  if ((heap.u32(0x005ec0d8) != 0x0) && (param_2 < 0x100)) {
    if (param_2 < heap.u32(0x005ec0dc)) {
      param_2 = heap.u32(0x005ec0dc);
    }
    if ((heap.u32(0x005ec0e0) + heap.u32(0x005ec0dc)) < (param_3 + param_2)) {
      param_3 = heap.u32(0x005ec0e0) - param_2;
    }
    for (local_10 = param_2; local_10 < (param_3 + param_2); local_10 = local_10 + 1) {
      heap.u32((0x005ef6aa) + (local_10 * 4) * 4) = heap.u32((param_1 + 2 + local_10 * 4));
      heap.u32((0x005efaac) + (local_10 * 4) * 4) = heap.u32((0x005ef6aa) + (local_10 * 4) * 4);
      heap.u32((0x005ef6a9) + (local_10 * 4) * 4) = heap.u32((param_1 + 1 + local_10 * 4));
      heap.u32((0x005efaad) + (local_10 * 4) * 4) = heap.u32((0x005ef6a9) + (local_10 * 4) * 4);
      heap.u32((0x005ef6a8) + (local_10 * 4) * 4) = heap.u32((param_1 + local_10 * 4));
      heap.u32((0x005efaae) + (local_10 * 4) * 4) = heap.u32((0x005ef6a8) + (local_10 * 4) * 4);
    }
    hdc = GetDC(heap, heap.u32(0x005e916c));
    hPal = SelectPalette(heap, hdc, heap.u32(0x005ec0d8), 0);
    AnimatePalette(heap, heap.u32(0x005ec0d8), param_2, param_3, (0x005efaac + param_2 * 4));
    SelectPalette(heap, hdc, hPal, 1);
    ReleaseDC(heap, heap.u32(0x005e916c), hdc);
  }
  return;
}
