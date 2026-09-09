// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409677.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ClientToScreen, GetClientRect, SetViewportOrgEx } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00409677(heap, param_1) {
  const __sp = heap.allocFrame(132);
  const __addr_local_8 = __sp + 20;
  const __addr_local_18 = __sp + 4;
  try {
  let iVar1 = 0;
  if (((heap.i16((param_1 + 0xc)) == 0) && (heap.i32((param_1 + 0x80)) != 0)) && (iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((param_1 + 0x80))) + 0x44)), heap.u32((param_1 + 0x80)), __addr_local_8))) >>> 0), iVar1 == 0)) {
    heap.setU16((param_1 + 0xc), (1) & 0xffff);
    if ((heap.u32(0x005ebf54) == 0) && (heap.i32((param_1 + 0x80)) == heap.u32(0x005ebf34))) {
      GetClientRect(heap, heap.u32(0x005e916c), __addr_local_18);
      ClientToScreen(heap, heap.u32(0x005e916c), ((__addr_local_18) | 0));
      SetViewportOrgEx(heap, heap.u32(__addr_local_8), heap.u32(__addr_local_18), heap.u32((__addr_local_18 + 4)), ((0x0) | 0));
    }
  } else {
    heap.setU32(__addr_local_8, (((0x0) | 0)) >>> 0);
  }
  return heap.u32(__addr_local_8);
} finally {
    heap.freeFrame(132);
  }
}
