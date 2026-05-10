// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb7bb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00405cc0 } from "./405cc0.js";
export function FUN_009bb7bb(heap) {
  let iVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let pcVar5 = 0;
  let puVar6 = 0;
  let puVar7 = 0;
  let pcVar8 = 0;
  let puVar9 = 0;
  if (heap.u8(0x009b2300) == 1) {
    pcVar8 = ((0x005f2000 + heap.u32(0x008dff1c) * 4) >>> 0);
    uVar3 = ((heap.u32(0x008dff18)) >>> 0);
    pcVar5 = ((heap.u32(0x008dff14)) >>> 0);
    do {
      heap.setU32(pcVar8, (-1 - (((-heap.i8(pcVar5) - 1) & 0xff) >>> 1)) & 0xffffffff);
      heap.setI8((pcVar8 + (1)), (-1 - (((-heap.i8(pcVar5 + (1)) - 1) & 0xff) >>> 1)) & 0xff);
      heap.setI8((pcVar8 + (2)), (-1 - (((-heap.i8(pcVar5 + (2)) - 1) & 0xff) >>> 1)) & 0xff);
      pcVar5 = ((pcVar5 + 3) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
      uVar3 = ((uVar3 - 1) >>> 0);
    } while (uVar3 != 0);
    (regs.eax = FUN_00405cc0(heap, 0x005f2000, 10, 0xec));
    heap.setU8(0x009b2300, (heap.u8(0x009b2300) + 1) & 0xff);
  } else {
    if (heap.u8(0x009b2300) == 2) {
      puVar9 = (((0x005f2000 + heap.u32(0x008dff1c) * 4)) >>> 0);
      uVar3 = ((heap.u32(0x008dff18)) >>> 0);
      pcVar5 = ((heap.u32(0x008dff14)) >>> 0);
      do {
        heap.setU32(puVar9, (heap.u16(pcVar5)) & 0xffffffff);
        heap.setI8((puVar9 + ((1) * 2)), (heap.i8(pcVar5 + (2))) & 0xff);
        pcVar5 = ((pcVar5 + 3) >>> 0);
        puVar9 = ((puVar9 + ((2) * 2)) >>> 0);
        uVar3 = ((uVar3 - 1) >>> 0);
      } while (uVar3 != 0);
    }
    puVar9 = ((0x005f2398) >>> 0);
    iVar4 = ((0) >>> 0);
    if (((heap.i32((0x00628a3c + heap.u32(0x008d7eb4) * 4)) | 0) != -1) && (iVar4 = ((1) >>> 0), heap.i32((0x00628a3c + heap.u32(0x008d7eb4) * 4)) != 0x200002a)) {
      iVar4 = ((2) >>> 0);
    }
    iVar1 = ((heap.u32((0x008dc0b4) + ((iVar4 + 999) * 4) * 4)) >>> 0);
    sVar2 = ((5) & 0xffff);
    puVar7 = ((((((((((((((0) - heap.u32(0x00999f94) >>> 1)) << 16 >> 16) << 7) >>> 0) * 0xf >>> 0x10)) << 16 >> 16) * 3) >>> 0) + iVar1)) >>> 0);
    do {
      heap.setU32(puVar9, (heap.u16(puVar7)) & 0xffffffff);
      heap.setU8((puVar9 + ((1) * 2)), (heap.u8((puVar7 + ((1) * 2)))) & 0xff);
      puVar6 = (((((puVar7) | 0) + 9)) >>> 0);
      if ((iVar1 + 0x2d) <= puVar6) {
        puVar6 = ((puVar7 + ((-0x12) * 2)) >>> 0);
      }
      puVar9 = ((puVar9 + ((2) * 2)) >>> 0);
      sVar2 = ((sVar2 + -1) & 0xffff);
      puVar7 = ((puVar6) >>> 0);
    } while (sVar2 != 0);
    iVar1 = ((heap.u32((0x008dc0b4) + ((iVar4 + 0x3ea) * 4) * 4)) >>> 0);
    sVar2 = ((5) & 0xffff);
    puVar7 = ((((((((((((((0) - heap.u32(0x00999f94) >>> 1)) << 16 >> 16) << 7) >>> 0) * 0xf >>> 0x10)) << 16 >> 16) * 3) >>> 0) + iVar1)) >>> 0);
    do {
      heap.setU32(puVar9, (heap.u16(puVar7)) & 0xffffffff);
      heap.setU8((puVar9 + ((1) * 2)), (heap.u8((puVar7 + ((1) * 2)))) & 0xff);
      puVar6 = (((((puVar7) | 0) + 9)) >>> 0);
      if ((iVar1 + 0x2d) <= puVar6) {
        puVar6 = ((puVar7 + ((-0x12) * 2)) >>> 0);
      }
      puVar9 = ((puVar9 + ((2) * 2)) >>> 0);
      sVar2 = ((sVar2 + -1) & 0xffff);
      puVar7 = ((puVar6) >>> 0);
    } while (sVar2 != 0);
    iVar4 = ((heap.u32((0x008dc0b4) + ((iVar4 + 0x3ed) * 4) * 4)) >>> 0);
    sVar2 = ((3) & 0xffff);
    puVar7 = (((((((((heap.u32(0x00999f94) * -0x3c0 & 0xffff) * 3 >>> 0x10)) << 16 >> 16) * 3) >>> 0) + iVar4)) >>> 0);
    do {
      heap.setU32(puVar9, (heap.u16(puVar7)) & 0xffffffff);
      heap.setU8((puVar9 + ((1) * 2)), (heap.u8((puVar7 + ((1) * 2)))) & 0xff);
      puVar6 = (((((puVar7) | 0) + 3)) >>> 0);
      if ((iVar4 + 9) <= puVar6) {
        puVar6 = ((puVar7 + ((-3) * 2)) >>> 0);
      }
      puVar9 = ((puVar9 + ((2) * 2)) >>> 0);
      sVar2 = ((sVar2 + -1) & 0xffff);
      puVar7 = ((puVar6) >>> 0);
    } while (sVar2 != 0);
    (regs.eax = FUN_00405cc0(heap, 0x005f2000, 0xe6, 0xd));
    if (heap.u8(0x009b2300) == 2) {
      (regs.eax = FUN_00405cc0(heap, 0x005f2000, 10, 0xec));
      heap.setU8(0x009b2300, (0) & 0xff);
    }
  }
  if (((heap.u32(0x005e910c) == 2) || (heap.u32(0x005e910c) == 1)) && (heap.u32(0x005f15b0) != 8)) {
    heap.setU32(0x005e9154, (1) >>> 0);
  }
  return;
}
