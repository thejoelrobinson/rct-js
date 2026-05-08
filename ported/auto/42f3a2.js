// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f3a2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_00408342 } from "./408342.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_0042f239 } from "./42f239.js";
export function FUN_0042f3a2(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f8d44 = __sp + 0;
  try {
  let in_EAX = 0;
  let iVar1 = 0;
  let in_EDX = 0;
  FUN_0042f239(heap);
  iVar1 = FUN_004083e1(heap, 0x12);
  if (iVar1 != -1) {
    heap.setU32(0x005f88a4, (iVar1) >>> 0);
    FUN_00408342(heap, iVar1, __addr_DAT_005f8d44, 0x5f);
    FUN_00408387(heap, heap.u32(0x005f88a4));
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(4);
  }
}
