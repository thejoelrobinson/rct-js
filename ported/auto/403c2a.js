// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403c2a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DispatchMessageA, IsDialogMessageA, IsWindow, PeekMessageA, TranslateMessage } from "../../runtime/win32.js";
import { FUN_004070e3 } from "./4070e3.js";
export function FUN_00403c2a(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_24 = __sp + 0;
  try {
  let BVar1 = 0;
  let local_8 = 0;
  local_8 = 0;
  do {
    BVar1 = PeekMessageA(heap, __addr_local_24, 0x0, 0, 0, 1);
    if (BVar1 == 0) {
      LAB_00403caf: FUN_004070e3(heap);
      return local_8 == 0;
    }
    if (heap.u32((__addr_local_24 + 4)) == 0x12) {
      local_8 = 1;
      /* goto LAB_00403caf */ throw new Error("goto LAB_00403caf not supported");
    }
    BVar1 = IsWindow(heap, heap.u32(0x005e91e0));
    if ((BVar1 == 0) || (BVar1 = IsDialogMessageA(heap, heap.u32(0x005e91e0), __addr_local_24), BVar1 == 0)) {
      TranslateMessage(heap, __addr_local_24);
      DispatchMessageA(heap, __addr_local_24);
    }
  } while (true);
} finally {
    heap.freeFrame(128);
  }
}
