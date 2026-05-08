// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/454300.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_0040d575 } from "./40d575.js";
export function FUN_00454300(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  if (((heap.u32(0x006323f8) & 1) != 0) && (heap.u32(0x00632978) != 1)) {
    FUN_0040d575(heap, 2);
    heap.setU32(0x00632978, (1) >>> 0);
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}
