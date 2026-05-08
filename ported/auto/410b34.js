// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410b34.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00413470 } from "./413470.js";
export function FUN_00410b34(heap) {
  if (heap.u32(0x005ec138) != 0) {
    while (heap.u32(0x005ec138) != 0) {
      heap.setU32(0x005ec13c, (heap.u32((heap.u32(0x005ec138) + 0x108))) >>> 0);
      FUN_00413470(heap, heap.u32(0x005ec138));
      heap.setU32(0x005ec138, (heap.u32(0x005ec13c)) >>> 0);
    }
    heap.setU32(0x005ec140, (0) >>> 0);
    heap.setU32(0x005ec13c, (0) >>> 0);
    heap.setU32(0x005ec138, (0) >>> 0);
    heap.setU32(0x005ec134, (0) >>> 0);
  }
  return;
}
