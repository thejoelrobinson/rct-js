// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f1d3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
export function FUN_0042f1d3(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005f874c = __sp + 0;
  const __addr_DAT_005f831a = __sp + 4;
  const __addr_DAT_005f92e7 = __sp + 8;
  try {
  let in_EAX = 0;
  let iVar1 = 0;
  let in_EDX = 0;
  let cVar5 = 0;
  pcVar2 = __addr_DAT_005f874c;
  pcVar4 = __addr_DAT_005f831a;
  do {
    pcVar3 = pcVar4;
    cVar5 = heap.u32(pcVar2);
    heap.u32(pcVar3) = cVar5;
    pcVar2 = pcVar2 + 1;
    pcVar4 = pcVar3 + 1;
    if (cVar5 == '\\') {
      /* goto LAB_0042f1f0 */ throw new Error("goto LAB_0042f1f0 not supported");
    }
  } while (cVar5 != '\0');
  heap.u32(pcVar3) = '\\';
  LAB_0042f1f0: pcVar2 = 0x005f8898;
  do {
    cVar5 = heap.u32(pcVar2);
    heap.u32(pcVar4) = cVar5;
    pcVar2 = pcVar2 + 1;
    pcVar4 = pcVar4 + 1;
  } while (cVar5 != '\0');
  iVar1 = FUN_0040844b(heap, __addr_DAT_005f831a, __addr_DAT_005f92e7);
  if (iVar1 != -1) {
    cVar5 = heap.u32(0x005f941c);
    FUN_00408490(heap, iVar1);
    if (cVar5 == '~') {
      heap.setU32(0x005f853c, (heap.u32(0x005f853c) + -1) >>> 0);
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(12);
  }
}
