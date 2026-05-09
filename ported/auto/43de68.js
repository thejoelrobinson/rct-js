// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43de68.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043e304 } from "./43e304.js";
import { FUN_00441891 } from "./441891.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0043de68(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let iVar7 = 0;
  let extraout_ECX = 0;
  let bVar8 = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  let puVar13 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar14 = 0;
  let bVar15 = 0;
  if (((((heap.i8((unaff_ESI + 0x2b)) == 8) || (heap.i8((unaff_ESI + 0x2b)) == 5)) && ((heap.u16((unaff_ESI + 200)) & 1) == 0)) && (heap.i16((unaff_ESI + 0xe)) != -0x8000)) && (((uVar10 = ((heap.u32((unaff_ESI + 0xc5))) >>> 0), heap.u8((unaff_ESI + 0xc5)) == 0xff || (uVar10 = ((heap.u32(((0x00887420) >>> 0) + (uVar10 * 0x260) * 4)) >>> 0), (heap.u32((0x005f5b78 + uVar10 * 8)) & 0x3800000) == 0)) && ((in_EAX == 0x2000000 || ((heap.u16((unaff_ESI + 0xca)) & 0xa3e0) == 0)))))) {
    heap.setU32(0x00629288, (0) >>> 0);
    heap.setU32(0x0062928c, (0) >>> 0);
    heap.setU32(0x00629290, (0) >>> 0);
    heap.setU32(0x00629294, (0) >>> 0);
    heap.setU32(0x00629298, (0) >>> 0);
    heap.setU32(0x0062929c, (0) >>> 0);
    heap.setU32(0x006292a0, (0) >>> 0);
    heap.setU32(0x006292a4, (0) >>> 0);
    heap.setU32(0x006292a8, (in_EAX) >>> 0);
    if ((heap.u16((unaff_ESI + 0xca)) & 2) == 0) {
      uVar5 = (((heap.u16((unaff_ESI + 0x10)) & 0xffe0) - 0x140) & 0xffff);
      uVar10 = ((0) >>> 0);
      uVar9 = (((heap.u16((unaff_ESI + 0xe)) & 0xffe0) - 0x140) & 0xffff);
      do {
        do {
          uVar2 = ((uVar9) & 0xffff);
          uVar11 = ((uVar10) >>> 0);
          if ((uVar2 < 0xfff) && (uVar5 < 0xfff)) {
            pbVar14 = ((heap.u32((0x00971ef4) + (((((uVar5 << 7 | uVar5 >>> 9 | uVar2) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
            do {
              if ((heap.u8(pbVar14) & 0x3c) == 8) {
                uVar10 = ((((heap.u8(pbVar14 + (7))) >>> 0)) >>> 0);
                if ((heap.u32(0x006292a8) & heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (uVar10 * 0x260) * 4) * 8))) != 0) {
                  heap.setU32(((0x00629288) + (((((uVar10 & 0x1f)) >>> 0) >>> 3) + ((heap.u8(pbVar14 + (7)) >>> 5) >>> 0) * 4) * 4), (heap.u32((0x00629288) + (((((uVar10 & 0x1f)) >>> 0) >>> 3) + ((heap.u8(pbVar14 + (7)) >>> 5) >>> 0) * 4) * 4) | 1 << (uVar10 & 7)) & 0xffffffff);
                }
              }
              pbVar1 = ((pbVar14 + 1) >>> 0);
              pbVar14 = ((pbVar14 + 8) >>> 0);
            } while ((heap.u8(pbVar1) & 0x80) == 0);
          }
          bVar8 = ((((uVar11) << 24 >> 24) + 1) & 0xff);
          uVar10 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), bVar8)) >>> 0);
          uVar9 = ((uVar2 + 0x20) & 0xffff);
        } while (bVar8 < 0x15);
        uVar5 = ((uVar5 + 0x20) & 0xffff);
        bVar8 = (((((uVar11 >>> 8)) << 24 >> 24) + 1) & 0xff);
        uVar10 = ((((bVar8) >>> 0) << 8) >>> 0);
        uVar9 = ((uVar2 - 0x280) & 0xffff);
      } while (bVar8 < 0x15);
    } else {
      uVar11 = ((0) >>> 0);
      pbVar14 = ((0x00887420) >>> 0);
      do {
        if ((heap.u8(pbVar14) != 0xff) && ((heap.u32(0x006292a8) & heap.u32((0x005f5b78 + heap.u32(pbVar14) * 8))) != 0)) {
          heap.setU32(((0x00629288) + (((((uVar11 & 0x1f)) >>> 0) >>> 3) + (uVar11 >>> 5) * 4) * 4), (heap.u32((0x00629288) + (((((uVar11 & 0x1f)) >>> 0) >>> 3) + (uVar11 >>> 5) * 4) * 4) | 1 << (uVar11 & 7)) & 0xffffffff);
        }
        uVar11 = ((uVar11 + 1) >>> 0);
        pbVar14 = ((pbVar14 + 0x260) >>> 0);
      } while (uVar11 < 0xff);
    }
    puVar13 = ((0x006292ac) >>> 0);
    uVar12 = ((0) >>> 0);
    uVar11 = ((0) >>> 0);
    iVar7 = ((0) >>> 0);
    do {
      if ((heap.u32(((0x00629288) & 0xff) + ((((uVar11) >>> 0) >>> 3) + iVar7 * 4) * 4) >>> (uVar11 & 7) & 1) != 0) {
        bVar15 = ((false) & 0xff);
        uVar11 = (((regs.eax = FUN_0043e304(heap, puVar13, uVar10))) >>> 0);
        iVar7 = ((extraout_ECX) >>> 0);
        if (bVar15) {
          heap.setU32(puVar13, (((uVar12) << 24 >> 24)) & 0xffffffff);
          puVar13 = ((puVar13 + 1) >>> 0);
        }
      }
      uVar12 = ((uVar12 + 1) >>> 0);
      uVar11 = ((uVar11 + 1) >>> 0);
      if (0x1f < uVar11) {
        uVar11 = ((0) >>> 0);
        iVar7 = ((iVar7 + 1) >>> 0);
      }
    } while (uVar12 < 0xff);
    puVar13 = ((puVar13 + -0x6292ac) >>> 0);
    if (puVar13 != 0x0) {
      pbVar14 = ((0x006292ac) >>> 0);
      uVar9 = ((0xffff) & 0xffff);
      do {
        sVar3 = (((heap.u32((0x0088744a) + (heap.u32(pbVar14) * 0x130) * 4) & 0xff) * 0x20 - heap.i16((unaff_ESI + 0xe))) & 0xffff);
        if (sVar3 < 0) {
          sVar3 = ((-sVar3) & 0xffff);
        }
        sVar6 = (((heap.u32(((0x0088744a) & 0xffff) + (heap.u32(pbVar14) * 0x130) * 4) >>> 8) * 0x20 - heap.i16((unaff_ESI + 0x10))) & 0xffff);
        if (sVar6 < 0) {
          sVar6 = ((-sVar6) & 0xffff);
        }
        if (((sVar3 + sVar6) & 0xffff) < uVar9) {
          uVar11 = ((heap.u32(pbVar14)) >>> 0);
          uVar9 = ((sVar3 + sVar6) & 0xffff);
        }
        pbVar14 = ((pbVar14 + 1) >>> 0);
        puVar13 = ((puVar13 + -1) >>> 0);
      } while (puVar13 != 0x0);
      heap.setI8((unaff_ESI + 0xc5), (((uVar11) << 24 >> 24)) & 0xff);
      heap.setU8((unaff_ESI + 0xc6), (200) & 0xff);
      uVar4 = (((regs.eax = FUN_00441891(heap))) >>> 0);
      (regs.eax = FUN_005e5301(heap, pbVar14, uVar4));
      heap.setU8((unaff_ESI + 0xf4), (0) & 0xff);
    }
  }
  return;
}
