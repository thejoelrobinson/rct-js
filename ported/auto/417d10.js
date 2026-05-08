// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417d10.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { WideCharToMultiByte } from "../../runtime/win32.js";
export function FUN_00417d10(heap, param_1, param_2) {
  const __sp = heap.allocFrame(8);
  const __addr_param_2 = __sp + 0;
  const __addr_param_1 = __sp + 4;
  heap.setU32(__addr_param_2, (param_2) >>> 0);
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let lpMultiByteStr = 0;
  let iVar1 = 0;
  lpMultiByteStr = heap.u32(__addr_param_1);
  if (heap.u32(__addr_param_1) == 0x0) {
    return 0;
  }
  if (heap.u32(0x005f0270) == 0) {
    if (heap.u32(__addr_param_2) < 0x100) {
      heap.u32(heap.u32(__addr_param_1)) = heap.u32(__addr_param_2);
      return 1;
    }
  } else {
    heap.setU32(__addr_param_1, (0x0) >>> 0);
    iVar1 = WideCharToMultiByte(heap, heap.u32(0x005f0280), 0x220, __addr_param_2, 1, lpMultiByteStr, heap.u32(0x005ee754), 0x0, __addr_param_1);
    if ((iVar1 != 0) && (heap.u32(__addr_param_1) == 0x0)) {
      return iVar1;
    }
  }
  heap.setU32(0x005efec0, (0x2a) >>> 0);
  return -1;
} finally {
    heap.freeFrame(8);
  }
}
