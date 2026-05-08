// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411a34.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { BitBlt, CreateCompatibleDC, DeleteDC, GetObjectA, SelectObject } from "../../runtime/win32.js";
export function FUN_00411a34(heap, param_1, param_2, param_3, param_4, param_5, param_6) {
  const __sp = heap.allocFrame(12);
  const __addr_local_70 = __sp + 0;
  const __addr_local_94 = __sp + 4;
  const __addr_local_90 = __sp + 8;
  try {
  let local_8c = 0;
  let local_88 = 0;
  let local_78 = 0;
  let local_74 = 0;
  let local_6c = 0;
  if ((param_2 == 0x0) || (param_1 == 0x0)) {
    local_78 = -0x7fffbffb;
  } else {
    (heap.u32(heap.u32((heap.u32(param_1) + 0x6c))))(param_1);
    local_74 = CreateCompatibleDC(heap, 0x0);
    SelectObject(heap, local_74, param_2);
    GetObjectA(heap, param_2, 0x18, __addr_local_90);
    if (param_5 == 0) {
      param_5 = local_8c;
    }
    if (param_6 == 0) {
      param_6 = local_88;
    }
    heap.setU32(__addr_local_70, (0x6c) >>> 0);
    local_6c = 6;
    (heap.u32(heap.u32((heap.u32(param_1) + 0x58))))(param_1, __addr_local_70);
    local_78 = (heap.u32(heap.u32((heap.u32(param_1) + 0x44))))(param_1, __addr_local_94);
    if (local_78 == 0) {
      BitBlt(heap, heap.u32(__addr_local_94), 0, 0, param_5, param_6, local_74, param_3, param_4, 0xcc0020);
      (heap.u32(heap.u32((heap.u32(param_1) + 0x68))))(param_1, heap.u32(__addr_local_94));
    }
    DeleteDC(heap, local_74);
  }
  return local_78;
} finally {
    heap.freeFrame(12);
  }
}
