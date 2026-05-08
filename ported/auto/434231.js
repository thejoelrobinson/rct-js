// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/434231.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00434231(heap) {
  let uVar1 = 0;
  uVar1 = heap.u32(0x009a1164);
  while (0x9a013b < uVar1 - 0x178) {
    (heap.u32(heap.u32((uVar1 - 0x174))))();
    uVar1 = uVar1 - 0x178;
  }
  return;
}
