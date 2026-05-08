// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42df47.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
export function FUN_0042df47(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  let in_ZF = 0;
  FUN_00444bd4(heap);
  if (!in_ZF) {
    heap.u32(unaff_ESI + (0x14) * 4) = 0x2c;
    heap.u32(unaff_ESI + (9) * 4) = 0x20;
    heap.u32(unaff_ESI + (0x15) * 4) = 0x22;
    heap.u32(unaff_ESI) = 2;
    FUN_00444927(heap);
    heap.u32(unaff_ESI + (1) * 4) = 3;
    heap.u32((unaff_ESI + 0x26)) = 0;
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}
