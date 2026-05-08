// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40efca.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { StretchDIBits } from "../../runtime/win32.js";
export function FUN_0040efca(heap, param_1, param_2) {
  let bVar1 = 0;
  bVar1 = heap.u32(0x005ec080) != 0x0;
  if (bVar1) {
    StretchDIBits(heap, heap.u32(0x005ec080), heap.u32(param_2), heap.u32(param_2 + (1) * 4), heap.u32(param_2 + (2) * 4) - heap.u32(param_2), heap.u32(param_2 + (3) * 4) - heap.u32(param_2 + (1) * 4), heap.u32(param_1), heap.u32(0x005ec08c) - heap.u32(param_1 + (3) * 4), heap.u32(param_1 + (2) * 4) - heap.u32(param_1), heap.u32(param_1 + (3) * 4) - heap.u32(param_1 + (1) * 4), heap.u32(0x005ec088), heap.u32(0x005ec084), 0, 0xcc0020);
  }
  return bVar1;
}
