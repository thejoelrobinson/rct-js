// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4447f6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004447f6(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0070093a = __sp + 0;
  try {
  let in_EAX = 0;
  let uVar1 = 0;
  uVar1 = ((__addr_DAT_0070093a - heap.u32(0x0087c3b4)) >>> 5 | (__addr_DAT_0070093a - heap.u32(0x0087c3b4)) * 0x8000000) - heap.u32(0x0087c3b8);
  uVar1 = (uVar1 >>> 7 | uVar1 * 0x2000000) + heap.u32(0x0087d0c8);
  heap.setU32(0x0087d79c, (uVar1 >>> 3 | uVar1 * 0x20000000) >>> 0);
  return in_EAX;
} finally {
    heap.freeFrame(4);
  }
}
