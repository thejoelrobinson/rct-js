// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405022.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DragAcceptFiles } from "../../runtime/win32.js";
export function FUN_00405022(heap, param_1) {
  heap.setU32(0x005f1fcc, (0) >>> 0);
  DragAcceptFiles(heap, heap.u32(0x005e916c), param_1);
  return 1;
}
