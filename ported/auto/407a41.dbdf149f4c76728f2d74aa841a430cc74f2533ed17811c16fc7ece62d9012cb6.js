// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407a41.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040dd0c } from "./40dd0c.js";
export function FUN_00407a41(heap, param_1) {
  if (heap.i32(param_1) != 0) {
    (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.i32(param_1)) + 8)), heap.i32(param_1)));
    heap.setU32(param_1, (0) & 0xffffffff);
    (regs.eax = FUN_0040dd0c(heap, param_1));
  }
  return;
}
