// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5df431.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005df531 } from "./5df531.js";
export function FUN_005df431(heap) {
  let in_EAX = 0;
  let unaff_BX = 0;
  heap.setU32(0x005e9198, (1) >>> 0);
  heap.setU32(0x005f1a20, (0) >>> 0);
  heap.setU32(0x005f1b40, (in_EAX) >>> 0);
  if (unaff_BX != -1) {
    FUN_00458bcf(heap);
  }
  heap.setU32(0x005e9194, (1) >>> 0);
  FUN_005df531(heap);
  return;
}
