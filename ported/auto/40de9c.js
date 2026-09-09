// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40de9c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0040de9c(heap, param_1) {
  let iVar1 = 0;
  if (heap.u32(0x005ec050) == 0x0) {
    iVar1 = ((0) >>> 0);
  } else {
    if (param_1 < heap.u32(heap.u32(0x005ec050))) {
    iVar1 = ((heap.i32(0x005ec050) + heap.u32(heap.u32(0x005ec050) + (param_1 + 1) * 4)) >>> 0);
  } else {
    iVar1 = ((0) >>> 0);
  }
  }
  return iVar1;
}
