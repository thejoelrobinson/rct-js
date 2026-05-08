// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/442816.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00442816(heap) {
  let bVar3 = 0;
  let unaff_ESI = 0;
  if (heap.u32((unaff_ESI + 0xc5)) != -1) {
    if ((heap.u32((unaff_ESI + 0xc6)) == '\x1e') || (heap.u32((unaff_ESI + 0xc6)) == '<')) {
      FUN_00440fe3(heap);
      pbVar1 = (unaff_ESI + 0x3b);
      bVar3 = heap.u32(pbVar1);
      heap.u32(pbVar1) = heap.u32(pbVar1) - 0x1e;
      if (bVar3 < 0x1e) {
        heap.u32((unaff_ESI + 0x3b)) = 0;
      }
    }
    pcVar2 = (unaff_ESI + 0xc6);
    heap.u32(pcVar2) = heap.u32(pcVar2) + -1;
    if (heap.u32(pcVar2) == '\0') {
      heap.u32((unaff_ESI + 0xc5)) = 0xff;
      FUN_005e5301(heap);
    }
  }
  return;
}
