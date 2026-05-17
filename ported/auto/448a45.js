// @manual — do not regenerate.
// Source: decompiled/c/448a45.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004364c2 } from "./4364c2.js";
export function FUN_00448a45(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let in_AX = regs.eax & 0xffff;
  let in_CX = regs.ecx & 0xffff;
  let in_DL = regs.edx & 0xff;
  let in_DH = (regs.edx >>> 8) & 0xff;
  let bVar4 = 0;
  let bVar5 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  LAB_00448b0e: {
  heap.setU32(0x00630bc8, (0xffffffff) >>> 0);
  heap.setU32(0x00630bd0, (0xffffffff) >>> 0);
  bVar4 = ((heap.u8(unaff_ESI + (2))) & 0xff);
  heap.setU32(0x00630bd8, (in_DH) >>> 0);
  LAB_00448a65: bVar5 = ((((unaff_EBX) & 0xff)) & 0xff);
  if ((((heap.u8(unaff_ESI) & 0x3c) == 4) && (heap.setU32(0x00630bc8, (unaff_ESI) >>> 0), heap.setU32(0x00630bcc, (in_AX) >>> 0), heap.setU32(0x00630bce, (in_CX) >>> 0), heap.setU32(0x00630bd4, (unaff_EBX) >>> 0), (heap.u8(unaff_ESI + (4)) & 4) != 0)) && ((heap.u8(unaff_ESI + (4)) & 3) == bVar5)) {
    bVar4 = ((bVar4 + 4) & 0xff);
  }
  in_AX = ((in_AX + heap.u32((0x00652478) + (unaff_EBX * 2) * 4)) & 0xffff);
  in_CX = ((in_CX + heap.u32((0x0065247a) + (unaff_EBX * 2) * 4)) & 0xffff);
  uVar6 = ((in_CX * 0x80 | in_CX >>> 9 | in_AX) & 0xffff);
  unaff_ESI = ((heap.u32((0x00971ef4) + (((uVar6 >>> 5 | uVar6 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((unaff_ESI != heap.u32(0x00630bd0)) && ((heap.u8(unaff_ESI) & 0x3c) == 4)) {
      if (bVar4 == heap.u8(unaff_ESI + (2))) {
        if (((heap.u8(unaff_ESI + (4)) & 4) == 0) || ((heap.u8(unaff_ESI + (4)) & 3) == bVar5)) {
          break LAB_00448b0e;
        }
        uVar2 = ((heap.u32(0x00630bd4)) >>> 0);
        pbVar1 = ((heap.u32(0x00630bc8)) >>> 0);
        if (((in_DL != 0xff) && (heap.u32(0x00630bc8) != 0xffffffff)) && ((heap.u32(heap.u32(0x00630bc8) + (4) * 4) & 0xf0) == 0)) {
          heap.setU32((heap.u32(0x00630bc8) + (4) * 4), (heap.u32(heap.u32(0x00630bc8) + (4) * 4) | 8) & 0xffffffff);
          heap.setU8(pbVar1, (heap.u8(pbVar1) & 0x3f) & 0xff);
          heap.setU8(pbVar1, (heap.u8(pbVar1) | ((uVar2) << 24 >> 24) << 6) & 0xff);
          (regs.eax = FUN_004364c2(heap));
        }
        return;
      }
      if (((bVar4 - 4) & 0xff) == heap.u8(unaff_ESI + (2))) {
        break;
      }
    }
    pbVar1 = ((unaff_ESI + 1) >>> 0);
    unaff_ESI = ((unaff_ESI + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      uVar2 = ((heap.u32(0x00630bd4)) >>> 0);
      pbVar1 = ((heap.u32(0x00630bc8)) >>> 0);
      if (((in_DL != 0xff) && (heap.u32(0x00630bc8) != 0xffffffff)) && ((heap.u32(heap.u32(0x00630bc8) + (4) * 4) & 0xf0) == 0)) {
        heap.setU32((heap.u32(0x00630bc8) + (4) * 4), (heap.u32(heap.u32(0x00630bc8) + (4) * 4) | 8) & 0xffffffff);
        heap.setU8(pbVar1, (heap.u8(pbVar1) & 0x3f) & 0xff);
        heap.setU8(pbVar1, (heap.u8(pbVar1) | ((uVar2) << 24 >> 24) << 6) & 0xff);
        (regs.eax = FUN_004364c2(heap));
      }
      return;
    }
  } while (true);
  if (((heap.u8(unaff_ESI + (4)) & 4) == 0) || ((heap.u8(unaff_ESI + (4)) & 3 ^ 2) != bVar5)) {
    uVar2 = ((heap.u32(0x00630bd4)) >>> 0);
    pbVar1 = ((heap.u32(0x00630bc8)) >>> 0);
    if (((in_DL != 0xff) && (heap.u32(0x00630bc8) != 0xffffffff)) && ((heap.u32(heap.u32(0x00630bc8) + (4) * 4) & 0xf0) == 0)) {
      heap.setU32((heap.u32(0x00630bc8) + (4) * 4), (heap.u32(heap.u32(0x00630bc8) + (4) * 4) | 8) & 0xffffffff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) & 0x3f) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) | ((uVar2) << 24 >> 24) << 6) & 0xff);
      (regs.eax = FUN_004364c2(heap));
    }
    return;
  }
  bVar4 = ((bVar4 - 4) & 0xff);
  }
  if (heap.u8(unaff_ESI + (4)) >>> 4 != 0) {
    uVar2 = ((heap.u32(0x00630bd4)) >>> 0);
    pbVar1 = ((heap.u32(0x00630bc8)) >>> 0);
    if (((in_DL != 0xff) && (heap.u32(0x00630bc8) != 0xffffffff)) && ((heap.u32(heap.u32(0x00630bc8) + (4) * 4) & 0xf0) == 0)) {
      heap.setU32((heap.u32(0x00630bc8) + (4) * 4), (heap.u32(heap.u32(0x00630bc8) + (4) * 4) | 8) & 0xffffffff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) & 0x3f) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) | ((uVar2) << 24 >> 24) << 6) & 0xff);
      (regs.eax = FUN_004364c2(heap));
    }
    return;
  }
  heap.setU8((unaff_ESI + (4)), (heap.u8(unaff_ESI + (4)) & 0xf7) & 0xff);
  uVar6 = ((((unaff_EBX) & 0xffff)) & 0xffff);
  if ((heap.u8(unaff_ESI + (((((((uVar6 ^ 2)) << 16 >> 16)) | 0) >>> 3) + 6)) >>> ((uVar6 ^ 2) & 7) & 1) == 0) {
    uVar2 = ((heap.u32(0x00630bd4)) >>> 0);
  }
  pbVar1 = ((heap.u32(0x00630bc8)) >>> 0);
  if (((in_DL != 0xff) && (heap.u32(0x00630bc8) != 0xffffffff)) && ((heap.u32(heap.u32(0x00630bc8) + (4) * 4) & 0xf0) == 0)) {
    heap.setU32((heap.u32(0x00630bc8) + (4) * 4), (heap.u32(heap.u32(0x00630bc8) + (4) * 4) | 8) & 0xffffffff);
    heap.setU8(pbVar1, (heap.u8(pbVar1) & 0x3f) & 0xff);
    heap.setU8(pbVar1, (heap.u8(pbVar1) | ((uVar2) << 24 >> 24) << 6) & 0xff);
    (regs.eax = FUN_004364c2(heap));
  }
  return;
  heap.setU8((unaff_ESI + (7)), (in_DL) & 0xff);
  cVar3 = ((heap.u32(0x00630bd8)) & 0xff);
  heap.setU8((unaff_ESI + (5)), (heap.u8(unaff_ESI + (5)) & 0x8f) & 0xff);
  heap.setU8((unaff_ESI + (5)), (heap.u8(unaff_ESI + (5)) | cVar3 << 4) & 0xff);
  if (heap.u32(0x00630bd0) == 0xffffffff) {
    heap.setU32(0x00630bd0, (unaff_ESI) >>> 0);
  }
  if ((((heap.u8(unaff_ESI + ((((((uVar6) << 16 >> 16)) | 0) >>> 3) + 6)) >>> (uVar6 & 7) & 1) == 0) && (unaff_EBX = ((CONCAT31((regs.eax = callIndirect(heap, int3, unaff_EBX >>> 8)), bVar5 + 1) & 0xffffff03) >>> 0), (heap.u8(unaff_ESI + ((((((((unaff_EBX) & 0xffff)) << 16 >> 16)) | 0) >>> 3) + 6)) >>> (((unaff_EBX) & 0xffff) & 7) & 1) == 0)) && (unaff_EBX = ((unaff_EBX ^ 2) >>> 0), (heap.u8(unaff_ESI + ((((((((unaff_EBX) & 0xffff)) << 16 >> 16)) | 0) >>> 3) + 6)) >>> (((unaff_EBX) & 0xffff) & 7) & 1) == 0)) {
    LAB_00448b71: uVar2 = ((heap.u32(0x00630bd4)) >>> 0);
    pbVar1 = ((heap.u32(0x00630bc8)) >>> 0);
    if (((in_DL != 0xff) && (heap.u32(0x00630bc8) != 0xffffffff)) && ((heap.u32(heap.u32(0x00630bc8) + (4) * 4) & 0xf0) == 0)) {
      heap.setU32((heap.u32(0x00630bc8) + (4) * 4), (heap.u32(heap.u32(0x00630bc8) + (4) * 4) | 8) & 0xffffffff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) & 0x3f) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) | ((uVar2) << 24 >> 24) << 6) & 0xff);
      (regs.eax = FUN_004364c2(heap));
    }
    return;
  }
  /* goto LAB_00448a65 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00448a45/LAB_00448a65"); return 0;
}
