// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00415210 } from "./415210.js";
import { FUN_00417420 } from "./417420.js";
export function _abort(heap) {
  FUN_00415210(heap, 10);
  FUN_00417420(heap, 0x16);
  __exit(3);
}
