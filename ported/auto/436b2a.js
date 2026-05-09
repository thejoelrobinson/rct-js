// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436b2a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00436b2a(heap) {
  return (regs.eax = callIndirect(heap, heap.u32((0x00436b40) + (heap.u8(0x00991f88)) * 4)));
}
