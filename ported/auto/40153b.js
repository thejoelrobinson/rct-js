// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40153b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00401220 } from "./401220.js";
export function FUN_0040153b(heap, param_1) {
  let iVar1 = 0;
  let local_c = 0;
  let local_8 = 0;
  iVar1 = (((regs.eax = FUN_00401220(heap, param_1))) >>> 0);
  local_8 = ((param_1) >>> 0);
  if (iVar1 == 0) {
    do {
      local_8 = ((local_8 + -1) >>> 0);
      local_c = ((param_1 + 1) >>> 0);
      if ((0 < local_8) && (iVar1 = (((regs.eax = FUN_00401220(heap, local_8))) >>> 0), iVar1 != 0)) {
        return local_8;
      }
      if ((local_c < 8) && (iVar1 = (((regs.eax = FUN_00401220(heap, local_c))) >>> 0), iVar1 != 0)) {
        return local_c;
      }
      param_1 = ((local_c) >>> 0);
    } while (local_c < 8 || 0 < local_8);
    param_1 = ((0) >>> 0);
  }
  return param_1;
}
