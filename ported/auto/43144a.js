// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43144a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function FUN_0043144a(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005f96b4 = __sp + 0;
  const __addr_DAT_0064bc60 = __sp + 4;
  try {
  let uVar1 = 0;
  let in_EAX = 0;
  let iVar2 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  heap.setU32(0x0087d0bf, (0xff) >>> 0);
  if ((heap.u32(0x0087cccb) != '\0') && (heap.u32(0x0087c3d7) != 0)) {
    iVar2 = 0x10000;
    if (heap.u32(0x0087cccb) != '\x02') {
      iVar2 = 0x20000;
    }
    uVar1 = ((iVar2 - heap.u32(0x0087d0bc)) / heap.u32((__addr_DAT_005f96b4 + heap.u32(0x0087c3d7) * 2))) * 0x80 + CONCAT22(heap.u32(0x006e3b80), heap.u32(0x006e3b82));
    uVar3 = uVar1 >>> 0x10 & 7;
    heap.setU32(0x0087d0bf, ((undefined1)((uVar1 & 0xffff) * heap.u32((__addr_DAT_0064bc60 + uVar3 * 2)) >>> 0x10)) >>> 0);
    heap.setU32(0x0087d0c0, (uVar3) >>> 0);
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(8);
  }
}
