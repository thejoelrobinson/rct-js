// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415580.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { HeapFree, VirtualFree } from "../../runtime/win32.js";
export function FUN_00415580(heap, param_1) {
  VirtualFree(heap, heap.u32(param_1 + (4) * 4), 0, 0x8000);
  if (heap.u32(0x005ee520) == param_1) {
    heap.setU32(0x005ee520, (heap.u32(param_1 + (1) * 4)) >>> 0);
  }
  if (param_1 != 0x005ec500) {
    heap.setU32(heap.u32(param_1 + (1) * 4), (heap.u32(param_1)) & 0xffffffff);
    heap.setU32((heap.u32(param_1) + 4), (heap.u32(param_1 + (1) * 4)) & 0xffffffff);
    return HeapFree(heap, heap.u32(0x005f3e44), 0, param_1);
  }
  heap.setU32(0x005ec510, (0xffffffff) >>> 0);
  return;
}
