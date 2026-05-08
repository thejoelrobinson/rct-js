// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4084ca.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetDiskFreeSpaceA } from "../runtime/win32.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_004084ca(heap, param_1) {
  const __sp = heap.allocFrame(104);
  const __addr_DAT_005ebf20 = __sp + 0;
  const __addr_DAT_005f112c = __sp + 4;
  const __addr_DAT_005f1124 = __sp + 8;
  const __addr_DAT_005f1128 = __sp + 12;
  const __addr_DAT_005f1120 = __sp + 16;
  const __addr_local_54 = __sp + 20;
  const __addr_local_53 = __sp + 24;
  try {
  let BVar1 = 0;
  let local_58 = 0;
  local_58 = heap.u32(0x005ebf1c);
  heap.setU32(__addr_local_54, (local_58 + param_1 + -1) >>> 0);
  FUN_00413170(heap, __addr_local_53, __addr_DAT_005ebf20);
  if (param_1 == 0) {
    BVar1 = GetDiskFreeSpaceA(heap, 0x0, __addr_DAT_005f112c, __addr_DAT_005f1124, __addr_DAT_005f1128, __addr_DAT_005f1120);
    if (BVar1 == 0) {
      heap.setU32(0x005f112c, (0xffffffff) >>> 0);
    }
  } else {
    BVar1 = GetDiskFreeSpaceA(heap, __addr_local_54, __addr_DAT_005f112c, __addr_DAT_005f1124, __addr_DAT_005f1128, __addr_DAT_005f1120);
    if (BVar1 == 0) {
      heap.setU32(0x005f112c, (0xffffffff) >>> 0);
    }
  }
  return;
} finally {
    heap.freeFrame(104);
  }
}
