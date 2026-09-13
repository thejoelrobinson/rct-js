// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42094b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uRam0099a01c } from "../../runtime/win32.js";
import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0042094b(heap) {
  let bVar1 = 0;
  let bVar2 = 0;
  let in_CL = regs.ecx & 0xff;
  let bVar3 = 0;
  let in_DL = regs.edx & 0xff;
  let bVar5 = 0;
  let uVar4 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let uVar10 = 0;
  uVar7 = ((heap.u32(0x00991f74) + heap.i16((0x005f4676 + heap.u8(0x00991f88) * 4))) & 0xffff);
  if ((((heap.u32(0x00991f70) + heap.i16((0x005f4674 + heap.u8(0x00991f88) * 4))) & 0xffff) < 0x1000) && (uVar7 < 0x1000)) {
    uVar7 = ((uVar7 * 0x80 | uVar7 >>> 9 | heap.u32(0x00991f70) + heap.i16((0x005f4674 + heap.u8(0x00991f88) * 4))) & 0xffff);
    pbVar9 = ((heap.u32((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar5 = ((heap.u8(pbVar9)) & 0xff);
    while ((bVar5 & 0x3c) != 0) {
      pbVar9 = ((pbVar9 + 8) >>> 0);
      bVar5 = ((heap.u8(pbVar9)) & 0xff);
    }
    uVar7 = (((heap.u8(pbVar9 + (4)) & 0xf) << (in_CL & 0x1f)) & 0xffff);
    bVar5 = ((heap.u8(pbVar9 + (2)) >>> 2) & 0xff);
    uVar10 = ((heap.u8(pbVar9 + (4)) & 0x10 | ((uVar7 >>> 4 | uVar7) & 0xffff) & 0xf) >>> 0);
  } else {
    uVar10 = ((0) >>> 0);
    bVar5 = ((1) & 0xff);
  }
  bVar1 = ((in_DL + heap.u32((0x005f46a4) + (unaff_EBX) * 4)) & 0xff);
  bVar3 = ((in_DL + heap.u32((0x005f4704) + (unaff_EBX) * 4)) & 0xff);
  bVar2 = ((bVar5 + heap.u32((0x005f46c4) + (uVar10) * 4)) & 0xff);
  bVar5 = ((bVar5 + heap.u32((0x005f46e4) + (uVar10) * 4)) & 0xff);
  if ((bVar1 <= bVar2) && (bVar3 <= bVar5)) {
    return;
  }
  iVar8 = ((heap.u32(0x005f476c)) >>> 0);
  if ((heap.u32(0x00991f8c) & 1) != 0) {
    iVar8 = ((heap.u32(0x005f4770)) >>> 0);
  }
  heap.setU32(0x005f4724, (iVar8 + 5) >>> 0);
  uVar4 = ((((CONCAT11(bVar5, in_DL)) >>> 0)) >>> 0);
  uVar10 = ((uVar4) >>> 0);
  if (bVar5 != bVar2) {
    if (bVar2 <= bVar5) {
      uVar4 = ((((CONCAT11(bVar2, in_DL)) >>> 0)) >>> 0);
    }
    bVar5 = ((((uVar4 >>> 8) & 0xff)) & 0xff);
    uVar10 = ((uVar4) >>> 0);
    if ((bVar5 != bVar1) && (bVar5 != bVar3)) {
      (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
      uVar4 = ((((CONCAT11(bVar5 + 1, ((uVar4) << 24 >> 24))) >>> 0)) >>> 0);
      uVar10 = ((uVar4) >>> 0);
    }
  }
  LAB_00420a5a: do {
    bVar5 = ((((uVar4 >>> 8) & 0xff)) & 0xff);
    if ((bVar1 <= bVar5) || (bVar3 <= bVar5)) {
      if ((bVar1 <= bVar5) && (bVar3 <= bVar5)) {
        return;
      }
      return (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4), uVar10, unaff_EBX));
    }
    while (bVar5 != heap.u8(0x00999fdc)) {
      if (bVar5 <= heap.u8(0x00999fdc)) {
        (regs.eax = callIndirect(heap, heap.u32((0x00431bb8) + (heap.u8(0x00991f88)) * 4)));
        uVar4 = ((((bVar5 + 1) >>> 0) << 8) >>> 0);
        /* goto LAB_00420a5a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042094b/LAB_00420a5a"); return 0;
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
    uVar6 = ((((heap.u8(0x999fdd)) >>> 0)) >>> 0);
    bVar2 = ((bVar5 + heap.u32((0x005f472e) + (uVar6 * 2) * 4)) & 0xff);
    if ((bVar1 < bVar2) || (bVar3 < bVar2)) {
      iVar8 = ((uVar6 * 2) >>> 0);
      heap.setU8((0x00999fdc + 1), (heap.u32((0x005f475e) + (uVar6) * 4)) & 0xff);
      uVar6 = ((((heap.u8(0x999fdd)) >>> 0)) >>> 0);
      bVar2 = (((bVar2 - heap.u32((0x005f472e) + (iVar8) * 4)) + heap.u32((0x005f472e) + (uVar6 * 2) * 4)) & 0xff);
    }
    heap.setU32(0x0099a4ec, (((bVar2 - heap.u32((0x005f472e) + (uVar6 * 2) * 4)) & 0xffff) * 0x10 + heap.i16((0x005f4746 + uVar6 * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) < 0x10) {
      heap.setU32(0x0099a4ec, (heap.u32(0x0099a4ec) + 0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
    heap.setU32(0x0099a4ec, ((((uVar4) & 0xffff) >>> 8) * 0x10 + heap.i16((0x005f4746 + ((heap.u8(0x999fdd)) >>> 0) * 2))) >>> 0);
    if (heap.u32(0x0099a4ec) == 0) {
      heap.setU32(0x0099a4ec, (0x10) >>> 0);
    }
    heap.setU32(0x0099a4e8, (0x1f) >>> 0);
    heap.setU32(0x0099a4ea, (0) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((0x00432204) + (heap.u8(0x00991f88)) * 4)));
    uVar4 = ((((bVar5 + heap.u32((0x005f472e) + (((heap.u8(0x999fdd)) >>> 0) * 2) * 4)) >>> 0) << 8) >>> 0);
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
