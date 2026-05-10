// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e0dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043e304 } from "./43e304.js";
import { FUN_00441891 } from "./441891.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0043e0dd(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let extraout_ECX = 0;
  let bVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let pbVar10 = 0;
  let puVar11 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pcVar12 = 0;
  let bVar13 = 0;
  if ((((heap.i8((unaff_ESI + 0x2b)) == 5) && ((heap.i8((unaff_ESI + 0xc5)) | 0) == -1)) && ((heap.u16((unaff_ESI + 200)) & 1) == 0)) && (((heap.u16((unaff_ESI + 0xca)) & 0xa3e0) == 0 && (heap.i16((unaff_ESI + 0xe)) != -0x8000)))) {
    heap.setU32(0x00629288, (0) >>> 0);
    heap.setU32(0x0062928c, (0) >>> 0);
    heap.setU32(0x00629290, (0) >>> 0);
    heap.setU32(0x00629294, (0) >>> 0);
    heap.setU32(0x00629298, (0) >>> 0);
    heap.setU32(0x0062929c, (0) >>> 0);
    heap.setU32(0x006292a0, (0) >>> 0);
    heap.setU32(0x006292a4, (0) >>> 0);
    if ((heap.u16((unaff_ESI + 0xca)) & 2) == 0) {
      uVar4 = (((heap.u16((unaff_ESI + 0x10)) & 0xffe0) - 0x140) & 0xffff);
      in_EDX = ((0) >>> 0);
      uVar5 = (((heap.u16((unaff_ESI + 0xe)) & 0xffe0) - 0x140) & 0xffff);
      do {
        do {
          uVar2 = ((uVar5) & 0xffff);
          uVar8 = ((in_EDX) >>> 0);
          if ((uVar2 < 0xfff) && (uVar4 < 0xfff)) {
            pbVar10 = ((heap.u32((0x00971ef4) + (((((uVar4 << 7 | uVar4 >>> 9 | uVar2) & 0xffff) >>> 5 | (uVar4 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
            do {
              if ((heap.u8(pbVar10) & 0x3c) == 8) {
                bVar7 = ((heap.u8(pbVar10 + (7))) & 0xff);
                heap.setU32(((0x00629288) + (((((bVar7 & 0x1f)) | 0) >>> 3) + ((bVar7 >>> 5) >>> 0) * 4) * 4), (heap.u32((0x00629288) + (((((bVar7 & 0x1f)) | 0) >>> 3) + ((bVar7 >>> 5) >>> 0) * 4) * 4) | 1 << (bVar7 & 7)) & 0xffffffff);
              }
              pbVar1 = ((pbVar10 + 1) >>> 0);
              pbVar10 = ((pbVar10 + 8) >>> 0);
            } while ((heap.u8(pbVar1) & 0x80) == 0);
          }
          bVar7 = ((((uVar8) << 24 >> 24) + 1) & 0xff);
          in_EDX = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar8 >>> 8)), bVar7)) >>> 0);
          uVar5 = ((uVar2 + 0x20) & 0xffff);
        } while (bVar7 < 0x15);
        uVar4 = ((uVar4 + 0x20) & 0xffff);
        bVar7 = (((((uVar8 >>> 8)) << 24 >> 24) + 1) & 0xff);
        in_EDX = ((((bVar7) >>> 0) << 8) >>> 0);
        uVar5 = ((uVar2 - 0x280) & 0xffff);
      } while (bVar7 < 0x15);
    } else {
      uVar8 = ((0) >>> 0);
      pcVar12 = ((0x00887420) >>> 0);
      do {
        if ((heap.i8(pcVar12) | 0) != -1) {
          heap.setU32(((0x00629288) + (((((uVar8 & 0x1f)) | 0) >>> 3) + (uVar8 >>> 5) * 4) * 4), (heap.u32((0x00629288) + (((((uVar8 & 0x1f)) | 0) >>> 3) + (uVar8 >>> 5) * 4) * 4) | 1 << (uVar8 & 7)) & 0xffffffff);
        }
        uVar8 = ((uVar8 + 1) >>> 0);
        pcVar12 = ((pcVar12 + 0x260) >>> 0);
      } while (uVar8 < 0xff);
    }
    puVar11 = ((0x006292ac) >>> 0);
    uVar9 = ((0) >>> 0);
    uVar8 = ((0) >>> 0);
    iVar6 = ((0) >>> 0);
    do {
      if (((((heap.u32(((0x00629288) & 0xff) + ((((uVar8) | 0) >>> 3) + iVar6 * 4) * 4) >>> (uVar8 & 7) & 1) != 0) && ((heap.u8((unaff_ESI + 0x7c + iVar6 * 4 + (((uVar8) | 0) >>> 3))) >>> (uVar8 & 7) & 1) == 0)) && ((heap.u32((0x00887422) + (uVar9 * 0x130) * 4) & 0x200) == 0)) && ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (uVar9 * 0x260) * 4) * 8)) & 0x20000) == 0)) {
        bVar13 = ((false) & 0xff);
        uVar8 = (((regs.eax = FUN_0043e304(heap))) >>> 0);
        iVar6 = ((extraout_ECX) >>> 0);
        if (bVar13) {
          heap.setU32(puVar11, (((uVar9) << 24 >> 24)) & 0xffffffff);
          puVar11 = ((puVar11 + 1) >>> 0);
        }
      }
      uVar9 = ((uVar9 + 1) >>> 0);
      uVar8 = ((uVar8 + 1) >>> 0);
      if (0x1f < uVar8) {
        uVar8 = ((0) >>> 0);
        iVar6 = ((iVar6 + 1) >>> 0);
      }
    } while (uVar9 < 0xff);
    puVar11 = ((puVar11 + -0x6292ac) >>> 0);
    if (puVar11 != 0x0) {
      pbVar10 = ((0x006292ac) >>> 0);
      uVar5 = ((0) & 0xffff);
      do {
        uVar8 = ((heap.u32(pbVar10)) >>> 0);
        if (((heap.u32((0x00887510) + (uVar8 * 0x130) * 4) | 0) != -1) && (uVar5 <= heap.u32(((0x00887512) & 0xffff) + (uVar8 * 0x130) * 4))) {
          uVar5 = ((heap.u32((0x00887512) + (uVar8 * 0x130) * 4)) & 0xffff);
          in_EDX = ((heap.u32(pbVar10)) >>> 0);
        }
        pbVar10 = ((pbVar10 + 1) >>> 0);
        puVar11 = ((puVar11 + -1) >>> 0);
      } while (puVar11 != 0x0);
      if (uVar5 != 0) {
        heap.setI8((unaff_ESI + 0xc5), (((in_EDX) << 24 >> 24)) & 0xff);
        heap.setU8((unaff_ESI + 0xc6), (200) & 0xff);
        uVar3 = (((regs.eax = FUN_00441891(heap))) >>> 0);
        (regs.eax = FUN_005e5301(heap, pbVar10, uVar3));
        heap.setU8((unaff_ESI + 0xf4), (0) & 0xff);
      }
    }
  }
  return;
}
