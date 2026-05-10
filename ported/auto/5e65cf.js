// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e65cf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00431510 } from "./431510.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
export function FUN_005e65cf(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let extraout_ECX = 0;
  let unaff_BL = regs.ebx & 0xff;
  let uVar4 = 0;
  let iVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  let pbVar10 = 0;
  if ((heap.u32(0x0099a500) & 1) != 0) {
    return in_EAX;
  }
  uVar9 = (((regs.edx = 0x9, regs.eax = FUN_00431510(heap))) >>> 0);
  pbVar10 = (((((uVar9) >>> 0) >>> 0x20)) >>> 0);
  uVar3 = ((((uVar9) >>> 0)) >>> 0);
  if (unaff_BL == 3) {
    if ((heap.u8(pbVar10) & 0x3c) == 4) {
      return uVar3;
    }
    uVar4 = ((((heap.u8(pbVar10 + (7))) >>> 0)) >>> 0);
    iVar5 = ((uVar4 * 0x260) >>> 0);
    if (heap.u32((0x00887441) + (iVar5) * 4) == 0) {
      heap.setU32(0x005f54f0, (0x4c1) >>> 0);
      if ((heap.u8(pbVar10) & 0x3c) == 0x10) {
        heap.setU32(0x005f54f2, (0x56b) >>> 0);
        if (heap.u8(pbVar10 + (4)) != 0) {
          heap.setU32(0x005f54f2, (0x56d) >>> 0);
        }
      } else {
        bVar1 = ((heap.u8(pbVar10 + (4))) & 0xff);
        if (((bVar1 != 2) && (bVar1 != 3)) && (bVar1 != 1)) {
          heap.setU32(0x005f54f2, (heap.u32((0x00887442) + (uVar4 * 0x130) * 4)) >>> 0);
          heap.setU32(0x005f54f4, (heap.u32(((0x00887444) & 0xffff) + (uVar4 * 0x98) * 4)) >>> 0);
          heap.setU32(0x005f54f6, (((heap.u32(((0x00887444) >>> 0) + (uVar4 * 0x98) * 4) >>> 0x10) & 0xffff)) >>> 0);
          return uVar3;
        }
        heap.setU32(0x005f54f2, (0x569) >>> 0);
      }
      if (1 < heap.u32(((0x00887497) & 0xff) + (iVar5) * 4)) {
        heap.setU32(0x005f54f2, (heap.u32(0x005f54f2) + 1) >>> 0);
      }
      heap.setU32(0x005f54f4, (heap.u32((0x00887442) + (uVar4 * 0x130) * 4)) >>> 0);
      heap.setU32(0x005f54f6, (heap.u32(((0x00887444) & 0xffff) + (uVar4 * 0x98) * 4)) >>> 0);
      heap.setU32(0x005f54f8, (((heap.u32(((0x00887444) >>> 0) + (uVar4 * 0x98) * 4) >>> 0x10) & 0xffff)) >>> 0);
      heap.setU32(0x005f54fa, (heap.i16((0x005f5806 + heap.u32(((0x00887420) >>> 0) + (iVar5) * 4) * 8)) + 2) >>> 0);
      uVar6 = (((heap.u16((pbVar10 + 5)) & 0x70) >>> 4) >>> 0);
      uVar7 = ((uVar6) >>> 0);
      do {
        if ((heap.u32((0x0088744a) + (uVar4 * 0x130 + uVar6) * 4) | 0) == -1) {
          uVar7 = ((uVar7 - 1) >>> 0);
        }
        uVar6 = ((uVar6 - 1) >>> 0);
      } while (-1 < (((uVar6) | 0) | 0));
      heap.setU32(0x005f54fc, (((uVar7) << 16 >> 16) + 1) >>> 0);
      return uVar3;
    }
  } else {
    if (unaff_BL == 2) {
    if (heap.u8(pbVar10) != 0) {
      return uVar3;
    }
    uVar4 = ((((heap.u8(pbVar10 + (0x30))) >>> 0)) >>> 0);
    if (heap.u32((0x00887441) + (uVar4 * 0x260) * 4) == 0) {
      heap.setU32(0x005f54f0, (0x4c1) >>> 0);
      heap.setU32(0x005f54f2, (heap.u32((0x00887442) + (uVar4 * 0x130) * 4)) >>> 0);
      heap.setU32(0x005f54f4, (heap.u32(((0x00887444) & 0xffff) + (uVar4 * 0x98) * 4)) >>> 0);
      heap.setU32(0x005f54f6, (((heap.u32(((0x00887444) >>> 0) + (uVar4 * 0x98) * 4) >>> 0x10) & 0xffff)) >>> 0);
      return uVar3;
    }
  } else {
    bVar8 = (((heap.u32(0x00991f30) & 0x48) == 0x48) & 0xff);
    if (!bVar8) {
      uVar3 = ((extraout_ECX) >>> 0);
      uVar2 = (((regs.ecx = 0x8d, regs.edx = 0x9, regs.eax = FUN_005e3b2b(heap))) >>> 0);
      uVar9 = ((CONCAT44(pbVar10, uVar2)) >>> 0);
      if (bVar8) {
        uVar3 = (((regs.ecx = 0x8d, regs.edx = 0x9, regs.eax = FUN_005e3b2b(heap, unaff_ESI, pbVar10, uVar3))) >>> 0);
        uVar9 = ((CONCAT44(pbVar10, uVar3)) >>> 0);
        if (bVar8) {
          return uVar3;
        }
      }
    }
    uVar4 = ((((((uVar9) >>> 0) >>> 0x20) >>> 0)) >>> 0);
    uVar3 = ((((uVar9) >>> 0)) >>> 0);
    if (unaff_BL == 5) {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, (heap.u16((0x006e1ecc + heap.u32((uVar4 + 4)) * 8))) >>> 0);
      return uVar3;
    }
    if (unaff_BL == 6) {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, ((heap.u8((uVar4 + 4)) >>> 4) + 0x4d1) >>> 0);
      return uVar3;
    }
    if (unaff_BL == 7) {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, ((heap.u8((uVar4 + 5)) & 0xf) + 0x632) >>> 0);
      return uVar3;
    }
    if (unaff_BL == 9) {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, (heap.u16((0x0099fc3c + (uVar4 >>> 8 & 0xff) * 2))) >>> 0);
      return uVar3;
    }
    if (unaff_BL == 10) {
      heap.setU32(0x005f54f0, (0x4c2) >>> 0);
      heap.setU32(0x005f54f2, ((heap.u16((uVar4 + 4)) & 0x3ff) + 0x7de) >>> 0);
      return uVar3;
    }
  }
  }
  return uVar3;
}
