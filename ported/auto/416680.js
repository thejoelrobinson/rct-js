// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416680.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004165f0 } from "./4165f0.js";
export function FUN_00416680(heap, param_1, param_2, param_3, param_4) {
  let cVar1 = 0;
  do {
    if (param_2 < 1) {
      return;
    }
    param_2 = ((param_2 + -1) >>> 0);
    cVar1 = ((heap.i8(param_1)) & 0xff);
    param_1 = ((param_1 + 1) >>> 0);
    (regs.eax = FUN_004165f0(heap, ((cVar1) >>> 0), param_3, param_4));
  } while ((heap.i32(param_4) | 0) != -1);
  return;
}
