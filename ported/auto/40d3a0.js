// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d3a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { InterlockedExchange, Sleep, timeEndPeriod, timeKillEvent } from "../../runtime/win32.js";
import { FUN_0040d575 } from "./40d575.js";
export function FUN_0040d3a0(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005ebfe4 = __sp + 0;
  try {
  let LVar1 = 0;
  let local_8 = 0;
  for (local_8 = 0; local_8 < 4; local_8 = local_8 + 1) {
    FUN_0040d575(heap, local_8);
  }
  if (heap.u32(0x005ebfdc) != 0) {
    timeKillEvent(heap, heap.u32(0x005ebfd8));
    timeEndPeriod(heap, 0x32);
    while (true) {
      LVar1 = InterlockedExchange(heap, __addr_DAT_005ebfe4, 1);
      if (LVar1 == 0) {
        break;
      }
      Sleep(heap, 100);
    }
    InterlockedExchange(heap, __addr_DAT_005ebfe4, 0);
    heap.setU32(0x005ebfdc, (0) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
