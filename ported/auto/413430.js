// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413430.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { HeapAlloc } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00415770 } from "./415770.js";
export function FUN_00413430(heap, param_1) {
  let iVar1 = 0;
  let dwBytes = 0;
  dwBytes = ((param_1 + 0xf & 0xfffffff0) >>> 0);
  if ((dwBytes <= heap.u32(0x005ee524)) && (iVar1 = (((regs.eax = FUN_00415770(heap, param_1 + 0xf >>> 4))) >>> 0), iVar1 != 0)) {
    return;
  }
  return HeapAlloc(heap, heap.u32(0x005f3e44), 0, dwBytes);
}
