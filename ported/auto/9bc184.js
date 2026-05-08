// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bc184.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e117d } from "./5e117d.js";
export function FUN_009bc184(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009aa27c = __sp + 0;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  if (heap.u32(0x00971ef0) != '\0') {
    if (heap.u32(0x00991f64) != -1) {
      FUN_005e117d(heap);
    }
    iVar2 = heap.u32(0x0099fb7c);
    puVar4 = __addr_DAT_009aa27c;
    if (heap.u32(0x009b227c) == 0) {
      return;
    }
    do {
      uVar1 = heap.u32(puVar4);
      puVar4 = puVar4 + 1;
      heap.u32(((uVar1 >>> 8) + iVar2)) = uVar1;
      uVar3 = heap.u32(0x009b227c) - 1;
      heap.setU32(0x009b227c, (uVar3) >>> 0);
    } while (uVar3 != 0);
    heap.setU32(0x005e9154, (1) >>> 0);
  }
  heap.setU32(0x009b227c, (0) >>> 0);
  return;
} finally {
    heap.freeFrame(4);
  }
}
