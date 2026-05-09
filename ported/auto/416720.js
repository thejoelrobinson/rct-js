// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416720.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00417ec0 } from "./417ec0.js";
export function FUN_00416720(heap) {
  return (regs.eax = FUN_00417ec0(heap, 0x10000, 0x30000));
}
