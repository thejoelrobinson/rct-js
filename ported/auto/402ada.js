// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402ada.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetCurrentProcess, GetCurrentThread, GetPriorityClass, GetThreadPriority, SetPriorityClass, SetThreadPriority } from "../runtime/win32.js";
export function FUN_00402ada(heap) {
  let pvVar1 = 0;
  let dwPriorityClass = 0;
  let nPriority = 0;
  if (heap.u32(0x005e912c) != 0) {
    if (heap.u32(0x005e9128) == 0) {
      heap.setU32(0x005e915c, (1) >>> 0);
      pvVar1 = GetCurrentProcess(heap);
      heap.setU32(0x005f2408, (GetPriorityClass(heap, pvVar1)) >>> 0);
      pvVar1 = GetCurrentThread(heap);
      heap.setU32(0x005f1fe8, (GetThreadPriority(heap, pvVar1)) >>> 0);
      dwPriorityClass = 0x100;
      pvVar1 = GetCurrentProcess(heap);
      SetPriorityClass(heap, pvVar1, dwPriorityClass);
      nPriority = 0xf;
      pvVar1 = GetCurrentThread(heap);
      SetThreadPriority(heap, pvVar1, nPriority);
      heap.setU32(0x005e9128, (1) >>> 0);
    } else {
      heap.setU32(0x005e915c, (heap.u32(0x005e915c) + 1) >>> 0);
    }
  }
  return heap.u32(0x005e915c);
}
