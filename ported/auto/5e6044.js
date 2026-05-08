// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6044.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e687d } from "./5e687d.js";
export function FUN_005e6044(heap) {
  let unaff_ESI = 0;
  let in_ZF = 0;
  if ((heap.u32(0x00991f30) >>> 3 & 1) != 0) {
    FUN_005e3b2b(heap);
    if (in_ZF) {
      FUN_005e687d(heap);
    } else {
      (heap.u32(heap.u32((unaff_ESI + 4))))();
    }
  }
  return;
}
