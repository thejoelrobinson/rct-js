// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d870c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005d870c(heap) {
  let unaff_ESI = 0;
  heap.u32((unaff_ESI + 0x4e)) = heap.u32((unaff_ESI + 0x4e)) + (-heap.u32((unaff_ESI + 0x4c)) >>> 6);
  (heap.u32(heap.u32((0x0065de64 + (heap.u32((unaff_ESI + 0x36)) & 0xfffc)))))();
  return;
}
