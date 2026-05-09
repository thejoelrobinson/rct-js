// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42ef8a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004039bc } from "./4039bc.js";
import { FUN_00405653 } from "./405653.js";
import { FUN_00405949 } from "./405949.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f199 } from "./42f199.js";
import { FUN_0042f1d3 } from "./42f1d3.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005df472 } from "./5df472.js";
export function FUN_0042ef8a(heap) {
  let cVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let pcVar5 = 0;
  let pcVar6 = 0;
  let pcVar7 = 0;
  iVar2 = (((regs.eax = FUN_00405653(heap, 0x005f8540, 0x005f8850))) >>> 0);
  if (iVar2 == 0) {
    heap.setU32(0x005f8648, (0) >>> 0);
    heap.setU32(0x005f874c, (0) >>> 0);
    heap.setU32(0x005f8540, (0) >>> 0);
  } else {
    pcVar5 = ((0x005f8648) >>> 0);
    pcVar6 = ((0x005f8da3) >>> 0);
    do {
      pcVar7 = ((pcVar6) >>> 0);
      cVar1 = ((heap.i8(pcVar5)) & 0xff);
      heap.setU32(pcVar7, (cVar1) & 0xffffffff);
      pcVar5 = ((pcVar5 + 1) >>> 0);
      pcVar6 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
    heap.setI8((pcVar7 + (0)), (92) & 0xff);
    heap.setI8((pcVar7 + (1)), (0) & 0xff);
    pcVar5 = ((0x005f8648) >>> 0);
    pcVar6 = ((0x005f8ea4) >>> 0);
    do {
      pcVar7 = ((pcVar6) >>> 0);
      cVar1 = ((heap.i8(pcVar5)) & 0xff);
      heap.setU32(pcVar7, (cVar1) & 0xffffffff);
      pcVar5 = ((pcVar5 + 1) >>> 0);
      pcVar6 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
    pcVar6 = ((0x005f8fa5) >>> 0);
    do {
      cVar1 = ((heap.i8(pcVar6)) & 0xff);
      heap.setU32(pcVar7, (cVar1) & 0xffffffff);
      pcVar6 = ((pcVar6 + 1) >>> 0);
      pcVar7 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
    pcVar5 = ((0x005f8648) >>> 0);
    pcVar6 = ((0x005f8fb3) >>> 0);
    do {
      pcVar7 = ((pcVar6) >>> 0);
      cVar1 = ((heap.i8(pcVar5)) & 0xff);
      heap.setU32(pcVar7, (cVar1) & 0xffffffff);
      pcVar5 = ((pcVar5 + 1) >>> 0);
      pcVar6 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
    pcVar6 = ((0x005f90b4) >>> 0);
    do {
      cVar1 = ((heap.i8(pcVar6)) & 0xff);
      heap.setU32(pcVar7, (cVar1) & 0xffffffff);
      pcVar6 = ((pcVar6 + 1) >>> 0);
      pcVar7 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
    pcVar5 = ((0x005f8648) >>> 0);
    pcVar6 = ((0x005f90c5) >>> 0);
    do {
      pcVar7 = ((pcVar6) >>> 0);
      cVar1 = ((heap.i8(pcVar5)) & 0xff);
      heap.setU32(pcVar7, (cVar1) & 0xffffffff);
      pcVar5 = ((pcVar5 + 1) >>> 0);
      pcVar6 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
    pcVar6 = ((0x005f91c6) >>> 0);
    do {
      cVar1 = ((heap.i8(pcVar6)) & 0xff);
      heap.setU32(pcVar7, (cVar1) & 0xffffffff);
      pcVar6 = ((pcVar6 + 1) >>> 0);
      pcVar7 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
  }
  (regs.eax = FUN_0042f199(heap));
  iVar2 = (((regs.eax = FUN_00405949(heap, 0x005f886b))) >>> 0);
  if (iVar2 != 0) {
    return (regs.eax = FUN_005df472(heap));
  }
  do {
    uVar3 = ((0) >>> 0);
    LAB_0042f06b: heap.setU32(((0x005f851c) + (uVar3) * 4), (0) & 0xffffffff);
    uVar4 = ((uVar3) >>> 0);
    (regs.eax = FUN_0042f239(heap));
    iVar2 = (((regs.eax = FUN_004083b5(heap, uVar3))) >>> 0);
    if ((iVar2 | 0) != -1) {
      LAB_0042f134: (regs.eax = FUN_00408387(heap, iVar2));
      LAB_0042f13f: uVar3 = ((uVar4 + 1) >>> 0);
      if (0x16 < uVar3) {
        heap.setU8(0x005f8d5f, (0) & 0xff);
        if ((0x1000000 < heap.u32(0x005f14fc)) && (heap.setU8(0x005f8d5f, (1) & 0xff), 0x2000000 < heap.u32(0x005f14fc))) {
          heap.setU8(0x005f8d5f, (2) & 0xff);
        }
        heap.setU8(0x005f8d5d, (heap.u32((0x0063297d) + (heap.u8(0x005f8d5f)) * 4)) & 0xff);
        heap.setU8(0x005f8d5e, (heap.u32((0x00632980) + (heap.u8(0x005f8d5f)) * 4)) & 0xff);
        return (regs.eax = 0x3, regs.eax = FUN_0042f1d3(heap));
      }
      /* goto LAB_0042f06b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042ef8a/LAB_0042f06b"); return 0;
    }
    if (uVar4 == 0x12) {
      /* goto LAB_0042f13f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042ef8a/LAB_0042f13f"); return 0;
    }
    heap.setU32(((0x005f851c) + (uVar4) * 4), (1) & 0xffffffff);
    uVar3 = ((uVar4) >>> 0);
    (regs.eax = FUN_0042f239(heap));
    iVar2 = (((regs.eax = FUN_004083b5(heap, uVar4))) >>> 0);
    uVar4 = ((uVar3) >>> 0);
    if ((iVar2 | 0) != -1) {
      /* goto LAB_0042f134 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042ef8a/LAB_0042f134"); return 0;
    }
    if (heap.u8(0x005f8533) != 0) {
      return (regs.eax = FUN_005df472(heap));
    }
    heap.setU8(0x005f8533, (1) & 0xff);
    (regs.eax = FUN_00458bcf(heap));
    (regs.eax = FUN_00458bcf(heap));
    pcVar6 = ((0x005f874c) >>> 0);
    pcVar5 = ((0x0099aa88) >>> 0);
    do {
      cVar1 = ((heap.i8(pcVar6)) & 0xff);
      heap.setU32(pcVar5, (cVar1) & 0xffffffff);
      pcVar6 = ((pcVar6 + 1) >>> 0);
      pcVar5 = ((pcVar5 + 1) >>> 0);
    } while (cVar1 != 0);
    (regs.eax = FUN_004039bc(heap, 0x0099a888, 0x0099a988, 0x0099aa88));
    pcVar6 = ((0x0099aa88) >>> 0);
    pcVar5 = ((0x005f874c) >>> 0);
    do {
      cVar1 = ((heap.i8(pcVar6)) & 0xff);
      heap.setU32(pcVar5, (cVar1) & 0xffffffff);
      pcVar6 = ((pcVar6 + 1) >>> 0);
      pcVar5 = ((pcVar5 + 1) >>> 0);
    } while (cVar1 != 0);
  } while (true);
}
