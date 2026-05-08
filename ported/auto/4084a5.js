// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4084a5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCurrentDirectoryA } from "../../runtime/win32.js";
export function FUN_004084a5(heap, param_1) {
  GetCurrentDirectoryA(heap, 0x80, param_1);
  return;
}
