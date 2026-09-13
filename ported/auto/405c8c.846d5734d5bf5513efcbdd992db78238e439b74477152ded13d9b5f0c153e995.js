// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405c8c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00405c8c(heap, param_1) {
  return (regs.eax = callIndirect(heap, heap.u32(0x005ebe64), param_1));
}
