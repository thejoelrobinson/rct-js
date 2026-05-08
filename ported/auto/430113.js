// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/430113.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00408387 } from "./408387.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_0042f6a8 } from "./42f6a8.js";
import { FUN_0042f6b3 } from "./42f6b3.js";
import { FUN_0042f74a } from "./42f74a.js";
import { FUN_0042fa02 } from "./42fa02.js";
import { FUN_0043018c } from "./43018c.js";
import { FUN_004301a9 } from "./4301a9.js";
export function FUN_00430113(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005f8fb3 = __sp + 0;
  const __addr_DAT_0099aa88 = __sp + 4;
  const __addr_DAT_005f92e0 = __sp + 8;
  try {
  let cVar1 = 0;
  let iVar2 = 0;
  FUN_0043018c(heap);
  pcVar3 = __addr_DAT_005f8fb3;
  pcVar4 = __addr_DAT_0099aa88;
  do {
    pcVar5 = pcVar4;
    cVar1 = heap.u32(pcVar3);
    heap.u32(pcVar5) = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar4 = pcVar5 + 1;
  } while (cVar1 != '*');
  pcVar4 = __addr_DAT_005f92e0;
  do {
    cVar1 = heap.u32(pcVar4);
    heap.u32(pcVar5) = cVar1;
    pcVar4 = pcVar4 + 1;
    pcVar5 = pcVar5 + 1;
  } while (cVar1 != '\0');
  heap.setU32(0x005f8d35, (0) >>> 0);
  iVar2 = FUN_004083e1(heap, __addr_DAT_0099aa88);
  if (iVar2 != -1) {
    heap.setU32(0x005f88a4, (iVar2) >>> 0);
    FUN_0042f6b3(heap);
    FUN_0042f6a8(heap);
    FUN_0042f74a(heap);
    FUN_0042fa02(heap);
    FUN_00408387(heap, heap.u32(0x005f88a4));
  }
  FUN_004301a9(heap);
  return;
} finally {
    heap.freeFrame(12);
  }
}
