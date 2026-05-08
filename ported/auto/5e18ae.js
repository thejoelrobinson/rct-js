// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e18ae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_005e18ae(heap) {
  let in_AX = 0;
  let unaff_BX = 0;
  let unaff_ESI = 0;
  if ((heap.u32((unaff_ESI + 0x16e)) == -1) && ((heap.u32((unaff_ESI + 0x32)) & 4) == 0)) {
    heap.u32((unaff_ESI + 0x170)) = in_AX;
    heap.u32((unaff_ESI + 0x172)) = unaff_BX;
    heap.u32((unaff_ESI + 0x32)) = heap.u32((unaff_ESI + 0x32)) | 8;
  }
  return;
}
