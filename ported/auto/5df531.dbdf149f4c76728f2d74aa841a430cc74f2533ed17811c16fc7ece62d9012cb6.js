// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df531.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004046a9 } from "./4046a9.js";
import { FUN_00452835 } from "./452835.js";
export function FUN_005df531(heap) {
  (regs.eax = FUN_00452835(heap));
  return (regs.eax = FUN_004046a9(heap));
}
