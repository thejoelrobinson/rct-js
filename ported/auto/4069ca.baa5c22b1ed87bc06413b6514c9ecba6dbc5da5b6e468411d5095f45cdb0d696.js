// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4069ca.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00406ce7 } from "./406ce7.js";
import { FUN_0041095e } from "./41095e.js";
import { FUN_00410bae } from "./410bae.js";
export function FUN_004069ca(heap, param_1) {
  let iVar1 = 0;
  iVar1 = (((regs.eax = FUN_0041095e(heap, heap.u32(param_1)))) >>> 0);
  if ((iVar1 != 0) && (iVar1 = (((regs.eax = FUN_00410bae(heap))) >>> 0), iVar1 != 0)) {
    return 1;
  }
  (regs.eax = FUN_00406ce7(heap));
  return 0;
}
