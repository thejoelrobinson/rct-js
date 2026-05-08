// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/431636.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_004316f3 } from "./4316f3.js";
export function FUN_00431636(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  let unaff_BX = 0;
  let unaff_BP = 0;
  let sVar1 = 0;
  if ((((heap.u32(unaff_ESI + (2) * 4) < in_EDX) && (heap.u32(unaff_ESI + (3) * 4) < unaff_BP)) && (in_EAX < (heap.u32(unaff_ESI + (2) * 4) + heap.u32(unaff_ESI)))) && (sVar1 = heap.u32(unaff_ESI + (3) * 4) + heap.u32(unaff_ESI + (1) * 4), unaff_BX < sVar1)) {
    if (unaff_BX < heap.u32(unaff_ESI + (3) * 4)) {
      unaff_BX = heap.u32(unaff_ESI + (3) * 4);
    }
    if (sVar1 < unaff_BP) {
      unaff_BP = sVar1;
    }
    if (0x180 < (((unaff_BP - heap.u32(unaff_ESI + (3) * 4) << (heap.u32((unaff_ESI + 8)) & 0x1f)) + heap.u32(unaff_ESI + (5) * 4)) - ((unaff_BX - heap.u32(unaff_ESI + (3) * 4) << (heap.u32((unaff_ESI + 8)) & 0x1f)) + heap.u32(unaff_ESI + (5) * 4)))) {
      FUN_004316f3(heap);
    }
    FUN_004316f3(heap);
    return CONCAT44(in_EDX, in_EAX);
  }
  return CONCAT44(in_EDX, in_EAX);
}
