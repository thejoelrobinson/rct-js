// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4428d6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00440fe3 } from "./440fe3.js";
export function FUN_004428d6(heap) {
  let bVar2 = 0;
  let unaff_ESI = 0;
  if ((1 < heap.u32(0x0087d7a0)) && (heap.u32((unaff_ESI + 0xf4)) = heap.u32((unaff_ESI + 0xf4)) + '\x01', heap.u32((unaff_ESI + 0xf4)) == -2)) {
    heap.u32((unaff_ESI + 0xf4)) = 0xdc;
    FUN_00440fe3(heap);
    pbVar1 = (unaff_ESI + 0x3b);
    bVar2 = heap.u32(pbVar1);
    heap.u32(pbVar1) = heap.u32(pbVar1) - 0x1e;
    if (bVar2 < 0x1e) {
      heap.u32((unaff_ESI + 0x3b)) = 0;
    }
  }
  return;
}
