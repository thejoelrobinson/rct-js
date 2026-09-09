// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4061b9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004061b9(heap) {
  if (heap.u32(0x005ebe50) != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32(0x005ebe50)));
    heap.setU32(0x005ebe50, (0x0) >>> 0);
  }
  heap.setU32(0x005e916c, (0) >>> 0);
  heap.setU32(0x005ebe3c, (0) >>> 0);
  return;
}
