// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415580.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { HeapFree, VirtualFree } from "../runtime/win32.js";
export function FUN_00415580(heap, param_1) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LOOP_005ec500 = __sp + 0;
  try {
  VirtualFree(heap, heap.u32(param_1 + (4) * 4), 0, 0x8000);
  if (heap.u32(0x005ee520) == param_1) {
    PTR_LOOP_005ee520 = heap.u32(param_1 + (1) * 4);
  }
  if (param_1 != __addr_PTR_LOOP_005ec500) {
    heap.u32(heap.u32(param_1 + (1) * 4)) = heap.u32(param_1);
    heap.u32((heap.u32(param_1) + 4)) = heap.u32(param_1 + (1) * 4);
    HeapFree(heap, heap.u32(0x005f3e44), 0, param_1);
    return;
  }
  heap.setU32(0x005ec510, (0xffffffff) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
