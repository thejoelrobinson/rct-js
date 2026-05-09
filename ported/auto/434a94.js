// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/434a94.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00434a94(heap) {
  let in_EDX = regs.edx >>> 0;
  return (regs.eax = callIndirect(heap, heap.u32((0x00434a9c) + (in_EDX) * 4)));
}
