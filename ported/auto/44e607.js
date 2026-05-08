// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44e607.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_0044e607(heap) {
  let unaff_ESI = 0;
  let in_ZF = 0;
  FUN_005e3b2b(heap);
  if ((!in_ZF) && (heap.u32((unaff_ESI + 0x164)) == 1)) {
    FUN_005e5bd8(heap);
  }
  return;
}
