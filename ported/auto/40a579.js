// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40a579.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040a579(heap, param_1, param_2) {
  let uVar1 = 0;
  if ((heap.u32(0x005ebf5c) == 0) && (heap.u32(0x005ebf60) == 0)) {
    if ((heap.u32((param_1 + 0x80)) == 0) || (heap.u32((param_2 + 0x80)) == 0)) {
      uVar1 = 0;
    } else {
      heap.setU32(0x005ebf5c, (heap.u32((param_1 + 0x80))) >>> 0);
      heap.setU32(0x005ebf60, (heap.u32((param_2 + 0x80))) >>> 0);
      uVar1 = 1;
    }
  } else {
    uVar1 = 0;
  }
  return uVar1;
}
