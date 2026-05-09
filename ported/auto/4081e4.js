// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4081e4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { UnmapViewOfFile } from "../../runtime/win32.js";
export function FUN_004081e4(heap, param_1) {
  if (param_1 != ((0x0) >>> 0)) {
    UnmapViewOfFile(heap, param_1);
  }
  return;
}
