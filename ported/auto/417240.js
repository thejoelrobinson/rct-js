// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417240.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00415c60 } from "./415c60.js";
import { FUN_00418bc0 } from "./418bc0.js";
import { FUN_00418c80 } from "./418c80.js";
export function FUN_00417240(heap, param_1, param_2) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x0000000c = __sp + 0;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar1 = (((regs.eax = FUN_00418bc0(heap, param_1))) >>> 0);
  uVar2 = (((regs.eax = FUN_00415c60(heap, param_1, param_2, __addr_stack0x0000000c))) >>> 0);
  (regs.eax = FUN_00418c80(heap, uVar1, param_1));
  return uVar2;
} finally {
    heap.freeFrame(4);
  }
}
