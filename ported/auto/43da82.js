// @manual — do not regenerate.
// Source: decompiled/c/43da82.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_004413c5 } from "./4413c5.js";
import { FUN_00441891 } from "./441891.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0043da82(heap) {
  let pcVar1 = 0;
  let pbVar2 = 0;
  let sVar3 = 0;
  let bVar6 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar7 = 0;
  let extraout_var = 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_var_00 = 0;
  let sVar8 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar11 = 0;
  let iVar12 = 0;
  uVar11 = ((in_EDX & 0xff) >>> 0);
  iVar12 = ((uVar11 * 0x260) >>> 0);
  if ((in_EDX & 0x100) == 0) {
    bVar6 = ((heap.u8((unaff_ESI + 0x3a))) & 0xff);
    uVar7 = ((0x1ff) & 0xffff);
    uVar9 = ((((bVar6) & 0xffff)) & 0xffff);
    if ((heap.u32((0x00887510) + (uVar11 * 0x130) * 4) | 0) != -1) {
      uVar7 = ((0) & 0xffff);
      sVar3 = (((heap.u8((unaff_ESI + 0x43)) & 0xf) * 100) & 0xffff);
      sVar8 = ((((heap.u8((unaff_ESI + 0x43)) >>> 4) & 0xffff) * 100) & 0xffff);
      if ((sVar3 <= ((heap.u32((0x00887512) + (uVar11 * 0x130) * 4)) << 16 >> 16)) && (((heap.u32((0x00887512) + (uVar11 * 0x130) * 4)) << 16 >> 16) <= sVar8)) {
        uVar7 = ((2) & 0xffff);
      }
      sVar3 = ((sVar3 + ((bVar6) & 0xffff) * -2) & 0xffff);
      uVar10 = ((((bVar6) & 0xffff)) & 0xffff);
      sVar8 = ((sVar8 + uVar10) & 0xffff);
      if ((sVar3 <= ((heap.u32((0x00887512) + (uVar11 * 0x130) * 4)) << 16 >> 16)) && (((heap.u32((0x00887512) + (uVar11 * 0x130) * 4)) << 16 >> 16) <= sVar8)) {
        uVar7 = ((uVar7 | 0x10) & 0xffff);
      }
      if (((((sVar3 + uVar10 * -2)) << 16 >> 16) <= ((heap.u32((0x00887512) + (uVar11 * 0x130) * 4)) << 16 >> 16)) && (((heap.u32((0x00887512) + (uVar11 * 0x130) * 4)) << 16 >> 16) <= (((sVar8 + uVar10)) << 16 >> 16))) {
        uVar7 = ((uVar7 | 0x80) & 0xffff);
      }
      uVar4 = ((heap.u8((unaff_ESI + 0x44)) & 3) >>> 0);
      if ((heap.i16((0x0062d620 + uVar4 * 4)) <= heap.i16((0x00887514 + iVar12))) && (heap.i16((0x00887514 + iVar12)) <= heap.i16((0x0062d622 + uVar4 * 4)))) {
        uVar7 = ((uVar7 | 4) & 0xffff);
      }
      sVar3 = ((heap.i16((0x0062d620 + uVar4 * 4)) + uVar9 * -2) & 0xffff);
      sVar8 = ((heap.i16((0x0062d622 + uVar4 * 4)) + uVar9) & 0xffff);
      if ((sVar3 <= heap.i16((0x00887514 + iVar12))) && (heap.i16((0x00887514 + iVar12)) <= sVar8)) {
        uVar7 = ((uVar7 | 0x20) & 0xffff);
      }
      if (((((sVar3 + uVar9 * -2)) << 16 >> 16) <= heap.i16((0x00887514 + iVar12))) && (heap.i16((0x00887514 + iVar12)) <= (((sVar8 + uVar9)) << 16 >> 16))) {
        uVar7 = ((uVar7 | 0x100) & 0xffff);
      }
    }
    uVar9 = ((heap.u32((0x00887516) + (uVar11 * 0x130) * 4)) & 0xffff);
    uVar10 = ((uVar7 | 0x200) & 0xffff);
    if (((uVar9 != 0xffff) && (uVar10 = ((uVar7 | 0x400) & 0xffff), uVar9 < heap.u32(((0x00887508) & 0xffff) + (uVar11 * 0x130) * 4))) && (uVar10 = ((uVar7 | 0x200) & 0xffff), (((((((uVar9) >>> 0) * ((bVar6) >>> 0) >>> 8)) << 16 >> 16) + heap.u32((0x00887516) + (uVar11 * 0x130) * 4)) & 0xffff) < heap.u32(((0x00887508) & 0xffff) + (uVar11 * 0x130) * 4))) {
      uVar10 = ((uVar7) & 0xffff);
    }
    sVar3 = ((0) & 0xffff);
    if ((uVar10 & 0x200) != 0) {
      sVar3 = ((0xf) & 0xffff);
    }
    if ((uVar10 & 0x400) != 0) {
      sVar3 = ((sVar3 + 0x28) & 0xffff);
    }
    if ((uVar10 & 0x600) != 0) {
      sVar3 = ((sVar3 + -0x2d) & 0xffff);
    }
    if ((uVar10 & 6) == 6) {
      sVar3 = ((sVar3 + 0x46) & 0xffff);
    } else {
      if ((uVar10 & 6) != 0) {
        sVar3 = ((sVar3 + 0xf) & 0xffff);
      }
      if ((uVar10 & 0x30) == 0x30) {
        sVar3 = ((sVar3 + 0x23) & 0xffff);
      } else {
        if ((uVar10 & 0x30) != 0) {
          sVar3 = ((sVar3 + 10) & 0xffff);
        }
        if ((uVar10 & 0x180) == 0x180) {
          sVar3 = ((sVar3 + 10) & 0xffff);
        } else {
          sVar3 = ((sVar3 + -0x3c) & 0xffff);
        }
      }
    }
    sVar8 = ((sVar3) & 0xffff);
    if ((0x8c9 < heap.u16((unaff_ESI + 0x7a))) && (sVar8 = ((sVar3 + -10) & 0xffff), 0x1193 < heap.u16((unaff_ESI + 0x7a)))) {
      sVar8 = ((sVar3 + -0x23) & 0xffff);
    }
    if (heap.u16((unaff_ESI + 0x7a)) < 0x2ef) {
      sVar8 = ((sVar8 + 10) & 0xffff);
    }
    bVar6 = ((heap.u8((unaff_ESI + 0x68))) & 0xff);
    pbVar2 = (((unaff_ESI + 0x7c + ((bVar6 >>> 5) >>> 0) * 4 + ((((bVar6 & 0x1f)) | 0) >>> 3))) >>> 0);
    uVar11 = ((bVar6 & 7) >>> 0);
    bVar6 = ((heap.u8(pbVar2)) & 0xff);
    heap.setU8(pbVar2, (heap.u8(pbVar2) | 1 << uVar11) & 0xff);
    if ((bVar6 >>> uVar11 & 1) != 0) {
      sVar8 = ((sVar8 + 10) & 0xffff);
    }
    pcVar1 = (((unaff_ESI + 0x2f)) >>> 0);
    heap.setU32(pcVar1, (heap.i8(pcVar1) + 1) & 0xffffffff);
    if (heap.i8(pcVar1) == 0) {
      heap.setI8((unaff_ESI + 0x2f), (heap.i8((unaff_ESI + 0x2f)) + -1) & 0xff);
    }
    bVar6 = ((heap.u32((0x00887420) + (iVar12) * 4)) & 0xff);
    pbVar2 = (((unaff_ESI + 0x48 + ((bVar6 >>> 5) >>> 0) * 4 + ((((bVar6 & 0x1f)) | 0) >>> 3))) >>> 0);
    uVar11 = ((bVar6 & 7) >>> 0);
    bVar6 = ((heap.u8(pbVar2)) & 0xff);
    heap.setU8(pbVar2, (heap.u8(pbVar2) | 1 << uVar11) & 0xff);
    if ((bVar6 >>> uVar11 & 1) != 0) {
      sVar8 = ((sVar8 + 10) & 0xffff);
    }
    (regs.eax = FUN_004413c5(heap));
    sVar8 = ((heap.u16((unaff_ESI + 0x3b)) + sVar8) & 0xffff);
    if (0xff < sVar8) {
      sVar8 = ((0xff) & 0xffff);
    }
    if (sVar8 < 0) {
      sVar8 = ((0) & 0xffff);
    }
    heap.setI8((unaff_ESI + 0x3b), (((sVar8) << 24 >> 24)) & 0xff);
    uVar7 = ((0x100 - sVar8) & 0xffff);
    if (((uVar7) << 16 >> 16) < 0x40) {
      uVar7 = ((0x40) & 0xffff);
    }
    if (200 < ((uVar7) << 16 >> 16)) {
      uVar7 = ((200) & 0xffff);
    }
    uVar11 = ((heap.u32((unaff_ESI + 0x3e))) >>> 0);
    if (uVar11 < 0x81) {
      uVar11 = ((0x80) >>> 0);
    }
    sVar3 = ((heap.u16((unaff_ESI + 0x3d)) + (((((((heap.u32((0x00887514 + iVar12)) * ((uVar7) >>> 0) >>> 9) * uVar11 >>> 7)) << 16 >> 16) << 1) & 0xffff) >>> (heap.u8((unaff_ESI + 0x44)) & 3))) & 0xffff);
    if (sVar3 < 0) {
      sVar3 = ((0) & 0xffff);
    }
    if (0xff < sVar3) {
      sVar3 = ((0xff) & 0xffff);
    }
    heap.setI8((unaff_ESI + 0x3d), (((sVar3) << 24 >> 24)) & 0xff);
  } else {
    heap.setU8((unaff_ESI + 0x3a), (heap.u8((unaff_ESI + 0x3b))) & 0xff);
    heap.setU8((unaff_ESI + 0x3c), (heap.u8((unaff_ESI + 0x3d))) & 0xff);
    heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 2) & 0xff);
    uVar5 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    if (((((((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (iVar12) * 4) * 8)) & 0x100000) != 0) && ((heap.u32((0x00887510) + (uVar11 * 0x130) * 4) | 0) != -1)) && (heap.u32(((0x00887512) & 0xffff) + (uVar11 * 0x130) * 4) < 0x3e9)) && (((0xb3 < heap.u8((unaff_ESI + 0x3a)) && (99 < heap.u8((unaff_ESI + 0x38)))) && ((heap.u8((unaff_ESI + 0x3c)) < 0xa1 && ((0x1d < heap.u8((unaff_ESI + 0x3e)) && (0x13 < heap.u8((unaff_ESI + 0x3f)))))))))) && (heap.u8((unaff_ESI + 0x40)) < 0xab)) && ((bVar6 = ((((((uVar5) >>> 0) >>> 8) & 0xff)) & 0xff), 0x80 < bVar6 || ((heap.u8((unaff_ESI + 0x2f)) < 8 && (bVar6 < 0x41)))))) {
      heap.setU8((unaff_ESI + 0xc5), ((regs.edx & 0xff)) & 0xff);
      heap.setU8((unaff_ESI + 0xc6), (200) & 0xff);
      uVar5 = (((regs.eax = FUN_00441891(heap))) >>> 0);
      (regs.eax = FUN_005e5301(heap));
    }
    if ((199 < heap.u8((unaff_ESI + 0x3a))) && (heap.u8((unaff_ESI + 0x43)) <= ((uVar5) & 0xff))) {
      pbVar2 = (((unaff_ESI + 0x43)) >>> 0);
      bVar6 = ((heap.u8(pbVar2)) & 0xff);
      heap.setU8(pbVar2, (heap.u8(pbVar2) + 0x10) & 0xff);
      if (0xef < bVar6) {
        heap.setI8((unaff_ESI + 0x43), (heap.i8((unaff_ESI + 0x43)) + -0x10) & 0xff);
      }
    }
    if ((((0xd6 < heap.u8((unaff_ESI + 0x3a))) && (heap.u8((unaff_ESI + 0x3c)) < 0x79)) && ((heap.u32((0x00887510) + (uVar11 * 0x130) * 4) | 0) != -1)) && (heap.u32(((0x00887512) & 0xffff) + (uVar11 * 0x130) * 4) < 0x3e9)) {
      (regs.eax = FUN_00440fe3(heap));
      uVar11 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
      if ((uVar11 & 7) < 3) {
        (regs.eax = FUN_00452fce(heap, CONCAT22(extraout_var_00, heap.u16((unaff_ESI + 0x10))), CONCAT22(extraout_var, heap.u16((unaff_ESI + 0xe))), unaff_EBX, (uVar11 & 7) + 0x29));
      }
    }
    heap.setI32((0x00887520 + iVar12), (heap.i32((0x00887520 + iVar12)) + 1) & 0xffffffff);
    heap.setU32(((0x0088751d) + (iVar12) * 4), (heap.u32((0x0088751d) + (iVar12) * 4) | 1) & 0xffffffff);
  }
  return in_EAX;
}
