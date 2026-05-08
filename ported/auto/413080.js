// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { RtlUnwind } from "../runtime/win32.js";
export function __global_unwind2(heap, param_1) {
  RtlUnwind(heap, param_1, 0x413098, 0x0, 0x0);
  return;
}
