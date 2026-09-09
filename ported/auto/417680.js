// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417680.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004176c0 } from "./4176c0.js";
export function FUN_00417680(heap, param_1, param_2, param_3) {
  if ((param_3 == 10) && (param_1 < 0)) {
    (regs.eax = FUN_004176c0(heap, param_1, param_2, 10, 1));
    return param_2;
  }
  (regs.eax = FUN_004176c0(heap, param_1, param_2, param_3, 0));
  return param_2;
}
