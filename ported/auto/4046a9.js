// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4046a9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { PostQuitMessage } from "../../runtime/win32.js";
export function FUN_004046a9(heap) {
  PostQuitMessage(heap, 0);
  return;
}
