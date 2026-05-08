// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d8a4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040d8a4(heap, param_1) {
  let uVar1 = 0;
  if (heap.u32((0x005f0500 + param_1 * 0x16c)) == 0) {
    uVar1 = heap.u32((0x005f04f8 + param_1 * 0x16c));
  } else {
    uVar1 = 0;
  }
  return uVar1;
}
