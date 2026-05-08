// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403cd4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DispatchMessageA, IsDialogMessageA, IsWindow, PeekMessageA, TranslateMessage } from "../../runtime/win32.js";
import { FUN_004070e3 } from "./4070e3.js";
export function FUN_00403cd4(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_24 = __sp + 0;
  try {
  let BVar1 = 0;
  let local_8 = 0;
  local_8 = 0;
  BVar1 = PeekMessageA(heap, __addr_local_24, 0x0, 0, 0, 1);
  if (BVar1 != 0) {
    if (heap.u32((__addr_local_24 + 4)) == 0x12) {
      local_8 = 1;
    } else {
      BVar1 = IsWindow(heap, heap.u32(0x005e91e0));
      if ((BVar1 == 0) || (BVar1 = IsDialogMessageA(heap, heap.u32(0x005e91e0), __addr_local_24), BVar1 == 0)) {
        TranslateMessage(heap, __addr_local_24);
        DispatchMessageA(heap, __addr_local_24);
      }
    }
  }
  FUN_004070e3(heap);
  return local_8 == 0;
} finally {
    heap.freeFrame(128);
  }
}
