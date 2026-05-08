// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40aae9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0040aae9(heap) {
  let local_8 = 0;
  if (heap.u32(0x005f0950) == 1) {
    local_8 = heap.u32(0x005ebf34);
  } else {
    local_8 = heap.u32(heap.u32(0x005ebf38));
  }
  (heap.u32(heap.u32((heap.u32(local_8) + 0x70))))(local_8, 0);
  return;
}
