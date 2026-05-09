// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407d75.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00407d75(heap, param_1, param_2) {
  let uVar1 = 0;
  let iVar2 = 0;
  if (heap.u32(param_1) == 0) {
    uVar1 = ((0) >>> 0);
  } else {
    iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.u32(param_1)) + 0x44)), heap.u32(param_1), param_2))) >>> 0);
    if (iVar2 == 0) {
      uVar1 = ((1) >>> 0);
    } else {
      uVar1 = ((0) >>> 0);
    }
  }
  return uVar1;
}
