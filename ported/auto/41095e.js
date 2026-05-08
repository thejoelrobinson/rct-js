// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41095e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { Ordinal_1 } from "../runtime/win32.js";
export function FUN_0041095e(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005ec158 = __sp + 0;
  try {
  let iVar1 = 0;
  let bVar2 = 0;
  if (heap.u32(__addr_DAT_005ec158) == 0) {
    iVar1 = Ordinal_1(heap, heap.u32(param_1), __addr_DAT_005ec158, 0);
    heap.setU32(0x005ec1c0, (0) >>> 0);
    heap.setU32(0x005ec1c4, (0) >>> 0);
    bVar2 = iVar1 == 0;
  } else {
    bVar2 = false;
  }
  return bVar2;
} finally {
    heap.freeFrame(4);
  }
}
