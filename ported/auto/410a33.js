// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/410a33.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00413170 } from "./413170.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_00410a33(heap, param_1, param_2, param_3, param_4) {
  let iVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  if ((param_4 == 1) || (iVar2 = FUN_004133c0(heap, 0x10c), iVar2 == 0)) {
    uVar3 = 0;
  } else {
    heap.setU32((iVar2 + 0x104), (heap.u32((param_1 + 0x14))) >>> 0);
    FUN_00413170(heap, iVar2, param_1 + 0x24);
    heap.setU32((iVar2 + 0x108), (0) >>> 0);
    heap.setU32(0x005ec134, (heap.u32(0x005ec134) + 1) >>> 0);
    iVar1 = iVar2;
    if (heap.u32(0x005ec138) != 0) {
      heap.setU32((heap.u32(0x005ec13c) + 0x108), (iVar2) >>> 0);
      iVar1 = heap.u32(0x005ec138);
    }
    heap.setU32(0x005ec138, (iVar1) >>> 0);
    uVar3 = 1;
    heap.setU32(0x005ec13c, (iVar2) >>> 0);
  }
  return uVar3;
}
