// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c65e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_0043c65e(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_DAT_0062d644 = __sp + 0;
  try {
  let bVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = 0;
  bVar1 = heap.u32((unaff_ESI + 0x6f));
  uVar3 = bVar1;
  if (bVar1 != heap.u32((unaff_ESI + 0x6e))) {
    FUN_005e53ca(heap);
    heap.setU32((unaff_ESI + 0x6e), (bVar1) >>> 0);
    puVar2 = heap.u32((__addr_PTR_DAT_0062d644) + (heap.u32((unaff_ESI + 0x2d)) * 2) * 4);
    heap.setU32((unaff_ESI + 0x14), (heap.u32(puVar2 + (uVar3 * 4) * 4)) >>> 0);
    heap.setU32((unaff_ESI + 9), (heap.u32(puVar2 + (uVar3 * 4 + 1) * 4)) >>> 0);
    heap.setU32((unaff_ESI + 0x15), (heap.u32(puVar2 + (uVar3 * 4 + 2) * 4)) >>> 0);
    FUN_005e53ca(heap);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
