// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45198a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005df40c } from "./5df40c.js";
export function FUN_0045198a(heap) {
  let uVar1 = 0;
  let in_EDX = 0;
  let iVar2 = 0;
  iVar2 = (in_EDX & 0xff) * 0x260;
  heap.u32((0x00887422) + ((in_EDX & 0xff) * 0x130) * 4) = heap.u32((0x00887422) + ((in_EDX & 0xff) * 0x130) * 4) & 0xfeff;
  uVar1 = FUN_005df40c(heap);
  heap.u32((0x00887566 + iVar2)) = heap.u32((0x00887566 + iVar2)) + (uVar1 & 0xff) * (ushort)((byte)(100U - ((ushort) * (0x00887566 + iVar2) >>> 8)) >>> 2);
  heap.u32((0x0088756b) + (iVar2) * 4) = 0;
  heap.u32((0x0088751d) + (iVar2) * 4) = heap.u32((0x0088751d) + (iVar2) * 4) | 0x1c;
  return;
}
