// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402bd5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00402bef } from "./402bef.js";
import { FUN_0040473c } from "./40473c.js";
export function FUN_00402bd5(heap) {
  heap.setU32(0x005e9118, (FUN_0040473c(heap)) >>> 0);
  FUN_00402bef(heap);
  return;
}
