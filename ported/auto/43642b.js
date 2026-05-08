// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43642b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_0043642b(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_0099a02c = __sp + 0;
  try {
  let in_EAX = 0;
  let in_EDX = 0;
  let iVar1 = 0;
  if ((heap.u32(0x0099a020) & 2) != 0) {
    for (iVar1 = 0; heap.u32((__addr_DAT_0099a02c + iVar1)) != -1; iVar1 = iVar1 + 1) {
      FUN_005e5562(heap);
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
