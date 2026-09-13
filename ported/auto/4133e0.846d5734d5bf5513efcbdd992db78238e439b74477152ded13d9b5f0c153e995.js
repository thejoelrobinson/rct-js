// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4133e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00413430 } from "./413430.js";
import { FUN_004153f0 } from "./4153f0.js";
export function FUN_004133e0(heap, param_1, param_2) {
  let iVar1 = 0;
  if (param_1 < 0xffffffe1) {
    if (param_1 == 0) {
      param_1 = ((1) >>> 0);
    }
    do {
      if (param_1 < 0xffffffe1) {
        iVar1 = (((regs.eax = FUN_00413430(heap, param_1))) >>> 0);
      } else {
        iVar1 = ((0) >>> 0);
      }
      if (iVar1 != 0) {
        return iVar1;
      }
      if (param_2 == 0) {
        return 0;
      }
      iVar1 = (((regs.eax = FUN_004153f0(heap, param_1))) >>> 0);
    } while (iVar1 != 0);
  }
  return 0;
}
