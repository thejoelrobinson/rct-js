// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40dd0c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040dd0c(heap, param_1) {
  let local_8 = 0;
  if (heap.u32(0x005ec054) == param_1) {
    if (heap.u32(0x005ec058) == param_1) {
      heap.setU32(0x005ec058, (0) >>> 0);
    }
    heap.setU32(0x005ec054, (heap.u32((param_1 + 0x10))) >>> 0);
  } else {
    for (local_8 = heap.u32(0x005ec054); heap.u32((local_8 + 0x10)) != param_1; local_8 = heap.u32((local_8 + 0x10))) {
    
    }
    if (heap.u32(0x005ec058) == param_1) {
      heap.setU32(0x005ec058, (local_8) >>> 0);
      heap.u32((local_8 + 0x10)) = 0;
    } else {
      heap.u32((local_8 + 0x10)) = heap.u32((param_1 + 0x10));
    }
  }
  heap.u32((param_1 + 0x10)) = 0;
  return;
}
