// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40904c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0040904c(heap, param_1) {
  if ((heap.i16((param_1 + 3)) != 0) && (heap.u32(param_1 + (0x20) * 4) != 0)) {
    (regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(param_1 + (0x20) * 4)) + 0x80)), heap.u32(param_1 + (0x20) * 4), 0));
    heap.setU16((param_1 + 3), (0) & 0xffff);
    heap.setU32(param_1, (0) & 0xffffffff);
    heap.setU16((param_1 + 2), (0) & 0xffff);
    heap.setU16((((param_1) >>> 0) + 6), (heap.u16((param_1 + 2))) & 0xffff);
    heap.setU16((param_1 + 1), (0) & 0xffff);
    heap.setU32((param_1 + (4) * 4), (0) & 0xffffffff);
    heap.setU16((((param_1) >>> 0) + 10), (0) & 0xffff);
  }
  return;
}
