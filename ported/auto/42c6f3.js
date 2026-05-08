// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42c6f3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042c6f3(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0087d728 = __sp + 0;
  try {
  let uVar1 = 0;
  heap.setU32(0x008d7eb8, (0) >>> 0);
  heap.setU32(0x008d8a3c, (0) >>> 0);
  uVar1 = 0;
  do {
    heap.u32((__addr_DAT_0087d728) + (uVar1) * 4) = 0;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x10);
  return;
} finally {
    heap.freeFrame(4);
  }
}
