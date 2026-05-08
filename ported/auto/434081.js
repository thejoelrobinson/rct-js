// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/434081.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005e43de } from "./5e43de.js";
export function FUN_00434081(heap) {
  let uVar1 = 0;
  let iVar2 = 0;
  let unaff_ESI = 0;
  iVar2 = heap.u32((unaff_ESI + 8));
  if ((iVar2 != 0) && (heap.u32((iVar2 + 0x10)) != '\0')) {
    heap.u32((iVar2 + 0x10)) = heap.u32((iVar2 + 0x10)) + -1;
    heap.u32((iVar2 + 0xc)) = heap.u32((iVar2 + 0xc)) >>> 1;
    heap.u32((iVar2 + 0xe)) = heap.u32((iVar2 + 0xe)) >>> 1;
    uVar1 = heap.u32((iVar2 + 0xe));
    heap.u32((unaff_ESI + 0x170)) = heap.u32((unaff_ESI + 0x170)) + (heap.u32((iVar2 + 0xc)) >>> 1);
    heap.u32((unaff_ESI + 0x172)) = heap.u32((unaff_ESI + 0x172)) + (uVar1 >>> 1);
    FUN_005e43de(heap);
  }
  return;
}
