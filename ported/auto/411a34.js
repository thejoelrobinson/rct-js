// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411a34.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { BitBlt, CreateCompatibleDC, DeleteDC, GetObjectA, SelectObject } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00411a34(heap, param_1, param_2, param_3, param_4, param_5, param_6) {
  const __sp = heap.allocFrame(48);
  const __addr_local_70 = __sp + 40;
  const __addr_local_94 = __sp + 4;
  const __addr_local_90 = __sp + 8;
  const __addr_local_8c = __sp + 12;
  const __addr_local_88 = __sp + 16;
  const __addr_local_78 = __sp + 32;
  const __addr_local_74 = __sp + 36;
  const __addr_local_6c = __sp + 44;
  try {
  if ((param_2 == 0x0) || (param_1 == 0x0)) {
    heap.setU32(__addr_local_78, (-0x7fffbffb) >>> 0);
  } else {
    (regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x6c)), param_1));
    heap.setU32(__addr_local_74, (CreateCompatibleDC(heap, ((0x0) >>> 0))) >>> 0);
    SelectObject(heap, heap.u32(__addr_local_74), param_2);
    GetObjectA(heap, param_2, 0x18, __addr_local_90);
    if (param_5 == 0) {
      param_5 = ((heap.u32(__addr_local_8c)) >>> 0);
    }
    if (param_6 == 0) {
      param_6 = ((heap.u32(__addr_local_88)) >>> 0);
    }
    heap.setU32(__addr_local_70, (0x6c) >>> 0);
    heap.setU32(__addr_local_6c, (6) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x58)), param_1, __addr_local_70));
    heap.setU32(__addr_local_78, ((regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x44)), param_1, __addr_local_94))) >>> 0);
    if (heap.u32(__addr_local_78) == 0) {
      BitBlt(heap, heap.u32(__addr_local_94), 0, 0, param_5, param_6, heap.u32(__addr_local_74), param_3, param_4, 0xcc0020);
      (regs.eax = callIndirect(heap, heap.u32((heap.i32(param_1) + 0x68)), param_1, heap.u32(__addr_local_94)));
    }
    DeleteDC(heap, heap.u32(__addr_local_74));
  }
  return heap.u32(__addr_local_78);
} finally {
    heap.freeFrame(48);
  }
}
