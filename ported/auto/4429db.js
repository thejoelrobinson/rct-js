// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4429db.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { SBORROW4 } from "../../runtime/ghidra-builtins.js";
import { FUN_004447f6 } from "./4447f6.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_004429db(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_0070093a = __sp + 0;
  const __addr_DAT_0087c820 = __sp + 4;
  const __addr_DAT_00630828 = __sp + 8;
  try {
  let uVar2 = 0;
  let unaff_EBX = 0;
  let bVar3 = 0;
  uVar2 = ((__addr_DAT_0070093a - heap.u32(0x0087c3b4)) >>> 5 | (__addr_DAT_0070093a - heap.u32(0x0087c3b4)) * 0x8000000) - heap.u32(0x0087c3b8);
  uVar2 = (uVar2 >>> 7 | uVar2 * 0x2000000) + heap.u32(0x0087d0c8);
  if ((uVar2 >>> 3 | uVar2 * 0x20000000) != heap.u32(0x0087d79c)) {
    if (-1 < heap.u32(0x0087c3b4)) {
      heap.setU32(0x0087c3b4, (-heap.u32(0x0087c3b4)) >>> 0);
    }
    return;
  }
  if (heap.u32(0x0099c163) == '\0') {
    bVar3 = SBORROW4(heap.u32(0x0087c3b4), unaff_EBX);
    heap.setU32(0x0087c3b4, (heap.u32(0x0087c3b4) - unaff_EBX) >>> 0);
    if (bVar3) {
      heap.setU32(0x0087c3b4, (heap.u32(0x0087c3b4) + unaff_EBX) >>> 0);
      return;
    }
    uVar2 = heap.u32(0x0099c167);
    piVar1 = (__addr_DAT_0087c820 + uVar2);
    heap.u32(piVar1) = heap.u32(piVar1) - unaff_EBX;
    if ((heap.u32((__addr_DAT_00630828 + uVar2)) & 1) != 0) {
      heap.setU32(0x0087d304, (heap.u32(0x0087d304) - unaff_EBX) >>> 0);
    }
    heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 1) >>> 0);
    FUN_005e5301(heap);
    FUN_004447f6(heap);
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}
