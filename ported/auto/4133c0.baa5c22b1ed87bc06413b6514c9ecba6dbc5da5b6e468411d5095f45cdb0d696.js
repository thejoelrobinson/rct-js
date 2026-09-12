// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4133c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004133e0 } from "./4133e0.js";
export function FUN_004133c0(heap, param_1) {
  return (regs.eax = FUN_004133e0(heap, param_1, heap.u32(0x005f0244)));
}
