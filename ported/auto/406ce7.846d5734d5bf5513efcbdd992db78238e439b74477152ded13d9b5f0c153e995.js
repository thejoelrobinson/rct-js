// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406ce7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00410780 } from "./410780.js";
export function FUN_00406ce7(heap) {
  heap.setU32(0x005ebed8, (0) >>> 0);
  return (regs.eax = FUN_00410780(heap));
}
