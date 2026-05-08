// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416c00.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00416910 } from "./416910.js";
export function FUN_00416c00(heap, param_1, param_2, param_3, param_4) {
  heap.setU32(0x005f0254, (1) >>> 0);
  FUN_00416910(heap, param_1, param_2, param_3, param_4);
  heap.setU32(0x005f0254, (0) >>> 0);
  return;
}
