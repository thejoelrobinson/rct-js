// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42db0f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0042db0f(heap) {
  let unaff_ESI = regs.esi >>> 0;
  return (regs.eax = callIndirect(heap, heap.u32((0x0042db1c) + (heap.u8((unaff_ESI + 1))) * 4)));
}
