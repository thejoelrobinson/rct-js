// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f2de.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0040871f } from "./40871f.js";
import { FUN_004528a0 } from "./4528a0.js";
import { FUN_004528c4 } from "./4528c4.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0042f2de(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_005f91d9 = __sp + 0;
  const __addr_DAT_0099aa88 = __sp + 4;
  const __addr_DAT_0099a888 = __sp + 8;
  const __addr_DAT_005f92da = __sp + 12;
  const __addr_DAT_0099a988 = __sp + 16;
  try {
  let cVar1 = 0;
  FUN_00458bcf(heap);
  pcVar2 = __addr_DAT_005f91d9;
  pcVar3 = __addr_DAT_0099aa88;
  do {
    cVar1 = heap.u32(pcVar2);
    heap.u32(pcVar3) = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar1 != '\0');
  FUN_00458bcf(heap);
  FUN_004528a0(heap);
  FUN_0040871f(heap, 2, __addr_DAT_0099a888, __addr_DAT_0099aa88, __addr_DAT_005f92da, __addr_DAT_0099a988);
  FUN_004528c4(heap);
  return;
} finally {
    heap.freeFrame(20);
  }
}
