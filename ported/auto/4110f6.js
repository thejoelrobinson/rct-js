// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4110f6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00410fc7 } from "./410fc7.js";
import { FUN_0041107f } from "./41107f.js";
export function FUN_004110f6(heap, param_1) {
  let iVar1 = 0;
  let bVar2 = 0;
  if (heap.u32(0x005ec158) == 0x0) {
    bVar2 = false;
  } else {
    FUN_0041107f(heap);
    if ((heap.u32(0x005ec160) == 0) && (param_1 != 0)) {
      iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x34))))(heap.u32(0x005ec158), heap.u32((param_1 + 0x104)), FUN_00410fc7, 0, 0x80);
      bVar2 = iVar1 == 0;
    } else {
      iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ec158)) + 0x34))))(heap.u32(0x005ec158), heap.u32(0x005f0320), FUN_00410fc7, 0, 0);
      bVar2 = iVar1 == 0;
    }
  }
  return bVar2;
}
