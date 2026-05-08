// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5de5ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005de5ff(heap) {
  let unaff_ESI = 0;
  let bVar1 = 0;
  bVar1 = true;
  FUN_005e3b2b(heap);
  if (!bVar1) {
    (heap.u32(heap.u32((unaff_ESI + 4))))();
  }
  return;
}
