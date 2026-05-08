// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e276.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
export function FUN_0042e276(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  let unaff_BX = 0;
  let unaff_BP = 0;
  let in_ZF = 0;
  FUN_00444bd4(heap);
  if (!in_ZF) {
    heap.u32((unaff_ESI + 0x46)) = unaff_BP;
    heap.u32((unaff_ESI + 0x2e)) = unaff_BX;
    heap.u32(unaff_ESI + (0x1e) * 4) = unaff_BX << 3;
    heap.u32(unaff_ESI + (0x14) * 4) = 0x21;
    heap.u32(unaff_ESI + (9) * 4) = 0x24;
    heap.u32(unaff_ESI + (0x15) * 4) = 0xc;
    heap.u32(unaff_ESI) = 2;
    FUN_00444927(heap);
    heap.u32(unaff_ESI + (1) * 4) = 6;
    heap.u32((unaff_ESI + 0x26)) = 0;
  }
  return CONCAT44(in_EDX, in_EAX);
}
