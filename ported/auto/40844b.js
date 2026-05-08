// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40844b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FindFirstFileA } from "../runtime/win32.js";
export function FUN_0040844b(heap, param_1, param_2) {
  let pvVar1 = 0;
  pvVar1 = FindFirstFileA(heap, param_1, param_2);
  return pvVar1;
}
