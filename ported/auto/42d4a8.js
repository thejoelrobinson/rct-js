// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42d4a8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004080e0 } from "./4080e0.js";
import { FUN_00408254 } from "./408254.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042d56c } from "./42d56c.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_0043054e } from "./43054e.js";
import { FUN_0045268c } from "./45268c.js";
import { FUN_00452835 } from "./452835.js";
import { FUN_005e698a } from "./5e698a.js";
import { FUN_009bb4b4 } from "./9bb4b4.js";
import { FUN_009bb717 } from "./9bb717.js";
import { FUN_009bb9f5 } from "./9bb9f5.js";
export function FUN_0042d4a8(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0043091b = __sp + 0;
  try {
  let pcVar1 = 0;
  let iVar2 = 0;
  FUN_0042f239(heap);
  iVar2 = FUN_004083b5(heap, 0x13);
  if (iVar2 != -1) {
    heap.setU32(0x005f5550, (iVar2) >>> 0);
    heap.setU32(0x005f5554, (FUN_00408254(heap, iVar2, 0)) >>> 0);
    FUN_00408387(heap, heap.u32(0x005f5550));
    FUN_0042f239(heap);
    iVar2 = FUN_004080e0(heap, 0x13, 0, 0);
    if (iVar2 != 0) {
      heap.setU32(0x005f5554, (heap.u32(0x005f5554) + iVar2) >>> 0);
      heap.setU32(0x005f554c, (iVar2) >>> 0);
      heap.setU32(0x005f5550, (iVar2) >>> 0);
      if (heap.u32(0x005f8d5b) != '\x01') {
        FUN_005e698a(heap);
        FUN_00452835(heap);
        FUN_009bb4b4(heap);
        heap.setU32(0x005e9184, (0) >>> 0);
        FUN_009bb9f5(heap);
        FUN_009bb717(heap);
        FUN_0045268c(heap);
      }
      heap.setU32(0x0099c16b, (1) >>> 0);
      iVar2 = -1;
      do {
        pcVar1 = __addr_DAT_0043091b + iVar2;
        iVar2 = iVar2 + 1;
      } while (heap.u32(pcVar1) != '\x02');
      FUN_0043054e(heap);
      FUN_0042d56c(heap);
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
