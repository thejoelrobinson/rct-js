// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/457259.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_0042547b } from "./42547b.js";
export function FUN_00457259(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let unaff_ESI = 0;
  let bVar3 = 0;
  bVar3 = 0xffef < heap.u32((unaff_ESI + 0x12));
  uVar1 = FUN_0042547b(heap);
  if ((!bVar3) && (((heap.u32((0x008d7e2a) + (heap.u32((unaff_ESI + 0xc5))) * 4) & 2) == 0 || (uVar2 = (uVar1 & 0xf80) >>> 7, (heap.u32((byte)(0x008d422a) + ((uVar2 >>> 3) + ((extraout_ECX & 0xf80) >>> 7) * 4 + (uint) * (unaff_ESI + 0xc5) * 0x80) * 4) >>> (uVar2 & 7) & 1) != 0)))) {
    return CONCAT44(heap, in_EDX, uVar1);
  }
  return CONCAT44(heap, in_EDX, uVar1);
}
