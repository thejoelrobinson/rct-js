// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405e66.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00405e66(heap, param_1, param_2) {
  return (regs.eax = callIndirect(heap, heap.u32(0x005ebea4), param_1, param_2));
}
