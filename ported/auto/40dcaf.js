// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40dcaf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040dcaf(heap, param_1) {
  if (heap.u32(0x005ec054) == 0) {
    heap.setU32(0x005ec054, (param_1) >>> 0);
    heap.setU32(0x005ec058, (param_1) >>> 0);
    heap.u32((param_1 + 0x10)) = 0;
  } else {
    heap.u32((heap.u32(0x005ec058) + 0x10)) = param_1;
    heap.setU32(0x005ec058, (param_1) >>> 0);
    heap.u32((param_1 + 0x10)) = 0;
  }
  return;
}
