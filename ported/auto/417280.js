// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417280.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00417140 } from "./417140.js";
import { FUN_00418ce0 } from "./418ce0.js";
export function FUN_00417280(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  if ((param_3 != 4) && (((param_4 < 2 || (0x7fffffff < param_4)) || ((param_3 != 0 && (param_3 != 0x40)))))) {
    return 0xffffffff;
  }
  param_4 = ((param_4 & 0xfffffffe) >>> 0);
  (regs.eax = FUN_00417140(heap, param_1));
  (regs.eax = FUN_00418ce0(heap, param_1));
  uVar1 = ((heap.i32(param_1 + (3) * 4) & 0xffffc2f3) >>> 0);
  heap.setI32((param_1 + (3) * 4), (uVar1) & 0xffffffff);
  if ((param_3 & 4) == 0) {
    if (param_2 == 0x0) {
      param_2 = (((regs.eax = FUN_004133c0(heap, param_4))) >>> 0);
      if (param_2 == 0x0) {
        heap.setU32(0x005f0284, (heap.u32(0x005f0284) + 1) >>> 0);
        return 0xffffffff;
      }
      uVar1 = ((heap.i32(param_1 + (3) * 4) | 0x408) >>> 0);
    } else {
      uVar1 = ((uVar1 | 0x500) >>> 0);
    }
    heap.setI32((param_1 + (3) * 4), (uVar1) & 0xffffffff);
  } else {
    param_2 = ((param_1 + ((5) * 4)) >>> 0);
    heap.setI32((param_1 + (3) * 4), (uVar1 | 4) & 0xffffffff);
    param_4 = ((2) >>> 0);
  }
  heap.setI32((param_1 + (6) * 4), (param_4) & 0xffffffff);
  heap.setI32((param_1 + (2) * 4), (((param_2) >>> 0)) & 0xffffffff);
  heap.setU32(param_1, (((param_2) >>> 0)) & 0xffffffff);
  heap.setI32((param_1 + (1) * 4), (0) & 0xffffffff);
  return 0;
}
