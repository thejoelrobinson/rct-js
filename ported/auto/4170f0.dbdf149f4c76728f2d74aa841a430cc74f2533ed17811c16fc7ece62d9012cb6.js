// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4170f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00417140 } from "./417140.js";
import { FUN_004171c0 } from "./4171c0.js";
import { FUN_00418b60 } from "./418b60.js";
export function FUN_004170f0(heap, param_1) {
  let iVar1 = 0;
  if (param_1 == 0) {
    iVar1 = (((regs.eax = FUN_004171c0(heap, 0))) >>> 0);
    return iVar1;
  }
  iVar1 = (((regs.eax = FUN_00417140(heap, param_1))) >>> 0);
  if (iVar1 != 0) {
    return -1;
  }
  if ((heap.u32((param_1 + 0xc)) & 0x4000) != 0) {
    iVar1 = (((regs.eax = FUN_00418b60(heap, heap.u32((param_1 + 0x10))))) >>> 0);
    return -((iVar1 != 0) >>> 0);
  }
  return 0;
}
