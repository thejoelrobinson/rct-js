// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404be3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LoadIconA } from "../runtime/win32.js";
export function FUN_00404be3(heap, param_1) {
  LoadIconA(heap, heap.u32(0x005f1398), param_1);
  return;
}
