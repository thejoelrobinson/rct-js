// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40b8fc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040ae98 } from "./40ae98.js";
import { FUN_0040b4d8 } from "./40b4d8.js";
export function FUN_0040b8fc(heap) {
  let uVar1 = 0;
  let local_8 = 0;
  if (heap.u32(0x005f12b4) < 2) {
    if (heap.u32(0x005ebf54) == 0) {
      local_8 = (((regs.eax = FUN_0040b4d8(heap))) >>> 0);
    } else {
      local_8 = (((regs.eax = FUN_0040ae98(heap))) >>> 0);
    }
    if (local_8 == 0) {
      uVar1 = ((0) >>> 0);
    } else {
      heap.setU32(0x005ebf48, (0) >>> 0);
      heap.setU32(0x005f0ef4, (0) >>> 0);
      heap.setU32(0x005f12a0, (0) >>> 0);
      heap.setU32(0x005ebe54, (0x00408e82) >>> 0);
      heap.setU32(0x005ebe58, (0x00408f00) >>> 0);
      heap.setU32(0x005ebe5c, (0x00408f53) >>> 0);
      heap.setU32(0x005ebe60, (0x0040904c) >>> 0);
      heap.setU32(0x005ebe70, (0x004090e3) >>> 0);
      heap.setU32(0x005ebe68, (0x0040963b) >>> 0);
      heap.setU32(0x005ebe6c, (0x00409549) >>> 0);
      heap.setU32(0x005ebe64, (0x004090d8) >>> 0);
      heap.setU32(0x005ebe74, (0x00409658) >>> 0);
      heap.setU32(0x005ebe78, (0x00409677) >>> 0);
      heap.setU32(0x005ebe7c, (0x00409736) >>> 0);
      heap.setU32(0x005ebe80, (0x00409af7) >>> 0);
      heap.setU32(0x005ebe84, (0x0040a3da) >>> 0);
      heap.setU32(0x005ebe88, (0x0040a497) >>> 0);
      heap.setU32(0x005ebe8c, (0x004097f7) >>> 0);
      heap.setU32(0x005ebe90, (0x00409a21) >>> 0);
      heap.setU32(0x005ebe94, (0x00409c1f) >>> 0);
      heap.setU32(0x005ebe98, (0x0040a006) >>> 0);
      heap.setU32(0x005ebe9c, (0x0040a182) >>> 0);
      heap.setU32(0x005ebea0, (0x0040a297) >>> 0);
      heap.setU32(0x005ebea4, (0x0040a579) >>> 0);
      heap.setU32(0x005ebea8, (0x0040a5f2) >>> 0);
      heap.setU32(0x005ebeac, (0x0040a611) >>> 0);
      heap.setU32(0x005ebeb0, (0x0040a73d) >>> 0);
      heap.setU32(0x005ebeb4, (0x0040a88b) >>> 0);
      heap.setU32(0x005ebeb8, (0x0040a972) >>> 0);
      heap.setU32(0x005e91cc, (0x0040a503) >>> 0);
      uVar1 = ((1) >>> 0);
    }
  } else {
    uVar1 = ((0) >>> 0);
  }
  return uVar1;
}
