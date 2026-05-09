// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4183a0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004181f0 } from "./4181f0.js";
import { FUN_00418290 } from "./418290.js";
import { FUN_004182b0 } from "./4182b0.js";
import { FUN_004182c0 } from "./4182c0.js";
import { FUN_004182e0 } from "./4182e0.js";
export function FUN_004183a0(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(24);
  const __addr_local_18 = __sp + 0;
  const __addr_local_c = __sp + 12;
  const __addr_local_14 = __sp + 4;
  const __addr_local_10 = __sp + 8;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  LAB_00418521: {
  uVar1 = ((heap.u32(param_1 + (5) * 4)) & 0xffff);
  heap.setU32(__addr_local_14, (heap.u32((param_1 + 1))) >>> 0);
  heap.setU32(__addr_local_18, (heap.u32((param_1 + 3))) >>> 0);
  uVar4 = ((uVar1 & 0x7fff) >>> 0);
  iVar5 = ((uVar4 - 0x3fff) >>> 0);
  heap.setU32(__addr_local_10, (heap.u32(param_1) << 0x10) >>> 0);
  if (iVar5 == -0x3fff) {
    iVar5 = ((0) >>> 0);
    iVar2 = (((regs.eax = FUN_004182c0(heap, __addr_local_18))) >>> 0);
    if (iVar2 == 0) {
      (regs.eax = FUN_004182b0(heap, __addr_local_18));
      uVar3 = ((2) >>> 0);
      break LAB_00418521;
    }
  } else {
    (regs.eax = FUN_00418290(heap, __addr_local_c, __addr_local_18));
    iVar2 = (((regs.eax = FUN_004181f0(heap, __addr_local_18, heap.u32(param_3 + (2) * 4)))) >>> 0);
    if (iVar2 != 0) {
      iVar5 = ((uVar4 - 0x3ffe) >>> 0);
    }
    iVar2 = ((heap.u32(param_3 + (1) * 4)) >>> 0);
    if (iVar5 < iVar2 - heap.u32(param_3 + (2) * 4)) {
      (regs.eax = FUN_004182b0(heap, __addr_local_18));
      iVar5 = ((0) >>> 0);
      uVar3 = ((2) >>> 0);
      break LAB_00418521;
    }
    if (iVar5 <= iVar2) {
      (regs.eax = FUN_00418290(heap, __addr_local_18, __addr_local_c));
      (regs.eax = FUN_004182e0(heap, __addr_local_18, iVar2 - iVar5));
      (regs.eax = FUN_004181f0(heap, __addr_local_18, heap.u32(param_3 + (2) * 4)));
      (regs.eax = FUN_004182e0(heap, __addr_local_18, heap.u32(param_3 + (3) * 4) + 1));
      iVar5 = ((0) >>> 0);
      uVar3 = ((2) >>> 0);
      break LAB_00418521;
    }
    if (heap.u32(param_3) <= iVar5) {
      (regs.eax = FUN_004182b0(heap, __addr_local_18));
      heap.setU32(__addr_local_18, (heap.u32(__addr_local_18) | 0x80000000) >>> 0);
      (regs.eax = FUN_004182e0(heap, __addr_local_18, heap.u32(param_3 + (3) * 4)));
      iVar5 = ((heap.u32(param_3 + (5) * 4) + heap.u32(param_3)) >>> 0);
      uVar3 = ((1) >>> 0);
      break LAB_00418521;
    }
    iVar5 = ((heap.u32(param_3 + (5) * 4) + iVar5) >>> 0);
    heap.setU32(__addr_local_18, (heap.u32(__addr_local_18) & 0x7fffffff) >>> 0);
    (regs.eax = FUN_004182e0(heap, __addr_local_18, heap.u32(param_3 + (3) * 4)));
  }
  uVar3 = ((0) >>> 0);
  }
  heap.setU32(__addr_local_18, (iVar5 << (0x1f - ((heap.u32(param_3 + (3) * 4)) << 24 >> 24) & 0x1f) | -(((uVar1 & 0x8000) != 0) >>> 0) & 0x80000000 | heap.u32(__addr_local_18)) >>> 0);
  if (heap.u32(param_3 + (4) * 4) == 0x40) {
    heap.setU32((param_2 + (1) * 4), (heap.u32(__addr_local_18)) & 0xffffffff);
    heap.setU32(param_2, (heap.u32(__addr_local_14)) & 0xffffffff);
    return uVar3;
  }
  if (heap.u32(param_3 + (4) * 4) == 0x20) {
    heap.setU32(param_2, (heap.u32(__addr_local_18)) & 0xffffffff);
  }
  return uVar3;
} finally {
    heap.freeFrame(24);
  }
}
