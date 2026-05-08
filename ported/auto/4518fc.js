// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4518fc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_0042c711 } from "./42c711.js";
export function FUN_004518fc(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00887442 = __sp + 0;
  const __addr_DAT_00887444 = __sp + 4;
  try {
  let in_EAX = 0;
  let in_EDX = 0;
  heap.u16(0x971e86) = heap.u32((__addr_DAT_00887442) + ((in_EDX & 0xff) * 0x130) * 4);
  unique0x00017200 = heap.u32((__addr_DAT_00887444) + ((in_EDX & 0xff) * 0x98) * 4);
  FUN_0042c711(heap);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
