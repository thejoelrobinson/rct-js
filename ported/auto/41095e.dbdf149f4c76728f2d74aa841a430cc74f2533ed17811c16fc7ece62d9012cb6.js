// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/41095e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { Ordinal_1 } from "../../runtime/win32.js";
export function FUN_0041095e(heap, param_1) {
  let iVar1 = 0;
  let bVar2 = 0;
  if (heap.u32(0x005ec158) == 0) {
    iVar1 = ((Ordinal_1(heap, heap.u32(param_1), 0x005ec158, 0)) >>> 0);
    heap.setU32(0x005ec1c0, (0) >>> 0);
    heap.setU32(0x005ec1c4, (0) >>> 0);
    bVar2 = ((iVar1 == 0) & 0xff);
  } else {
    bVar2 = ((false) & 0xff);
  }
  return bVar2;
}
