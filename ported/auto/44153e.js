// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44153e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0042cbb0 } from "./42cbb0.js";
import { FUN_0044151b } from "./44151b.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_004575af } from "./4575af.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e53ca } from "./5e53ca.js";
import { FUN_005e5b80 } from "./5e5b80.js";
export function FUN_0044153e(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_008d7e2a = __sp + 0;
  try {
  let unaff_ESI = 0;
  FUN_0044151b(heap);
  FUN_005e53ca(heap);
  FUN_005e5b80(heap);
  FUN_005e5301(heap);
  if (heap.u32((unaff_ESI + 0x2e)) == '\x01') {
    heap.setU32(((__addr_DAT_008d7e2a) + (heap.u32((unaff_ESI + 0xc5))) * 4), (0) >>> 0);
    FUN_004575af(heap);
  }
  FUN_0042cbb0(heap);
  FUN_00444d1f(heap);
  return;
} finally {
    heap.freeFrame(4);
  }
}
