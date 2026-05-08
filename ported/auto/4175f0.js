// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4175f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetProcAddress, LoadLibraryA } from "../runtime/win32.js";
export function FUN_004175f0(heap, param_1, param_2, param_3) {
  let hModule = 0;
  let iVar1 = 0;
  iVar1 = 0;
  if (heap.u32(0x005f029c) != 0x0) {
    LAB_00417640: if (heap.u32(0x005f02a0) != 0x0) {
      iVar1 = (heap.u32(heap.u32(0x005f02a0)))();
    }
    if ((iVar1 != 0) && (heap.u32(0x005f02a4) != 0x0)) {
      iVar1 = (heap.u32(heap.u32(0x005f02a4)))(iVar1);
    }
    iVar1 = (heap.u32(heap.u32(0x005f029c)))(iVar1, param_1, param_2, param_3);
    return iVar1;
  }
  hModule = LoadLibraryA(heap, "user32.dll");
  if (hModule != 0x0) {
    heap.setU32(0x005f029c, (GetProcAddress(heap, hModule, "MessageBoxA")) >>> 0);
    if (heap.u32(0x005f029c) != 0x0) {
      heap.setU32(0x005f02a0, (GetProcAddress(heap, hModule, "GetActiveWindow")) >>> 0);
      heap.setU32(0x005f02a4, (GetProcAddress(heap, hModule, "GetLastActivePopup")) >>> 0);
      /* goto LAB_00417640 */ throw new Error("goto LAB_00417640 not supported");
    }
  }
  return 0;
}
