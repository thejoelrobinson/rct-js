// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e4400.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e0e07 } from "./5e0e07.js";
import { FUN_009b30f1 } from "./9b30f1.js";
export function FUN_005e4400(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LAB_005e452c = __sp + 0;
  try {
  let sVar1 = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  if (((heap.u32((unaff_ESI + 0x32)) & 0x10) != 0) && ((heap.u32((unaff_ESI + 0x32)) & 0x20) == 0)) {
    FUN_009b30f1(heap);
  }
  pbVar2 = heap.u32((unaff_ESI + 0x1c));
  heap.setU32(0x0099fe02, (0x34) >>> 0);
  heap.setU32(0x0099fe06, (0) >>> 0);
  heap.setU32(0x009a13e4, (-1) >>> 0);
  if ((((heap.u32(0x00991f36) == '\x05') || (heap.u32(0x00991f36) == '\x02')) && (heap.u32(0x00991f37) == heap.u32((unaff_ESI + 0x174)))) && ((heap.u32(0x00991f38) == heap.u32((unaff_ESI + 0x30)) && ((heap.u32(0x00991f30) & 1) != 0)))) {
    heap.setU32(0x009a13e4, (heap.u32(0x00991f3c)) >>> 0);
  }
  heap.setU32(0x009a13e6, (-1) >>> 0);
  if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.u32(0x00991f5a) == heap.u32((unaff_ESI + 0x174)))) && (heap.u32(0x00991f58) == heap.u32((unaff_ESI + 0x30)))) {
    heap.setU32(0x009a13e6, (heap.u32(0x00991f5c)) >>> 0);
  }
  heap.setU32(0x009a13e0, (heap.u32((unaff_ESI + 0x10))) >>> 0);
  heap.setU32(0x009a13e8, (heap.u32((unaff_ESI + 0x14))) >>> 0);
  while ((heap.u32((unaff_ESI + 0x32)) & 0x20) == 0 && ((((sVar1 = heap.u32((unaff_EDI + 4)) - heap.u32((unaff_ESI + 0x20)), heap.u32((pbVar2 + 4)) < sVar1 || ((sVar1 + heap.u32((unaff_EDI + 8))) <= heap.u32((pbVar2 + 2)))) || (sVar1 = heap.u32((unaff_EDI + 6)) - heap.u32((unaff_ESI + 0x22)), heap.u32((pbVar2 + 8)) < sVar1)) || ((sVar1 + heap.u32((unaff_EDI + 10))) <= heap.u32((pbVar2 + 6)))))) {
    pbVar2 = pbVar2 + 0x10;
    heap.setU32(0x009a13e4, (heap.u32(0x009a13e4) + -1) >>> 0);
    heap.setU32(0x009a13e6, (heap.u32(0x009a13e6) + -1) >>> 0);
    heap.setU32(0x009a13e8, (heap.u32(0x009a13e8) >>> 1) >>> 0);
    heap.setU32(0x009a13e0, (heap.u32(0x009a13e0) >>> 1) >>> 0);
    if (heap.u32(pbVar2) == 0x15) {
      if ((heap.u32((unaff_ESI + 0x32)) & 0x600) != 0) {
        FUN_005e0e07(heap, unaff_ESI);
      }
      return;
    }
  }
  (heap.u32(heap.u32((__addr_PTR_LAB_005e452c) + (heap.u32(pbVar2)) * 4)))();
  return;
} finally {
    heap.freeFrame(4);
  }
}
