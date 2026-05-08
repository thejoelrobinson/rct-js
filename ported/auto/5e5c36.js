// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5c36.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e5c36(heap) {
  let puVar1 = 0;
  let psVar2 = 0;
  let uVar3 = 0;
  let sVar4 = 0;
  let unaff_ESI = 0;
  let puVar5 = 0;
  let puVar6 = 0;
  puVar5 = heap.u32(0x009a1164);
  if ((heap.u32(unaff_ESI + (0x19) * 4) & 3) == 0) {
    do {
      puVar6 = puVar5 + -0xbc;
      puVar1 = puVar5 + -0xa3;
      puVar5 = puVar6;
    } while ((heap.u32(puVar1) >>> 1 & 1) != 0);
    if ((0x9a013b < puVar6) && (puVar6 != unaff_ESI)) {
      do {
        LOCK();
        uVar3 = heap.u32(unaff_ESI + (0xbc) * 4);
        heap.setU32((unaff_ESI + (0xbc) * 4), (heap.u32(unaff_ESI)) >>> 0);
        UNLOCK();
        heap.setU32(unaff_ESI, (uVar3) >>> 0);
        unaff_ESI = unaff_ESI + 1;
      } while (unaff_ESI != puVar6);
      FUN_005e43de(heap);
    }
    if ((heap.u32(unaff_ESI + (0x10) * 4) + heap.u32(unaff_ESI + (0x12) * 4)) < 0x14) {
      sVar4 = heap.u32(unaff_ESI + (0x10) * 4);
      heap.setU32((unaff_ESI + (0x10) * 4), (heap.u32(unaff_ESI + (0x10) * 4) + (0x14 - sVar4)) >>> 0);
      if (heap.u32((unaff_ESI + 4)) != 0) {
        psVar2 = (heap.u32((unaff_ESI + 4)) + 4);
        heap.setU32(psVar2, (heap.u32(psVar2) + (0x14 - sVar4)) >>> 0);
      }
      FUN_005e43de(heap);
    }
  }
  return;
}
