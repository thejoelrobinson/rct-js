// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410af3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00410af3(heap) {
  if (heap.u32(0x005ec140) == 0) {
    heap.setU32(0x005ec140, (heap.u32(0x005ec138)) >>> 0);
  } else {
    heap.setU32(0x005ec140, (heap.u32((heap.u32(0x005ec140) + 0x108))) >>> 0);
  }
  return heap.u32(0x005ec140);
}
