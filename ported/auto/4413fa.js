// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4413fa.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
export function FUN_004413fa(heap) {
  let uVar1 = 0;
  let unaff_BL = 0;
  let unaff_EDI = 0;
  heap.u32((0x0088752a) + (unaff_EDI) * 4) = heap.u32((0x0088752a) + (unaff_EDI) * 4) + unaff_BL;
  heap.u32((0x00887529) + (unaff_EDI) * 4) = heap.u32((0x00887529) + (unaff_EDI) * 4) + '\x01';
  if (0x18 < heap.u32((byte)(0x00887529) + (unaff_EDI) * 4)) {
    LOCK(heap);
    uVar1 = heap.u32((0x0088752a) + (unaff_EDI) * 4);
    heap.u32((0x0088752a) + (unaff_EDI) * 4) = 0;
    UNLOCK(heap);
    heap.u32((0x00887528) + (unaff_EDI) * 4) = uVar1;
    heap.u32((0x00887529) + (unaff_EDI) * 4) = 0;
    heap.u32((0x0088751d) + (unaff_EDI) * 4) = heap.u32((0x0088751d) + (unaff_EDI) * 4) | 1;
  }
  return;
}
