// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41fb64.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0041fb64(heap) {
  let unaff_EDI = 0;
  return (heap.u32((unaff_EDI + 0xc4)) & 0x1f) * 0x15aaaa >>> 0x10;
}
