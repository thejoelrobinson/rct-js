// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416c30.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00416a50 } from "./416a50.js";
export function FUN_00416c30(heap, param_1, param_2, param_3) {
  heap.setU8(0x005f0254, (1) & 0xff);
  (regs.eax = FUN_00416a50(heap, param_1, param_2, param_3));
  heap.setU8(0x005f0254, (0) & 0xff);
  return;
}
