// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4415e6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0044189c } from "./44189c.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_004415e6(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let sVar4 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let in_DL = regs.edx & 0xff;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar8 = 0;
  let local_c = 0;
  let local_8 = 0;
  LAB_004417af: {
  LAB_004417aa: {
  LAB_004416f0: {
  LAB_004416c9: {
  uVar5 = ((0x10) & 0xff);
  if (heap.i8((unaff_ESI + 0x2e)) != 1) {
    if ((heap.u16((unaff_ESI + 200)) & 4) == 0) {
      if (((((heap.u16((unaff_ESI + 200)) & 1) == 0) || (0x59 < heap.u8((unaff_ESI + 0xc6)))) && (uVar5 = ((0xe) & 0xff), (heap.u16((unaff_ESI + 0xca)) & 4) == 0)) && (uVar5 = ((0xc) & 0xff), (heap.u16((unaff_ESI + 200)) & 1) == 0)) {
        uVar5 = ((8) & 0xff);
      }
    } else {
      uVar7 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
      in_ECX = ((extraout_ECX) >>> 0);
      in_DL = (((regs.edx & 0xff)) & 0xff);
      if (uVar7 < 0x1c72) {
        heap.setU16((unaff_ESI + 200), (heap.u16((unaff_ESI + 200)) & 0xfffb) & 0xffff);
      }
    }
  }
  uVar6 = ((0xf) >>> 0);
  if ((((unaff_ESI | 0) != -1) && (CONCAT11((((heap.u8(0x006293be) >>> 5)) << 24 >> 24), (((heap.u8(0x006293bc) >>> 5)) << 24 >> 24)) == heap.i16((unaff_ESI + 0xcc)))) && (heap.u8(0x006293c0) == heap.i8((unaff_ESI + 0xce)))) {
    uVar6 = ((0) >>> 0);
    do {
      if ((CONCAT11((((in_ECX >>> 5)) << 24 >> 24), (((in_EAX >>> 5)) << 24 >> 24)) == heap.i16((unaff_ESI + 0xd0 + uVar6 * 4))) && (in_DL == heap.u8((unaff_ESI + 0xd2 + uVar6 * 4)))) {
        uVar6 = ((heap.u16((unaff_ESI + 0xd3 + uVar6 * 4)) & 0xf) >>> 0);
        break LAB_004416c9;
      }
      uVar6 = ((uVar6 + 1) >>> 0);
    } while (uVar6 < 4);
    uVar6 = ((0xf) >>> 0);
  }
  }
  uVar7 = ((((in_ECX) & 0xffff) << 7 | ((in_ECX) & 0xffff) >>> 9 | ((in_EAX) & 0xffff)) & 0xffff);
  pbVar8 = ((heap.u32((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4)) >>> 0);
  LAB_004416e1: heap.setU8((0x006293c4 + 0), (uVar5) & 0xff);
  if ((in_DL != heap.u8(pbVar8 + (2))) || ((heap.u8(pbVar8) & 0x3c) != 4)) {
    break LAB_004416f0;
  }
  uVar6 = (((heap.u8(pbVar8 + (6)) & heap.u32((0x00630e58) + (heap.u8(pbVar8 + (6))) * 4)) & uVar6) >>> 0);
  if (uVar6 != 0) {
    local_8 = ((0) >>> 0);
    if (uVar6 != 0) {
      for (; (uVar6 >>> local_8 & 1) == 0; local_8 = (((local_8 + 1) >>> 0)) >>> 0) {
      
      }
    }
    uVar6 = ((uVar6 & ~(1 << (local_8 & 0x1f))) >>> 0);
    if (uVar6 != 0) {
      uVar6 = ((uVar6 | 1 << (local_8 & 0x1f)) >>> 0);
      local_8 = ((0xffffffff) >>> 0);
      local_c = ((0xffff00ff) >>> 0);
      while (true) {
        uVar2 = ((0) >>> 0);
        if (uVar6 != 0) {
          for (; (uVar6 >>> uVar2 & 1) == 0; uVar2 = (((uVar2 + 1) >>> 0)) >>> 0) {
          
          }
        }
        if (uVar6 == 0) {
          break;
        }
        uVar6 = ((uVar6 & ~(1 << (uVar2 & 0x1f))) >>> 0);
        heap.setU8(0x006293c1, (0xff) & 0xff);
        heap.setU16((0x006293c4 + 2), (0) & 0xffff);
        heap.setU8((0x006293c4 + 1), (0) & 0xff);
        (regs.eax = FUN_0044189c(heap));
        if ((((((local_c) >>> 16) & 0xffff) | 0) == -1) && (heap.u8(0x006293c1) < ((local_c) & 0xff))) {
          local_c = ((CONCAT31(0xffff00, heap.u8(0x006293c1))) >>> 0);
          local_8 = ((uVar2) >>> 0);
        }
      }
    }
    break LAB_004417af;
  }
  break LAB_004417aa;
  }
  pbVar1 = ((pbVar8 + 1) >>> 0);
  pbVar8 = ((pbVar8 + 8) >>> 0);
  if ((heap.u8(pbVar1) & 0x80) != 0) {
    break LAB_004417aa;
  }
  /* goto LAB_004416e1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004415e6/LAB_004416e1"); return 0;
  }
  local_8 = ((0xffffffff) >>> 0);
  }
  cVar3 = ((heap.u8(0x006293c0)) & 0xff);
  if (((unaff_ESI | 0) != -1) && (local_8 != 0xffffffff)) {
    sVar4 = ((CONCAT11((((heap.u8(0x006293be) >>> 5)) << 24 >> 24), (((heap.u8(0x006293bc) >>> 5)) << 24 >> 24))) & 0xffff);
    if ((sVar4 != heap.i16((unaff_ESI + 0xcc))) || (heap.u8(0x006293c0) != heap.i8((unaff_ESI + 0xce)))) {
      heap.setI16((unaff_ESI + 0xcc), (sVar4) & 0xffff);
      heap.setI8((unaff_ESI + 0xce), (cVar3) & 0xff);
      heap.setU8((unaff_ESI + 0xcf), (0) & 0xff);
      heap.setU32((unaff_ESI + 0xd0), (0xffffffff) & 0xffffffff);
      heap.setU32((unaff_ESI + 0xd4), (0xffffffff) & 0xffffffff);
      heap.setU32((unaff_ESI + 0xd8), (0xffffffff) & 0xffffffff);
      heap.setU32((unaff_ESI + 0xdc), (0xffffffff) & 0xffffffff);
    }
    uVar6 = ((0) >>> 0);
    sVar4 = ((CONCAT11((((in_ECX >>> 5)) << 24 >> 24), (((in_EAX >>> 5)) << 24 >> 24))) & 0xffff);
    do {
      if ((sVar4 == heap.i16((unaff_ESI + 0xd0 + uVar6 * 4))) && (in_DL == heap.u8((unaff_ESI + 0xd2 + uVar6 * 4)))) {
        /* goto LAB_00441885 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004415e6/LAB_00441885"); return 0;
      }
      uVar6 = ((uVar6 + 1) >>> 0);
    } while (uVar6 < 4);
    uVar6 = ((heap.u32((unaff_ESI + 0xcf))) >>> 0);
    heap.setI8((unaff_ESI + 0xcf), (heap.i8((unaff_ESI + 0xcf)) + 1) & 0xff);
    heap.setU8((unaff_ESI + 0xcf), (heap.u8((unaff_ESI + 0xcf)) & 3) & 0xff);
    heap.setI16((unaff_ESI + 0xd0 + uVar6 * 4), (sVar4) & 0xffff);
    heap.setU8((unaff_ESI + 0xd2 + uVar6 * 4), (in_DL) & 0xff);
    heap.setU8((unaff_ESI + 0xd3 + uVar6 * 4), (0xf) & 0xff);
    LAB_00441885: pbVar8 = (((unaff_ESI + 0xd3 + uVar6 * 4 + (((((((local_8) & 0xffff)) << 16 >> 16)) >>> 0) >>> 3))) >>> 0);
    heap.setU32(pbVar8, (heap.u8(pbVar8) & ~(1 << (((local_8) & 0xffff) & 7))) & 0xffffffff);
  }
  return;
}
