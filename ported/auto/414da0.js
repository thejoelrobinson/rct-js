// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414da0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCPInfo } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00416d00 } from "./416d00.js";
import { FUN_00417860 } from "./417860.js";
export function FUN_00414da0(heap) {
  const __sp = heap.allocFrame(1408);
  const __addr_local_514 = __sp + 0;
  const __addr_local_500 = __sp + 20;
  const __addr_local_400 = __sp + 276;
  const __addr_local_300 = __sp + 532;
  const __addr_local_200 = __sp + 788;
  try {
  let BVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let pBVar5 = 0;
  let puVar6 = 0;
  let puVar7 = 0;
  BVar1 = ((GetCPInfo(heap, heap.u32(0x005f0228), __addr_local_514)) >>> 0);
  if (BVar1 == 1) {
    uVar2 = ((0) >>> 0);
    do {
      heap.setI8((((__addr_local_500) | 0) + uVar2), (((uVar2) << 24 >> 24)) & 0xff);
      uVar2 = ((uVar2 + 1) >>> 0);
    } while (uVar2 < 0x100);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00414da0"); })();
    if (heap.u32(heap.u8((__addr_local_514 + 4)) + (0) * 4) != 0) {
      pBVar5 = ((heap.u8((__addr_local_514 + 4)) + 1) >>> 0);
      do {
        uVar2 = ((((heap.u32(heap.u8((__addr_local_514 + 4)) + (0) * 4)) >>> 0)) >>> 0);
        if (uVar2 <= heap.i32(pBVar5)) {
          uVar3 = (((heap.i32(pBVar5) - uVar2) + 1) >>> 0);
          puVar7 = (((((__addr_local_500) | 0) + uVar2)) >>> 0);
          for (uVar4 = ((uVar3 >>> 2) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
            heap.setU32(puVar7, (0x20202020) & 0xffffffff);
            puVar7 = ((puVar7 + ((1) * 4)) >>> 0);
          }
          for (uVar3 = ((uVar3 & 3) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
            heap.setU8(puVar7, (0x20) & 0xff);
            puVar7 = (((((puVar7) | 0) + 1)) >>> 0);
          }
        }
        heap.setU32((heap.u8((__addr_local_514 + 4)) + (0) * 4), (heap.i32(pBVar5 + (1) * 4)) & 0xffffffff);
        pBVar5 = ((pBVar5 + ((2) * 4)) >>> 0);
      } while (heap.u32(heap.u8((__addr_local_514 + 4)) + (0) * 4) != 0);
    }
    (regs.eax = FUN_00417860(heap, 1, __addr_local_500, 0x100, __addr_local_200, heap.u32(0x005f0228), heap.u32(0x005f022c), 0));
    (regs.eax = FUN_00416d00(heap, heap.u32(0x005f022c), 0x100, __addr_local_500, 0x100, __addr_local_400, 0x100, heap.u32(0x005f0228), 0));
    (regs.eax = FUN_00416d00(heap, heap.u32(0x005f022c), 0x200, __addr_local_500, 0x100, __addr_local_300, 0x100, heap.u32(0x005f0228), 0));
    uVar2 = ((0) >>> 0);
    puVar6 = ((__addr_local_200) >>> 0);
    do {
      if ((heap.u16(puVar6) & 1) == 0) {
        if ((heap.u16(puVar6) & 2) == 0) {
          heap.setU32(((0x005f0128) + (uVar2) * 4), (0) & 0xffffffff);
        } else {
          heap.setU8((((0x005f0020) | 0) + uVar2 + 1), (heap.u8((((0x005f0020) | 0) + uVar2 + 1)) | 0x20) & 0xff);
          heap.setU32(((0x005f0128) + (uVar2) * 4), (heap.u32(__addr_local_300 + (uVar2) * 4)) & 0xffffffff);
        }
      } else {
        heap.setU8((((0x005f0020) | 0) + uVar2 + 1), (heap.u8((((0x005f0020) | 0) + uVar2 + 1)) | 0x10) & 0xff);
        heap.setU32(((0x005f0128) + (uVar2) * 4), (heap.u32(__addr_local_400 + (uVar2) * 4)) & 0xffffffff);
      }
      uVar2 = ((uVar2 + 1) >>> 0);
      puVar6 = ((puVar6 + ((1) * 2)) >>> 0);
    } while (uVar2 < 0x100);
    return;
  }
  uVar2 = ((0) >>> 0);
  do {
    if ((uVar2 < 0x41) || (0x5a < uVar2)) {
      if ((uVar2 < 0x61) || (0x7a < uVar2)) {
        heap.setU32(((0x005f0128) + (uVar2) * 4), (0) & 0xffffffff);
      } else {
        heap.setU8((((0x005f0020) | 0) + uVar2 + 1), (heap.u8((((0x005f0020) | 0) + uVar2 + 1)) | 0x20) & 0xff);
        heap.setU32(((0x005f0128) + (uVar2) * 4), (((uVar2) << 24 >> 24) + -0x20) & 0xffffffff);
      }
    } else {
      heap.setU8((((0x005f0020) | 0) + uVar2 + 1), (heap.u8((((0x005f0020) | 0) + uVar2 + 1)) | 0x10) & 0xff);
      heap.setU32(((0x005f0128) + (uVar2) * 4), (((uVar2) << 24 >> 24) + 32) & 0xffffffff);
    }
    uVar2 = ((uVar2 + 1) >>> 0);
  } while (uVar2 < 0x100);
  return;
} finally {
    heap.freeFrame(1408);
  }
}
