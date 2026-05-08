// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45a94c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045a94c(heap) {
  let cVar1 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  for (; (cVar1 = heap.u32(unaff_ESI), cVar1 == heap.u32(unaff_EDI) && (cVar1 != '\0')); unaff_ESI = unaff_ESI + 1) {
    unaff_EDI = unaff_EDI + 1;
  }
  return cVar1;
}
