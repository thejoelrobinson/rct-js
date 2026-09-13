// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411041.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00411041(heap) {
  if (heap.u32(0x005ec154) == 0) {
    heap.setU32(0x005ec154, (heap.u32(0x005ec14c)) >>> 0);
  } else {
    heap.setU32(0x005ec154, (heap.u32((heap.u32(0x005ec154) + 0x4c))) >>> 0);
  }
  return heap.u32(0x005ec154);
}
