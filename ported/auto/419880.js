// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/419880.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT12, CONCAT13, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { FUN_00418f20 } from "./418f20.js";
import { FUN_00418f90 } from "./418f90.js";
import { FUN_00418fc0 } from "./418fc0.js";
import { FUN_00419c90 } from "./419c90.js";
import { FUN_00419f50 } from "./419f50.js";
export function FUN_00419880(heap, param_1, param_2, param_3, param_4, param_5, param_6) {
  const __sp = heap.allocFrame(12);
  const __addr_local_10 = __sp + 0;
  const __addr_local_1c = __sp + 4;
  const __addr_param_1 = __sp + 8;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let uVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let iVar8 = 0;
  let sVar9 = 0;
  let iVar10 = 0;
  let local_1b = 0;
  let local_1a = 0;
  let local_19 = 0;
  let local_18 = 0;
  let local_17 = 0;
  let local_16 = 0;
  let local_15 = 0;
  let local_14 = 0;
  let local_13 = 0;
  let local_12 = 0;
  let local_11 = 0;
  let uStack_e = 0;
  let uStack_c = 0;
  let uStack_a = 0;
  let uStack_8 = 0;
  let local_6 = 0;
  let cStack_5 = 0;
  psVar1 = param_6;
  heap.setU32(__addr_local_1c, (0xcc) >>> 0);
  local_1b = 0xcc;
  local_1a = 0xcc;
  local_19 = 0xcc;
  local_18 = 0xcc;
  local_17 = 0xcc;
  local_16 = 0xcc;
  local_15 = 0xcc;
  local_14 = 0xcc;
  local_13 = 0xcc;
  uVar4 = param_3 & 0x7fff;
  local_12 = 0xfb;
  local_11 = 0x3f;
  if ((param_3 & 0x8000) == 0) {
    heap.u32((param_6 + 1)) = 0x20;
  } else {
    heap.u32((param_6 + 1)) = 0x2d;
  }
  if (((uVar4 == 0) && (param_2 == 0)) && (heap.u32(__addr_param_1) == 0)) {
    heap.u32(param_6) = 0;
    LAB_00419a8f: heap.u32((psVar1 + 1)) = 0x20;
    heap.u32((psVar1 + 3)) = 1;
    heap.u32((psVar1 + 2)) = 0x30;
    heap.u32((psVar1 + 5)) = 0;
    return 1;
  }
  if (uVar4 == 0x7fff) {
    heap.u32(param_6) = 1;
    if (((param_2 != 0x80000000) || (heap.u32(__addr_param_1) != 0)) && ((param_2 & 0x40000000) == 0)) {
      heap.u32(param_6 + (2) * 4) = 0x2331;
      heap.u32(param_6 + (3) * 4) = 0x4e53;
      heap.u32(param_6 + (4) * 4) = 0x4e41;
      heap.u32((param_6 + 3)) = 6;
      heap.u32((param_6 + 5)) = 0;
      return 0;
    }
    if ((((param_3 & 0x8000) != 0) && (param_2 == 0xc0000000)) && (heap.u32(__addr_param_1) == 0)) {
      heap.u32(param_6 + (2) * 4) = 0x2331;
      heap.u32(param_6 + (3) * 4) = 0x4e49;
      heap.u32((param_6 + 3)) = 5;
      heap.u32(param_6 + (4) * 4) = 0x44;
      return 0;
    }
    if ((param_2 == 0x80000000) && (heap.u32(__addr_param_1) == 0)) {
      heap.u32(param_6 + (2) * 4) = 0x2331;
      heap.u32(param_6 + (3) * 4) = 0x4e49;
      heap.u32((param_6 + 3)) = 5;
      heap.u32(param_6 + (4) * 4) = 0x46;
      return 0;
    }
    heap.u32(param_6 + (2) * 4) = 0x2331;
    heap.u32(param_6 + (3) * 4) = 0x4e51;
    heap.u32(param_6 + (4) * 4) = 0x4e41;
    heap.u32((param_6 + 3)) = 6;
    heap.u32((param_6 + 5)) = 0;
    return 0;
  }
  local_6 = uVar4;
  cStack_5 = (uVar4 >>> 8);
  uStack_a = param_2;
  uStack_8 = (undefined2)(param_2 >>> 0x10);
  uStack_e = heap.u32(__addr_param_1);
  uStack_c = (undefined2)(heap.u32(__addr_param_1) >>> 0x10);
  heap.setU32(__addr_local_10, (0) >>> 0);
  sVar9 = (((uVar4 >>> 8) + (param_2 >>> 0x18) * 2) * 0x4d + -0x134312f4 + uVar4 * 0x4d10 >>> 0x10);
  FUN_00419f50(heap, __addr_local_10, -sVar9, 1);
  if (0x3ffe < CONCAT11(cStack_5, local_6)) {
    sVar9 = sVar9 + 1;
    FUN_00419c90(heap, __addr_local_10, __addr_local_1c);
  }
  heap.u32(psVar1) = sVar9;
  iVar8 = param_4;
  if (((param_5 & 1) != 0) && (iVar8 = param_4 + sVar9, param_4 + sVar9 < 1)) {
    heap.u32(psVar1) = 0;
    /* goto LAB_00419a8f */ throw new Error("goto LAB_00419a8f not supported");
  }
  if (0x15 < iVar8) {
    iVar8 = 0x15;
  }
  uVar2 = CONCAT11(cStack_5, local_6);
  local_6 = 0;
  cStack_5 = '\0';
  iVar5 = 8;
  iVar10 = uVar2 - 0x3ffe;
  do {
    FUN_00418f90(heap, __addr_local_10);
    iVar5 = iVar5 + -1;
  } while (iVar5 != 0);
  if (iVar10 < 0) {
    for (uVar4 = -iVar10 & 0xff; uVar4 != 0; uVar4 = uVar4 - 1) {
      FUN_00418fc0(heap, __addr_local_10);
    }
  }
  psVar1 = psVar1 + 2;
  iVar8 = iVar8 + 1;
  psVar6 = psVar1;
  if (0 < iVar8) {
    do {
      heap.setU32(__addr_param_1, (CONCAT22(uStack_e, heap.u32(__addr_local_10))) >>> 0);
      param_2 = CONCAT22(uStack_a, uStack_c);
      param_3 = CONCAT13(cStack_5, CONCAT12(local_6, uStack_8));
      FUN_00418f90(heap, __addr_local_10);
      FUN_00418f90(heap, __addr_local_10);
      FUN_00418f20(heap, __addr_local_10, __addr_param_1);
      FUN_00418f90(heap, __addr_local_10);
      cVar3 = cStack_5 + '0';
      cStack_5 = '\0';
      heap.u32(psVar6) = cVar3;
      psVar6 = (psVar6 + 1);
      iVar8 = iVar8 + -1;
    } while (iVar8 != 0);
  }
  psVar7 = psVar6 + -1;
  if (heap.u32((psVar6 + -1)) < '5') {
    if (psVar1 <= psVar7) {
      do {
        if (heap.u32(psVar7) != '0') {
          break;
        }
        psVar7 = (psVar7 + -1);
      } while (psVar1 <= psVar7);
      if (psVar1 <= psVar7) {
        /* goto LAB_00419be6 */ throw new Error("goto LAB_00419be6 not supported");
      }
    }
    heap.u32(psVar1) = 0x30;
    heap.u32(param_6) = 0;
    heap.u32((param_6 + 1)) = 0x20;
    heap.u32((param_6 + 3)) = 1;
    heap.u32((param_6 + 5)) = 0;
    return 1;
  }
  if (psVar1 <= psVar7) {
    do {
      if (heap.u32(psVar7) != '9') {
        break;
      }
      heap.u32(psVar7) = 0x30;
      psVar7 = (psVar7 + -1);
    } while (psVar1 <= psVar7);
    if (psVar1 <= psVar7) {
      heap.u32(psVar7) = heap.u32(psVar7) + '\x01';
      /* goto LAB_00419be6 */ throw new Error("goto LAB_00419be6 not supported");
    }
  }
  psVar7 = (psVar7 + 1);
  heap.u32(param_6) = heap.u32(param_6) + 1;
  heap.u32(psVar7) = heap.u32(psVar7) + '\x01';
  LAB_00419be6: cVar3 = (psVar7 - param_6) + -3;
  heap.u32((param_6 + 3)) = cVar3;
  heap.u32((param_6 + cVar3 + 4)) = 0;
  return 1;
} finally {
    heap.freeFrame(12);
  }
}
