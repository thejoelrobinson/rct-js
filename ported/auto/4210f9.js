// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4210f9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uRam00999fda } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004210f9(heap) {
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
  let pbVar12 = 0;
  let uVar13 = 0;
  let iVar14 = 0;
  let cVar3 = 0;
  let cVar5 = 0;
  let uVar10 = 0;
  uVar11 = ((heap.u32(0x00991f74) + heap.i16((0x005f4666 + heap.u8(0x00991f88) * 4))) & 0xffff);
  uVar10 = ((((((in_EDX) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  if ((((heap.u32(0x00991f70) + heap.i16((0x005f4664 + heap.u8(0x00991f88) * 4))) & 0xffff) < 0x1000) && (uVar11 < 0x1000)) {
    uVar11 = ((uVar11 * 0x80 | uVar11 >>> 9 | heap.u32(0x00991f70) + heap.i16((0x005f4664 + heap.u8(0x00991f88) * 4))) & 0xffff);
    pbVar12 = ((heap.u32((0x00971ef4) + (((uVar11 >>> 5 | uVar11 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar2 = ((heap.u8(pbVar12)) & 0xff);
    while ((bVar2 & 0x3c) != 0) {
      pbVar12 = ((pbVar12 + 8) >>> 0);
      bVar2 = ((heap.u8(pbVar12)) & 0xff);
    }
    uVar13 = ((CONCAT22(uVar10, CONCAT11(heap.u8(pbVar12 + (5)), ((in_EDX) << 24 >> 24))) & 0xffff1fff) >>> 0);
    if (((uVar13) << 24 >> 24) == (((uVar13 >>> 8)) << 24 >> 24)) {
      return;
    }
    uVar11 = (((heap.u8(pbVar12 + (4)) & 0xf) << (in_CL & 0x1f)) & 0xffff);
    uVar8 = ((CONCAT22((((uVar13 >>> 0x10)) << 16 >> 16), CONCAT11(heap.u8(pbVar12 + (2)) >>> 2, ((uVar13) << 24 >> 24)))) >>> 0);
    uVar13 = ((heap.u8(pbVar12 + (4)) & 0x10 | ((uVar11 >>> 4 | uVar11) & 0xffff) & 0xf) >>> 0);
  } else {
    uVar13 = ((0) >>> 0);
    uVar8 = ((CONCAT22(uVar10, CONCAT11(1, ((in_EDX) << 24 >> 24)))) >>> 0);
  }
  cVar3 = ((((uVar8) << 24 >> 24)) & 0xff);
  bVar2 = ((cVar3 + heap.u32((0x005f46e4) + (unaff_EBX) * 4)) & 0xff);
  bVar6 = ((cVar3 + heap.u32((0x005f4704) + (unaff_EBX) * 4)) & 0xff);
  cVar5 = (((((((uVar8) >>> 0) >>> 8)) << 24 >> 24)) & 0xff);
  bVar4 = ((cVar5 + heap.u32((0x005f46c4) + (uVar13) * 4)) & 0xff);
  bVar7 = ((cVar5 + heap.u32((0x005f46a4) + (uVar13) * 4)) & 0xff);
  if ((bVar2 <= bVar4) && (bVar6 <= bVar7)) {
    return;
  }
  heap.setU32(0x005f4724, (heap.u32(0x005f476c)) >>> 0);
  if ((heap.u32(0x00991f8c) & 1) != 0) {
    heap.setU32(0x005f4724, (heap.u32(0x005f4770)) >>> 0);
  }
  uVar10 = ((((((uVar8) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  iVar9 = ((CONCAT22(uVar10, CONCAT11(bVar7, cVar3))) >>> 0);
  iVar14 = ((iVar9) >>> 0);
  if (bVar7 != bVar4) {
    if (bVar4 <= bVar7) {
      iVar9 = ((CONCAT22(uVar10, CONCAT11(bVar4, cVar3))) >>> 0);
    }
    bVar4 = ((((((iVar9) >>> 0) >>> 8) & 0xff)) & 0xff);
    iVar14 = ((iVar9) >>> 0);
    if ((bVar4 != bVar2) && (bVar4 != bVar6)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      iVar9 = ((CONCAT22((((((iVar9) >>> 0) >>> 0x10)) << 16 >> 16), CONCAT11(bVar4 + 1, ((iVar9) << 24 >> 24)))) >>> 0);
      iVar14 = ((iVar9) >>> 0);
    }
  }
  LAB_00421213: do {
    bVar4 = ((((((iVar9) >>> 0) >>> 8) & 0xff)) & 0xff);
    if ((bVar2 <= bVar4) || (bVar6 <= bVar4)) {
      if ((bVar4 < bVar2) || (bVar4 < bVar6)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), iVar14, unaff_EBX));
      }
      return;
    }
    while (bVar4 != heap.u8(0x00999f9a)) {
      if (bVar4 <= heap.u8(0x00999f9a)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
        iVar9 = ((((bVar4 + 1) >>> 0) << 8) >>> 0);
        /* goto LAB_00421213 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004210f9/LAB_00421213"); return 0;
      }
      heap.setU8((0x00999f9a + 0), (((heap.u16(0x999f9c)) & 0xff)) & 0xff);
      heap.setU8((0x00999f9a + 1), (((((heap.u16(0x999f9c)) & 0xffff) >>> 8) & 0xff)) & 0xff);
      heap.setU16((0x00999f9a + 2), (heap.u16(0x00999f9e)) & 0xffff);
      heap.setU16((0x00999f9e + 0), (heap.u16(0x999fa0)) & 0xffff);
      heap.setU16((0x00999f9e + 2), (heap.u16(0x00999fa2)) & 0xffff);
      heap.setU16((0x00999fa2 + 0), (heap.u16(0x999fa4)) & 0xffff);
      heap.setU16((0x00999fa2 + 2), (heap.u16(0x00999fa6)) & 0xffff);
      heap.setU16((0x00999fa6 + 0), (heap.u16(0x999fa8)) & 0xffff);
      heap.setU16((0x00999fa6 + 2), (heap.u16(0x00999faa)) & 0xffff);
      heap.setU16((0x00999faa + 0), (heap.u16(0x999fac)) & 0xffff);
      heap.setU16((0x00999faa + 2), (heap.u16(0x00999fae)) & 0xffff);
      heap.setU16((0x00999fae + 0), (heap.u16(0x999fb0)) & 0xffff);
      heap.setU16((0x00999fae + 2), (heap.u16(0x00999fb2)) & 0xffff);
      heap.setU16((0x00999fb2 + 0), (heap.u16(0x999fb4)) & 0xffff);
      heap.setU16((0x00999fb2 + 2), (heap.u16(0x00999fb6)) & 0xffff);
      heap.setU16((0x00999fb6 + 0), (heap.u16(0x999fb8)) & 0xffff);
      heap.setU16((0x00999fb6 + 2), (heap.u16(0x00999fba)) & 0xffff);
      heap.setU16((0x00999fba + 0), (heap.u16(0x999fbc)) & 0xffff);
      heap.setU16((0x00999fba + 2), (heap.u16(0x00999fbe)) & 0xffff);
      heap.setU16((0x00999fbe + 0), (heap.u16(0x999fc0)) & 0xffff);
      heap.setU16((0x00999fbe + 2), (heap.u16(0x00999fc2)) & 0xffff);
      heap.setU16((0x00999fc2 + 0), (heap.u16(0x999fc4)) & 0xffff);
      heap.setU16((0x00999fc2 + 2), (heap.u16(0x00999fc6)) & 0xffff);
      heap.setU16((0x00999fc6 + 0), (heap.u16(0x999fc8)) & 0xffff);
      heap.setU16((0x00999fc6 + 2), (heap.u16(0x00999fca)) & 0xffff);
      heap.setU16((0x00999fca + 0), (heap.u16(0x999fcc)) & 0xffff);
      heap.setU16((0x00999fca + 2), (heap.u16(0x00999fce)) & 0xffff);
      heap.setU16((0x00999fce + 0), (heap.u16(0x999fd0)) & 0xffff);
      heap.setU16((0x00999fce + 2), (heap.u16(0x00999fd2)) & 0xffff);
      heap.setU16((0x00999fd2 + 0), (heap.u16(0x999fd4)) & 0xffff);
      heap.setU16((0x00999fd2 + 2), (heap.u16(0x00999fd6)) & 0xffff);
      heap.setU16((0x00999fd6 + 0), (heap.u16(0x999fd8)) & 0xffff);
      heap.setU16((0x00999fd6 + 2), (uRam00999fda) & 0xffff);
    }
    uVar13 = ((((heap.u8(0x999f9b)) >>> 0)) >>> 0);
    bVar7 = ((bVar4 + heap.u32((0x005f472e) + (uVar13 * 2) * 4)) & 0xff);
    if ((bVar2 < bVar7) || (bVar6 < bVar7)) {
      iVar1 = ((uVar13 * 2) >>> 0);
      heap.setU8((0x00999f9a + 1), (heap.u32((0x005f475e) + (uVar13) * 4)) & 0xff);
      uVar13 = ((((heap.u8(0x999f9b)) >>> 0)) >>> 0);
      bVar7 = (((bVar7 - heap.u32((0x005f472e) + (iVar1) * 4)) + heap.u32((0x005f472e) + (uVar13 * 2) * 4)) & 0xff);
    }
    heap.setU32(0x0099a4ec, (((bVar7 - heap.u32((0x005f472e) + (uVar13 * 2) * 4)) & 0xffff) * 0x10 + heap.i16((0x005f4746 + uVar13 * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) < 0x10) {
      heap.setU32(0x0099a4ec, (heap.u32(0x0099a4ec) + 0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
    heap.setU32(0x0099a4ec, ((((iVar9) & 0xffff) >>> 8) * 0x10 + heap.i16((0x005f4746 + ((heap.u8(0x999f9b)) >>> 0) * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) == 0) {
      heap.setU32(0x0099a4ec, (0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0x1f) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
    iVar9 = ((((bVar4 + heap.u32((0x005f472e) + (((heap.u8(0x999f9b)) >>> 0) * 2) * 4)) >>> 0) << 8) >>> 0);
    heap.setU8((0x00999f9a + 0), (((heap.u16(0x999f9c)) & 0xff)) & 0xff);
    heap.setU8((0x00999f9a + 1), (((((heap.u16(0x999f9c)) & 0xffff) >>> 8) & 0xff)) & 0xff);
    heap.setU16((0x00999f9a + 2), (heap.u16(0x00999f9e)) & 0xffff);
    heap.setU16((0x00999f9e + 0), (heap.u16(0x999fa0)) & 0xffff);
    heap.setU16((0x00999f9e + 2), (heap.u16(0x00999fa2)) & 0xffff);
    heap.setU16((0x00999fa2 + 0), (heap.u16(0x999fa4)) & 0xffff);
    heap.setU16((0x00999fa2 + 2), (heap.u16(0x00999fa6)) & 0xffff);
    heap.setU16((0x00999fa6 + 0), (heap.u16(0x999fa8)) & 0xffff);
    heap.setU16((0x00999fa6 + 2), (heap.u16(0x00999faa)) & 0xffff);
    heap.setU16((0x00999faa + 0), (heap.u16(0x999fac)) & 0xffff);
    heap.setU16((0x00999faa + 2), (heap.u16(0x00999fae)) & 0xffff);
    heap.setU16((0x00999fae + 0), (heap.u16(0x999fb0)) & 0xffff);
    heap.setU16((0x00999fae + 2), (heap.u16(0x00999fb2)) & 0xffff);
    heap.setU16((0x00999fb2 + 0), (heap.u16(0x999fb4)) & 0xffff);
    heap.setU16((0x00999fb2 + 2), (heap.u16(0x00999fb6)) & 0xffff);
    heap.setU16((0x00999fb6 + 0), (heap.u16(0x999fb8)) & 0xffff);
    heap.setU16((0x00999fb6 + 2), (heap.u16(0x00999fba)) & 0xffff);
    heap.setU16((0x00999fba + 0), (heap.u16(0x999fbc)) & 0xffff);
    heap.setU16((0x00999fba + 2), (heap.u16(0x00999fbe)) & 0xffff);
    heap.setU16((0x00999fbe + 0), (heap.u16(0x999fc0)) & 0xffff);
    heap.setU16((0x00999fbe + 2), (heap.u16(0x00999fc2)) & 0xffff);
    heap.setU16((0x00999fc2 + 0), (heap.u16(0x999fc4)) & 0xffff);
    heap.setU16((0x00999fc2 + 2), (heap.u16(0x00999fc6)) & 0xffff);
    heap.setU16((0x00999fc6 + 0), (heap.u16(0x999fc8)) & 0xffff);
    heap.setU16((0x00999fc6 + 2), (heap.u16(0x00999fca)) & 0xffff);
    heap.setU16((0x00999fca + 0), (heap.u16(0x999fcc)) & 0xffff);
    heap.setU16((0x00999fca + 2), (heap.u16(0x00999fce)) & 0xffff);
    heap.setU16((0x00999fce + 0), (heap.u16(0x999fd0)) & 0xffff);
    heap.setU16((0x00999fce + 2), (heap.u16(0x00999fd2)) & 0xffff);
    heap.setU16((0x00999fd2 + 0), (heap.u16(0x999fd4)) & 0xffff);
    heap.setU16((0x00999fd2 + 2), (heap.u16(0x00999fd6)) & 0xffff);
    heap.setU16((0x00999fd6 + 0), (heap.u16(0x999fd8)) & 0xffff);
    heap.setU16((0x00999fd6 + 2), (uRam00999fda) & 0xffff);
  } while (true);
}
