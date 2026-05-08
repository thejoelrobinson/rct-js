// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e2225.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e3874 } from "./5e3874.js";
import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_005e2225(heap) {
  let unaff_ESI = 0;
  FUN_005e3ace(heap);
  if (unaff_ESI != 0) {
    FUN_005e3874(heap);
  }
  (heap.u32(heap.u32((0x005e2248) + (heap.u32(0x00991f36)) * 4)))();
  return;
}
