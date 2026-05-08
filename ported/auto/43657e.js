// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43657e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004365c3 } from "./4365c3.js";
import { FUN_00436634 } from "./436634.js";
export function FUN_0043657e(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00743b10 = __sp + 0;
  try {
  let in_EAX = 0;
  let extraout_ECX = 0;
  if (__addr_DAT_00743b10 < heap.u32(0x00981ef4)) {
    do {
      in_EAX = FUN_004365c3(heap);
    } while (extraout_ECX != 1);
    if ((__addr_DAT_00743b10 < heap.u32(0x00981ef4)) && (in_EAX = FUN_00436634(heap), __addr_DAT_00743b10 < heap.u32(0x00981ef4))) {
      heap.setU32(0x00991efc, (0x393) >>> 0);
      return in_EAX;
    }
  }
  return in_EAX;
} finally {
    heap.freeFrame(4);
  }
}
