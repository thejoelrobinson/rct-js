// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404c5d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DestroyCursor } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00404ba4 } from "./404ba4.js";
import { FUN_00404c03 } from "./404c03.js";
export function FUN_00404c5d(heap, param_1) {
  let uVar1 = 0;
  if (heap.u32(0x005e91c8) == param_1) {
    uVar1 = (((regs.eax = FUN_00404c03(heap, 0x7f00))) >>> 0);
    (regs.eax = FUN_00404ba4(heap, uVar1));
  }
  return DestroyCursor(heap, param_1);
}
