// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/421553.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uRam0099a01c } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00421553(heap) {
  let iVar1 = 0;
  let bVar2 = 0;
  let bVar4 = 0;
  let in_CL = regs.ecx & 0xff;
  let bVar6 = 0;
  let bVar7 = 0;
  let uVar8 = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar9 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar11 = 0;
  let iVar12 = 0;
  let pbVar13 = 0;
  let uVar14 = 0;
  let cVar3 = 0;
  let cVar5 = 0;
  let uVar10 = 0;
  uVar11 = ((heap.u32(0x00991f74) + heap.i16((0x005f4676 + heap.u8(0x00991f88) * 4))) & 0xffff);
  uVar10 = ((((((in_EDX) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  if ((((heap.u32(0x00991f70) + heap.i16((0x005f4674 + heap.u8(0x00991f88) * 4))) & 0xffff) < 0x1000) && (uVar11 < 0x1000)) {
    uVar11 = ((uVar11 * 0x80 | uVar11 >>> 9 | heap.u32(0x00991f70) + heap.i16((0x005f4674 + heap.u8(0x00991f88) * 4))) & 0xffff);
    pbVar13 = ((heap.u32((0x00971ef4) + (((uVar11 >>> 5 | uVar11 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar2 = ((heap.u8(pbVar13)) & 0xff);
    while ((bVar2 & 0x3c) != 0) {
      pbVar13 = ((pbVar13 + 8) >>> 0);
      bVar2 = ((heap.u8(pbVar13)) & 0xff);
    }
    uVar14 = ((CONCAT22(uVar10, CONCAT11(heap.u8(pbVar13 + (5)), ((in_EDX) << 24 >> 24))) & 0xffff1fff) >>> 0);
    if (((uVar14) << 24 >> 24) == (((uVar14 >>> 8)) << 24 >> 24)) {
      return;
    }
    uVar11 = (((heap.u8(pbVar13 + (4)) & 0xf) << (in_CL & 0x1f)) & 0xffff);
    uVar8 = ((CONCAT22((((uVar14 >>> 0x10)) << 16 >> 16), CONCAT11(heap.u8(pbVar13 + (2)) >>> 2, ((uVar14) << 24 >> 24)))) >>> 0);
    uVar14 = ((heap.u8(pbVar13 + (4)) & 0x10 | ((uVar11 >>> 4 | uVar11) & 0xffff) & 0xf) >>> 0);
  } else {
    uVar14 = ((0) >>> 0);
    uVar8 = ((CONCAT22(uVar10, CONCAT11(1, ((in_EDX) << 24 >> 24)))) >>> 0);
  }
  cVar3 = ((((uVar8) << 24 >> 24)) & 0xff);
  bVar2 = ((cVar3 + heap.u32((0x005f46a4) + (unaff_EBX) * 4)) & 0xff);
  bVar6 = ((cVar3 + heap.u32((0x005f4704) + (unaff_EBX) * 4)) & 0xff);
  cVar5 = (((((((uVar8) >>> 0) >>> 8)) << 24 >> 24)) & 0xff);
  bVar4 = ((cVar5 + heap.u32((0x005f46c4) + (uVar14) * 4)) & 0xff);
  bVar7 = ((cVar5 + heap.u32((0x005f46e4) + (uVar14) * 4)) & 0xff);
  if ((bVar2 <= bVar4) && (bVar6 <= bVar7)) {
    return;
  }
  iVar12 = ((heap.u32(0x005f476c)) >>> 0);
  if ((heap.u32(0x00991f8c) & 1) != 0) {
    iVar12 = ((heap.u32(0x005f4770)) >>> 0);
  }
  heap.setU32(0x005f4724, (iVar12 + 5) >>> 0);
  uVar10 = ((((((uVar8) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  iVar9 = ((CONCAT22(uVar10, CONCAT11(bVar7, cVar3))) >>> 0);
  iVar12 = ((iVar9) >>> 0);
  if (bVar7 != bVar4) {
    if (bVar4 <= bVar7) {
      iVar9 = ((CONCAT22(uVar10, CONCAT11(bVar4, cVar3))) >>> 0);
    }
    bVar4 = ((((((iVar9) >>> 0) >>> 8) & 0xff)) & 0xff);
    iVar12 = ((iVar9) >>> 0);
    if ((bVar4 != bVar2) && (bVar4 != bVar6)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      iVar9 = ((CONCAT22((((((iVar9) >>> 0) >>> 0x10)) << 16 >> 16), CONCAT11(bVar4 + 1, ((iVar9) << 24 >> 24)))) >>> 0);
      iVar12 = ((iVar9) >>> 0);
    }
  }
  LAB_00421670: do {
    bVar4 = ((((((iVar9) >>> 0) >>> 8) & 0xff)) & 0xff);
    if ((bVar2 <= bVar4) || (bVar6 <= bVar4)) {
      if ((bVar4 < bVar2) || (bVar4 < bVar6)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), iVar12, unaff_EBX));
      }
      return;
    }
    while (bVar4 != heap.u8(0x00999fdc)) {
      if (bVar4 <= heap.u8(0x00999fdc)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
        iVar9 = ((((bVar4 + 1) >>> 0) << 8) >>> 0);
        /* goto LAB_00421670 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00421553/LAB_00421670"); return 0;
      }
      heap.setU8((0x00999fdc + 0), (((heap.u16(0x999fde)) & 0xff)) & 0xff);
      heap.setU8((0x00999fdc + 1), (((((heap.u16(0x999fde)) & 0xffff) >>> 8) & 0xff)) & 0xff);
      heap.setU16((0x00999fdc + 2), (heap.u16(0x00999fe0)) & 0xffff);
      heap.setU16((0x00999fe0 + 0), (heap.u16(0x999fe2)) & 0xffff);
      heap.setU16((0x00999fe0 + 2), (heap.u16(0x00999fe4)) & 0xffff);
      heap.setU16((0x00999fe4 + 0), (heap.u16(0x999fe6)) & 0xffff);
      heap.setU16((0x00999fe4 + 2), (heap.u16(0x00999fe8)) & 0xffff);
      heap.setU16((0x00999fe8 + 0), (heap.u16(0x999fea)) & 0xffff);
      heap.setU16((0x00999fe8 + 2), (heap.u16(0x00999fec)) & 0xffff);
      heap.setU16((0x00999fec + 0), (heap.u16(0x999fee)) & 0xffff);
      heap.setU16((0x00999fec + 2), (heap.u16(0x00999ff0)) & 0xffff);
      heap.setU16((0x00999ff0 + 0), (heap.u16(0x999ff2)) & 0xffff);
      heap.setU16((0x00999ff0 + 2), (heap.u16(0x00999ff4)) & 0xffff);
      heap.setU16((0x00999ff4 + 0), (heap.u16(0x999ff6)) & 0xffff);
      heap.setU16((0x00999ff4 + 2), (heap.u16(0x00999ff8)) & 0xffff);
      heap.setU16((0x00999ff8 + 0), (heap.u16(0x999ffa)) & 0xffff);
      heap.setU16((0x00999ff8 + 2), (heap.u16(0x00999ffc)) & 0xffff);
      heap.setU16((0x00999ffc + 0), (heap.u16(0x999ffe)) & 0xffff);
      heap.setU16((0x00999ffc + 2), (heap.u16(0x0099a000)) & 0xffff);
      heap.setU16((0x0099a000 + 0), (heap.u16(0x99a002)) & 0xffff);
      heap.setU16((0x0099a000 + 2), (heap.u16(0x0099a004)) & 0xffff);
      heap.setU16((0x0099a004 + 0), (heap.u16(0x99a006)) & 0xffff);
      heap.setU16((0x0099a004 + 2), (heap.u16(0x0099a008)) & 0xffff);
      heap.setU16((0x0099a008 + 0), (heap.u16(0x99a00a)) & 0xffff);
      heap.setU16((0x0099a008 + 2), (heap.u16(0x0099a00c)) & 0xffff);
      heap.setU16((0x0099a00c + 0), (heap.u16(0x99a00e)) & 0xffff);
      heap.setU16((0x0099a00c + 2), (heap.u16(0x0099a010)) & 0xffff);
      heap.setU16((0x0099a010 + 0), (heap.u16(0x99a012)) & 0xffff);
      heap.setU16((0x0099a010 + 2), (heap.u16(0x0099a014)) & 0xffff);
      heap.setU16((0x0099a014 + 0), (heap.u16(0x99a016)) & 0xffff);
      heap.setU16((0x0099a014 + 2), (heap.u16(0x0099a018)) & 0xffff);
      heap.setU16((0x0099a018 + 0), (heap.u16(0x99a01a)) & 0xffff);
      heap.setU16((0x0099a018 + 2), (uRam0099a01c) & 0xffff);
    }
    uVar14 = ((((heap.u8(0x999fdd)) >>> 0)) >>> 0);
    bVar7 = ((bVar4 + heap.u32((0x005f472e) + (uVar14 * 2) * 4)) & 0xff);
    if ((bVar2 < bVar7) || (bVar6 < bVar7)) {
      iVar1 = ((uVar14 * 2) >>> 0);
      heap.setU8((0x00999fdc + 1), (heap.u32((0x005f475e) + (uVar14) * 4)) & 0xff);
      uVar14 = ((((heap.u8(0x999fdd)) >>> 0)) >>> 0);
      bVar7 = (((bVar7 - heap.u32((0x005f472e) + (iVar1) * 4)) + heap.u32((0x005f472e) + (uVar14 * 2) * 4)) & 0xff);
    }
    heap.setU32(0x0099a4ec, (((bVar7 - heap.u32((0x005f472e) + (uVar14 * 2) * 4)) & 0xffff) * 0x10 + heap.i16((0x005f4746 + uVar14 * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) < 0x10) {
      heap.setU32(0x0099a4ec, (heap.u32(0x0099a4ec) + 0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
    heap.setU32(0x0099a4ec, ((((iVar9) & 0xffff) >>> 8) * 0x10 + heap.i16((0x005f4746 + ((heap.u8(0x999fdd)) >>> 0) * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) == 0) {
      heap.setU32(0x0099a4ec, (0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0x1f) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
    iVar9 = ((((bVar4 + heap.u32((0x005f472e) + (((heap.u8(0x999fdd)) >>> 0) * 2) * 4)) >>> 0) << 8) >>> 0);
    heap.setU8((0x00999fdc + 0), (((heap.u16(0x999fde)) & 0xff)) & 0xff);
    heap.setU8((0x00999fdc + 1), (((((heap.u16(0x999fde)) & 0xffff) >>> 8) & 0xff)) & 0xff);
    heap.setU16((0x00999fdc + 2), (heap.u16(0x00999fe0)) & 0xffff);
    heap.setU16((0x00999fe0 + 0), (heap.u16(0x999fe2)) & 0xffff);
    heap.setU16((0x00999fe0 + 2), (heap.u16(0x00999fe4)) & 0xffff);
    heap.setU16((0x00999fe4 + 0), (heap.u16(0x999fe6)) & 0xffff);
    heap.setU16((0x00999fe4 + 2), (heap.u16(0x00999fe8)) & 0xffff);
    heap.setU16((0x00999fe8 + 0), (heap.u16(0x999fea)) & 0xffff);
    heap.setU16((0x00999fe8 + 2), (heap.u16(0x00999fec)) & 0xffff);
    heap.setU16((0x00999fec + 0), (heap.u16(0x999fee)) & 0xffff);
    heap.setU16((0x00999fec + 2), (heap.u16(0x00999ff0)) & 0xffff);
    heap.setU16((0x00999ff0 + 0), (heap.u16(0x999ff2)) & 0xffff);
    heap.setU16((0x00999ff0 + 2), (heap.u16(0x00999ff4)) & 0xffff);
    heap.setU16((0x00999ff4 + 0), (heap.u16(0x999ff6)) & 0xffff);
    heap.setU16((0x00999ff4 + 2), (heap.u16(0x00999ff8)) & 0xffff);
    heap.setU16((0x00999ff8 + 0), (heap.u16(0x999ffa)) & 0xffff);
    heap.setU16((0x00999ff8 + 2), (heap.u16(0x00999ffc)) & 0xffff);
    heap.setU16((0x00999ffc + 0), (heap.u16(0x999ffe)) & 0xffff);
    heap.setU16((0x00999ffc + 2), (heap.u16(0x0099a000)) & 0xffff);
    heap.setU16((0x0099a000 + 0), (heap.u16(0x99a002)) & 0xffff);
    heap.setU16((0x0099a000 + 2), (heap.u16(0x0099a004)) & 0xffff);
    heap.setU16((0x0099a004 + 0), (heap.u16(0x99a006)) & 0xffff);
    heap.setU16((0x0099a004 + 2), (heap.u16(0x0099a008)) & 0xffff);
    heap.setU16((0x0099a008 + 0), (heap.u16(0x99a00a)) & 0xffff);
    heap.setU16((0x0099a008 + 2), (heap.u16(0x0099a00c)) & 0xffff);
    heap.setU16((0x0099a00c + 0), (heap.u16(0x99a00e)) & 0xffff);
    heap.setU16((0x0099a00c + 2), (heap.u16(0x0099a010)) & 0xffff);
    heap.setU16((0x0099a010 + 0), (heap.u16(0x99a012)) & 0xffff);
    heap.setU16((0x0099a010 + 2), (heap.u16(0x0099a014)) & 0xffff);
    heap.setU16((0x0099a014 + 0), (heap.u16(0x99a016)) & 0xffff);
    heap.setU16((0x0099a014 + 2), (heap.u16(0x0099a018)) & 0xffff);
    heap.setU16((0x0099a018 + 0), (heap.u16(0x99a01a)) & 0xffff);
    heap.setU16((0x0099a018 + 2), (uRam0099a01c) & 0xffff);
  } while (true);
}
