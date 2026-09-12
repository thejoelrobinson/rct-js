// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414f80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00414aa0 } from "./414aa0.js";
export function FUN_00414f80(heap) {
  return (regs.eax = FUN_00414aa0(heap, 0xfffffffd));
}
