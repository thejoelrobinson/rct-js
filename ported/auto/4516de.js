// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4516de.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005df40c } from "./5df40c.js";
export function FUN_004516de(heap) {
  let uVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let extraout_CL = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let bVar6 = 0;
  heap.setU32(0x00631c72, (3) >>> 0);
  if (heap.u32(0x008d7eb6) != '\0') {
    heap.setU32(0x00631c72, (0x1e) >>> 0);
  }
  uVar5 = (uint) * unaff_ESI;
  uVar4 = heap.u32((0x005f5658 + uVar5 * 4));
  if (((uVar5 == 8) && (heap.u32(unaff_ESI + (1) * 4) != 0xf)) && (heap.u32(unaff_ESI + (1) * 4) != 9)) {
    uVar4 = 0;
  }
  cVar3 = '\0';
  while (true) {
    uVar1 = 0;
    if (uVar4 != 0) {
      for (; (uVar4 >>> uVar1 & 1) == 0; uVar1 = uVar1 + 1) {
      
      }
    }
    if (uVar4 == 0) {
      break;
    }
    uVar4 = uVar4 & ~(1 << (uVar1 & 0x1f));
    cVar3 = cVar3 + heap.u32((0x00631c6c) + (uVar1) * 4);
  }
  if (cVar3 != '\0') {
    bVar2 = FUN_005df40c(heap);
    bVar2 = (byte)((ushort)(bVar2 * extraout_CL) >>> 8);
    uVar4 = heap.u32((0x005f5658 + uVar5 * 4));
    do {
      uVar5 = 0;
      if (uVar4 != 0) {
        for (; (uVar4 >>> uVar5 & 1) == 0; uVar5 = uVar5 + 1) {
        
        }
      }
      uVar4 = uVar4 & ~(1 << (uVar5 & 0x1f));
      bVar6 = heap.u32((byte)(0x00631c6c) + (uVar5) * 4) <= bVar2;
      bVar2 = bVar2 - heap.u32((0x00631c6c) + (uVar5) * 4);
    } while (bVar6);
    return;
  }
  return;
}
