// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4413c5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
export function FUN_004413c5(heap) {
  let bVar1 = 0;
  let unaff_BL = 0;
  let unaff_EDI = 0;
  heap.u32((0x0088751c) + (unaff_EDI) * 4) = heap.u32((0x0088751c) + (unaff_EDI) * 4) + unaff_BL;
  heap.u32((0x0088751b) + (unaff_EDI) * 4) = heap.u32((0x0088751b) + (unaff_EDI) * 4) + '\x01';
  if (0x13 < heap.u32((byte)(0x0088751b) + (unaff_EDI) * 4)) {
    LOCK(heap);
    bVar1 = heap.u32((0x0088751c) + (unaff_EDI) * 4);
    heap.u32((0x0088751c) + (unaff_EDI) * 4) = 0;
    UNLOCK(heap);
    heap.u32((0x0088751a) + (unaff_EDI) * 4) = bVar1 >>> 2;
    heap.u32((0x0088751b) + (unaff_EDI) * 4) = 0;
    heap.u32((0x0088751d) + (unaff_EDI) * 4) = heap.u32((0x0088751d) + (unaff_EDI) * 4) | 1;
  }
  return;
}
