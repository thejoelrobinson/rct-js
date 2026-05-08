// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402b77.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCurrentProcess, GetCurrentThread, SetPriorityClass, SetThreadPriority } from "../../runtime/win32.js";
export function FUN_00402b77(heap) {
  let pvVar1 = 0;
  let dwPriorityClass = 0;
  let nPriority = 0;
  if ((heap.u32(0x005e9128) != 0) && (heap.setU32(0x005e915c, (heap.u32(0x005e915c) + -1) >>> 0), heap.u32(0x005e915c) == 0)) {
    dwPriorityClass = heap.u32(0x005f2408);
    pvVar1 = GetCurrentProcess(heap);
    SetPriorityClass(heap, pvVar1, dwPriorityClass);
    nPriority = heap.u32(0x005f1fe8);
    pvVar1 = GetCurrentThread(heap);
    SetThreadPriority(heap, pvVar1, nPriority);
    heap.setU32(0x005e9128, (0) >>> 0);
  }
  return heap.u32(0x005e915c);
}
