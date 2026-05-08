// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ef6e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { ReleaseDC, SelectPalette } from "../runtime/win32.js";
export function FUN_0040ef6e(heap) {
  if (heap.u32(0x005ec080) != 0x0) {
    SelectPalette(heap, heap.u32(0x005ec080), heap.u32(0x005ef298), 1);
    ReleaseDC(heap, heap.u32(0x005e916c), heap.u32(0x005ec080));
    heap.setU32(0x005ec080, (0x0) >>> 0);
    heap.setU32(0x005ec084, (0) >>> 0);
    heap.setU32(0x005ec088, (0) >>> 0);
  }
  return;
}
