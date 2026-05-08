// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404bc3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LoadCursorA } from "../runtime/win32.js";
export function FUN_00404bc3(heap, param_1) {
  LoadCursorA(heap, heap.u32(0x005f1398), param_1);
  return;
}
