// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444bd4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_00444c74 } from "./444c74.js";
export function FUN_00444bd4(heap) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_00743ba2 = __sp + 0;
  const __addr_DAT_00743ba4 = __sp + 4;
  const __addr_DAT_00743ba6 = __sp + 8;
  const __addr_DAT_00743b9e = __sp + 12;
  const __addr_DAT_00743b96 = __sp + 16;
  const __addr_DAT_00743bb6 = __sp + 20;
  const __addr_DAT_00743ba8 = __sp + 24;
  const __addr_DAT_00743b9d = __sp + 28;
  const __addr_DAT_00743ba9 = __sp + 32;
  const __addr_DAT_00743ba0 = __sp + 36;
  const __addr_DAT_00743baa = __sp + 40;
  try {
  let uVar1 = 0;
  let unaff_BL = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  if ((unaff_BL & 2) == 0) {
    if (heap.u32(0x0087c3a0) < 1) {
      return;
    }
  } else {
    if (heap.u32(0x0087c3a0) <= (300 - heap.u32(0x0087c3a6))) {
    return;
  }
  }
  uVar2 = heap.u32(0x0087c394);
  iVar3 = uVar2 * 0x100;
  FUN_00444c74(heap);
  heap.u32((__addr_DAT_00743ba2) + (uVar2 * 0x80) * 4) = 0x8000;
  heap.u32((__addr_DAT_00743ba4) + (uVar2 * 0x80) * 4) = 0x8000;
  heap.u32((__addr_DAT_00743ba6) + (uVar2 * 0x80) * 4) = 0;
  LOCK();
  UNLOCK();
  uVar1 = heap.u32((__addr_DAT_00743b9e) + (uVar2 * 0x80) * 4);
  heap.u32((__addr_DAT_00743b96) + (uVar2 * 0x80) * 4) = heap.u32(0x00999f8e);
  heap.setU32(0x00999f8e, (uVar1) >>> 0);
  heap.u32((__addr_DAT_00743bb6 + iVar3)) = 0;
  heap.u32((__addr_DAT_00743ba8) + (iVar3) * 4) = 0x10;
  heap.u32((__addr_DAT_00743b9d) + (iVar3) * 4) = 0x14;
  heap.u32((__addr_DAT_00743ba9) + (iVar3) * 4) = 8;
  heap.u32((__addr_DAT_00743ba0 + iVar3)) = 0;
  heap.u32((__addr_DAT_00743baa + iVar3)) = 0x8000;
  return;
} finally {
    heap.freeFrame(44);
  }
}
