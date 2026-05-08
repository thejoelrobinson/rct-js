// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/443f5c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004447f6 } from "./4447f6.js";
export function FUN_00443f5c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0087c820 = __sp + 0;
  try {
  let uVar1 = 0;
  uVar1 = 0;
  do {
    heap.u32((__addr_DAT_0087c820 + uVar1)) = 0;
    uVar1 = uVar1 + 4;
  } while (uVar1 < 0x38);
  heap.setU32(0x0087d304, (0) >>> 0);
  heap.setU32(0x0087d308, (0) >>> 0);
  heap.setU32(0x0087d30c, (0) >>> 0);
  heap.setU32(0x0087d310, (0) >>> 0);
  heap.setU32(0x0087c3b4, (1000000) >>> 0);
  heap.setU32(0x0087c3b8, (1000000) >>> 0);
  heap.setU32(0x0087d514, (0) >>> 0);
  heap.setU32(0x0087d724, (0) >>> 0);
  heap.setU32(0x0087d718, (0x80000000) >>> 0);
  heap.setU32(0x0087d71c, (0) >>> 0);
  heap.setU32(0x0087d720, (0) >>> 0);
  FUN_004447f6(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
