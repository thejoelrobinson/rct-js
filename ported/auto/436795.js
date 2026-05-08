// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436795.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00436795(heap) {
  let bVar1 = 0;
  bVar1 = heap.u32((unaff_ESI + 1));
  while ((bVar1 & 0x80) == 0) {
    heap.u32(unaff_ESI) = heap.u32(unaff_ESI + (2) * 4);
    heap.u32(unaff_ESI + (1) * 4) = heap.u32(unaff_ESI + (3) * 4);
    bVar1 = heap.u32((unaff_ESI + 9));
    unaff_ESI = unaff_ESI + 2;
  }
  heap.u32((unaff_ESI + -7)) = heap.u32((unaff_ESI + -7)) | 0x80;
  heap.u32(unaff_ESI) = 0xff;
  if (unaff_ESI + 2 == heap.u32(0x00981ef4)) {
    heap.setU32(0x00981ef4, (heap.u32(0x00981ef4) + -2) >>> 0);
  }
  return;
}
