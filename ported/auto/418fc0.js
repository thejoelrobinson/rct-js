// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418fc0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418fc0(heap, param_1) {
  let uVar1 = 0;
  uVar1 = heap.u32(param_1 + (1) * 4);
  heap.setU32((param_1 + (1) * 4), (uVar1 >>> 1 | heap.u32(param_1 + (2) * 4) << 0x1f) >>> 0);
  heap.setU32((param_1 + (2) * 4), (heap.u32(param_1 + (2) * 4) >>> 1) >>> 0);
  heap.setU32(param_1, (heap.u32(param_1) >>> 1 | uVar1 << 0x1f) >>> 0);
  return;
}
