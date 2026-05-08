// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/419c90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../runtime/win32.js";
import { FUN_00418ef0 } from "./418ef0.js";
import { FUN_00418f90 } from "./418f90.js";
import { FUN_00418fc0 } from "./418fc0.js";
export function FUN_00419c90(heap, param_1, param_2) {
  const __sp = heap.allocFrame(8);
  const __addr_local_8 = __sp + 0;
  const __addr_local_c = __sp + 4;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let uStack_b = 0;
  let uStack_a = 0;
  let uStack_6 = 0;
  let local_4 = 0;
  let uStack_2 = 0;
  local_14 = 0;
  heap.setU32(__addr_local_c, (0) >>> 0);
  uStack_b = 0;
  uStack_a = 0;
  heap.setU32(__addr_local_8, (0) >>> 0);
  uStack_6 = 0;
  uVar3 = heap.u32((param_2 + 10)) & 0x7fff;
  uVar1 = heap.u32((param_1 + 10)) & 0x7fff;
  uVar6 = (heap.u32((param_2 + 10)) ^ heap.u32((param_1 + 10))) & 0x8000;
  uVar4 = uVar3 + uVar1;
  local_4 = 0;
  uStack_2 = 0;
  if (((0x7ffe < uVar1) || (0x7ffe < uVar3)) || (0xbffd < uVar4)) {
    heap.u32(param_1 + (1) * 4) = 0;
    heap.u32(param_1) = 0;
    heap.u32(param_1 + (2) * 4) = (-(uint)(uVar6 != 0) & 0x80000000) + 0x7fff8000;
    return;
  }
  if (uVar4 < 0x3fc0) {
    heap.u32(param_1 + (2) * 4) = 0;
    heap.u32(param_1 + (1) * 4) = 0;
    heap.u32(param_1) = 0;
    return;
  }
  if (((uVar1 == 0) && (uVar4 = uVar4 + 1, (heap.u32(param_1 + (2) * 4) & 0x7fffffffU) == 0)) && ((heap.u32(param_1 + (1) * 4) == 0 && (heap.u32(param_1) == 0)))) {
    heap.u32((param_1 + 10)) = 0;
    return;
  }
  if (((uVar3 == 0) && (uVar4 = uVar4 + 1, (heap.u32(param_2 + (2) * 4) & 0x7fffffffU) == 0)) && ((heap.u32(param_2 + (1) * 4) == 0 && (heap.u32(param_2) == 0)))) {
    heap.u32(param_1 + (2) * 4) = 0;
    heap.u32(param_1 + (1) * 4) = 0;
    heap.u32(param_1) = 0;
    return;
  }
  local_20 = __addr_local_8;
  local_18 = 0;
  iVar5 = 5;
  do {
    if (0 < iVar5) {
      puVar8 = (param_2 + 2);
      puVar7 = (local_18 * 2 + param_1);
      local_10 = iVar5;
      do {
        iVar2 = FUN_00418ef0(heap, heap.u32((local_20 + -2)), (uint) * puVar8 * (uint) * puVar7, local_20 + -2);
        if (iVar2 != 0) {
          heap.u32(local_20) = heap.u32(local_20) + 1;
        }
        puVar7 = puVar7 + 1;
        puVar8 = puVar8 + -1;
        local_10 = local_10 + -1;
      } while (local_10 != 0);
    }
    local_20 = local_20 + 1;
    local_18 = local_18 + 1;
    iVar5 = iVar5 + -1;
  } while (0 < iVar5);
  uVar4 = uVar4 + 0xc002;
  while (0 < uVar4 && ((uStack_2 & 0x8000) == 0)) {
    FUN_00418f90(heap, __addr_local_c);
    uVar4 = uVar4 - 1;
  }
  if (uVar4 < 1) {
    uVar4 = uVar4 - 1;
    if (uVar4 < 0) {
      iVar5 = -uVar4;
      uVar4 = uVar4 + iVar5;
      do {
        if ((heap.u32(__addr_local_c) & 1) != 0) {
          local_14 = local_14 + 1;
        }
        FUN_00418fc0(heap, __addr_local_c);
        iVar5 = iVar5 + -1;
      } while (iVar5 != 0);
    }
    if (local_14 != 0) {
      heap.setU32(__addr_local_c, (heap.u32(__addr_local_c) | 1) >>> 0);
    }
  }
  if ((0x8000 < CONCAT11(heap, uStack_b, heap.u32(__addr_local_c))) || (iVar2 = CONCAT22(heap, local_4, uStack_6), iVar5 = CONCAT22(heap, heap.u32(__addr_local_8), uStack_a), (CONCAT22(heap, uStack_a, CONCAT11(heap, uStack_b, heap.u32(__addr_local_c))) & 0x1ffff) == 0x18000)) {
    if (CONCAT22(heap, heap.u32(__addr_local_8), uStack_a) == -1) {
      iVar5 = 0;
      if (CONCAT22(heap, local_4, uStack_6) == -1) {
        if (uStack_2 == 0xffff) {
          uStack_2 = 0x8000;
          uVar4 = uVar4 + 1;
          iVar2 = 0;
          iVar5 = 0;
        } else {
          uStack_2 = uStack_2 + 1;
          iVar2 = 0;
          iVar5 = 0;
        }
      } else {
        iVar2 = CONCAT22(heap, local_4, uStack_6) + 1;
      }
    } else {
      iVar5 = CONCAT22(heap, heap.u32(__addr_local_8), uStack_a) + 1;
      iVar2 = CONCAT22(heap, local_4, uStack_6);
    }
  }
  heap.setU32(__addr_local_8, ((iVar5 >>> 0x10)) >>> 0);
  uStack_a = iVar5;
  local_4 = (undefined2)(iVar2 >>> 0x10);
  uStack_6 = iVar2;
  if (0x7ffe < uVar4) {
    heap.u32(param_1 + (1) * 4) = 0;
    heap.u32(param_1) = 0;
    heap.u32(param_1 + (2) * 4) = (-(uint)(uVar6 != 0) & 0x80000000) + 0x7fff8000;
    return;
  }
  heap.u32(param_1) = uStack_a;
  heap.u32((param_1 + 2)) = CONCAT22(heap, uStack_6, heap.u32(__addr_local_8));
  heap.u32((param_1 + 6)) = CONCAT22(heap, uStack_2, local_4);
  heap.u32((param_1 + 10)) = uVar4 | uVar6;
  return;
} finally {
    heap.freeFrame(8);
  }
}
