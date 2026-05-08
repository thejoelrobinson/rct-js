// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dfbe0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e5b80 } from "./5e5b80.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005dfbe0(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009a013c = __sp + 0;
  try {
  let puVar1 = 0;
  let puVar2 = 0;
  FUN_005e5b80(heap);
  puVar2 = heap.u32(0x009a1164);
  do {
    if (puVar2 + -0x178 < __addr_DAT_009a013c) {
      return;
    }
    puVar1 = (puVar2 + -0x146);
    puVar2 = puVar2 + -0x178;
  } while ((heap.u32(puVar1) & 3) != 0);
  FUN_005e5bd8(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
