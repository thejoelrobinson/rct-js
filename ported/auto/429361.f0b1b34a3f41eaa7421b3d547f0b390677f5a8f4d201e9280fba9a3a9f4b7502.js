// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429361.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00429361(heap) {
  if (heap.u32(0x0087d718) != -0x80000000) {
    return;
  }
  return (regs.eax = callIndirect(heap, heap.u32((0x0042937c) + (heap.u8(0x0087d0d0)) * 4)));
}
