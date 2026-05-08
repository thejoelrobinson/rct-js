// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405b58.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CreateWindowExA, GetSystemMetrics } from "../runtime/win32.js";
export function FUN_00405b58(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f1ba0 = __sp + 0;
  try {
  let iVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  let pHVar4 = 0;
  iVar1 = GetSystemMetrics(heap, 0x20);
  iVar2 = GetSystemMetrics(heap, 0x21);
  iVar3 = GetSystemMetrics(heap, 4);
  pHVar4 = CreateWindowExA(heap, 0, 0x005e9030, __addr_DAT_005f1ba0, 0x10cf0000, heap.u32(0x005f1384), heap.u32(0x005f1388), heap.u32(0x005f12ac) + iVar1 * 2, heap.u32(0x005f129c) + iVar2 * 2 + iVar3, 0x0, 0x0, heap.u32(0x005f1398), 0x0);
  return pHVar4;
} finally {
    heap.freeFrame(4);
  }
}
