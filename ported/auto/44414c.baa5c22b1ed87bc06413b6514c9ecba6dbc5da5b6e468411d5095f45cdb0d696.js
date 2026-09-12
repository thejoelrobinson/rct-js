// @manual — do not regenerate.
// Source: decompiled/c/44414c.c
// Fix: `*pbVar5 = byte` was emitted as setU32; replaced with setU8.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_0045a94c } from "./45a94c.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0044414c(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let extraout_ECX = 0;
  let pbVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar5 = 0;
  let pbVar6 = 0;
  let uVar7 = 0;
  let bVar8 = 0;
  bVar8 = ((true) & 0xff);
  uVar3 = (((regs.eax = FUN_005e5fcb(heap))) >>> 0);
  if (!bVar8) {
    if (((uVar3) << 16 >> 16) == heap.i16((unaff_ESI + 0x15a))) {
      return;
    }
    uVar3 = (((regs.eax = FUN_005e5bd8(heap))) >>> 0);
  }
  (regs.ecx = 0x23, regs.edx = 0x444322, regs.ebx = 0x6b015e, regs.eax = FUN_005e3c3c(heap));
  heap.setU32((unaff_ESI + 0x1c), (0x00630774) & 0xffffffff);
  heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0x734) & 0xffffffff);
  heap.setU32((unaff_ESI + 0x18), (heap.u32((unaff_ESI + 0x18)) | 0x300) & 0xffffffff);
  (regs.edx = 0x444322, regs.eax = FUN_005e412c(heap));
  heap.setI16((unaff_ESI + 0x15a), (((uVar3) << 16 >> 16)) & 0xffff);
  heap.setU32(0x0063078e, (CONCAT22((((((uVar3) >>> 0) >>> 0x10)) << 16 >> 16), ((uVar3) << 16 >> 16) + 0x982)) >>> 0);
  heap.setU16((unaff_ESI + 0x15c), (2) & 0xffff);
  heap.setU16((unaff_ESI + 0x15e), (0xffff) & 0xffff);
  heap.setU32(0x00630880, (0xffff) >>> 0);
  pbVar5 = ((0x00887420) >>> 0);
  bVar1 = ((0) & 0xff);
  pbVar4 = ((0x00630880) >>> 0);
  do {
    if ((heap.u8(pbVar5) != 0xff) && ((heap.u32((0x005f5b78 + heap.u32(pbVar5) * 8)) & 0x3820000) == 0)) {
      heap.setU32(pbVar4, (bVar1) & 0xffffffff);
      pbVar4 = ((pbVar4 + 1) >>> 0);
    }
    pbVar5 = ((pbVar5 + 0x260) >>> 0);
    bVar1 = ((bVar1 + 1) & 0xff);
  } while (bVar1 != 0xff);
  heap.setU32(pbVar4, (0xff) & 0xffffffff);
  pbVar5 = ((extraout_ECX) >>> 0);
  for (; 0x006308a8 < pbVar4; pbVar4 = (((pbVar4 + -1) >>> 0)) >>> 0) {
    pbVar6 = ((0x00630880) >>> 0);
    uVar2 = ((0xffff) & 0xffff);
    do {
      if (heap.u32(((0x00887516) & 0xffff) + (heap.u32(pbVar6) * 0x130) * 4) <= uVar2) {
        uVar2 = ((heap.u32((0x00887516) + (heap.u32(pbVar6) * 0x130) * 4)) & 0xffff);
        pbVar5 = ((pbVar6) >>> 0);
      }
      pbVar6 = ((pbVar6 + 1) >>> 0);
    } while (pbVar6 < pbVar4);
    do {
      heap.setU8(pbVar5, (heap.u8(pbVar5 + (1))) & 0xff);
      pbVar5 = ((pbVar5 + 1) >>> 0);
    } while (pbVar5 < pbVar4);
  }
  pbVar4 = ((0x00630881) >>> 0);
  do {
    if (heap.u8(pbVar4) == 0xff) {
      return;
    }
    heap.setU32(0x00971e86, (heap.u32((0x00887444) + (heap.u32(pbVar4) * 0x98) * 4)) >>> 0);
    (regs.eax = FUN_00458bcf(heap));
    pbVar5 = ((pbVar4) >>> 0);
    while (pbVar6 = ((pbVar5 + -1) >>> 0), 0x0063087f < pbVar6) {
      uVar7 = ((0) & 0xff);
      heap.setU32(0x00971e86, (heap.u32((0x00887444) + (heap.u32(pbVar6) * 0x98) * 4)) >>> 0);
      (regs.eax = FUN_00458bcf(heap));
      (regs.eax = FUN_0045a94c(heap));
      if (!uVar7) {
        break;
      }
      LOCK();
      bVar1 = ((heap.u8(pbVar5)) & 0xff);
      heap.setU8(pbVar5, (heap.u8(pbVar6)) & 0xff);
      UNLOCK();
      heap.setU8(pbVar6, (bVar1) & 0xff);
      pbVar5 = ((pbVar6) >>> 0);
    }
    pbVar4 = ((pbVar4 + 1) >>> 0);
  } while (true);
}
