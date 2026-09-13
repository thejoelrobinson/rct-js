// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4070be.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004070be(heap) {
  (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebefc)) + 0x20)), heap.u32(0x005ebefc)));
  heap.setU32(0x005ebf04, (0) >>> 0);
  return;
}
