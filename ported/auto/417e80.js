// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417e80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00417ee0 } from "./417ee0.js";
import { FUN_00417f80 } from "./417f80.js";
export function FUN_00417e80(heap, param_1, param_2) {
  let uVar1 = 0;
  uVar1 = FUN_00417ee0(heap);
  uVar1 = param_2 & param_1 | ~param_2 & uVar1;
  FUN_00417f80(heap, uVar1);
  return uVar1;
}
