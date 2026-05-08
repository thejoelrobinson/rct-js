// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/408f00.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00408f00(heap, param_1) {
  _memset(param_1, 0, 0xa8);
  _memset((param_1 + 0x14), 0, 0x6c);
  heap.u32((param_1 + 0x14)) = 0x6c;
  heap.u32((param_1 + 0x80)) = heap.u32(0x005ebf34);
  return 1;
}
