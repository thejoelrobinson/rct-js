// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418010.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, SUB41 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00416d00 } from "./416d00.js";
import { FUN_00416f60 } from "./416f60.js";
export function FUN_00418010(heap, param_1) {
  const __sp = heap.allocFrame(12);
  const __addr_param_1 = __sp + 0;
  const __addr_local_8 = __sp + 4;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar1 = ((heap.u32(__addr_param_1)) >>> 0);
  if (heap.u32(0x005f0270) == 0) {
    if ((0x40 < ((heap.u32(__addr_param_1)) | 0)) && (((heap.u32(__addr_param_1)) | 0) < 0x5b)) {
      return heap.u32(__addr_param_1) + 0x20;
    }
  } else {
    if (((heap.u32(__addr_param_1)) | 0) < 0x100) {
      if (heap.u32(0x005ee754) < 2) {
        uVar2 = ((((heap.u32(heap.u32(0x005ee548) + (heap.u32(__addr_param_1) * 2) * 4)) & 0xff) & 1) >>> 0);
      } else {
        uVar2 = (((regs.eax = FUN_00416f60(heap, heap.u32(__addr_param_1), 1))) >>> 0);
      }
      if (uVar2 == 0) {
        return uVar1;
      }
    }
    uVar2 = ((heap.u32(__addr_param_1)) >>> 0);
    if ((heap.u32(heap.u32(0x005ee548) + ((((uVar1) | 0) >>> 8 & 0xff) * 2 + 1) * 4) & 0x80) == 0) {
      heap.setU16((__addr_param_1 + 0), (((((uVar1) & 0xff)) & 0xffff)) & 0xffff);
      uVar3 = ((1) >>> 0);
    } else {
      heap.setU16((__addr_param_1 + 0), (CONCAT11(((uVar1) & 0xff), (((uVar1 >>> 8)) << 24 >> 24))) & 0xffff);
      heap.setU8((__addr_param_1 + 3), (SUB41(uVar2, 3)) & 0xff);
      heap.setU32((__addr_param_1 + 0), (((heap.u32(__addr_param_1)) & 0xffff)) >>> 0);
      uVar3 = ((2) >>> 0);
    }
    iVar4 = (((regs.eax = FUN_00416d00(heap, heap.u32(0x005f0270), 0x100, __addr_param_1, uVar3, __addr_local_8, 3, 0, 1))) >>> 0);
    if (iVar4 == 0) {
      return uVar1;
    }
    if (iVar4 == 1) {
      return heap.u32(__addr_local_8 + (0) * 4) & 0xff;
    }
    heap.setU32(__addr_param_1, ((heap.u32(__addr_local_8 + (0) * 4) >>> 8 & 0xff) << 8 | heap.u32(__addr_local_8 + (0) * 4) & 0xff) >>> 0);
  }
  return heap.u32(__addr_param_1);
} finally {
    heap.freeFrame(12);
  }
}
