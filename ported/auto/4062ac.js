// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4062ac.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408b7e } from "./408b7e.js";
import { FUN_0040f230 } from "./40f230.js";
export function FUN_004062ac(heap) {
  heap.setU32(0x005f1294, (0) >>> 0);
  (regs.eax = FUN_00408b7e(heap));
  return (regs.eax = FUN_0040f230(heap));
}
