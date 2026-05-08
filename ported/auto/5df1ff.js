// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df1ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005df1ff(heap) {
  let pcVar1 = 0;
  let unaff_ESI = 0;
  pcVar1 = (unaff_ESI + 5);
  heap.setU32(pcVar1, (heap.u32(pcVar1) + '\x01') >>> 0);
  if (heap.u32(pcVar1) == '\0') {
    heap.setU32((unaff_ESI + 5), (heap.u32((unaff_ESI + 5)) + -1) >>> 0);
  }
  return;
}
