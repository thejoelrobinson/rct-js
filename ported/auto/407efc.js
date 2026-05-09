// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407efc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00407efc(heap, param_1, param_2) {
  let iVar1 = 0;
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(param_1) + 0xc)), param_1, param_2))) >>> 0);
  return iVar1 == 0;
}
