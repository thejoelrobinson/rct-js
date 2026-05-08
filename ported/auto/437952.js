// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/437952.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_00426f56 } from "./426f56.js";
export function FUN_00437952(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_00971ef4 = __sp + 0;
  try {
  let cVar1 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let in_EDX = 0;
  let cVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  if ((in_EAX < 0x1000) && (in_CX < 0x1000)) {
    pbVar6 = heap.u32((__addr_DAT_00971ef4) + ((((in_CX & 0xfe0) << 7 | in_EAX & 0xfe0) >>> 5 | ((in_CX & 0xfe0) >>> 9) << 0xb)) * 4);
    bVar3 = heap.u32(pbVar6);
    while ((bVar3 & 0x3c) != 0) {
      pbVar6 = pbVar6 + 8;
      bVar3 = heap.u32(pbVar6);
    }
    uVar4 = CONCAT11(heap.u32(pbVar6 + (4) * 4), heap.u32(pbVar6 + (2) * 4)) & 0x1fff;
    if ((heap.u32(pbVar6 + (4) * 4) & 4) != 0) {
      cVar2 = uVar4;
      cVar1 = (uVar4 >>> 8);
      uVar4 = CONCAT11(cVar1, cVar2 + '\x04');
      if (cVar1 == '\x1e') {
        uVar4 = (byte)(cVar2 + 8);
      }
    }
    bVar3 = uVar4 - in_EDX;
    if (bVar3 != 0) {
      if (uVar4 < in_EDX) {
        bVar3 = -bVar3;
      }
      if (heap.u32(0x00628ae7) < bVar3) {
        uVar5 = heap.u32(0x00628ae6);
        FUN_00426f56(heap);
        if (uVar5 != 0x80000000) {
          heap.setU32(0x00628ae2, (heap.u32(0x00628ae2) + uVar5) >>> 0);
        }
      }
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
