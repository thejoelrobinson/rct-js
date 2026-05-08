// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4083b5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CreateFileA } from "../runtime/win32.js";
export function FUN_004083b5(heap, param_1) {
  CreateFileA(heap, param_1, 0x80000000, 1, 0x0, 3, 0x10000080, 0x0);
  return;
}
