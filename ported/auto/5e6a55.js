// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6a55.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function FUN_005e6a55(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009a0018 = __sp + 0;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  pbVar2 = __addr_DAT_009a0018;
  pbVar3 = __addr_DAT_009a0018;
  while (true) {
    bVar1 = heap.u32(pbVar2);
    heap.u32(pbVar3) = bVar1;
    if (bVar1 == 0) {
      break;
    }
    if ((0x1f < bVar1) && ((((bVar1 < 0x7b || (bVar1 == 0xa3)) || (bVar1 == 0xab)) || ((bVar1 == 0xbb || (0xbe < bVar1)))))) {
      pbVar3 = pbVar3 + 1;
    }
    pbVar2 = pbVar2 + 1;
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
