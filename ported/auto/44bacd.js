// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44bacd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e429d } from "./5e429d.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_0044bacd(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00887448 = __sp + 0;
  try {
  let unaff_ESI = 0;
  if ((heap.u32((unaff_ESI + 8)) == 0) && (heap.u32((__addr_DAT_00887448 + heap.u32((unaff_ESI + 0x30)) * 0x260)) != -1)) {
    FUN_005e429d(heap);
    heap.u32((unaff_ESI + 0x32)) = heap.u32((unaff_ESI + 0x32)) | 4;
    FUN_005e43de(heap);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
