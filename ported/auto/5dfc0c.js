// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dfc0c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e5b80 } from "./5e5b80.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005dfc0c(heap) {
  FUN_005e5b80(heap);
  puVar2 = heap.u32(0x009a1164);
  while (0x009a013c <= puVar2 + -0x178) {
    puVar1 = (puVar2 + -0x146);
    puVar2 = puVar2 + -0x178;
    if ((heap.u32(puVar1) & 3) == 0) {
      FUN_005e5bd8(heap);
      puVar2 = heap.u32(0x009a1164);
    }
  }
  return;
}
