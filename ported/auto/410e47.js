// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410e47.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00413170 } from "./413170.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_00410e47(heap, param_1, param_2, param_3) {
  let uVar3 = 0;
  puVar2 = FUN_004133c0(heap, 0x50);
  if (puVar2 == 0x0) {
    uVar3 = 0;
  } else {
    heap.u32(puVar2) = param_1;
    FUN_00413170(heap, puVar2 + 1, param_2);
    FUN_00413170(heap, puVar2 + 0xe, param_3);
    heap.u32(puVar2 + (0x13) * 4) = 0;
    heap.setU32(0x005ec148, (heap.u32(0x005ec148) + 1) >>> 0);
    puVar1 = puVar2;
    if (heap.u32(0x005ec14c) != 0x0) {
      heap.u32(heap.u32(0x005ec150) + (0x13) * 4) = puVar2;
      puVar1 = heap.u32(0x005ec14c);
    }
    heap.setU32(0x005ec14c, (puVar1) >>> 0);
    uVar3 = 1;
    heap.setU32(0x005ec150, (puVar2) >>> 0);
  }
  return uVar3;
}
