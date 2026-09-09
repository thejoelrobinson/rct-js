// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405eb9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00405eb9(heap, param_1, param_2, param_3) {
  let pcVar1 = 0;
  pcVar1 = (((regs.eax = callIndirect(heap, heap.u32(0x005ebeb0), param_1, param_2, param_3))) >>> 0);
  return pcVar1;
}
