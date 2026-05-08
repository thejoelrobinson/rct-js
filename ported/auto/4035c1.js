// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4035c1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004035c1(heap) {
  if (heap.u32(0x005e91d4) == heap.u32(0x005e91d0)) {
    puVar1 = 0x0;
  } else {
    puVar1 = 0x005f15e0 + heap.u32(0x005e91d4) * 8;
    heap.setU32(0x005e91d4, (heap.u32(0x005e91d4) + 1) >>> 0);
    heap.setU32(0x005e91d4, (heap.u32(0x005e91d4) & 0x3f) >>> 0);
  }
  return puVar1;
}
