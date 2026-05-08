// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bbff8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_009bc041 } from "./9bc041.js";
export function FUN_009bbff8(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009a013c = __sp + 0;
  try {
  let in_EAX = 0;
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  uVar1 = heap.u32(0x0099fb80);
  uVar3 = heap.u32(0x0099fb82);
  uVar2 = (heap.u32(0x0099fb84) + heap.u32(0x0099fb80));
  uVar4 = (heap.u32(0x0099fb86) + heap.u32(0x0099fb82));
  heap.setU32(0x009b2280, (in_EAX) >>> 0);
  for (puVar5 = __addr_DAT_009a013c; puVar5 < heap.u32(0x009a1164); puVar5 = puVar5 + 0x178) {
    FUN_009bc041(heap, uVar4, uVar2, uVar3, uVar1);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
