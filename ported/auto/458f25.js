// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458f25.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00458c14 } from "./458c14.js";
export function FUN_00458f25(heap) {
  let in_AX = 0;
  heap.setU32(0x00642fc2, ((in_AX >>> 3) + 1) >>> 0);
  heap.setU32(0x00642fc4, (in_AX & 7) >>> 0);
  FUN_00458c14(heap);
  return;
}
