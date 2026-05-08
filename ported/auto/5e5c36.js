// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5c36.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e5c36(heap) {
  let uVar3 = 0;
  let sVar4 = 0;
  puVar5 = heap.u32(0x009a1164);
  if ((heap.u32(unaff_ESI + (0x19) * 4) & 3) == 0) {
    do {
      puVar6 = puVar5 + -0xbc;
      puVar1 = puVar5 + -0xa3;
      puVar5 = puVar6;
    } while ((heap.u32(puVar1) >>> 1 & 1) != 0);
    if ((0x9a013b < puVar6) && (puVar6 != unaff_ESI)) {
      do {
        LOCK(heap);
        uVar3 = heap.u32(unaff_ESI + (0xbc) * 4);
        heap.u32(unaff_ESI + (0xbc) * 4) = heap.u32(unaff_ESI);
        UNLOCK(heap);
        heap.u32(unaff_ESI) = uVar3;
        unaff_ESI = unaff_ESI + 1;
      } while (unaff_ESI != puVar6);
      FUN_005e43de(heap);
    }
    if ((heap.u32(unaff_ESI + (0x10) * 4) + heap.u32(unaff_ESI + (0x12) * 4)) < 0x14) {
      sVar4 = heap.u32(unaff_ESI + (0x10) * 4);
      heap.u32(unaff_ESI + (0x10) * 4) = heap.u32(unaff_ESI + (0x10) * 4) + (0x14 - sVar4);
      if (heap.u32((unaff_ESI + 4)) != 0) {
        psVar2 = (heap.u32((unaff_ESI + 4)) + 4);
        heap.u32(psVar2) = heap.u32(psVar2) + (0x14 - sVar4);
      }
      FUN_005e43de(heap);
    }
  }
  return;
}
