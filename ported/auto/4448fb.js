// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4448fb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00444927 } from "./444927.js";
export function FUN_004448fb(heap) {
  let in_EAX = 0;
  let in_EDX = 0;
  pcVar1 = 0x00743b94;
  do {
    if (heap.u32(pcVar1) != -1) {
      FUN_00444927(heap);
    }
    pcVar1 = pcVar1 + 0x100;
  } while (pcVar1 < 0x0087c394);
  return CONCAT44(heap, in_EDX, in_EAX);
}
