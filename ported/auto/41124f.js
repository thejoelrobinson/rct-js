// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41124f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00411324 } from "./411324.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_0041124f(heap, param_1, param_2) {
  const __sp = heap.allocFrame(84);
  const __addr_DAT_005ec174 = __sp + 0;
  const __addr_DAT_005ec1a8 = __sp + 4;
  const __addr_local_54 = __sp + 8;
  const __addr_local_4c = __sp + 12;
  const __addr_local_18 = __sp + 64;
  try {
  let iVar1 = 0;
  let local_50 = 0;
  if ((((heap.u32(0x005ec160) != 0) && (heap.u32(0x005ec15c) != 0)) && (heap.u32(0x005ec158) != 0x0)) && (iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x60))))(heap.u32(0x005ec158), heap.u32(0x005ec170), param_2, param_1), iVar1 == 0)) {
    FUN_00413170(heap, __addr_DAT_005ec174, param_1);
    FUN_00413170(heap, __addr_DAT_005ec1a8, param_2);
    heap.setU32(__addr_local_54, (0x1000) >>> 0);
    local_50 = heap.u32(0x005ec170);
    FUN_00413170(heap, __addr_local_4c, param_1);
    FUN_00413170(heap, __addr_local_18, param_2);
    FUN_00411324(heap, 0, __addr_local_54, 0x50);
    return 1;
  }
  return 0;
} finally {
    heap.freeFrame(84);
  }
}
