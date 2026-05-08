// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417280.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00417140 } from "./417140.js";
import { FUN_00418ce0 } from "./418ce0.js";
export function FUN_00417280(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  if ((param_3 != 4) && (((param_4 < 2 || (0x7fffffff < param_4)) || ((param_3 != 0 && (param_3 != 0x40)))))) {
    return 0xffffffff;
  }
  param_4 = param_4 & 0xfffffffe;
  FUN_00417140(heap, param_1);
  FUN_00418ce0(heap, param_1);
  uVar1 = heap.u32(param_1 + (3) * 4) & 0xffffc2f3;
  heap.u32(param_1 + (3) * 4) = uVar1;
  if ((param_3 & 4) == 0) {
    if (param_2 == 0x0) {
      param_2 = FUN_004133c0(heap, param_4);
      if (param_2 == 0x0) {
        heap.setU32(0x005f0284, (heap.u32(0x005f0284) + 1) >>> 0);
        return 0xffffffff;
      }
      uVar1 = heap.u32(param_1 + (3) * 4) | 0x408;
    } else {
      uVar1 = uVar1 | 0x500;
    }
    heap.u32(param_1 + (3) * 4) = uVar1;
  } else {
    param_2 = param_1 + 5;
    heap.u32(param_1 + (3) * 4) = uVar1 | 4;
    param_4 = 2;
  }
  heap.u32(param_1 + (6) * 4) = param_4;
  heap.u32(param_1 + (2) * 4) = param_2;
  heap.u32(param_1) = param_2;
  heap.u32(param_1 + (1) * 4) = 0;
  return 0;
}
