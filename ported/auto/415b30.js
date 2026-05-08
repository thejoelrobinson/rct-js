// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415b30.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004179a0 } from "./4179a0.js";
import { FUN_00417a60 } from "./417a60.js";
import { FUN_00417c80 } from "./417c80.js";
import { FUN_00417ce0 } from "./417ce0.js";
export function FUN_00415b30(heap, param_1, param_2) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_005ee780 = __sp + 0;
  const __addr_DAT_005ee7a0 = __sp + 4;
  const __addr_param_1 = __sp + 8;
  const __addr_DAT_005ec460 = __sp + 12;
  const __addr_DAT_005f3e60 = __sp + 16;
  heap.setU32(__addr_param_1, (param_1) >>> 0);
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let iVar5 = 0;
  let iVar7 = 0;
  piVar4 = param_2;
  uVar1 = heap.u32(param_2 + (3) * 4);
  uVar2 = heap.u32(param_2 + (4) * 4);
  if (((uVar1 & 0x82) == 0) || ((uVar1 & 0x40) != 0)) {
    LAB_00415c50: heap.u32(param_2 + (3) * 4) = uVar1 | 0x20;
    return 0xffffffff;
  }
  iVar7 = 0;
  if ((uVar1 & 1) != 0) {
    heap.u32(param_2 + (1) * 4) = 0;
    if ((uVar1 & 0x10) == 0) {
      /* goto LAB_00415c50 */ throw new Error("goto LAB_00415c50 not supported");
    }
    heap.u32(param_2) = heap.u32(param_2 + (2) * 4);
    heap.u32(param_2 + (3) * 4) = uVar1 & 0xfffffffe;
  }
  uVar1 = heap.u32(param_2 + (3) * 4);
  heap.u32(param_2 + (1) * 4) = 0;
  heap.u32(param_2 + (3) * 4) = uVar1 & 0xffffffef | 2;
  if ((uVar1 & 0x10c) == 0) {
    if ((param_2 == __addr_DAT_005ee780) || (param_2 == __addr_DAT_005ee7a0)) {
      iVar5 = FUN_00417ce0(heap, uVar2);
      if (iVar5 != 0) {
        /* goto LAB_00415ba3 */ throw new Error("goto LAB_00415ba3 not supported");
      }
    }
    FUN_00417c80(heap, piVar4);
  }
  LAB_00415ba3: if ((heap.u32(piVar4 + (3) * 4) & 0x108U) == 0) {
    iVar5 = 1;
    iVar7 = FUN_00417a60(heap, uVar2, __addr_param_1, 1);
  } else {
    iVar3 = heap.u32(piVar4 + (2) * 4);
    iVar5 = heap.u32(piVar4) - iVar3;
    heap.u32(piVar4) = iVar3 + 1;
    heap.u32(piVar4 + (1) * 4) = heap.u32(piVar4 + (6) * 4) + -1;
    if (iVar5 < 1) {
      if (uVar2 == 0xffffffff) {
        puVar6 = __addr_DAT_005ec460;
      } else {
        puVar6 = (heap.u32((__addr_DAT_005f3e60) + (uVar2 >>> 5) * 4) + (uVar2 & 0x1f) * 8);
      }
      if ((heap.u32(puVar6 + (4) * 4) & 0x20) != 0) {
        FUN_004179a0(heap, uVar2, 0, 2);
      }
      heap.u32(heap.u32(piVar4 + (2) * 4)) = heap.u32(__addr_param_1);
    } else {
      iVar7 = FUN_00417a60(heap, uVar2, iVar3, iVar5);
      heap.u32(heap.u32(piVar4 + (2) * 4)) = heap.u32(__addr_param_1);
    }
  }
  if (iVar7 != iVar5) {
    heap.u32(piVar4 + (3) * 4) = heap.u32(piVar4 + (3) * 4) | 0x20;
    return 0xffffffff;
  }
  return heap.u32(__addr_param_1) & 0xff;
} finally {
    heap.freeFrame(20);
  }
}
