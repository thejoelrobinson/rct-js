// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004136c0 } from "./4136c0.js";
import { FUN_00416790 } from "./416790.js";
export function __fpmath(heap, param_1) {
  FUN_004136c0(heap);
  heap.setU32(0x005efebc, (FUN_00416790(heap)) >>> 0);
  __setdefaultprecision();
  return;
}
