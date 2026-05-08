// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403bd8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00403bd8(heap) {
  if (heap.u32(0x005e91e8) == heap.u32(0x005e91e4)) {
    puVar1 = 0x0;
  } else {
    puVar1 = 0x005f1cc0 + heap.u32(0x005e91e8) * 0xc;
    heap.setU32(0x005e91e8, (heap.u32(0x005e91e8) + 1) >>> 0);
    heap.setU32(0x005e91e8, (heap.u32(0x005e91e8) & 0x3f) >>> 0);
  }
  return puVar1;
}
