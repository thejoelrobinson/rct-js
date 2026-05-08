// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e680e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005e687d } from "./5e687d.js";
export function FUN_005e680e(heap) {
  let in_AL = 0;
  let uVar1 = 0;
  let in_DX = 0;
  let extraout_DX = 0;
  let unaff_ESI = 0;
  if ((heap.u32(0x00991f30) >>> 3 & 1) != 0) {
    if (((heap.u32((unaff_ESI + 0x174)) == heap.u32(0x00991f5a)) && (heap.u32((unaff_ESI + 0x30)) == heap.u32(0x00991f58))) && (in_DX == heap.u32(0x00991f5c))) {
      uVar1 = FUN_005e687d(heap);
      return uVar1;
    }
    in_AL = FUN_005e687d(heap);
    in_DX = extraout_DX;
  }
  heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffffbf | 8) >>> 0);
  heap.setU32(0x00991f5b, (in_AL) >>> 0);
  heap.setU32(0x00991f5c, (in_DX) >>> 0);
  heap.setU32(0x00991f5a, (heap.u32((unaff_ESI + 0x174))) >>> 0);
  heap.setU32(0x00991f58, (heap.u32((unaff_ESI + 0x30))) >>> 0);
  return heap.u32((unaff_ESI + 0x30));
}
