// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416f60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, SUB41 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00417860 } from "./417860.js";
export function FUN_00416f60(heap, param_1, param_2) {
  const __sp = heap.allocFrame(8);
  const __addr_param_1 = __sp + 0;
  const __addr_local_4 = __sp + 4;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  iVar2 = ((heap.u32(__addr_param_1)) >>> 0);
  if (heap.u32(__addr_param_1) + 1 < 0x101) {
    return heap.u16((heap.u32(0x005ee548) + heap.u32(__addr_param_1) * 2)) & param_2;
  }
  if ((heap.u32(heap.u32(0x005ee548) + ((heap.u32(__addr_param_1) >>> 8 & 0xff) * 2 + 1) * 4) & 0x80) == 0) {
    heap.setU16((__addr_param_1 + 0), (((((heap.u32(__addr_param_1)) & 0xff)) & 0xffff)) & 0xffff);
    uVar1 = ((1) >>> 0);
  } else {
    heap.setU16((__addr_param_1 + 0), (CONCAT11(((heap.u32(__addr_param_1)) & 0xff), (((((heap.u32(__addr_param_1)) >>> 0) >>> 8)) << 24 >> 24))) & 0xffff);
    heap.setU8((__addr_param_1 + 3), (SUB41(iVar2, 3)) & 0xff);
    heap.setU32((__addr_param_1 + 0), (((heap.u32(__addr_param_1)) & 0xffff)) >>> 0);
    uVar1 = ((2) >>> 0);
  }
  iVar2 = (((regs.eax = FUN_00417860(heap, 1, __addr_param_1, uVar1, __addr_local_4, 0, 0, 1))) >>> 0);
  if (iVar2 == 0) {
    return 0;
  }
  return heap.u32(__addr_local_4) & 0xffff & param_2;
} finally {
    heap.freeFrame(8);
  }
}
