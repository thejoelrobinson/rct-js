// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5bd8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT31, LOCK, UNLOCK } from "../runtime/win32.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_005e5bd8(heap) {
  let in_ECX = 0;
  let uVar1 = 0;
  if (unaff_ESI != 0x0) {
    (heap.u32(heap.u32((unaff_ESI + 2))))(CONCAT22(heap, CONCAT31(heap, (int3)(in_ECX >>> 8), heap.u32((unaff_ESI + 0xba))), heap.u32(unaff_ESI + (0x18) * 4)));
    FUN_005e3b2b(heap);
    LOCK(heap);
    puVar2 = heap.u32((unaff_ESI + 4));
    heap.u32((unaff_ESI + 4)) = 0;
    UNLOCK(heap);
    if (puVar2 != 0x0) {
      heap.u32(puVar2) = 0;
    }
    FUN_005e43de(heap);
    heap.setU32(0x009a1164, (heap.u32(0x009a1164) + -0x178) >>> 0);
    if (heap.u32(0x009a1164) - unaff_ESI != 0 && unaff_ESI <= heap.u32(0x009a1164)) {
      uVar1 = (uint)(heap.u32(0x009a1164) - unaff_ESI) >>> 1;
      puVar2 = unaff_ESI + 0xbc;
      for (; uVar1 != 0; uVar1 = uVar1 - 1) {
        heap.u32(unaff_ESI) = heap.u32(puVar2);
        puVar2 = puVar2 + 1;
        unaff_ESI = unaff_ESI + 1;
      }
    }
    FUN_005e6a83(heap);
  }
  return;
}
