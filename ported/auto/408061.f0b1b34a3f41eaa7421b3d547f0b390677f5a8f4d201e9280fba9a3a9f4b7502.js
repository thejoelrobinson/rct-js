// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408061.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004116dc } from "./4116dc.js";
export function FUN_00408061(heap) {
  return (regs.eax = FUN_004116dc(heap));
}
