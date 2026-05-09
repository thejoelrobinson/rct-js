// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4070f8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00406fca } from "./406fca.js";
export function FUN_004070f8(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_local_18 = __sp + 0;
  const __addr_local_14 = __sp + 4;
  const __addr_local_c = __sp + 12;
  const __addr_local_b = __sp + 13;
  const __addr_local_a = __sp + 14;
  const __addr_local_9 = __sp + 15;
  const __addr_local_8 = __sp + 16;
  try {
  heap.setU32(0x005ebee4, (0) >>> 0);
  heap.setU32(0x005f1280, (0) >>> 0);
  heap.setU32(0x005f128c, (0) >>> 0);
  if (heap.u32(0x005ebefc) != 0x0) {
    heap.setU32(__addr_local_8, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebefc)) + 0x24)), heap.u32(0x005ebefc), 0x10, __addr_local_18))) >>> 0);
    if (heap.u32(__addr_local_8) == 0) {
      heap.setU32(0x005f128c, (heap.u32(__addr_local_18)) >>> 0);
      heap.setU32(0x005f1280, (heap.u32(__addr_local_14)) >>> 0);
      heap.setU32(0x005f1284, (heap.u32(__addr_local_c)) >>> 0);
      heap.setU32(0x005f1285, (heap.u32(__addr_local_b)) >>> 0);
      heap.setU32(0x005f1286, (heap.u32(__addr_local_a)) >>> 0);
      heap.setU32(0x005f1287, (heap.u32(__addr_local_9)) >>> 0);
      heap.setU32(0x005f1288, (heap.u32(__addr_local_a) | heap.u32(__addr_local_9) | heap.u32(__addr_local_c) | heap.u32(__addr_local_b)) >>> 0);
      heap.setU32(0x005ebee4, (1) >>> 0);
    } else {
      if ((heap.u32(__addr_local_8) == -0x7ff8ffe2) || (heap.u32(__addr_local_8) == -0x7ff8fff4)) {
      (regs.eax = FUN_00406fca(heap));
    }
    }
  }
  return heap.u32(0x005ebee4);
} finally {
    heap.freeFrame(20);
  }
}
