// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417c80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004133c0 } from "./4133c0.js";
export function FUN_00417c80(heap, param_1) {
  let iVar1 = 0;
  heap.setU32(0x005f0284, (heap.u32(0x005f0284) + 1) >>> 0);
  iVar1 = FUN_004133c0(heap, 0x1000);
  heap.setU32((param_1 + (2) * 4), (iVar1) >>> 0);
  if (iVar1 != 0) {
    heap.setU32((param_1 + (3) * 4), (heap.u32(param_1 + (3) * 4) | 8) >>> 0);
    heap.setU32((param_1 + (6) * 4), (0x1000) >>> 0);
    heap.setU32(param_1, (heap.u32(param_1 + (2) * 4)) >>> 0);
    heap.setU32((param_1 + (1) * 4), (0) >>> 0);
    return;
  }
  heap.setU32((param_1 + (6) * 4), (2) >>> 0);
  heap.setU32((param_1 + (3) * 4), (heap.u32(param_1 + (3) * 4) | 4) >>> 0);
  heap.setU32((param_1 + (2) * 4), ((param_1 + 5)) >>> 0);
  heap.setU32(param_1, ((param_1 + 5)) >>> 0);
  heap.setU32((param_1 + (1) * 4), (0) >>> 0);
  return;
}
