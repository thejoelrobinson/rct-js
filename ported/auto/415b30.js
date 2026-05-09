// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415b30.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004179a0 } from "./4179a0.js";
import { FUN_00417a60 } from "./417a60.js";
import { FUN_00417c80 } from "./417c80.js";
import { FUN_00417ce0 } from "./417ce0.js";
export function FUN_00415b30(heap, param_1, param_2) {
  const __sp = heap.allocFrame(4);
  const __addr_param_1 = __sp + 0;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let piVar4 = 0;
  let iVar5 = 0;
  let puVar6 = 0;
  let iVar7 = 0;
  LAB_00415ba3: {
  piVar4 = ((param_2) >>> 0);
  uVar1 = ((heap.u32(param_2 + (3) * 4)) >>> 0);
  uVar2 = ((heap.u32(param_2 + (4) * 4)) >>> 0);
  if (((uVar1 & 0x82) == 0) || ((uVar1 & 0x40) != 0)) {
    LAB_00415c50: heap.setU32((param_2 + (3) * 4), (uVar1 | 0x20) & 0xffffffff);
    return 0xffffffff;
  }
  iVar7 = ((0) >>> 0);
  if ((uVar1 & 1) != 0) {
    heap.setU32((param_2 + (1) * 4), (0) & 0xffffffff);
    if ((uVar1 & 0x10) == 0) {
      /* goto LAB_00415c50 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00415b30/LAB_00415c50"); return 0;
    }
    heap.setU32(param_2, (heap.u32(param_2 + (2) * 4)) & 0xffffffff);
    heap.setU32((param_2 + (3) * 4), (uVar1 & 0xfffffffe) & 0xffffffff);
  }
  uVar1 = ((heap.u32(param_2 + (3) * 4)) >>> 0);
  heap.setU32((param_2 + (1) * 4), (0) & 0xffffffff);
  heap.setU32((param_2 + (3) * 4), (uVar1 & 0xffffffef | 2) & 0xffffffff);
  if ((uVar1 & 0x10c) == 0) {
    if ((param_2 == 0x005ee780) || (param_2 == 0x005ee7a0)) {
      iVar5 = (((regs.eax = FUN_00417ce0(heap, uVar2))) >>> 0);
      if (iVar5 != 0) {
        break LAB_00415ba3;
      }
    }
    (regs.eax = FUN_00417c80(heap, piVar4));
  }
  }
  if ((heap.i32(piVar4 + (3) * 4) & 0x108) == 0) {
    iVar5 = ((1) >>> 0);
    iVar7 = (((regs.eax = FUN_00417a60(heap, uVar2, __addr_param_1, 1))) >>> 0);
  } else {
    iVar3 = ((heap.i32(piVar4 + (2) * 4)) >>> 0);
    iVar5 = ((heap.i32(piVar4) - iVar3) >>> 0);
    heap.setU32(piVar4, (iVar3 + 1) & 0xffffffff);
    heap.setI32((piVar4 + (1) * 4), (heap.i32(piVar4 + (6) * 4) + -1) & 0xffffffff);
    if (iVar5 < 1) {
      if (uVar2 == 0xffffffff) {
        puVar6 = ((0x005ec460) >>> 0);
      } else {
        puVar6 = (((heap.u32((0x005f3e60) + (((uVar2) >>> 0) >>> 5) * 4) + (uVar2 & 0x1f) * 8)) >>> 0);
      }
      if ((heap.u8(puVar6 + (4)) & 0x20) != 0) {
        (regs.eax = FUN_004179a0(heap, uVar2, 0, 2));
      }
      heap.setU8(heap.i32(piVar4 + (2) * 4), (((heap.u32(__addr_param_1)) & 0xff)) & 0xff);
    } else {
      iVar7 = (((regs.eax = FUN_00417a60(heap, uVar2, iVar3, iVar5))) >>> 0);
      heap.setU8(heap.i32(piVar4 + (2) * 4), (((heap.u32(__addr_param_1)) & 0xff)) & 0xff);
    }
  }
  if (iVar7 != iVar5) {
    heap.setI32((piVar4 + (3) * 4), (heap.i32(piVar4 + (3) * 4) | 0x20) & 0xffffffff);
    return 0xffffffff;
  }
  return heap.u32(__addr_param_1) & 0xff;
} finally {
    heap.freeFrame(4);
  }
}
