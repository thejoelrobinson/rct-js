// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414300.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00414300(heap, param_1, param_2) {
  for (; param_1 < param_2; param_1 = (((param_1 + ((1) * 4)) >>> 0)) >>> 0) {
    if (heap.u32(param_1) != 0x0) {
      (regs.eax = callIndirect(heap, heap.u32(param_1)));
    }
  }
  return;
}
