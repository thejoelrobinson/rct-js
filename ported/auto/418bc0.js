// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418bc0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00417ce0 } from "./417ce0.js";
export function FUN_00418bc0(heap, param_1) {
  let uVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  iVar2 = (((regs.eax = FUN_00417ce0(heap, heap.u32(param_1 + (4) * 4)))) >>> 0);
  if (iVar2 == 0) {
    return 0;
  }
  if (param_1 == 0x005ee780) {
    iVar2 = ((0) >>> 0);
  } else {
    if (param_1 != 0x005ee7a0) {
      return 0;
    }
    iVar2 = ((1) >>> 0);
  }
  heap.setU32(0x005f0284, (heap.u32(0x005f0284) + 1) >>> 0);
  if ((heap.u32(param_1 + (3) * 4) & 0x10c) != 0) {
    return 0;
  }
  if (heap.u32((0x005f02e0) + (iVar2) * 4) == 0) {
    iVar3 = (((regs.eax = FUN_004133c0(heap, 0x1000))) >>> 0);
    heap.setU32(((0x005f02e0) + (iVar2) * 4), (iVar3) & 0xffffffff);
    if (iVar3 == 0) {
      heap.setU32((param_1 + (2) * 4), (param_1 + 5) & 0xffffffff);
      heap.setU32(param_1, (param_1 + 5) & 0xffffffff);
      heap.setU32((param_1 + (6) * 4), (2) & 0xffffffff);
      heap.setU32((param_1 + (1) * 4), (2) & 0xffffffff);
      heap.setU32((param_1 + (3) * 4), (heap.u32(param_1 + (3) * 4) | 0x1102) & 0xffffffff);
      return 1;
    }
  }
  uVar1 = ((heap.u32((0x005f02e0) + (iVar2) * 4)) >>> 0);
  heap.setU32((param_1 + (6) * 4), (0x1000) & 0xffffffff);
  heap.setU32((param_1 + (2) * 4), (uVar1) & 0xffffffff);
  heap.setU32(param_1, (uVar1) & 0xffffffff);
  heap.setU32((param_1 + (1) * 4), (0x1000) & 0xffffffff);
  LAB_00418c60: heap.setU32((param_1 + (3) * 4), (heap.u32(param_1 + (3) * 4) | 0x1102) & 0xffffffff);
  return 1;
}
