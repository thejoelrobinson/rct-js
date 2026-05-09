// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4531f6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_004531f6(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let bVar5 = 0;
  let iVar6 = 0;
  let puVar7 = 0;
  let uVar8 = 0;
  let sVar9 = 0;
  let sVar10 = 0;
  let sVar11 = 0;
  let uVar12 = 0;
  let pbVar13 = 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let unaff_ESI = regs.esi >>> 0;
  puVar7 = ((heap.u32(0x00632408)) >>> 0);
  iVar6 = ((heap.u32(0x006323fc)) >>> 0);
  uVar8 = ((heap.u8(0x006326c4)) >>> 0);
  if (((heap.i8((unaff_ESI + 0xbb)) | 0) != -1) || ((heap.i8((unaff_ESI + 0xbd)) | 0) != -1)) {
    uVar3 = ((heap.u32((unaff_ESI + 0x16))) >>> 0);
    uVar4 = ((heap.u32((unaff_ESI + 0x1a))) >>> 0);
    sVar10 = ((((uVar3) << 16 >> 16)) & 0xffff);
    if (sVar10 != -0x8000) {
      sVar9 = ((heap.i16((heap.u32(0x006323fc) + 8))) & 0xffff);
      sVar11 = ((heap.i16((heap.u32(0x006323fc) + 10))) & 0xffff);
      uVar15 = ((heap.u16((heap.u32(0x006323fc) + 0xc)) >>> 2) & 0xffff);
      uVar14 = ((heap.u16((heap.u32(0x006323fc) + 0xc)) >>> 2) & 0xffff);
      if (heap.i8((heap.u32(0x00632400) + 0x174)) == 0) {
        sVar9 = ((sVar9 - uVar15) & 0xffff);
        sVar11 = ((sVar11 - uVar14) & 0xffff);
      }
      heap.setU8(0x006326c4, (((uVar4) << 16 >> 16)) & 0xff);
      heap.setU8(0x006326c0, (uVar3) & 0xff);
      uVar8 = ((uVar4) >>> 0);
      if ((sVar9 < heap.u8(0x006326c4)) && (heap.setU8(0x006326c6, ((((((uVar4) >>> 0) >>> 0x10)) << 16 >> 16)) & 0xff), sVar11 < heap.u8(0x006326c6))) {
        sVar9 = ((sVar9 + heap.i16((heap.u32(0x006323fc) + 0xc))) & 0xffff);
        sVar11 = ((sVar11 + heap.i16((heap.u32(0x006323fc) + 0xe))) & 0xffff);
        if (heap.i8((heap.u32(0x00632400) + 0x174)) == 0) {
          sVar9 = ((sVar9 + uVar15 * 2) & 0xffff);
          sVar11 = ((sVar11 + uVar14 * 2) & 0xffff);
        }
        if ((sVar10 <= sVar9) && (heap.setU8(0x006326c2, ((((((uVar3) >>> 0) >>> 0x10)) << 16 >> 16)) & 0xff), bVar5 = ((heap.u8(0x006326c2) <= sVar11) & 0xff), bVar5)) {
          sVar10 = ((sVar10 + heap.u8(0x006326c4)) & 0xffff);
          uVar12 = ((((heap.u32(0x00971ed6)) >>> 0)) >>> 0);
          if (uVar12 < 0x40) {
            uVar12 = ((0x40) >>> 0);
          }
          heap.setU8(0x006326c4, (uVar4) & 0xff);
          heap.setU32((heap.u32(0x00632408) + (1) * 4), ((((((((((((((sVar10 >>> 1) - heap.i16((heap.u32(0x006323fc) + 8)))) << 16 >> 16) >>> (heap.u8((heap.u32(0x006323fc) + 0x10)) & 0x1f)) + heap.i16((heap.u32(0x006323fc) + 4))) >>> 0) << 0x10)) >>> 0) / ((uVar12) >>> 0) + -0x8000 >>> 4)) << 16 >> 16)) & 0xffffffff);
          uVar12 = ((((heap.u32(0x00971ed8)) >>> 0)) >>> 0);
          if (uVar12 < 0x40) {
            uVar12 = ((0x40) >>> 0);
          }
          heap.setU16((puVar7 + (2) * 2), (((((((((((((((((heap.u8(0x006326c2) + heap.u8(0x006326c6))) << 16 >> 16) >>> 1) - heap.i16((iVar6 + 10)))) << 16 >> 16) >>> (heap.u8((iVar6 + 0x10)) & 0x1f)) + heap.i16((iVar6 + 6))) >>> 0) << 0x10)) >>> 0) / ((uVar12) >>> 0) + -0x8000 >>> 4)) << 16 >> 16)) & 0xffff);
          uVar12 = ((heap.u32((unaff_ESI + 0x28))) >>> 0);
          if ((heap.u32((0x005f72ef) + (heap.u32((unaff_ESI + 0x31)) * 4) * 4) & 1) != 0) {
            uVar12 = ((uVar12 << 1) >>> 0);
          }
          if (((uVar12) >>> 0) < 0) {
            uVar12 = ((-uVar12) >>> 0);
          }
          uVar2 = ((heap.u16((unaff_ESI + 10))) & 0xffff);
          heap.setU16((puVar7 + (3) * 2), (((((uVar12 >>> 5) * 0x1588 >>> 0xe)) << 16 >> 16) + 0x2b11 + heap.i8((unaff_ESI + 0xbf)) * 0x10) & 0xffff);
          heap.setU32(puVar7, (uVar2) & 0xffffffff);
          heap.setU8((puVar7 + ((4) * 2)), (0) & 0xff);
          if (heap.u16((unaff_ESI + 0xe)) != 0x8000) {
            uVar14 = ((heap.u16((unaff_ESI + 0x10)) >>> 9) & 0xffff);
            pbVar13 = ((heap.u32((0x00971ef4) + ((((((heap.u16((unaff_ESI + 0x10)) & 0xffe0) << 7 | uVar14 | heap.u16((unaff_ESI + 0xe)) & 0xffe0) & 0xffff) >>> 5 | uVar14 << 0xb) & 0xffff)) * 4)) >>> 0);
            bVar1 = ((heap.u8(pbVar13)) & 0xff);
            while ((bVar1 & 0x3c) != 0) {
              pbVar13 = ((pbVar13 + 8) >>> 0);
              bVar1 = ((heap.u8(pbVar13)) & 0xff);
            }
            if (heap.u16((unaff_ESI + 0x12)) < ((((heap.u8(pbVar13 + (2))) & 0xffff) * 4) & 0xffff)) {
              heap.setU8((puVar7 + ((4) * 2)), (0x30) & 0xff);
            }
          }
          heap.setU32(0x00632408, (heap.u32(0x00632408) + 5) >>> 0);
          return;
        }
      }
    }
  }
  heap.setU8(0x006326c4, (uVar8) & 0xff);
  return;
}
