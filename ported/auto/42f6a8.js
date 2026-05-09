// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f6a8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042f77c } from "./42f77c.js";
export function FUN_0042f6a8(heap) {
  let extraout_ECX = 0;
  do {
    (regs.eax = FUN_0042f77c(heap));
  } while (extraout_ECX != 1);
  return;
}
