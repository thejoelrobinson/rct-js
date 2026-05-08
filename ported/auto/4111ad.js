// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4111ad.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00413170 } from "./413170.js";
export function FUN_004111ad(heap, param_1, param_2) {
  let iVar1 = 0;
  let uVar2 = 0;
  if ((heap.u32(0x005ec158) == 0x0) || (heap.u32(0x005ec160) == 0)) {
    uVar2 = 0;
  } else {
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x14))))(heap.u32(0x005ec158), 0x005ec170, param_1, param_2, 0);
    if (iVar1 == 0) {
      FUN_00413170(heap, 0x005ec1a8, param_1);
      FUN_00413170(heap, 0x005ec174, param_2);
      heap.setU32(0x005ec15c, (1) >>> 0);
      uVar2 = 1;
    } else {
      uVar2 = 0;
    }
  }
  return uVar2;
}
