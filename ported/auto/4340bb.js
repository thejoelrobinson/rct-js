// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4340bb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e43de } from "./5e43de.js";
export function FUN_004340bb(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let unaff_ESI = 0;
  iVar3 = heap.u32((unaff_ESI + 8));
  if ((iVar3 != 0) && (heap.u32((iVar3 + 0x10)) != '\x02')) {
    heap.u32((iVar3 + 0x10)) = heap.u32((iVar3 + 0x10)) + '\x01';
    uVar1 = heap.u32((iVar3 + 0xc));
    uVar2 = heap.u32((iVar3 + 0xe));
    heap.u32((iVar3 + 0xc)) = heap.u32((iVar3 + 0xc)) << 1;
    heap.u32((iVar3 + 0xe)) = heap.u32((iVar3 + 0xe)) << 1;
    heap.u32((unaff_ESI + 0x170)) = heap.u32((unaff_ESI + 0x170)) - (uVar1 >>> 1);
    heap.u32((unaff_ESI + 0x172)) = heap.u32((unaff_ESI + 0x172)) - (uVar2 >>> 1);
    FUN_005e43de(heap);
  }
  return;
}
