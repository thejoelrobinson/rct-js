// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/438aac.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004077b3 } from "./4077b3.js";
import { FUN_00407a41 } from "./407a41.js";
import { FUN_00407c42 } from "./407c42.js";
import { FUN_004270f2 } from "./4270f2.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_009b30bc } from "./9b30bc.js";
import { FUN_009b438b } from "./9b438b.js";
import { FUN_009bb717 } from "./9bb717.js";
import { FUN_009bb766 } from "./9bb766.js";
export function FUN_00438aac(heap) {
  let iVar1 = 0;
  let bVar2 = 0;
  heap.setU32(0x005e9154, (1) >>> 0);
  if ((heap.u8(0x00628cb9) | 0) == -2) {
    (regs.eax = FUN_009b30bc(heap));
    (regs.eax = FUN_009bb766(heap));
    if (heap.u8(0x00628cba) == 1) {
      (regs.eax = FUN_00407a41(heap, 0x00628cbc));
      heap.setU8(0x00628cba, (0) & 0xff);
    }
    heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
    heap.setU32(0x00628cb4, (0) >>> 0);
  } else {
    switch (heap.u8(0x00628cb9)) {
      case 0:
        break;
      case 1:
        (regs.eax = FUN_009b30bc(heap));
        (regs.eax = FUN_009bb766(heap));
        heap.setU32(0x00628cb4, (0xfffffdbc) >>> 0);
        heap.setU8(0x00628cba, (0) & 0xff);
        if ((((heap.u32(0x006323f4) | 0) != -1) && (iVar1 = (((regs.eax = FUN_004077b3(heap, 0, 0x00628cbc, 0, 1))) >>> 0), iVar1 != 0)) && (iVar1 = (((regs.eax = FUN_00407c42(heap, 0x00628cbc, 1, 0, 0, 0))) >>> 0), iVar1 != 0)) {
          heap.setU8(0x00628cba, (1) & 0xff);
        }
        heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
        break;
      case 2:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 5) >>> 0);
        (regs.eax = FUN_009b30bc(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        if (0x1df < ((heap.u32(0x00628cb4)) >>> 0)) {
          (regs.eax = FUN_009b30bc(heap));
          (regs.eax = FUN_009bb766(heap));
          heap.setU32(0x00628cb4, (0xffffff8c) >>> 0);
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
        }
        break;
      case 3:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 5) >>> 0);
        (regs.eax = FUN_009b30bc(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        if (0x1df < ((heap.u32(0x00628cb4)) >>> 0)) {
          (regs.eax = FUN_009b30bc(heap));
          (regs.eax = FUN_009bb766(heap));
          heap.setU32(0x00628cb4, (0xffffff8c) >>> 0);
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
        }
        break;
      case 4:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 5) >>> 0);
        (regs.eax = FUN_009b30bc(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        if (heap.u32(0x00628cb4) == 0x103) {
          if (heap.u8(0x00628cba) == 1) {
            (regs.eax = FUN_00407a41(heap, 0x00628cbc));
            heap.setU8(0x00628cba, (0) & 0xff);
          }
          if ((((heap.u32(0x006323f4) | 0) != -1) && (iVar1 = (((regs.eax = FUN_004077b3(heap, 1, 0x00628cbc, 1, 1))) >>> 0), iVar1 != 0)) && (iVar1 = (((regs.eax = FUN_00407c42(heap, 0x00628cbc, 1, 0xfffffce0, 0, 15000))) >>> 0), iVar1 != 0)) {
            heap.setU8(0x00628cba, (1) & 0xff);
          }
        }
        if (0x2a7 < ((heap.u32(0x00628cb4)) >>> 0)) {
          (regs.eax = FUN_009b30bc(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009bb766(heap));
          if (heap.u8(0x00628cba) == 1) {
            (regs.eax = FUN_00407a41(heap, 0x00628cbc));
            heap.setU8(0x00628cba, (0) & 0xff);
          }
          if ((((heap.u32(0x006323f4) | 0) != -1) && (iVar1 = (((regs.eax = FUN_004077b3(heap, 10, 0x00628cbc, 0, 1))) >>> 0), iVar1 != 0)) && (iVar1 = (((regs.eax = FUN_00407c42(heap, 0x00628cbc, 0, 0, 0, 0))) >>> 0), iVar1 != 0)) {
            heap.setU8(0x00628cba, (1) & 0xff);
          }
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
          heap.setU32(0x00628cb4, (0) >>> 0);
        }
        break;
      case 5:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 0x400) >>> 0);
        if (heap.u32(0x00628cb4) < 0xff01) {
          (regs.eax = FUN_009bb766(heap));
        } else {
          (regs.eax = FUN_009bb766(heap));
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
          heap.setU32(0x00628cb4, (0) >>> 0);
        }
        break;
      case 6:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 1) >>> 0);
        if (0x4f < heap.u32(0x00628cb4)) {
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
          heap.setU32(0x00628cb4, (0xff00) >>> 0);
        }
        break;
      case NaN:
        bVar2 = ((heap.u32(0x00628cb4) < 0x400) & 0xff);
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) - 0x400) >>> 0);
        if (bVar2) {
          (regs.eax = FUN_009bb766(heap));
          heap.setU8(0x00628cb9, (-2) & 0xff);
        } else {
          (regs.eax = FUN_009bb766(heap));
        }
        break;
      default:
        heap.setU8(0x00628cb9, (0) & 0xff);
        (regs.eax = FUN_009bb717(heap));
        heap.setU32(0x005e9154, (0) >>> 0);
        (regs.eax = FUN_005e6028(heap));
    }
  }
  return (regs.eax = 0x1, regs.eax = FUN_004270f2(heap));
}
