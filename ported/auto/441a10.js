// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441a10.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_004405f3 } from "./4405f3.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_004413c5 } from "./4413c5.js";
import { FUN_00441891 } from "./441891.js";
import { FUN_004420e0 } from "./4420e0.js";
import { FUN_004429db } from "./4429db.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_00441a10(heap) {
  let pbVar1 = 0;
  let sVar2 = 0;
  let cVar3 = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar8 = 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let extraout_DL_00 = 0;
  let extraout_DX = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar11 = 0;
  let iVar12 = 0;
  heap.setU8(0x006293ca, (0) & 0xff);
  cVar3 = ((((in_EAX) << 24 >> 24)) & 0xff);
  if ((((heap.u16((unaff_ESI + 0xca)) >>> 0xe & 1) != 0) && (heap.i8((unaff_ESI + 0xf0)) == 3)) && (cVar3 == heap.i8((unaff_ESI + 0xf1)))) {
    heap.setU8(0x006293ca, (1) & 0xff);
  }
  uVar10 = ((in_EAX & 0xff) >>> 0);
  uVar9 = ((((uVar10) & 0xffff)) & 0xffff);
  if ((heap.u8((unaff_ESI + 0xca + (((((uVar9) << 16 >> 16)) >>> 0) >>> 3))) >>> (uVar9 & 7) & 1) != 0) {
    uVar10 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
    return uVar10;
  }
  if ((0xa3e0 >>> (uVar9 & 0xf) & 1) != 0) {
    if ((heap.u16((unaff_ESI + 0xca)) & 0xa3e0) != 0) {
      uVar9 = ((heap.u16((unaff_ESI + 0xca)) & 0xa3e0) & 0xffff);
      sVar2 = ((0) & 0xffff);
      if (uVar9 != 0) {
        for (; (uVar9 >>> sVar2 & 1) == 0; sVar2 = (((sVar2 + 1) & 0xffff)) >>> 0) {
        
        }
      }
      uVar10 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
      return uVar10;
    }
    if (0x90 < heap.u8((unaff_ESI + 0x3c))) {
      return in_EAX;
    }
  }
  if ((((0x301 >>> (uVar9 & 0xf) & 1) == 0) || (heap.u8(0x008d7eb6) == 0)) && (((0x100 >>> (uVar9 & 0xf) & 1) == 0 || (0xb < heap.u8(0x008d7eb0))))) {
    if (((0xa3c0 >>> (uVar9 & 0xf) & 1) != 0) && (0x4b < heap.u8((unaff_ESI + 0x3e)))) {
      uVar10 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
      return uVar10;
    }
    if (((0x20 >>> (uVar9 & 0xf) & 1) != 0) && (0x4b < heap.u8((unaff_ESI + 0x3f)))) {
      uVar10 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
      return uVar10;
    }
    if (((((cVar3 == 4) && (heap.u8(0x008d7eb6) != 0)) || ((cVar3 == 2 && ((heap.i8((unaff_ESI + 0xc5)) | 0) == -1)))) || (((0x1b >>> (uVar9 & 0xf) & 1) == 0 || (heap.u8(0x006293ca) != 0)))) || ((bVar4 = (((regs.eax = FUN_005df40c(heap))) & 0xff), (((bVar4 & 0x7f) + 0x73) & 0xff) <= heap.u8((unaff_ESI + 0x3a)) && (in_ECX = ((extraout_ECX) >>> 0), 2 < heap.u8((unaff_ESI + 0x2f)))))) {
      if (heap.u8(0x006293ca) == 0) {
        if (in_ECX != 0) {
          if (heap.i32((unaff_ESI + 0xa0)) == 0) {
            uVar10 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
            return uVar10;
          }
          if (heap.i32((unaff_ESI + 0xa0)) < in_ECX) {
            uVar10 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
            return uVar10;
          }
        }
        uVar7 = ((heap.u16((0x0062d582 + uVar10 * 8))) & 0xffff);
        if (20 < heap.i8(0x008d7eb0)) {
          uVar7 = ((heap.u16((0x0062d584 + uVar10 * 8))) & 0xffff);
        }
        if (heap.i8(0x008d7eb0) < 12) {
          uVar7 = ((heap.u16((0x0062d586 + uVar10 * 8))) & 0xffff);
        }
        if (uVar7 < ((in_ECX) & 0xffff)) {
          if (((cVar3 != 4) || (heap.u8(0x008d7eb6) == 0)) && (uVar7 = (((regs.eax = FUN_005df40c(heap))) & 0xffff), (uVar7 & 7) < extraout_DX)) {
            uVar10 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
            return uVar10;
          }
        } else {
          bVar5 = (((regs.eax = FUN_005df40c(heap))) & 0xff);
          bVar4 = (((regs.edx & 0xff)) & 0xff);
          if ((bVar5 & 7) <= (regs.edx & 0xff)) {
            (regs.eax = FUN_00440fe3(heap));
            bVar4 = ((extraout_DL_00) & 0xff);
          }
          bVar4 = ((bVar4 * 4) & 0xff);
          pbVar1 = (((unaff_ESI + 0x3b)) >>> 0);
          bVar5 = ((heap.u8(pbVar1)) & 0xff);
          heap.setU32(pbVar1, (heap.u8(pbVar1) + bVar4) & 0xffffffff);
          if (CARRY1(bVar5, bVar4)) {
            heap.setU8((unaff_ESI + 0x3b), (0xff) & 0xff);
          }
          pbVar1 = (((unaff_ESI + 0x3a)) >>> 0);
          bVar5 = ((heap.u8(pbVar1)) & 0xff);
          heap.setU32(pbVar1, (heap.u8(pbVar1) + bVar4) & 0xffffffff);
          if (CARRY1(bVar5, bVar4)) {
            heap.setU8((unaff_ESI + 0x3a), (0xff) & 0xff);
          }
        }
      }
      uVar11 = ((in_EAX >>> 8 & 0xff) >>> 0);
      iVar12 = ((uVar11 * 0x260) >>> 0);
      if (heap.u8(0x006293ca) == 0) {
        (regs.eax = FUN_004413c5(heap));
      }
      uVar6 = ((((in_EAX) & 0xffff)) & 0xffff);
      pbVar1 = (((unaff_ESI + 0xca + (((((uVar9) << 16 >> 16)) >>> 0) >>> 3))) >>> 0);
      heap.setU32(pbVar1, (heap.u8(pbVar1) | 1 << (uVar9 & 7)) & 0xffffffff);
      if (uVar9 == 2) {
        uVar6 = (((regs.eax = FUN_00441891(heap))) & 0xffff);
      }
      bVar5 = ((heap.u32((0x0062d600) + (uVar10) * 4)) & 0xff);
      pbVar1 = (((unaff_ESI + 0x42)) >>> 0);
      bVar4 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU32(pbVar1, (heap.u8(pbVar1) + bVar5) & 0xffffffff);
      if (CARRY1(bVar4, bVar5)) {
        heap.setU8((unaff_ESI + 0x42), (0xff) & 0xff);
      }
      if (((uVar6) << 24 >> 24) == 3) {
        heap.setI8((unaff_ESI + 199), ((((((uVar6) & 0xffff) >>> 8)) << 24 >> 24)) & 0xff);
      }
      heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 8) & 0xff);
      uVar7 = (((regs.eax = FUN_004420e0(heap))) & 0xffff);
      if ((heap.u16((unaff_ESI + 200)) & 8) != 0) {
        heap.setU16((0x00971e86 + 0), (heap.u16((unaff_ESI + 0x22))) & 0xffff);
        unique0x00017200 = ((heap.u32((unaff_ESI + 0x9c))) >>> 0);
        heap.setU16((0x00971e8a + 2), ((uVar7 & 0xff) + 0x719) & 0xffff);
        (regs.eax = FUN_0042c711(heap));
      }
      if ((0xa3c0 >>> (uVar9 & 0xf) & 1) != 0) {
        heap.setI8((unaff_ESI + 0xec), (heap.i8((unaff_ESI + 0xec)) + 1) & 0xff);
      }
      if ((0x20 >>> (uVar9 & 0xf) & 1) != 0) {
        heap.setI8((unaff_ESI + 0xed), (heap.i8((unaff_ESI + 0xed)) + 1) & 0xff);
      }
      if ((0x1f >>> (uVar9 & 0xf) & 1) != 0) {
        heap.setI8((unaff_ESI + 0xee), (heap.i8((unaff_ESI + 0xee)) + 1) & 0xff);
      }
      heap.setU32(0x006293b0, (0xea) >>> 0);
      heap.setU8(0x0099c167, (28) & 0xff);
      if ((0xa3e0 >>> (uVar9 & 0xf) & 1) != 0) {
        heap.setU32(0x006293b0, (0xe8) >>> 0);
        heap.setU8(0x0099c167, (36) & 0xff);
      }
      uVar10 = ((heap.u32((0x0062d580 + uVar10 * 8))) >>> 0);
      uVar8 = (((regs.eax = FUN_004429db(heap))) >>> 0);
      heap.setU8(0x0099c167, (heap.u8(0x0099c167) + -4) & 0xff);
      if (heap.u8(0x006293ca) == 0) {
        uVar8 = (((regs.eax = FUN_004405f3(heap))) >>> 0);
        uVar10 = ((extraout_ECX_01) >>> 0);
      } else {
        heap.setU16((unaff_ESI + 0xca), (heap.u16((unaff_ESI + 0xca)) & 0xbfff) & 0xffff);
        heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 8) & 0xff);
      }
      heap.setU32(((0x00887524) + (uVar11 * 0x98) * 4), (heap.u32((0x00887524) + (uVar11 * 0x98) * 4) + (extraout_ECX_00 - uVar10)) & 0xffffffff);
      heap.setU32(((0x0088751d) + (iVar12) * 4), (heap.u32((0x0088751d) + (iVar12) * 4) | 2) & 0xffffffff);
      heap.setI16((0x008874f0 + iVar12), (heap.i16((0x008874f0 + iVar12)) + 1) & 0xffff);
      heap.setI32((0x00887520 + iVar12), (heap.i32((0x00887520 + iVar12)) + 1) & 0xffffffff);
      heap.setU32(((0x0088751d) + (iVar12) * 4), (heap.u32((0x0088751d) + (iVar12) * 4) | 1) & 0xffffffff);
      return uVar8;
    }
  }
  return in_EAX;
}
