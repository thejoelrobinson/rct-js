// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44ecfb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e43de } from "./5e43de.js";
export function FUN_0044ecfb(heap) {
  let extraout_CL = 0;
  let cVar1 = 0;
  let cVar2 = 0;
  let unaff_ESI = 0;
  cVar1 = '\0';
  cVar2 = '\0';
  pcVar3 = 0x00887420;
  do {
    if ((heap.u32(pcVar3) != -1) && (cVar1 = cVar1 + '\x01', (heap.u32(pcVar3 + (0xfd) * 4) & 8U) != 0)) {
      heap.u32(pcVar3 + (0xfd) * 4) = heap.u32(pcVar3 + (0xfd) * 4) & 0xf7;
      cVar2 = cVar2 + '\x01';
    }
    pcVar3 = pcVar3 + 0x260;
  } while (pcVar3 < 0x008ad1c0);
  if (cVar2 != '\0') {
    FUN_005e43de(heap);
    cVar1 = extraout_CL;
  }
  if (cVar1 != heap.u32((unaff_ESI + 0x158))) {
    heap.u32((unaff_ESI + 0x158)) = cVar1;
    pcVar3 = 0x00887420;
    cVar1 = '\0';
    do {
      if (heap.u32(pcVar3) != -1) {
        heap.u32((unaff_ESI + 0x58)) = cVar1;
        (heap.u32(heap.u32((0x0044ed6c) + (heap.u32((unaff_ESI + 0x16a))) * 4)))(0);
        return;
      }
      pcVar3 = pcVar3 + 0x260;
      cVar1 = cVar1 + '\x01';
    } while (pcVar3 < 0x008ad1c0);
    heap.u32((unaff_ESI + 0x159)) = 0xff;
    FUN_005e43de(heap);
  }
  return;
}
