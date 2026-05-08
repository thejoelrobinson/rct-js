// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444d07.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00444d07(heap) {
  let sVar1 = 0;
  sVar1 = heap.u32(0x0087c3a0) + -300 + heap.u32(0x0087c3a6);
  if (sVar1 < 0) {
    sVar1 = 0;
  }
  return sVar1;
}
