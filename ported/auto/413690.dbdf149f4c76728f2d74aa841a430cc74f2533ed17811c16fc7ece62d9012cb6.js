// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413690.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004136c0 } from "./4136c0.js";
import { FUN_00416790 } from "./416790.js";
export function FUN_00413690(heap, param_1) {
  (regs.eax = FUN_004136c0(heap));
  heap.setU32(0x005efebc, ((regs.eax = FUN_00416790(heap))) >>> 0);
  return __setdefaultprecision();
}
