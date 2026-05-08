// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3652.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../runtime/win32.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005e3f31 } from "./5e3f31.js";
export function FUN_005e3652(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_0099a887 = __sp + 0;
  const __addr_DAT_009a15a8 = __sp + 4;
  try {
  let sVar1 = 0;
  let extraout_CX = 0;
  let in_EDX = 0;
  let iVar2 = 0;
  let unaff_EDI = 0;
  if (((unaff_ESI != 0x0) && (in_EDX != -1)) && ((heap.u32(heap.u32(unaff_ESI)))(), heap.u32((unaff_EDI + 0xe)) != -1)) {
    heap.setU32(0x00991f49, (heap.u32((unaff_ESI + 0x5d))) >>> 0);
    heap.setU32(0x00991f4a, (heap.u32((unaff_ESI + 0xc))) >>> 0);
    heap.setU32(0x00991f4c, (in_EDX) >>> 0);
    sVar1 = (heap.u32(heap.u32(unaff_ESI + (1) * 4)))(unaff_EDI, in_EDX, heap.u32(0x00991f4a));
    if (sVar1 != -1) {
      FUN_00458bcf(heap, unaff_ESI, unaff_EDI, in_EDX);
      heap.setU32(0x00971e84, (0xe0) >>> 0);
      FUN_00458a7c(heap);
      iVar2 = CONCAT22(heap, 0xe, extraout_CX + 4);
      if (200 < (ushort)(extraout_CX + 4)) {
        iVar2 = (uint)(byte)((extraout_CX / 0xab) + 1) * 0xa0000 + 0x400c8;
      }
      pcVar4 = __addr_DAT_0099a887;
      while (pcVar3 = pcVar4 + 1, heap.u32(pcVar3) != '\0') {
        pcVar4 = pcVar3;
        if (heap.u32(pcVar3) == '\x05') {
          iVar2 = CONCAT22(heap, ((uint)(iVar2 + 0xa0000) >>> 0x10), (ushort)((iVar2 + 0xa0000) + 0x32U) >>> 1);
        }
      }
      heap.setU32(0x009a15ac, (iVar2) >>> 0);
      heap.setU32(0x009a15b0, ((undefined2)(iVar2 >>> 0x10)) >>> 0);
      FUN_005e3f31(heap);
      heap.u32((pcVar4 + 0x1d)) = __addr_DAT_009a15a8;
      heap.u32((pcVar4 + 0x15b)) = heap.u32((unaff_EDI + 0xe));
      heap.u32((pcVar4 + 0x15d)) = heap.u32(0x00971e86);
      heap.u32((pcVar4 + 0x161)) = heap.u32(0x00971e8a);
      heap.setU32(0x00991f54, (0) >>> 0);
    }
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
