// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408276.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ReadFile, SetFilePointer } from "../../runtime/win32.js";
export function FUN_00408276(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(4);
  const __addr_local_8 = __sp + 0;
  try {
  let BVar1 = 0;
  let lDistanceToMove = 0;
  let DVar2 = 0;
  if (param_3 == 0xffffffff) {
    lDistanceToMove = ((SetFilePointer(heap, param_1, 0, 0x0, 1)) >>> 0);
    DVar2 = ((SetFilePointer(heap, param_1, 0, 0x0, 2)) >>> 0);
    SetFilePointer(heap, param_1, lDistanceToMove, 0x0, 0);
    BVar1 = ((ReadFile(heap, param_1, param_2, DVar2 - lDistanceToMove, __addr_local_8, ((0x0) >>> 0))) >>> 0);
    if (BVar1 == 0) {
      heap.setU32(__addr_local_8, (0xffffffff) >>> 0);
    }
  } else {
    BVar1 = ((ReadFile(heap, param_1, param_2, param_3, __addr_local_8, ((0x0) >>> 0))) >>> 0);
    if (BVar1 == 0) {
      heap.setU32(__addr_local_8, (0xffffffff) >>> 0);
    }
  }
  return heap.u32(__addr_local_8);
} finally {
    heap.freeFrame(4);
  }
}
