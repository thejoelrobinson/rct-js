// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411789.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _strcmp, mciSendStringA } from "../../runtime/win32.js";
export function FUN_00411789(heap) {
  const __sp = heap.allocFrame(9);
  const __addr_local_103 = __sp + 5;
  const __addr_local_104 = __sp + 4;
  try {
  let iVar1 = 0;
  let puVar2 = 0;
  heap.setU32(__addr_local_104, (heap.u32(0x005ec240)) >>> 0);
  puVar2 = ((__addr_local_103) >>> 0);
  for (iVar1 = ((0x3f) >>> 0); iVar1 != 0; iVar1 = (((iVar1 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar2, (0) & 0xffffffff);
    puVar2 = ((puVar2 + ((1) * 4)) >>> 0);
  }
  heap.setU16(puVar2, (0) & 0xffff);
  heap.setU8((((puVar2) | 0) + 2), (0) & 0xff);
  mciSendStringA(heap, 0x005ec244, __addr_local_104, 0x100, heap.u32(0x005e916c));
  iVar1 = ((_strcmp(heap, __addr_local_104, 0x005ec258)) >>> 0);
  heap.setU32(0x005ec1c8, (((iVar1 == 0) >>> 0)) >>> 0);
  return iVar1 == 0;
} finally {
    heap.freeFrame(9);
  }
}
