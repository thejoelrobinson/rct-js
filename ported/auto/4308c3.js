// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4308c3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0042ee93 } from "./42ee93.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_00430113 } from "./430113.js";
export function FUN_004308c3(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00000016 = __sp + 0;
  const __addr_DAT_0099aa88 = __sp + 4;
  const __addr_DAT_005f8fb3 = __sp + 8;
  const __addr_DAT_0099a888 = __sp + 12;
  const __addr_DAT_005f888e = __sp + 16;
  try {
  let cVar1 = 0;
  pcVar2 = __addr_DAT_00000016;
  FUN_0042f239(heap);
  pcVar3 = __addr_DAT_0099aa88;
  do {
    cVar1 = heap.u32(pcVar2);
    heap.u32(pcVar3) = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar1 != '\0');
  pcVar3 = __addr_DAT_005f8fb3;
  pcVar2 = __addr_DAT_0099a888;
  do {
    pcVar4 = pcVar2;
    cVar1 = heap.u32(pcVar3);
    heap.u32(pcVar4) = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar2 = pcVar4 + 1;
  } while (cVar1 != '*');
  pcVar2 = __addr_DAT_005f888e;
  do {
    cVar1 = heap.u32(pcVar2);
    heap.u32(pcVar4) = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar4 = pcVar4 + 1;
  } while (cVar1 != '\0');
  FUN_0042ee93(heap);
  heap.setU32(0x0099fb78, (heap.u32(0x0099fb78) & 0xffdfffff) >>> 0);
  FUN_00430113(heap);
  heap.setU32(0x005f8897, (1) >>> 0);
  return;
} finally {
    heap.freeFrame(20);
  }
}
