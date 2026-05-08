// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41091d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0041091d(heap) {
  if (heap.u32(0x005ec12c) == 0) {
    heap.setU32(0x005ec12c, (heap.u32(0x005ec124)) >>> 0);
  } else {
    heap.setU32(0x005ec12c, (heap.u32((heap.u32(0x005ec12c) + 0x108))) >>> 0);
  }
  return heap.u32(0x005ec12c);
}
