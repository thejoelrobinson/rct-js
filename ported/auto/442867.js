// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/442867.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042c711 } from "./42c711.js";
import { FUN_00440fe3 } from "./440fe3.js";
export function FUN_00442867(heap) {
  let bVar3 = 0;
  let unaff_ESI = 0;
  if ((heap.u32((unaff_ESI + 200)) & 1) != 0) {
    if (((heap.u32((unaff_ESI + 0xc6)) == '\x01') || (heap.u32((unaff_ESI + 0xc6)) == '\x1e')) || (heap.u32((unaff_ESI + 0xc6)) == '<')) {
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
      heap.u32((unaff_ESI + 0xc6)) = 0x5a;
      heap.u16(0x971e86) = heap.u32((unaff_ESI + 0x22));
      unique0x00017200 = heap.u32((unaff_ESI + 0x9c));
      FUN_0042c711(heap);
    }
  }
  return;
}
