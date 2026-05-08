// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4363f1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_004363f1(heap) {
  let sVar1 = 0;
  let in_EAX = 0;
  let extraout_CX = 0;
  let in_EDX = 0;
  if ((heap.u32(0x0099a020) & 1) != 0) {
    do {
      do {
        sVar1 = FUN_005e5562(heap);
      } while ((extraout_CX + 0x20) <= heap.u32(0x0099a028));
    } while ((sVar1 + 0x20) <= heap.u32(0x0099a024));
  }
  return CONCAT44(heap, in_EDX, in_EAX);
}
