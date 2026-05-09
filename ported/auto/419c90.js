// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/419c90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00418ef0 } from "./418ef0.js";
import { FUN_00418f90 } from "./418f90.js";
import { FUN_00418fc0 } from "./418fc0.js";
export function FUN_00419c90(heap, param_1, param_2) {
  const __sp = heap.allocFrame(16);
  const __addr_local_8 = __sp + 8;
  const __addr_local_c = __sp + 4;
  const __addr_local_4 = __sp + 12;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let puVar7 = 0;
  let puVar8 = 0;
  let local_20 = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let uStack_b = 0;
  let uStack_a = 0;
  let uStack_6 = 0;
  let uStack_2 = 0;
  local_14 = ((0) >>> 0);
  heap.setU32(__addr_local_c, (0) >>> 0);
  uStack_b = ((0) & 0xff);
  uStack_a = ((0) & 0xffff);
  heap.setU32(__addr_local_8, (0) >>> 0);
  uStack_6 = ((0) & 0xffff);
  uVar3 = ((heap.u16((((param_2) >>> 0) + 10)) & 0x7fff) & 0xffff);
  uVar1 = ((heap.u16((((param_1) >>> 0) + 10)) & 0x7fff) & 0xffff);
  uVar6 = (((heap.u16((((param_2) >>> 0) + 10)) ^ heap.u16((((param_1) >>> 0) + 10))) & 0x8000) & 0xffff);
  uVar4 = ((uVar3 + uVar1) & 0xffff);
  heap.setU32(__addr_local_4, (0) >>> 0);
  uStack_2 = ((0) & 0xffff);
  if (((0x7ffe < uVar1) || (0x7ffe < uVar3)) || (0xbffd < uVar4)) {
    heap.setI32((param_1 + (1) * 4), (0) & 0xffffffff);
    heap.setU32(param_1, (0) & 0xffffffff);
    heap.setI32((param_1 + (2) * 4), ((-((uVar6 != 0) >>> 0) & 0x80000000) + 0x7fff8000) & 0xffffffff);
    return;
  }
  if (uVar4 < 0x3fc0) {
    heap.setI32((param_1 + (2) * 4), (0) & 0xffffffff);
    heap.setI32((param_1 + (1) * 4), (0) & 0xffffffff);
    heap.setU32(param_1, (0) & 0xffffffff);
    return;
  }
  if (((uVar1 == 0) && (uVar4 = ((uVar4 + 1) & 0xffff), (heap.i32(param_1 + (2) * 4) & 0x7fffffff) == 0)) && ((heap.i32(param_1 + (1) * 4) == 0 && (heap.i32(param_1) == 0)))) {
    heap.setU16((((param_1) >>> 0) + 10), (0) & 0xffff);
    return;
  }
  if (((uVar3 == 0) && (uVar4 = ((uVar4 + 1) & 0xffff), (heap.i32(param_2 + (2) * 4) & 0x7fffffff) == 0)) && ((heap.i32(param_2 + (1) * 4) == 0 && (heap.i32(param_2) == 0)))) {
    heap.setI32((param_1 + (2) * 4), (0) & 0xffffffff);
    heap.setI32((param_1 + (1) * 4), (0) & 0xffffffff);
    heap.setU32(param_1, (0) & 0xffffffff);
    return;
  }
  local_20 = ((__addr_local_8) >>> 0);
  local_18 = ((0) >>> 0);
  iVar5 = ((5) >>> 0);
  do {
    if (0 < iVar5) {
      puVar8 = (((param_2 + ((2) * 4))) >>> 0);
      puVar7 = (((local_18 * 2 + ((param_1) >>> 0))) >>> 0);
      local_10 = ((iVar5) >>> 0);
      do {
        iVar2 = (((regs.eax = FUN_00418ef0(heap, heap.u32((local_20 + ((-2) * 2))), heap.u32(puVar8) * (0) * puVar7, local_20 + ((-2) * 2)))) >>> 0);
        if (iVar2 != 0) {
          heap.setU32(local_20, (heap.i16(local_20) + 1) & 0xffffffff);
        }
        puVar7 = ((puVar7 + ((1) * 2)) >>> 0);
        puVar8 = ((puVar8 + ((-1) * 2)) >>> 0);
        local_10 = ((local_10 + -1) >>> 0);
      } while (local_10 != 0);
    }
    local_20 = ((local_20 + ((1) * 2)) >>> 0);
    local_18 = ((local_18 + 1) >>> 0);
    iVar5 = ((iVar5 + -1) >>> 0);
  } while (0 < iVar5);
  uVar4 = ((uVar4 + 0xc002) & 0xffff);
  while (0 < ((uVar4) << 16 >> 16) && ((uStack_2 & 0x8000) == 0)) {
    (regs.eax = FUN_00418f90(heap, __addr_local_c));
    uVar4 = ((uVar4 - 1) & 0xffff);
  }
  if (((uVar4) << 16 >> 16) < 1) {
    uVar4 = ((uVar4 - 1) & 0xffff);
    if (((uVar4) << 16 >> 16) < 0) {
      iVar5 = ((-((((uVar4) << 16 >> 16)) >>> 0)) >>> 0);
      uVar4 = ((uVar4 + ((iVar5) << 16 >> 16)) & 0xffff);
      do {
        if ((heap.u32(__addr_local_c) & 1) != 0) {
          local_14 = ((local_14 + 1) >>> 0);
        }
        (regs.eax = FUN_00418fc0(heap, __addr_local_c));
        iVar5 = ((iVar5 + -1) >>> 0);
      } while (iVar5 != 0);
    }
    if (local_14 != 0) {
      heap.setU32(__addr_local_c, (heap.u32(__addr_local_c) | 1) >>> 0);
    }
  }
  if ((0x8000 < CONCAT11(uStack_b, heap.u32(__addr_local_c))) || (iVar2 = ((CONCAT22(heap.u32(__addr_local_4), uStack_6)) >>> 0), iVar5 = ((CONCAT22(heap.u32(__addr_local_8), uStack_a)) >>> 0), (CONCAT22(uStack_a, CONCAT11(uStack_b, heap.u32(__addr_local_c))) & 0x1ffff) == 0x18000)) {
    if ((CONCAT22(heap.u32(__addr_local_8), uStack_a) | 0) == -1) {
      iVar5 = ((0) >>> 0);
      if ((CONCAT22(heap.u32(__addr_local_4), uStack_6) | 0) == -1) {
        if (uStack_2 == 0xffff) {
          uStack_2 = ((0x8000) & 0xffff);
          uVar4 = ((uVar4 + 1) & 0xffff);
          iVar2 = ((0) >>> 0);
          iVar5 = ((0) >>> 0);
        } else {
          uStack_2 = ((uStack_2 + 1) & 0xffff);
          iVar2 = ((0) >>> 0);
          iVar5 = ((0) >>> 0);
        }
      } else {
        iVar2 = ((CONCAT22(heap.u32(__addr_local_4), uStack_6) + 1) >>> 0);
      }
    } else {
      iVar5 = ((CONCAT22(heap.u32(__addr_local_8), uStack_a) + 1) >>> 0);
      iVar2 = ((CONCAT22(heap.u32(__addr_local_4), uStack_6)) >>> 0);
    }
  }
  heap.setU32(__addr_local_8, ((((((iVar5) >>> 0) >>> 0x10)) << 16 >> 16)) >>> 0);
  uStack_a = ((((iVar5) & 0xffff)) & 0xffff);
  heap.setU32(__addr_local_4, (((((iVar2) >>> 0) >>> 0x10) & 0xffff)) >>> 0);
  uStack_6 = ((((iVar2) & 0xffff)) & 0xffff);
  if (0x7ffe < uVar4) {
    heap.setI32((param_1 + (1) * 4), (0) & 0xffffffff);
    heap.setU32(param_1, (0) & 0xffffffff);
    heap.setI32((param_1 + (2) * 4), ((-((uVar6 != 0) >>> 0) & 0x80000000) + 0x7fff8000) & 0xffffffff);
    return;
  }
  heap.setU16(param_1, (uStack_a) & 0xffff);
  heap.setU32((((param_1) >>> 0) + 2), (CONCAT22(uStack_6, heap.u32(__addr_local_8))) & 0xffffffff);
  heap.setU32((((param_1) >>> 0) + 6), (CONCAT22(uStack_2, heap.u32(__addr_local_4))) & 0xffffffff);
  heap.setU16((((param_1) >>> 0) + 10), (uVar4 | uVar6) & 0xffff);
  return;
} finally {
    heap.freeFrame(16);
  }
}
