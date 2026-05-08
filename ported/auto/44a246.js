// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a246.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_004429db } from "./4429db.js";
export function FUN_0044a246(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00887420 = __sp + 0;
  try {
  let uVar1 = 0;
  heap.setU32(0x0099c163, (heap.u32(0x008d7ea4)) >>> 0);
  pcVar2 = __addr_DAT_00887420;
  uVar1 = 0;
  do {
    if (heap.u32(pcVar2) != -1) {
      if ((heap.u32(pcVar2 + (0x21) * 4) != '\0') && (heap.u32((pcVar2 + 0x132)) != 0xffff)) {
        heap.u32((pcVar2 + 0x104)) = heap.u32((pcVar2 + 0x104)) - heap.u32((pcVar2 + 0x132));
        heap.u32(pcVar2 + (0xfd) * 4) = heap.u32(pcVar2 + (0xfd) * 4) | 2;
        heap.setU32(0x0099c167, (4) >>> 0);
        FUN_004429db(heap);
      }
      if (heap.u32(pcVar2 + (0x15e) * 4) != '\0') {
        heap.u32(pcVar2 + (0x15e) * 4) = heap.u32(pcVar2 + (0x15e) * 4) + -1;
      }
    }
    pcVar2 = pcVar2 + 0x260;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0xff);
  return;
} finally {
    heap.freeFrame(4);
  }
}
