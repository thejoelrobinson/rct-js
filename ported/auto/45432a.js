// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45432a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0040d575 } from "./40d575.js";
export function FUN_0045432a(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  if (((heap.u32(0x006323f8) & 1) != 0) && (heap.u32(0x0063297c) != '\0')) {
    FUN_0040d575(heap, 3);
  }
  heap.setU32(0x0063297c, (0) >>> 0);
  return CONCAT44(in_EDX, in_EAX);
}
