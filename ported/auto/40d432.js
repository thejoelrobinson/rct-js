// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d432.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040cd89 } from "./40cd89.js";
import { FUN_0040d575 } from "./40d575.js";
import { FUN_0040d8ee } from "./40d8ee.js";
export function FUN_0040d432(heap, param_1, param_2, param_3) {
  let uVar1 = 0;
  let iVar2 = 0;
  if (heap.u32(0x005ebfdc) == 0) {
    uVar1 = ((0) >>> 0);
  } else {
    iVar2 = (((regs.eax = FUN_0040d8ee(heap, param_1))) >>> 0);
    if (iVar2 != 0) {
      (regs.eax = FUN_0040d575(heap, param_1));
    }
    iVar2 = (((regs.eax = FUN_0040cd89(heap, param_1, param_2, param_3))) >>> 0);
    if (iVar2 == 0) {
      heap.setU32((0x005f03a4 + param_1 * 0x16c), (0) & 0xffffffff);
      uVar1 = ((1) >>> 0);
    } else {
      uVar1 = ((0) >>> 0);
    }
  }
  return uVar1;
}
