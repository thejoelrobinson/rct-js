// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d301.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0040c8a6 } from "./40c8a6.js";
export function FUN_0040d301(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f03a0 = __sp + 0;
  try {
  let uVar1 = 0;
  let local_8 = 0;
  if (heap.u32(0x005ebfdc) == 0) {
    for (local_8 = 0; local_8 < 4; local_8 = local_8 + 1) {
      heap.u32((__addr_DAT_005f03a0 + local_8 * 0x16c)) = 0;
    }
    heap.setU32(0x005ebfd8, (timeSetEvent(0x32, 10, FUN_0040c8a6, 0, 1)) >>> 0);
    if (heap.u32(0x005ebfd8) == 0) {
      uVar1 = 0;
    } else {
      heap.setU32(0x005ebfdc, (1) >>> 0);
      uVar1 = 1;
    }
  } else {
    uVar1 = 0;
  }
  return uVar1;
} finally {
    heap.freeFrame(4);
  }
}
