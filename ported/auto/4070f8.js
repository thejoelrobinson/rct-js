// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4070f8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00406fca } from "./406fca.js";
export function FUN_004070f8(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_local_18 = __sp + 0;
  try {
  let local_14 = 0;
  let local_c = 0;
  let local_b = 0;
  let local_a = 0;
  let local_9 = 0;
  let local_8 = 0;
  heap.setU32(0x005ebee4, (0) >>> 0);
  heap.setU32(0x005f1280, (0) >>> 0);
  heap.setU32(0x005f128c, (0) >>> 0);
  if (heap.u32(0x005ebefc) != 0x0) {
    local_8 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebefc)) + 0x24))))(heap.u32(0x005ebefc), 0x10, __addr_local_18);
    if (local_8 == 0) {
      heap.setU32(0x005f128c, (heap.u32(__addr_local_18)) >>> 0);
      heap.setU32(0x005f1280, (local_14) >>> 0);
      heap.setU32(0x005f1284, (local_c) >>> 0);
      heap.setU32(0x005f1285, (local_b) >>> 0);
      heap.setU32(0x005f1286, (local_a) >>> 0);
      heap.setU32(0x005f1287, (local_9) >>> 0);
      heap.setU32(0x005f1288, (local_a | local_9 | local_c | local_b) >>> 0);
      heap.setU32(0x005ebee4, (1) >>> 0);
    } else {
      if ((local_8 == -0x7ff8ffe2) || (local_8 == -0x7ff8fff4)) {
      FUN_00406fca(heap);
    }
    }
  }
  return heap.u32(0x005ebee4);
} finally {
    heap.freeFrame(4);
  }
}
