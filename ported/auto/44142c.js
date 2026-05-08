// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44142c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0044142c(heap) {
  let unaff_ESI = 0;
  let iVar1 = 0;
  if ((heap.u32((unaff_ESI + 0x2b)) == '\a') || (heap.u32((unaff_ESI + 0x2b)) == '\x03')) {
    iVar1 = (uint) * (unaff_ESI + 0x68) * 0x260;
    heap.u32((0x0088752b) + (iVar1) * 4) = heap.u32((0x0088752b) + (iVar1) * 4) + -1;
    heap.u32((0x0088751d) + (iVar1) * 4) = heap.u32((0x0088751d) + (iVar1) * 4) | 0xc;
  }
  return;
}
