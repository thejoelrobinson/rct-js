// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d56c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004081e4 } from "./4081e4.js";
import { FUN_005e6028 } from "./5e6028.js";
export function FUN_0042d56c(heap) {
  FUN_004081e4(heap, heap.u32(0x005f5550));
  heap.setU32(0x0099c16b, (0) >>> 0);
  FUN_005e6028(heap);
  return;
}
