// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40f8ba.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DeleteObject } from "../runtime/win32.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_0040f8ba(heap, param_1) {
  if (heap.u32((param_1 + 0x90)) == 0) {
    if (heap.u32((param_1 + 0x88)) != 0) {
      FUN_00413470(heap, heap.u32((param_1 + 0x88)));
    }
    if (heap.u32((param_1 + 0x8c)) != 0) {
      DeleteObject(heap, heap.u32((param_1 + 0x8c)));
    }
    FUN_00413470(heap, param_1);
  }
  return;
}
