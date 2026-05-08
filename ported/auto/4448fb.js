// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4448fb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00444927 } from "./444927.js";
export function FUN_004448fb(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00743b94 = __sp + 0;
  const __addr_DAT_0087c394 = __sp + 4;
  try {
  let in_EAX = 0;
  let in_EDX = 0;
  let pcVar1 = 0;
  pcVar1 = __addr_DAT_00743b94;
  do {
    if (heap.u32(pcVar1) != -1) {
      FUN_00444927(heap);
    }
    pcVar1 = pcVar1 + 0x100;
  } while (pcVar1 < __addr_DAT_0087c394);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
