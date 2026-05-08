// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416f60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, SUB41 } from "../runtime/win32.js";
import { FUN_00417860 } from "./417860.js";
export function FUN_00416f60(heap, param_1, param_2) {
  const __sp = heap.allocFrame(8);
  const __addr_param_1 = __sp + 0;
  const __addr_local_4 = __sp + 4;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  iVar2 = heap.u32(__addr_param_1);
  if (heap.u32(__addr_param_1) + 1U < 0x101) {
    return heap.u32((heap.u32(0x005ee548) + heap.u32(__addr_param_1) * 2)) & param_2;
  }
  if ((heap.u32(heap.u32(0x005ee548) + ((heap.u32(__addr_param_1) >>> 8 & 0xffU) * 2 + 1) * 4) & 0x80) == 0) {
    (heap.u32(__addr_param_1) & 0xffff) = heap.u32(__addr_param_1);
    uVar1 = 1;
  } else {
    (heap.u32(__addr_param_1) & 0xffff) = CONCAT11(heap, heap.u32(__addr_param_1), (heap.u32(__addr_param_1) >>> 8));
    (((heap.u32(__addr_param_1)) >>> 24) & 0xff) = SUB41(heap, iVar2, 3);
    (heap.u32(__addr_param_1) & 0xffffffff) = heap.u32(__addr_param_1);
    uVar1 = 2;
  }
  iVar2 = FUN_00417860(heap, 1, __addr_param_1, uVar1, __addr_local_4, 0, 0, 1);
  if (iVar2 == 0) {
    return 0;
  }
  return heap.u32(__addr_local_4) & 0xffff & param_2;
} finally {
    heap.freeFrame(8);
  }
}
