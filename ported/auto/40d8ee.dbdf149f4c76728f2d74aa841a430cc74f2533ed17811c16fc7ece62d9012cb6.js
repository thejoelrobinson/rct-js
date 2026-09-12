// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40d8ee.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040d8ee(heap, param_1) {
  let uVar1 = 0;
  if (heap.i32((0x005f03a0 + param_1 * 0x16c)) == 0) {
    uVar1 = ((0) >>> 0);
  } else {
    if (heap.i32((0x005f0500 + param_1 * 0x16c)) == 0) {
    uVar1 = ((1) >>> 0);
  } else {
    uVar1 = ((0) >>> 0);
  }
  }
  return uVar1;
}
