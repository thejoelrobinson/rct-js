// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4035c1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004035c1(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f15e0 = __sp + 0;
  try {
  let puVar1 = 0;
  if (heap.u32(0x005e91d4) == heap.u32(0x005e91d0)) {
    puVar1 = 0x0;
  } else {
    puVar1 = __addr_DAT_005f15e0 + heap.u32(0x005e91d4) * 8;
    heap.setU32(0x005e91d4, (heap.u32(0x005e91d4) + 1) >>> 0);
    heap.setU32(0x005e91d4, (heap.u32(0x005e91d4) & 0x3f) >>> 0);
  }
  return puVar1;
} finally {
    heap.freeFrame(4);
  }
}
