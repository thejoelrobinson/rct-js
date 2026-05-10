// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4084ca.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDiskFreeSpaceA } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413170 } from "./413170.js";
export function FUN_004084ca(heap, param_1) {
  const __sp = heap.allocFrame(84);
  const __addr_local_54 = __sp + 0;
  const __addr_local_53 = __sp + 1;
  try {
  let BVar1 = 0;
  let local_58 = 0;
  local_58 = ((heap.i8(0x005ebf1c)) & 0xff);
  heap.setU32(__addr_local_54, (local_58 + ((param_1) << 24 >> 24) + -1) >>> 0);
  (regs.eax = FUN_00413170(heap, __addr_local_53, 0x005ebf20));
  if (param_1 == 0) {
    BVar1 = ((GetDiskFreeSpaceA(heap, ((0x0) | 0), ((0x005f112c) | 0), ((0x005f1124) | 0), ((0x005f1128) | 0), ((0x005f1120) | 0))) >>> 0);
    if (BVar1 == 0) {
      heap.setU32(0x005f112c, (0xffffffff) >>> 0);
    }
  } else {
    BVar1 = ((GetDiskFreeSpaceA(heap, __addr_local_54, ((0x005f112c) | 0), ((0x005f1124) | 0), ((0x005f1128) | 0), ((0x005f1120) | 0))) >>> 0);
    if (BVar1 == 0) {
      heap.setU32(0x005f112c, (0xffffffff) >>> 0);
    }
  }
  return;
} finally {
    heap.freeFrame(84);
  }
}
