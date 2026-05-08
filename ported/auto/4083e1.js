// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4083e1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CreateFileA } from "../runtime/win32.js";
export function FUN_004083e1(heap, param_1) {
  CreateFileA(heap, param_1, 0x40000000, 0, 0x0, 2, 0x80, 0x0);
  return;
}
