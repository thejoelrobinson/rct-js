// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414230.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00414250 } from "./414250.js";
export function FUN_00414230(heap, _Code) {
  return (regs.eax = FUN_00414250(heap, _Code, 1, 0));
}
