// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45198a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005df40c } from "./5df40c.js";
export function FUN_0045198a(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_00887566 = __sp + 4;
  const __addr_DAT_0088756b = __sp + 8;
  const __addr_DAT_0088751d = __sp + 12;
  try {
  let uVar1 = 0;
  let in_EDX = 0;
  let iVar2 = 0;
  iVar2 = (in_EDX & 0xff) * 0x260;
  heap.setU32(((__addr_DAT_00887422) + ((in_EDX & 0xff) * 0x130) * 4), (heap.u32((__addr_DAT_00887422) + ((in_EDX & 0xff) * 0x130) * 4) & 0xfeff) >>> 0);
  uVar1 = FUN_005df40c(heap);
  heap.setU32((__addr_DAT_00887566 + iVar2), (heap.u32((__addr_DAT_00887566 + iVar2)) + (uVar1 & 0xff) * ((100 - (heap.u32((__addr_DAT_00887566 + iVar2)) >>> 8)) >>> 2)) >>> 0);
  heap.setU32(((__addr_DAT_0088756b) + (iVar2) * 4), (0) >>> 0);
  heap.setU32(((__addr_DAT_0088751d) + (iVar2) * 4), (heap.u32((__addr_DAT_0088751d) + (iVar2) * 4) | 0x1c) >>> 0);
  return;
} finally {
    heap.freeFrame(16);
  }
}
