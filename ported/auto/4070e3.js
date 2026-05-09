// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4070e3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004070f8 } from "./4070f8.js";
import { FUN_004071e2 } from "./4071e2.js";
export function FUN_004070e3(heap) {
  (regs.eax = FUN_004071e2(heap));
  return (regs.eax = FUN_004070f8(heap));
}
