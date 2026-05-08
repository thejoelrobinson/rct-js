// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4153f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_004153f0(heap, param_1) {
  let iVar1 = 0;
  if (heap.u32(0x005f0248) != 0x0) {
    iVar1 = (heap.u32(heap.u32(0x005f0248)))(param_1);
    if (iVar1 != 0) {
      return 1;
    }
  }
  return 0;
}
