// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42c4d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00403b39 } from "./403b39.js";
import { FUN_00438a1f } from "./438a1f.js";
export function FUN_0042c4d3(heap) {
  if ((heap.u32(0x00991f30) >>> 5 & 1) != 0) {
    FUN_00403b39(heap);
    heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffffdf) >>> 0);
  }
  FUN_00438a1f(heap);
  return;
}
