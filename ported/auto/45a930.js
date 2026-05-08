// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45a930.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0045a930(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0087f41c = __sp + 0;
  try {
  let in_EAX = 0;
  if ((0x7fff < in_EAX) && (in_EAX < 0x9000)) {
    heap.u32((__addr_DAT_0087f41c) + ((in_EAX & 0x3ff) * 0x20) * 4) = 0;
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
