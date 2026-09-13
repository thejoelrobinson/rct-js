// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409736.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00409736(heap, param_1, param_2) {
  if ((heap.i16((param_1 + 0xc)) != 0) && (heap.i32((param_1 + 0x80)) != 0)) {
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((param_1 + 0x80))) + 0x68)), heap.u32((param_1 + 0x80)), param_2));
    heap.setU16((param_1 + 0xc), (0) & 0xffff);
  }
  return;
}
