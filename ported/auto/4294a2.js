// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4294a2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042c711 } from "./42c711.js";
export function FUN_004294a2(heap) {
  if (((heap.u32(0x0087c3bc) & 1) != 0) && (heap.u32(0x0087c3c0) != 0)) {
    if (heap.u32(0x0087c3c0) < heap.u32(0x0087d0c6) >>> 1) {
      FUN_0042c711(heap);
      return;
    }
    if ((ushort)((heap.u32(0x0087d0c6) >>> 1) + heap.u32(0x0087d0c6)) < heap.u32(0x0087c3c0)) {
      FUN_0042c711(heap);
      return;
    }
  }
  return;
}
