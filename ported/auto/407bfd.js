// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407bfd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00407a41 } from "./407a41.js";
import { FUN_00407b91 } from "./407b91.js";
export function FUN_00407bfd(heap, param_1) {
  let iVar1 = 0;
  if ((heap.u32(param_1) != 0) && (iVar1 = (((regs.eax = FUN_00407b91(heap, param_1))) >>> 0), iVar1 == 0)) {
    (regs.eax = FUN_00407a41(heap, param_1));
  }
  return 0;
}
