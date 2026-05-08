// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41107f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00413470 } from "./413470.js";
export function FUN_0041107f(heap) {
  if (heap.u32(0x005ec14c) != 0) {
    while (heap.u32(0x005ec14c) != 0) {
      heap.setU32(0x005ec150, (heap.u32((heap.u32(0x005ec14c) + 0x4c))) >>> 0);
      FUN_00413470(heap, heap.u32(0x005ec14c));
      heap.setU32(0x005ec14c, (heap.u32(0x005ec150)) >>> 0);
    }
    heap.setU32(0x005ec154, (0) >>> 0);
    heap.setU32(0x005ec150, (0) >>> 0);
    heap.setU32(0x005ec14c, (0) >>> 0);
    heap.setU32(0x005ec148, (0) >>> 0);
  }
  return;
}
