// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1653.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e1210 } from "./5e1210.js";
import { FUN_005e16f7 } from "./5e16f7.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e1653(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009a013c = __sp + 0;
  try {
  let puVar1 = 0;
  let puVar2 = 0;
  if (heap.u32(0x00971ef0) != '\0') {
    FUN_005e1210(heap);
    for (puVar1 = __addr_DAT_009a013c; puVar1 < heap.u32(0x009a1164); puVar1 = puVar1 + 0x178) {
      if (heap.u32((puVar1 + 8)) != 0) {
        FUN_005e16f7(heap);
      }
    }
    heap.setU32(0x0099fe00, (heap.u32(0x0099fe00) + heap.u32(0x00999f98)) >>> 0);
    puVar1 = heap.u32(0x009a1164);
    if (999 < heap.u32(0x0099fe00)) {
      heap.setU32(0x0099fe00, (0) >>> 0);
      puVar2 = heap.u32(0x009a1164);
      while (puVar1 = heap.u32(0x009a1164), 0x9a013b < puVar2 + -0x178) {
        (heap.u32(heap.u32((puVar2 + -0x174))))();
        puVar2 = puVar2 + -0x178;
      }
    }
    while (puVar2 = puVar1, puVar1 = puVar2 + -0x178, 0x9a013b < puVar1) {
      if (((heap.u32((puVar2 + -0x146)) & 0x600) != 0) && (heap.setU32((puVar2 + -0x146), (heap.u32((puVar2 + -0x146)) + -0x200) >>> 0), (heap.u32((puVar2 + -0x146)) & 0x600) == 0)) {
        FUN_005e43de(heap);
      }
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
