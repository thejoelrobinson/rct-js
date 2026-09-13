// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417ec0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00417e80 } from "./417e80.js";
export function FUN_00417ec0(heap, param_1, param_2) {
  return (regs.eax = FUN_00417e80(heap, param_1, param_2 & 0xfff7ffff));
}
