// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40776d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00407a7d } from "./407a7d.js";
import { FUN_004081e4 } from "./4081e4.js";
export function FUN_0040776d(heap) {
  let bVar1 = 0;
  bVar1 = heap.u32(0x005ec050) != 0;
  if (bVar1) {
    FUN_00407a7d(heap);
    FUN_004081e4(heap, heap.u32(0x005ec050));
    heap.setU32(0x005ec050, (0) >>> 0);
  }
  return bVar1;
}
