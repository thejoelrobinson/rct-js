// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441596.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_00441596(heap) {
  let bVar1 = 0;
  let cVar2 = 0;
  let in_EAX = 0;
  let in_EDX = 0;
  pcVar3 = heap.u32((0x006302d8) + (in_EAX) * 4);
  FUN_00458bcf(heap);
  for (pbVar4 = 0x0099a888; bVar1 = heap.u32(pbVar4), bVar1 != 0; pbVar4 = pbVar4 + 1) {
    if ((0x60 < bVar1) && (bVar1 < 0x7b)) {
      heap.u32(pbVar4) = heap.u32(pbVar4) - 0x20;
    }
  }
  pcVar5 = 0x0099a888;
  do {
    cVar2 = heap.u32(pcVar3);
    if ((cVar2 + '\x01') != heap.u32(pcVar5)) {
      return CONCAT44(heap, in_EDX, in_EAX);
    }
    pcVar5 = pcVar5 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar2 != -1);
  return CONCAT44(heap, in_EDX, in_EAX);
}
