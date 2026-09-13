// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408d19.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00408d19(heap, param_1) {
  let iVar1 = 0;
  heap.setU32(0x005f0954, (param_1) >>> 0);
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x20)), heap.u32(0x005ebf30), 0, 0, 0, 0x00408c1c))) >>> 0);
  if (iVar1 == 0) {
    iVar1 = ((param_1 + heap.u32(0x005ebf58)) >>> 0);
  }
  return iVar1;
}
