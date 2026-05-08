// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db5d7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005db5d7(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_00887498 = __sp + 0;
  const __addr_DAT_0088747e = __sp + 4;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  let iVar3 = 0;
  let unaff_ESI = 0;
  let iVar4 = 0;
  let in_ZF = 0;
  bVar1 = heap.u32((unaff_ESI + 0x30));
  sVar2 = heap.u32((unaff_ESI + 10));
  FUN_005e3b2b(heap);
  if (!in_ZF) {
    iVar4 = bVar1 * 0x260;
    iVar3 = heap.u32((unaff_ESI + 0x15a)) - 1;
    if (((-1 < iVar3) && (iVar3 < heap.u32((byte)(__addr_DAT_00887498) + (iVar4) * 4))) && (sVar2 == heap.u32((__addr_DAT_0088747e + iVar3 * 2 + iVar4)))) {
      FUN_005e43de(heap);
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
