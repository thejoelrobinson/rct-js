// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/407c42.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00407d75 } from "./407d75.js";
import { FUN_00407dd4 } from "./407dd4.js";
import { FUN_00407e33 } from "./407e33.js";
export function FUN_00407c42(heap, param_1, param_2, param_3, param_4, param_5) {
  let uVar1 = 0;
  let local_8 = 0;
  local_8 = ((0) >>> 0);
  if (heap.i32(param_1) == 0) {
    uVar1 = ((0) >>> 0);
  } else {
    (regs.eax = FUN_00407d75(heap, param_1, param_5));
    (regs.eax = FUN_00407dd4(heap, param_1, param_4));
    (regs.eax = FUN_00407e33(heap, param_1, param_3));
    if (param_2 == 0) {
      local_8 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.i32(param_1)) + 0x30)), heap.i32(param_1), 0, 0, 0))) >>> 0);
    } else {
      if (param_2 == 1) {
      local_8 = (((regs.eax = callIndirect(heap, heap.u32((heap.i32(heap.i32(param_1)) + 0x30)), heap.i32(param_1), 0, 0, 1))) >>> 0);
    }
    }
    if (local_8 == 0) {
      uVar1 = ((1) >>> 0);
    } else {
      uVar1 = ((0) >>> 0);
    }
  }
  return uVar1;
}
