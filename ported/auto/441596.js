// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441596.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_00441596(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_PTR_DAT_006302d8 = __sp + 0;
  const __addr_DAT_0099a888 = __sp + 4;
  try {
  let bVar1 = 0;
  let cVar2 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  let pcVar3 = 0;
  let pbVar4 = 0;
  let pcVar5 = 0;
  pcVar3 = heap.u32((__addr_PTR_DAT_006302d8) + (in_EAX) * 4);
  FUN_00458bcf(heap);
  for (pbVar4 = __addr_DAT_0099a888; bVar1 = heap.u32(pbVar4), bVar1 != 0; pbVar4 = pbVar4 + 1) {
    if ((0x60 < bVar1) && (bVar1 < 0x7b)) {
      heap.setU32(pbVar4, (heap.u32(pbVar4) - 0x20) >>> 0);
    }
  }
  pcVar5 = __addr_DAT_0099a888;
  do {
    cVar2 = heap.u32(pcVar3);
    if ((cVar2 + '\x01') != heap.u32(pcVar5)) {
      return CONCAT44(in_EDX, in_EAX);
    }
    pcVar5 = pcVar5 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar2 != -1);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
