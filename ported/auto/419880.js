// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/419880.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT12, CONCAT13, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00418f20 } from "./418f20.js";
import { FUN_00418f90 } from "./418f90.js";
import { FUN_00418fc0 } from "./418fc0.js";
import { FUN_00419c90 } from "./419c90.js";
import { FUN_00419f50 } from "./419f50.js";
export function FUN_00419880(heap, param_1, param_2, param_3, param_4, param_5, param_6) {
  const __sp = heap.allocFrame(30);
  const __addr_local_10 = __sp + 16;
  const __addr_local_1c = __sp + 4;
  const __addr_param_1 = __sp + 8;
  const __addr_local_1b = __sp + 5;
  const __addr_local_1a = __sp + 6;
  const __addr_local_19 = __sp + 7;
  const __addr_local_18 = __sp + 8;
  const __addr_local_17 = __sp + 9;
  const __addr_local_16 = __sp + 10;
  const __addr_local_15 = __sp + 11;
  const __addr_local_14 = __sp + 12;
  const __addr_local_13 = __sp + 13;
  const __addr_local_12 = __sp + 14;
  const __addr_local_11 = __sp + 15;
  const __addr_local_6 = __sp + 26;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let psVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let psVar6 = 0;
  let psVar7 = 0;
  let iVar8 = 0;
  let sVar9 = 0;
  let iVar10 = 0;
  let uStack_e = 0;
  let uStack_c = 0;
  let uStack_a = 0;
  let uStack_8 = 0;
  let cStack_5 = 0;
  LAB_00419be6: {
  psVar1 = ((param_6) >>> 0);
  heap.setU32(__addr_local_1c, (0xcc) >>> 0);
  heap.setU32(__addr_local_1b, (0xcc) >>> 0);
  heap.setU32(__addr_local_1a, (0xcc) >>> 0);
  heap.setU32(__addr_local_19, (0xcc) >>> 0);
  heap.setU32(__addr_local_18, (0xcc) >>> 0);
  heap.setU32(__addr_local_17, (0xcc) >>> 0);
  heap.setU32(__addr_local_16, (0xcc) >>> 0);
  heap.setU32(__addr_local_15, (0xcc) >>> 0);
  heap.setU32(__addr_local_14, (0xcc) >>> 0);
  heap.setU32(__addr_local_13, (0xcc) >>> 0);
  uVar4 = ((param_3 & 0x7fff) >>> 0);
  heap.setU32(__addr_local_12, (0xfb) >>> 0);
  heap.setU32(__addr_local_11, (0x3f) >>> 0);
  if ((param_3 & 0x8000) == 0) {
    heap.setU8((param_6 + 1), (0x20) & 0xff);
  } else {
    heap.setU8((param_6 + 1), (0x2d) & 0xff);
  }
  if (((((uVar4) << 16 >> 16) == 0) && (param_2 == 0)) && (heap.u32(__addr_param_1) == 0)) {
    heap.setU32(param_6, (0) & 0xffffffff);
    LAB_00419a8f: heap.setU8((psVar1 + ((1) * 2)), (0x20) & 0xff);
    heap.setU8((((psVar1) >>> 0) + 3), (1) & 0xff);
    heap.setU8((psVar1 + ((2) * 2)), (0x30) & 0xff);
    heap.setU8((((psVar1) >>> 0) + 5), (0) & 0xff);
    return 1;
  }
  if (((uVar4) << 16 >> 16) == 0x7fff) {
    heap.setU32(param_6, (1) & 0xffffffff);
    if (((param_2 != 0x80000000) || (heap.u32(__addr_param_1) != 0)) && ((param_2 & 0x40000000) == 0)) {
      heap.setU32((param_6 + (2) * 4), (0x2331) & 0xffffffff);
      heap.setU32((param_6 + (3) * 4), (0x4e53) & 0xffffffff);
      heap.setU32((param_6 + (4) * 4), (0x4e41) & 0xffffffff);
      heap.setU8((((param_6) >>> 0) + 3), (6) & 0xff);
      heap.setU8((param_6 + 5), (0) & 0xff);
      return 0;
    }
    if ((((param_3 & 0x8000) != 0) && (param_2 == 0xc0000000)) && (heap.u32(__addr_param_1) == 0)) {
      heap.setU32((param_6 + (2) * 4), (0x2331) & 0xffffffff);
      heap.setU32((param_6 + (3) * 4), (0x4e49) & 0xffffffff);
      heap.setU8((((param_6) >>> 0) + 3), (5) & 0xff);
      heap.setU32((param_6 + (4) * 4), (0x44) & 0xffffffff);
      return 0;
    }
    if ((param_2 == 0x80000000) && (heap.u32(__addr_param_1) == 0)) {
      heap.setU32((param_6 + (2) * 4), (0x2331) & 0xffffffff);
      heap.setU32((param_6 + (3) * 4), (0x4e49) & 0xffffffff);
      heap.setU8((((param_6) >>> 0) + 3), (5) & 0xff);
      heap.setU32((param_6 + (4) * 4), (0x46) & 0xffffffff);
      return 0;
    }
    heap.setU32((param_6 + (2) * 4), (0x2331) & 0xffffffff);
    heap.setU32((param_6 + (3) * 4), (0x4e51) & 0xffffffff);
    heap.setU32((param_6 + (4) * 4), (0x4e41) & 0xffffffff);
    heap.setU8((((param_6) >>> 0) + 3), (6) & 0xff);
    heap.setU8((param_6 + 5), (0) & 0xff);
    return 0;
  }
  heap.setU32(__addr_local_6, (((uVar4) & 0xff)) >>> 0);
  cStack_5 = (((((uVar4 >>> 8)) << 24 >> 24)) & 0xff);
  uStack_a = ((((param_2) & 0xffff)) & 0xffff);
  uStack_8 = ((((param_2 >>> 0x10) & 0xffff)) & 0xffff);
  uStack_e = ((((heap.u32(__addr_param_1)) & 0xffff)) & 0xffff);
  uStack_c = ((((((heap.u32(__addr_param_1)) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  heap.setU32(__addr_local_10, (0) >>> 0);
  sVar9 = (((((((uVar4 >>> 8) + (param_2 >>> 0x18) * 2) * 0x4d + -0x134312f4 + uVar4 * 0x4d10 >>> 0x10)) << 16 >> 16)) & 0xffff);
  (regs.eax = FUN_00419f50(heap, __addr_local_10, -((sVar9) >>> 0), 1));
  if (0x3ffe < CONCAT11(cStack_5, heap.u32(__addr_local_6))) {
    sVar9 = ((sVar9 + 1) & 0xffff);
    (regs.eax = FUN_00419c90(heap, __addr_local_10, __addr_local_1c));
  }
  heap.setU32(psVar1, (sVar9) & 0xffffffff);
  iVar8 = ((param_4) >>> 0);
  if (((param_5 & 1) != 0) && (iVar8 = ((param_4 + sVar9) >>> 0), param_4 + sVar9 < 1)) {
    heap.setU32(psVar1, (0) & 0xffffffff);
    /* goto LAB_00419a8f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00419880/LAB_00419a8f"); return 0;
  }
  if (0x15 < iVar8) {
    iVar8 = ((0x15) >>> 0);
  }
  uVar2 = ((CONCAT11(cStack_5, heap.u32(__addr_local_6))) & 0xffff);
  heap.setU32(__addr_local_6, (0) >>> 0);
  cStack_5 = ((0) & 0xff);
  iVar5 = ((8) >>> 0);
  iVar10 = ((uVar2 - 0x3ffe) >>> 0);
  do {
    (regs.eax = FUN_00418f90(heap, __addr_local_10));
    iVar5 = ((iVar5 + -1) >>> 0);
  } while (iVar5 != 0);
  if (iVar10 < 0) {
    for (uVar4 = ((-iVar10 & 0xff) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      (regs.eax = FUN_00418fc0(heap, __addr_local_10));
    }
  }
  psVar1 = ((psVar1 + ((2) * 2)) >>> 0);
  iVar8 = ((iVar8 + 1) >>> 0);
  psVar6 = ((psVar1) >>> 0);
  if (0 < iVar8) {
    do {
      heap.setU32(__addr_param_1, (CONCAT22(uStack_e, heap.u32(__addr_local_10))) >>> 0);
      param_2 = ((CONCAT22(uStack_a, uStack_c)) >>> 0);
      param_3 = ((CONCAT13(cStack_5, CONCAT12(heap.u32(__addr_local_6), uStack_8))) >>> 0);
      (regs.eax = FUN_00418f90(heap, __addr_local_10));
      (regs.eax = FUN_00418f90(heap, __addr_local_10));
      (regs.eax = FUN_00418f20(heap, __addr_local_10, __addr_param_1));
      (regs.eax = FUN_00418f90(heap, __addr_local_10));
      cVar3 = ((cStack_5 + 48) & 0xff);
      cStack_5 = ((0) & 0xff);
      heap.setI8(psVar6, (cVar3) & 0xff);
      psVar6 = (((((psVar6) >>> 0) + 1)) >>> 0);
      iVar8 = ((iVar8 + -1) >>> 0);
    } while (iVar8 != 0);
  }
  psVar7 = ((psVar6 + ((-1) * 2)) >>> 0);
  if (heap.i8((((psVar6) >>> 0) + -1)) < 53) {
    if (psVar1 <= psVar7) {
      do {
        if (((heap.i16(psVar7)) << 24 >> 24) != 48) {
          break;
        }
        psVar7 = (((((psVar7) >>> 0) + -1)) >>> 0);
      } while (psVar1 <= psVar7);
      if (psVar1 <= psVar7) {
        break LAB_00419be6;
      }
    }
    heap.setU8(psVar1, (0x30) & 0xff);
    heap.setU32(param_6, (0) & 0xffffffff);
    heap.setU8((param_6 + 1), (0x20) & 0xff);
    heap.setU8((((param_6) >>> 0) + 3), (1) & 0xff);
    heap.setU8((((param_6) >>> 0) + 5), (0) & 0xff);
    return 1;
  }
  if (psVar1 <= psVar7) {
    do {
      if (((heap.i16(psVar7)) << 24 >> 24) != 57) {
        break;
      }
      heap.setU8(psVar7, (0x30) & 0xff);
      psVar7 = (((((psVar7) >>> 0) + -1)) >>> 0);
    } while (psVar1 <= psVar7);
    if (psVar1 <= psVar7) {
      heap.setI8(psVar7, (((heap.i16(psVar7)) << 24 >> 24) + 1) & 0xff);
      cVar3 = (((((psVar7) << 24 >> 24) - ((param_6) << 24 >> 24)) + -3) & 0xff);
      heap.setI8((((param_6) >>> 0) + 3), (cVar3) & 0xff);
      heap.setU8((((param_6) >>> 0) + cVar3 + 4), (0) & 0xff);
      return 1;
    }
  }
  psVar7 = (((((psVar7) >>> 0) + 1)) >>> 0);
  heap.setU32(param_6, (heap.u32(param_6) + 1) & 0xffffffff);
  heap.setI8(psVar7, (heap.i8(psVar7) + 1) & 0xff);
  }
  cVar3 = (((((psVar7) << 24 >> 24) - ((param_6) << 24 >> 24)) + -3) & 0xff);
  heap.setI8((((param_6) >>> 0) + 3), (cVar3) & 0xff);
  heap.setU8((((param_6) >>> 0) + cVar3 + 4), (0) & 0xff);
  return 1;
} finally {
    heap.freeFrame(30);
  }
}
