// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e39c6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e39ff } from "./5e39ff.js";
import { FUN_005e40c4 } from "./5e40c4.js";
export function FUN_005e39c6(heap) {
  let uVar1 = 0;
  uVar1 = heap.u32(0x009a1164);
  if (heap.u32(0x0099c169) != '\0') {
    heap.setU32(0x009a1618, (heap.u32(0x009a1618) + 1) >>> 0);
  }
  while (0x9a013b < uVar1 - 0x178) {
    FUN_005e40c4(heap);
    FUN_005e39ff(heap);
    (heap.u32(heap.u32((uVar1 - 0x174))))();
    uVar1 = uVar1 - 0x178;
  }
  return;
}
