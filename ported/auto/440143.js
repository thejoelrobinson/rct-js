// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/440143.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00440143(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_PTR_LAB_0062d44c = __sp + 0;
  const __addr_DAT_00743bbf = __sp + 4;
  try {
  let in_EAX = 0;
  (heap.u32(heap.u32((__addr_PTR_LAB_0062d44c) + (heap.u32((__addr_DAT_00743bbf) + ((in_EAX & 0xffff) * 0x100) * 4)) * 4)))();
  return;
} finally {
    heap.freeFrame(8);
  }
}
