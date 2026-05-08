// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40dc84.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040dc84(heap, param_1) {
  let uVar1 = 0;
  if (param_1 == heap.u32(0x005ec058)) {
    uVar1 = 0;
  } else {
    uVar1 = heap.u32((param_1 + 0x10));
  }
  return uVar1;
}
