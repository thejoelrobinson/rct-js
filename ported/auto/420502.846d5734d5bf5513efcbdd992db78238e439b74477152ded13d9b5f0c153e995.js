// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/420502.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uRam00999fda } from "../../runtime/win32.js";
import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00420502(heap) {
  let iVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let in_CL = regs.ecx & 0xff;
  let bVar4 = 0;
  let in_DL = regs.edx & 0xff;
  let bVar6 = 0;
  let uVar5 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let pbVar9 = 0;
  let uVar10 = 0;
  uVar8 = ((heap.u32(0x00991f74) + heap.i16((0x005f4666 + heap.u8(0x00991f88) * 4))) & 0xffff);
  if ((((heap.u32(0x00991f70) + heap.i16((0x005f4664 + heap.u8(0x00991f88) * 4))) & 0xffff) < 0x1000) && (uVar8 < 0x1000)) {
    uVar8 = ((uVar8 * 0x80 | uVar8 >>> 9 | heap.u32(0x00991f70) + heap.i16((0x005f4664 + heap.u8(0x00991f88) * 4))) & 0xffff);
    pbVar9 = ((heap.u32((0x00971ef4) + (((uVar8 >>> 5 | uVar8 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar6 = ((heap.u8(pbVar9)) & 0xff);
    while ((bVar6 & 0x3c) != 0) {
      pbVar9 = ((pbVar9 + 8) >>> 0);
      bVar6 = ((heap.u8(pbVar9)) & 0xff);
    }
    uVar8 = (((heap.u8(pbVar9 + (4)) & 0xf) << (in_CL & 0x1f)) & 0xffff);
    bVar6 = ((heap.u8(pbVar9 + (2)) >>> 2) & 0xff);
    uVar10 = ((heap.u8(pbVar9 + (4)) & 0x10 | ((uVar8 >>> 4 | uVar8) & 0xffff) & 0xf) >>> 0);
  } else {
    uVar10 = ((0) >>> 0);
    bVar6 = ((1) & 0xff);
  }
  bVar2 = ((in_DL + heap.u32((0x005f46e4) + (unaff_EBX) * 4)) & 0xff);
  bVar4 = ((in_DL + heap.u32((0x005f4704) + (unaff_EBX) * 4)) & 0xff);
  bVar3 = ((bVar6 + heap.u32((0x005f46c4) + (uVar10) * 4)) & 0xff);
  bVar6 = ((bVar6 + heap.u32((0x005f46a4) + (uVar10) * 4)) & 0xff);
  if ((bVar2 <= bVar3) && (bVar4 <= bVar6)) {
    return;
  }
  heap.setU32(0x005f4724, (heap.u32(0x005f476c)) >>> 0);
  if ((heap.u32(0x00991f8c) & 1) != 0) {
    heap.setU32(0x005f4724, (heap.u32(0x005f4770)) >>> 0);
  }
  uVar5 = ((((CONCAT11(bVar6, in_DL)) >>> 0)) >>> 0);
  uVar10 = ((uVar5) >>> 0);
  if (bVar6 != bVar3) {
    if (bVar3 <= bVar6) {
      uVar5 = ((((CONCAT11(bVar3, in_DL)) >>> 0)) >>> 0);
    }
    bVar6 = ((((uVar5 >>> 8) & 0xff)) & 0xff);
    uVar10 = ((uVar5) >>> 0);
    if ((bVar6 != bVar2) && (bVar6 != bVar4)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      uVar5 = ((((CONCAT11(bVar6 + 1, ((uVar5) << 24 >> 24))) >>> 0)) >>> 0);
      uVar10 = ((uVar5) >>> 0);
    }
  }
  LAB_0042060e: do {
    bVar6 = ((((uVar5 >>> 8) & 0xff)) & 0xff);
    if ((bVar2 <= bVar6) || (bVar4 <= bVar6)) {
      if ((bVar2 <= bVar6) && (bVar4 <= bVar6)) {
        return;
      }
      return (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), uVar10, unaff_EBX));
    }
    while (bVar6 != heap.u8(0x00999f9a)) {
      if (bVar6 <= heap.u8(0x00999f9a)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
        uVar5 = ((((bVar6 + 1) >>> 0) << 8) >>> 0);
        /* goto LAB_0042060e — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00420502/LAB_0042060e"); return 0;
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
    uVar7 = ((((heap.u8(0x999f9b)) >>> 0)) >>> 0);
    bVar3 = ((bVar6 + heap.u32((0x005f472e) + (uVar7 * 2) * 4)) & 0xff);
    if ((bVar2 < bVar3) || (bVar4 < bVar3)) {
      iVar1 = ((uVar7 * 2) >>> 0);
      heap.setU8((0x00999f9a + 1), (heap.u32((0x005f475e) + (uVar7) * 4)) & 0xff);
      uVar7 = ((((heap.u8(0x999f9b)) >>> 0)) >>> 0);
      bVar3 = (((bVar3 - heap.u32((0x005f472e) + (iVar1) * 4)) + heap.u32((0x005f472e) + (uVar7 * 2) * 4)) & 0xff);
    }
    heap.setU32(0x0099a4ec, (((bVar3 - heap.u32((0x005f472e) + (uVar7 * 2) * 4)) & 0xffff) * 0x10 + heap.i16((0x005f4746 + uVar7 * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) < 0x10) {
      heap.setU32(0x0099a4ec, (heap.u32(0x0099a4ec) + 0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
    heap.setU32(0x0099a4ec, ((((uVar5) & 0xffff) >>> 8) * 0x10 + heap.i16((0x005f4746 + ((heap.u8(0x999f9b)) >>> 0) * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) == 0) {
      heap.setU32(0x0099a4ec, (0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0x1f) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
    uVar5 = ((((bVar6 + heap.u32((0x005f472e) + (((heap.u8(0x999f9b)) >>> 0) * 2) * 4)) >>> 0) << 8) >>> 0);
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
