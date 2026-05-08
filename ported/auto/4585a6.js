// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4585a6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_009b30f1 } from "./9b30f1.js";
import { FUN_009ba943 } from "./9ba943.js";
export function FUN_004585a6(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099a888 = __sp + 0;
  try {
  let in_DX = 0;
  FUN_00458bcf(heap);
  heap.setU32(0x00971e84, (0xe0) >>> 0);
  FUN_00458a7c(heap, __addr_DAT_0099a888);
  FUN_009ba943(heap, in_DX);
  FUN_009b30f1(heap);
  if (heap.u32(0x0099ac8a) != '\0') {
    FUN_009b30f1(heap);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
